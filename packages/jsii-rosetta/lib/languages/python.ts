import * as ts from 'typescript';

import {
  isStructType,
  propertiesOfStruct,
  StructProperty,
  structPropertyAcceptsUndefined,
} from '../jsii/jsii-utils';
import { jsiiTargetParam } from '../jsii/packages';
import { NO_SYNTAX, OTree, renderTree } from '../o-tree';
import { AstRenderer, nimpl, CommentSyntax } from '../renderer';
import {
  matchAst,
  nodeOfType,
  stripCommentMarkers,
  voidExpressionString,
  quoteStringLiteral,
} from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import { parameterAcceptsUndefined } from '../typescript/types';
import { startsWithUppercase, flat } from '../util';
import { DefaultVisitor } from './default';

interface StructVar {
  variableName: string;
  type: ts.Type | undefined;
}

type ReturnFromTree<A> = { value?: A };

interface PythonLanguageContext {
  /**
   * Whether we're currently rendering a parameter in tail position
   *
   * If so, and the parameter is of type struct, explode it to keyword args
   * and return its information in `returnExplodedParameter`.
   */
  readonly tailPositionParameter?: boolean;

  /**
   * Used to return details about any exploded parameter
   */
  readonly returnExplodedParameter?: ReturnFromTree<StructVar>;

  /**
   * Whether we're currently rendering a value/expression in tail position
   *
   * If so, and the expression seems to be of a struct type, explode it
   * to keyword args.
   */
  readonly tailPositionArgument?: boolean;

  /**
   * Whether object literal members should render themselves as dict
   * members or keyword args
   */
  readonly renderObjectLiteralAsKeywords?: boolean;

  /**
   * In a code block, if any parameter is exploded, information about the parameter here
   */
  readonly explodedParameter?: StructVar;

  /**
   * Whether we're rendering a method or property inside a class
   */
  readonly inClass?: boolean;

  /**
   * If we're in a method, what is it's name
   *
   * (Used to render super() call.);
   */
  readonly currentMethodName?: string;

  /**
   * If we're rendering a variadic argument value
   */
  readonly variadicArgument?: boolean;
}

type PythonVisitorContext = AstRenderer<PythonLanguageContext>;

export interface PythonVisitorOptions {
  disclaimer?: string;
}

export class PythonVisitor extends DefaultVisitor<PythonLanguageContext> {
  public readonly language = 'python';
  public readonly defaultContext = {};

  public constructor(private readonly options: PythonVisitorOptions = {}) {
    super();
  }

  public mergeContext(
    old: PythonLanguageContext,
    update: Partial<PythonLanguageContext>,
  ) {
    return Object.assign({}, old, update);
  }

  public commentRange(
    comment: CommentSyntax,
    _context: PythonVisitorContext,
  ): OTree {
    const commentText = stripCommentMarkers(
      comment.text,
      comment.kind === ts.SyntaxKind.MultiLineCommentTrivia,
    );
    const hashLines = commentText
      .split('\n')
      .map((l) => `# ${l}`)
      .join('\n');
    const needsAdditionalTrailer = comment.hasTrailingNewLine;

    return new OTree([hashLines, needsAdditionalTrailer ? '\n' : ''], [], {
      // Make sure comment is rendered exactly once in the output tree, no
      // matter how many source nodes it is attached to.
      renderOnce: `comment-${comment.pos}`,
    });
  }

  public sourceFile(node: ts.SourceFile, context: PythonVisitorContext): OTree {
    const rendered = super.sourceFile(node, context);
    if (this.options.disclaimer) {
      return new OTree([`# ${this.options.disclaimer}\n`, rendered]);
    }
    return rendered;
  }

  public importStatement(
    node: ImportStatement,
    context: PythonVisitorContext,
  ): OTree {
    const moduleName = this.convertModuleReference(node.packageName);
    if (node.imports.import === 'full') {
      return new OTree(
        [`import ${moduleName} as ${mangleIdentifier(node.imports.alias)}`],
        [],
        {
          canBreakLine: true,
        },
      );
    }
    if (node.imports.import === 'selective') {
      const imports = node.imports.elements.map((im) =>
        im.alias
          ? `${mangleIdentifier(im.sourceName)} as ${mangleIdentifier(
              im.alias,
            )}`
          : mangleIdentifier(im.sourceName),
      );

      return new OTree(
        [`from ${moduleName} import ${imports.join(', ')}`],
        [],
        {
          canBreakLine: true,
        },
      );
    }

    return nimpl(node.node, context);
  }

  public token<A extends ts.SyntaxKind>(
    node: ts.Token<A>,
    context: PythonVisitorContext,
  ): OTree {
    const text = context.textOf(node);
    const mapped = TOKEN_REWRITES[text];
    if (mapped) {
      return new OTree([mapped]);
    }
    return super.token(node, context);
  }

  public identifier(node: ts.Identifier, context: PythonVisitorContext) {
    const originalIdentifier = node.text;

    const explodedParameter = context.currentContext.explodedParameter;
    if (
      context.currentContext.tailPositionArgument &&
      explodedParameter &&
      explodedParameter.type &&
      explodedParameter.variableName === originalIdentifier
    ) {
      return new OTree(
        [],
        propertiesOfStruct(explodedParameter.type, context).map(
          (prop) => new OTree([prop.name, '=', prop.name]),
        ),
        { separator: ', ' },
      );
    }

    return new OTree([mangleIdentifier(originalIdentifier)]);
  }

  public functionDeclaration(
    node: ts.FunctionDeclaration,
    context: PythonVisitorContext,
  ): OTree {
    return this.functionLike(node, context);
  }

  public constructorDeclaration(
    node: ts.ConstructorDeclaration,
    context: PythonVisitorContext,
  ): OTree {
    return this.functionLike(node, context, { isConstructor: true });
  }

  public methodDeclaration(
    node: ts.MethodDeclaration,
    context: PythonVisitorContext,
  ): OTree {
    return this.functionLike(node, context);
  }

  public expressionStatement(
    node: ts.ExpressionStatement,
    context: PythonVisitorContext,
  ): OTree {
    const text = context.textOf(node);
    if (text === 'true') {
      return new OTree(['True']);
    }
    if (text === 'false') {
      return new OTree(['False']);
    }

    return super.expressionStatement(node, context);
  }

  // tslint:disable-next-line:max-line-length
  public functionLike(
    node: ts.FunctionLikeDeclarationBase,
    context: PythonVisitorContext,
    opts: { isConstructor?: boolean } = {},
  ): OTree {
    const methodName = opts.isConstructor
      ? '__init__'
      : renderTree(context.convert(node.name));

    const [paramDecls, explodedParameter] = this.convertFunctionCallParameters(
      node.parameters,
      context,
    );

    const ret = new OTree(
      [
        'def ',
        methodName,
        '(',
        new OTree(
          [],
          [context.currentContext.inClass ? 'self' : undefined, ...paramDecls],
          {
            separator: ', ',
          },
        ),
        '): ',
      ],
      [
        context
          .updateContext({ explodedParameter, currentMethodName: methodName })
          .convert(node.body),
      ],
      {
        canBreakLine: true,
      },
    );

    return ret;
  }

  public block(node: ts.Block, context: PythonVisitorContext): OTree {
    if (node.statements.length === 0) {
      return new OTree([], ['\npass'], { indent: 4, canBreakLine: true });
    }

    return new OTree([], context.convertAll(node.statements), {
      separator: '',
      indent: 4,
      canBreakLine: true,
    });
  }

  public regularCallExpression(
    node: ts.CallExpression,
    context: PythonVisitorContext,
  ): OTree {
    let expressionText: OTree | string = context.convert(node.expression);

    if (
      matchAst(node.expression, nodeOfType(ts.SyntaxKind.SuperKeyword)) &&
      context.currentContext.currentMethodName
    ) {
      expressionText = `super().${context.currentContext.currentMethodName}`;
    }

    const signature = context.typeChecker.getResolvedSignature(node);

    return new OTree(
      [
        expressionText,
        '(',
        this.convertFunctionCallArguments(
          node.arguments,
          context,
          signature?.parameters?.map(
            (p) => p.valueDeclaration as ts.ParameterDeclaration,
          ),
        ),
        ')',
      ],
      [],
      { canBreakLine: true },
    );
  }

  public propertyAccessExpression(
    node: ts.PropertyAccessExpression,
    context: PythonVisitorContext,
  ) {
    const fullText = context.textOf(node);
    if (fullText in BUILTIN_FUNCTIONS) {
      return new OTree([BUILTIN_FUNCTIONS[fullText]]);
    }

    const explodedParameter = context.currentContext.explodedParameter;

    // We might be in a context where we've exploded this struct into arguments,
    // in which case we will return just the accessed variable.
    if (
      explodedParameter &&
      context.textOf(node.expression) === explodedParameter.variableName
    ) {
      return context.convert(node.name);
    }

    return super.propertyAccessExpression(node, context);
  }

  public parameterDeclaration(
    node: ts.ParameterDeclaration,
    context: PythonVisitorContext,
  ): OTree {
    const type = node.type && context.typeOfType(node.type);

    if (
      context.currentContext.tailPositionParameter &&
      type &&
      isStructType(type)
    ) {
      // Return the parameter that we exploded so that we can use this information
      // while translating the body.
      if (context.currentContext.returnExplodedParameter) {
        context.currentContext.returnExplodedParameter.value = {
          variableName: context.textOf(node.name),
          type,
        };
      }

      // Explode to fields
      return new OTree(
        [],
        ['*', ...propertiesOfStruct(type, context).map(renderStructProperty)],
        { separator: ', ' },
      );
    }

    const suffix = parameterAcceptsUndefined(node, type) ? '=None' : '';

    return new OTree([context.convert(node.name), suffix]);

    function renderStructProperty(prop: StructProperty): string {
      const sfx = structPropertyAcceptsUndefined(prop) ? '=None' : '';
      return prop.name + sfx;
    }
  }

  public ifStatement(
    node: ts.IfStatement,
    context: PythonVisitorContext,
  ): OTree {
    const ifStmt = new OTree(
      ['if ', context.convert(node.expression), ': '],
      [context.convert(node.thenStatement)],
      { canBreakLine: true },
    );
    const elseStmt = node.elseStatement
      ? new OTree(['else: '], [context.convert(node.elseStatement)], {
          canBreakLine: true,
        })
      : undefined;

    return elseStmt
      ? new OTree([], [ifStmt, elseStmt], {
          separator: '\n',
          canBreakLine: true,
        })
      : ifStmt;
  }

  public unknownTypeObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    context: PythonVisitorContext,
  ): OTree {
    // Neutralize local modifiers if any for transforming further down.
    const downContext = context.updateContext({
      tailPositionArgument: false,
      variadicArgument: false,
    });

    if (
      context.currentContext.tailPositionArgument &&
      !context.currentContext.variadicArgument
    ) {
      // Guess that it's a struct we can probably inline the kwargs for
      return this.renderObjectLiteralExpression(
        '',
        '',
        true,
        node,
        downContext,
      );
    }
    return this.renderObjectLiteralExpression(
      '{',
      '}',
      false,
      node,
      downContext,
    );
  }

  public knownStructObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    structType: ts.Type,
    context: PythonVisitorContext,
  ): OTree {
    if (context.currentContext.tailPositionArgument) {
      // We know it's a struct we can DEFINITELY inline the args for
      return this.renderObjectLiteralExpression('', '', true, node, context);
    }
    return this.renderObjectLiteralExpression(
      `${structType.symbol.name}(`,
      ')',
      true,
      node,
      context,
    );
  }

  public keyValueObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    _valueType: ts.Type | undefined,
    context: PythonVisitorContext,
  ): OTree {
    return this.renderObjectLiteralExpression('{', '}', false, node, context);
  }

  public renderObjectLiteralExpression(
    prefix: string,
    suffix: string,
    renderObjectLiteralAsKeywords: boolean,
    node: ts.ObjectLiteralExpression,
    context: PythonVisitorContext,
  ): OTree {
    return new OTree(
      [prefix],
      context
        .updateContext({ renderObjectLiteralAsKeywords })
        .convertAll(node.properties),
      {
        suffix: context.mirrorNewlineBefore(node.properties[0], suffix),
        separator: ', ',
        indent: 4,
      },
    );
  }

  public arrayLiteralExpression(
    node: ts.ArrayLiteralExpression,
    context: PythonVisitorContext,
  ): OTree {
    return new OTree(['['], context.convertAll(node.elements), {
      suffix: context.mirrorNewlineBefore(node.elements[0], ']'),
      separator: ', ',
      indent: 4,
    });
  }

  public propertyAssignment(
    node: ts.PropertyAssignment,
    context: PythonVisitorContext,
  ): OTree {
    let before = '"';
    let mid = '": ';

    if (context.currentContext.renderObjectLiteralAsKeywords) {
      before = '';
      mid = '=';
    }

    // node.name is either an identifier or a string literal. The string literal
    // needs to be converted differently.
    let name = context.convert(node.name);
    matchAst(
      node.name,
      nodeOfType('stringLiteral', ts.SyntaxKind.StringLiteral),
      (captured) => {
        name = new OTree([mangleIdentifier(captured.stringLiteral.text)]);
      },
    );

    return new OTree(
      [
        before,
        name,
        mid,
        context
          .updateContext({ tailPositionArgument: false })
          .convert(node.initializer),
      ],
      [],
      { canBreakLine: true },
    );
  }

  public shorthandPropertyAssignment(
    node: ts.ShorthandPropertyAssignment,
    context: PythonVisitorContext,
  ): OTree {
    let before = '"';
    let mid = '": ';

    if (context.currentContext.renderObjectLiteralAsKeywords) {
      before = '';
      mid = '=';
    }

    return new OTree(
      [before, context.convert(node.name), mid, context.convert(node.name)],
      [],
      { canBreakLine: true },
    );
  }

  public newExpression(
    node: ts.NewExpression,
    context: PythonVisitorContext,
  ): OTree {
    return new OTree(
      [
        context.convert(node.expression),
        '(',
        this.convertFunctionCallArguments(node.arguments, context),
        ')',
      ],
      [],
      { canBreakLine: true },
    );
  }

  public variableDeclaration(
    node: ts.VariableDeclaration,
    context: PythonVisitorContext,
  ): OTree {
    return new OTree(
      [context.convert(node.name), ' = ', context.convert(node.initializer)],
      [],
      { canBreakLine: true },
    );
  }

  public thisKeyword() {
    return new OTree(['self']);
  }

  public forOfStatement(
    node: ts.ForOfStatement,
    context: PythonVisitorContext,
  ): OTree {
    // This is what a "for (const x of ...)" looks like in the AST
    let variableName = '???';

    matchAst(
      node.initializer,
      nodeOfType(
        ts.SyntaxKind.VariableDeclarationList,
        nodeOfType('var', ts.SyntaxKind.VariableDeclaration),
      ),
      (bindings) => {
        variableName = mangleIdentifier(context.textOf(bindings.var.name));
      },
    );

    return new OTree(
      ['for ', variableName, ' in ', context.convert(node.expression), ': '],
      [context.convert(node.statement)],
      { canBreakLine: true },
    );
  }

  public classDeclaration(
    node: ts.ClassDeclaration,
    context: PythonVisitorContext,
  ): OTree {
    const heritage = flat(
      Array.from(node.heritageClauses ?? []).map((h) => Array.from(h.types)),
    ).map((t) => context.convert(t.expression));
    const hasHeritage = heritage.length > 0;

    const members = context
      .updateContext({ inClass: true })
      .convertAll(node.members);
    if (members.length === 0) {
      members.push(new OTree(['\npass'], []));
    }

    const ret = new OTree(
      [
        'class ',
        node.name ? context.textOf(node.name) : '???',
        hasHeritage ? '(' : '',
        ...heritage,
        hasHeritage ? ')' : '',
        ': ',
      ],
      members,
      {
        indent: 4,
        canBreakLine: true,
      },
    );

    return ret;
  }

  public printStatement(
    args: ts.NodeArray<ts.Expression>,
    context: PythonVisitorContext,
  ) {
    return new OTree([
      'print',
      '(',
      new OTree([], context.convertAll(args), { separator: ', ' }),
      ')',
    ]);
  }

  public propertyDeclaration(
    _node: ts.PropertyDeclaration,
    _context: PythonVisitorContext,
  ): OTree {
    return new OTree([]);
  }

  /**
   * We have to do something special here
   *
   * Best-effort, we remember the fields of struct interfaces and keep track of
   * them. Fortunately we can determine from the name whether what to do.
   */
  public interfaceDeclaration(
    _node: ts.InterfaceDeclaration,
    _context: PythonVisitorContext,
  ): OTree {
    // Whatever we do, nothing here will have a representation
    return NO_SYNTAX;
  }

  public propertySignature(
    _node: ts.PropertySignature,
    _context: PythonVisitorContext,
  ): OTree {
    // Does not represent in Python
    return NO_SYNTAX;
  }

  public methodSignature(
    _node: ts.MethodSignature,
    _context: PythonVisitorContext,
  ): OTree {
    // Does not represent in Python
    return NO_SYNTAX;
  }

  public asExpression(
    node: ts.AsExpression,
    context: PythonVisitorContext,
  ): OTree {
    return context.convert(node.expression);
  }

  public templateExpression(
    node: ts.TemplateExpression,
    context: PythonVisitorContext,
  ): OTree {
    const parts = ['f"'];
    if (node.head.rawText) {
      parts.push(quoteStringLiteral(node.head.rawText));
    }
    for (const span of node.templateSpans) {
      parts.push(`{${context.textOf(span.expression)}}`);
      if (span.literal.rawText) {
        parts.push(quoteStringLiteral(span.literal.rawText));
      }
    }
    parts.push('"');

    return new OTree([parts.join('')]);
  }

  public maskingVoidExpression(
    node: ts.VoidExpression,
    _context: PythonVisitorContext,
  ): OTree {
    const arg = voidExpressionString(node);
    if (arg === 'block') {
      return new OTree(['# ...'], [], { canBreakLine: true });
    }
    if (arg === '...') {
      return new OTree(['...']);
    }
    return NO_SYNTAX;
  }

  protected convertModuleReference(ref: string) {
    // Get the Python target name from the referenced package (if available)
    const resolvedPackage = jsiiTargetParam(ref, 'python.module');

    // Return that or some default-derived module name representation

    return (
      resolvedPackage ||
      ref.replace(/^@/, '').replace(/\//g, '.').replace(/-/g, '_')
    );
  }

  /**
   * Convert parameters
   *
   * If the last one has the type of a known struct, explode to keyword-only arguments.
   *
   * Returns a pair of [decls, excploded-var-name].
   */
  // tslint:disable-next-line:max-line-length
  private convertFunctionCallParameters(
    params: ts.NodeArray<ts.ParameterDeclaration> | undefined,
    context: PythonVisitorContext,
  ): [Array<string | OTree>, StructVar | undefined] {
    if (!params || params.length === 0) {
      return [[], undefined];
    }

    const returnExplodedParameter: ReturnFromTree<StructVar> = {};

    // Convert the last element differently
    const converted: Array<string | OTree> =
      params.length > 0
        ? [
            ...context.convertAll(params.slice(0, params.length - 1)),
            context
              .updateContext({
                tailPositionParameter: true,
                returnExplodedParameter,
              })
              .convert(last(params)),
          ]
        : [];

    return [converted, returnExplodedParameter.value];
  }

  /**
   * Convert arguments.
   *
   * If the last argument:
   *
   * - is an object literal, explode it.
   * - is itself an exploded argument in our call signature, explode the fields
   */
  private convertFunctionCallArguments(
    args: ts.NodeArray<ts.Expression> | undefined,
    context: PythonVisitorContext,
    parameterDeclarations?: readonly ts.ParameterDeclaration[],
  ) {
    if (!args) {
      return NO_SYNTAX;
    }

    const converted = context.convertWithModifier(args, (ctx, _arg, index) => {
      const decl =
        parameterDeclarations?.[
          Math.min(index, parameterDeclarations.length - 1)
        ];
      const variadicArgument = decl?.dotDotDotToken != null;
      const tailPositionArgument = index >= args.length - 1;

      return ctx.updateContext({ variadicArgument, tailPositionArgument });
    });

    return new OTree([], converted, { separator: ', ', indent: 4 });
  }
}

function mangleIdentifier(originalIdentifier: string) {
  if (startsWithUppercase(originalIdentifier)) {
    // Probably a class, leave as-is
    return originalIdentifier;
  }
  // Turn into snake-case
  const cased = originalIdentifier.replace(
    /[^A-Z][A-Z]/g,
    (m) => `${m[0].substr(0, 1)}_${m.substr(1).toLowerCase()}`,
  );
  return IDENTIFIER_KEYWORDS.includes(cased) ? `${cased}_` : cased;
}

const BUILTIN_FUNCTIONS: { [key: string]: string } = {
  'console.log': 'print',
  'console.error': 'sys.stderr.write',
  'Math.random': 'random.random',
};

const TOKEN_REWRITES: { [key: string]: string } = {
  this: 'self',
  true: 'True',
  false: 'False',
};

const IDENTIFIER_KEYWORDS: string[] = ['lambda'];

function last<A>(xs: readonly A[]): A {
  return xs[xs.length - 1];
}
