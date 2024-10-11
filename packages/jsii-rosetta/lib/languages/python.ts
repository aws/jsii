import * as ts from 'typescript';

import { determineJsiiType, JsiiType, ObjectLiteralStruct } from '../jsii/jsii-types';
import {
  propertiesOfStruct,
  StructProperty,
  structPropertyAcceptsUndefined,
  analyzeStructType,
  JsiiSymbol,
  simpleName,
  namespaceName,
  isJsiiProtocolType,
} from '../jsii/jsii-utils';
import { jsiiTargetParameter } from '../jsii/packages';
import { TargetLanguage } from '../languages/target-language';
import { NO_SYNTAX, OTree, renderTree } from '../o-tree';
import { AstRenderer, nimpl, CommentSyntax } from '../renderer';
import { SubmoduleReference } from '../submodule-reference';
import {
  matchAst,
  nodeOfType,
  stripCommentMarkers,
  voidExpressionString,
  quoteStringLiteral,
} from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import { parameterAcceptsUndefined } from '../typescript/types';
import { startsWithUppercase, sortBy, groupBy, fmap } from '../util';
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
   * Whether the current property assignment is in the context of a map value.
   * In this case, the keys should be strings (quoted where needed), and should
   * not get mangled or case-converted.
   */
  readonly inMap?: boolean;

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

interface ImportedModule {
  readonly importedFqn: string;
  readonly importName: string;
}

export class PythonVisitor extends DefaultVisitor<PythonLanguageContext> {
  /**
   * Translation version
   *
   * Bump this when you change something in the implementation to invalidate
   * existing cached translations.
   */
  public static readonly VERSION = '3';

  public readonly language = TargetLanguage.PYTHON;
  public readonly defaultContext = {};

  /**
   * Keep track of module imports we've seen, so that if we need to render a type we can pick from these modules
   */
  private readonly imports = new Array<ImportedModule>();

  /**
   * Synthetic imports that need to be added as a final step
   */
  private readonly syntheticImportsToAdd = new Array<string>();

  protected statementTerminator = '';

  public constructor(private readonly options: PythonVisitorOptions = {}) {
    super();
  }

  public mergeContext(old: PythonLanguageContext, update: Partial<PythonLanguageContext>) {
    return Object.assign({}, old, update);
  }

  public commentRange(comment: CommentSyntax, _context: PythonVisitorContext): OTree {
    const commentText = stripCommentMarkers(comment.text, comment.kind === ts.SyntaxKind.MultiLineCommentTrivia);
    const hashLines = commentText
      .split('\n')
      .map((l) => `# ${l}`)
      .join('\n');
    const needsAdditionalTrailer = comment.hasTrailingNewLine;

    return new OTree([comment.isTrailing ? ' ' : '', hashLines, needsAdditionalTrailer ? '\n' : ''], [], {
      // Make sure comment is rendered exactly once in the output tree, no
      // matter how many source nodes it is attached to.
      renderOnce: `comment-${comment.pos}`,
    });
  }

  public sourceFile(node: ts.SourceFile, context: PythonVisitorContext): OTree {
    let rendered = super.sourceFile(node, context);

    // Add synthetic imports
    if (this.syntheticImportsToAdd.length > 0) {
      rendered = new OTree([...this.renderSyntheticImports(), rendered]);
    }

    if (this.options.disclaimer) {
      rendered = new OTree([`# ${this.options.disclaimer}\n`, rendered]);
    }
    return rendered;
  }

  public importStatement(node: ImportStatement, context: PythonVisitorContext): OTree {
    if (node.imports.import === 'full') {
      const moduleName = fmap(node.moduleSymbol, findPythonName) ?? guessPythonPackageName(node.packageName);

      const importName = node.imports.alias ?? node.imports.sourceName;
      this.addImport({
        importedFqn: node.moduleSymbol?.fqn ?? node.packageName,
        importName,
      });

      return new OTree([`import ${moduleName} as ${mangleIdentifier(importName)}`], [], {
        canBreakLine: true,
      });
    }
    if (node.imports.import === 'selective') {
      for (const im of node.imports.elements) {
        if (im.importedSymbol) {
          this.addImport({
            importName: im.alias ? im.alias : im.sourceName,
            importedFqn: im.importedSymbol.fqn,
          });
        }
      }

      const imports = node.imports.elements.map((im) => {
        const localName = im.alias ?? im.sourceName;
        const originalName = fmap(fmap(im.importedSymbol, findPythonName), simpleName) ?? im.sourceName;

        return localName === originalName
          ? mangleIdentifier(originalName)
          : `${mangleIdentifier(originalName)} as ${mangleIdentifier(localName)}`;
      });

      const moduleName = fmap(node.moduleSymbol, findPythonName) ?? guessPythonPackageName(node.packageName);

      return new OTree([`from ${moduleName} import ${imports.join(', ')}`], [], {
        canBreakLine: true,
      });
    }

    return nimpl(node.node, context);
  }

  public token<A extends ts.SyntaxKind>(node: ts.Token<A>, context: PythonVisitorContext): OTree {
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
        propertiesOfStruct(explodedParameter.type, context).map((prop) => new OTree([prop.name, '=', prop.name])),
        { separator: ', ' },
      );
    }

    return new OTree([mangleIdentifier(originalIdentifier)]);
  }

  public functionDeclaration(node: ts.FunctionDeclaration, context: PythonVisitorContext): OTree {
    return this.functionLike(node, context);
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, context: PythonVisitorContext): OTree {
    return this.functionLike(node, context, { isConstructor: true });
  }

  public methodDeclaration(node: ts.MethodDeclaration, context: PythonVisitorContext): OTree {
    return this.functionLike(node, context);
  }

  public expressionStatement(node: ts.ExpressionStatement, context: PythonVisitorContext): OTree {
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
    const methodName = opts.isConstructor ? '__init__' : renderTree(context.convert(node.name));

    const [paramDecls, explodedParameter] = this.convertFunctionCallParameters(node.parameters, context);

    const ret = new OTree(
      [
        'def ',
        methodName,
        '(',
        new OTree([], [context.currentContext.inClass ? 'self' : undefined, ...paramDecls], {
          separator: ', ',
        }),
        '): ',
      ],
      [context.updateContext({ explodedParameter, currentMethodName: methodName }).convert(node.body)],
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

  public regularCallExpression(node: ts.CallExpression, context: PythonVisitorContext): OTree {
    let expressionText: OTree | string = context.convert(node.expression);

    if (matchAst(node.expression, nodeOfType(ts.SyntaxKind.SuperKeyword)) && context.currentContext.currentMethodName) {
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
          signature?.parameters?.map((p) => p.valueDeclaration as ts.ParameterDeclaration),
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
    submoduleReference: SubmoduleReference | undefined,
  ) {
    const fullText = context.textOf(node);
    if (fullText in BUILTIN_FUNCTIONS) {
      return new OTree([BUILTIN_FUNCTIONS[fullText]]);
    }

    const explodedParameter = context.currentContext.explodedParameter;

    // We might be in a context where we've exploded this struct into arguments,
    // in which case we will return just the accessed variable.
    if (explodedParameter && context.textOf(node.expression) === explodedParameter.variableName) {
      return context.convert(node.name);
    }

    if (submoduleReference != null) {
      return context.convert(submoduleReference.lastNode);
    }

    return super.propertyAccessExpression(node, context, submoduleReference);
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, context: PythonVisitorContext): OTree {
    const type = node.type && context.typeOfType(node.type);

    if (
      context.currentContext.tailPositionParameter &&
      type &&
      analyzeStructType(context.typeChecker, type) !== false
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
      return new OTree([], ['*', ...propertiesOfStruct(type, context).map(renderStructProperty)], { separator: ', ' });
    }

    const suffix = parameterAcceptsUndefined(node, type) ? '=None' : '';

    return new OTree([node.dotDotDotToken ? '*' : '', context.convert(node.name), suffix]);

    function renderStructProperty(prop: StructProperty): string {
      const sfx = structPropertyAcceptsUndefined(prop) ? '=None' : '';
      return prop.name + sfx;
    }
  }

  public ifStatement(node: ts.IfStatement, context: PythonVisitorContext): OTree {
    const ifStmt = new OTree(['if ', context.convert(node.expression), ': '], [context.convert(node.thenStatement)], {
      canBreakLine: true,
    });
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

  public unknownTypeObjectLiteralExpression(node: ts.ObjectLiteralExpression, context: PythonVisitorContext): OTree {
    // Neutralize local modifiers if any for transforming further down.
    const downContext = context.updateContext({
      tailPositionArgument: false,
      variadicArgument: false,
    });

    if (context.currentContext.tailPositionArgument && !context.currentContext.variadicArgument) {
      // Guess that it's a struct we can probably inline the kwargs for
      return this.renderObjectLiteralExpression('', '', true, node, downContext);
    }
    return this.renderObjectLiteralExpression('{', '}', false, node, downContext);
  }

  public knownStructObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    structType: ObjectLiteralStruct,
    context: PythonVisitorContext,
  ): OTree {
    if (context.currentContext.tailPositionArgument) {
      // We know it's a struct we can DEFINITELY inline the args for
      return this.renderObjectLiteralExpression('', '', true, node, context);
    }

    const structName =
      structType.kind === 'struct' ? this.importedNameForType(structType.jsiiSym) : structType.type.symbol.name;

    return this.renderObjectLiteralExpression(`${structName}(`, ')', true, node, context);
  }

  public keyValueObjectLiteralExpression(node: ts.ObjectLiteralExpression, context: PythonVisitorContext): OTree {
    return this.renderObjectLiteralExpression('{', '}', false, node, context.updateContext({ inMap: true }));
  }

  public translateUnaryOperator(operator: ts.PrefixUnaryOperator) {
    if (operator === ts.SyntaxKind.ExclamationToken) {
      return 'not ';
    }
    return super.translateUnaryOperator(operator);
  }

  public renderObjectLiteralExpression(
    prefix: string,
    suffix: string,
    renderObjectLiteralAsKeywords: boolean,
    node: ts.ObjectLiteralExpression,
    context: PythonVisitorContext,
  ): OTree {
    return new OTree([prefix], context.updateContext({ renderObjectLiteralAsKeywords }).convertAll(node.properties), {
      suffix: context.mirrorNewlineBefore(node.properties[0], suffix),
      separator: ', ',
      indent: 4,
    });
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, context: PythonVisitorContext): OTree {
    return new OTree(['['], context.convertAll(node.elements), {
      suffix: context.mirrorNewlineBefore(node.elements[0], ']'),
      separator: ', ',
      indent: 4,
    });
  }

  public propertyAssignment(node: ts.PropertyAssignment, context: PythonVisitorContext): OTree {
    const mid = context.currentContext.renderObjectLiteralAsKeywords ? '=' : ': ';

    // node.name is either an identifier or a string literal. The string literal
    // needs to be converted differently depending on whether it needs to be a
    // string or a keyword argument.
    let name = ts.isStringLiteral(node.name)
      ? new OTree([
          context.currentContext.inMap // If in map, don't mangle the keys
            ? node.name.text
            : mangleIdentifier(node.name.text),
        ])
      : context.convert(node.name);

    // If this isn't a computed property, we must quote the key (unless it's rendered as a keyword)
    if (
      context.currentContext.inMap ||
      (!context.currentContext.renderObjectLiteralAsKeywords && !ts.isComputedPropertyName(node.name))
    ) {
      name = new OTree(['"', name, '"']);
    }

    return new OTree(
      [name, mid, context.updateContext({ inMap: false, tailPositionArgument: false }).convert(node.initializer)],
      [],
      { canBreakLine: true },
    );
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, context: PythonVisitorContext): OTree {
    let before = '"';
    let mid = '": ';

    if (context.currentContext.renderObjectLiteralAsKeywords) {
      before = '';
      mid = '=';
    }

    return new OTree([before, context.convert(node.name), mid, context.convert(node.name)], [], { canBreakLine: true });
  }

  public newExpression(node: ts.NewExpression, context: PythonVisitorContext): OTree {
    return new OTree(
      [context.convert(node.expression), '(', this.convertFunctionCallArguments(node.arguments, context), ')'],
      [],
      { canBreakLine: true },
    );
  }

  public variableDeclaration(node: ts.VariableDeclaration, context: PythonVisitorContext): OTree {
    let fallback = 'object';
    if (node.type) {
      fallback = node.type.getText();
    }

    if (!node.initializer) {
      const type =
        (node.type && context.typeOfType(node.type)) ||
        (node.initializer && context.typeOfExpression(node.initializer));

      const renderedType = type ? this.renderType(node, type, context, fallback) : fallback;
      return new OTree(['# ', context.convert(node.name), ': ', renderedType], []);
    }

    return new OTree([context.convert(node.name), ' = ', context.convert(node.initializer)], [], {
      canBreakLine: true,
    });
  }

  public thisKeyword() {
    return new OTree(['self']);
  }

  public forOfStatement(node: ts.ForOfStatement, context: PythonVisitorContext): OTree {
    // This is what a "for (const x of ...)" looks like in the AST
    let variableName = '???';

    matchAst(
      node.initializer,
      nodeOfType(ts.SyntaxKind.VariableDeclarationList, nodeOfType('var', ts.SyntaxKind.VariableDeclaration)),
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

  public classDeclaration(node: ts.ClassDeclaration, context: PythonVisitorContext): OTree {
    const allHeritageClauses = Array.from(node.heritageClauses ?? []).flatMap((h) => Array.from(h.types));

    // List of booleans matching `allHeritage` array
    const isJsii = allHeritageClauses.map(
      (e) =>
        fmap(context.typeOfExpression(e.expression), (type) => isJsiiProtocolType(context.typeChecker, type)) ?? false,
    );

    const jsiiImplements = allHeritageClauses.filter((_, i) => isJsii[i]);

    const inlineHeritage = allHeritageClauses.filter((_, i) => !isJsii[i]);
    const hasHeritage = inlineHeritage.length > 0;

    const members = context.updateContext({ inClass: true }).convertAll(node.members);
    if (members.length === 0) {
      members.push(new OTree(['\npass'], []));
    }

    const ret = new OTree(
      [
        ...jsiiImplements.flatMap((i) => ['@jsii.implements(', context.convert(i.expression), ')\n']),
        'class ',
        node.name ? context.textOf(node.name) : '???',
        hasHeritage ? '(' : '',
        ...inlineHeritage.map((t) => context.convert(t.expression)),
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

  public printStatement(args: ts.NodeArray<ts.Expression>, context: PythonVisitorContext) {
    return new OTree(['print', '(', new OTree([], context.convertAll(args), { separator: ', ' }), ')']);
  }

  public propertyDeclaration(_node: ts.PropertyDeclaration, _context: PythonVisitorContext): OTree {
    return new OTree([]);
  }

  /**
   * We have to do something special here
   *
   * Best-effort, we remember the fields of struct interfaces and keep track of
   * them. Fortunately we can determine from the name whether what to do.
   */
  public interfaceDeclaration(_node: ts.InterfaceDeclaration, _context: PythonVisitorContext): OTree {
    // Whatever we do, nothing here will have a representation
    return NO_SYNTAX;
  }

  public propertySignature(_node: ts.PropertySignature, _context: PythonVisitorContext): OTree {
    // Does not represent in Python
    return NO_SYNTAX;
  }

  public methodSignature(_node: ts.MethodSignature, _context: PythonVisitorContext): OTree {
    // Does not represent in Python
    return NO_SYNTAX;
  }

  public asExpression(node: ts.AsExpression, context: PythonVisitorContext): OTree {
    return context.convert(node.expression);
  }

  public stringLiteral(
    node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral,
    _context: PythonVisitorContext,
  ): OTree {
    if (node.getText(node.getSourceFile()).includes('\n')) {
      return new OTree([
        '"""',
        node.text
          // Escape all occurrences of back-slash once more
          .replace(/\\/g, '\\\\')
          // Escape only the first one in triple-quotes
          .replace(/"""/g, '\\"""'),
        '"""',
      ]);
    }
    return new OTree([JSON.stringify(node.text)]);
  }

  public templateExpression(node: ts.TemplateExpression, context: PythonVisitorContext): OTree {
    const parts = new Array<string>();
    if (node.head.rawText) {
      parts.push(quoteStringLiteral(node.head.rawText));
    }
    for (const span of node.templateSpans) {
      parts.push(`{${context.textOf(span.expression)}}`);
      if (span.literal.rawText) {
        parts.push(quoteStringLiteral(span.literal.rawText));
      }
    }

    const quote = parts.some((part) => part.includes('\n')) ? '"""' : '"';

    return new OTree([`f${quote}`, ...parts, quote]);
  }

  public maskingVoidExpression(node: ts.VoidExpression, _context: PythonVisitorContext): OTree {
    const arg = voidExpressionString(node);
    if (arg === 'block') {
      return new OTree(['# ...'], [], { canBreakLine: true });
    }
    if (arg === '...') {
      return new OTree(['...']);
    }
    return NO_SYNTAX;
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
      const decl = parameterDeclarations?.[Math.min(index, parameterDeclarations.length - 1)];
      const variadicArgument = decl?.dotDotDotToken != null;
      const tailPositionArgument = index >= args.length - 1;

      return ctx.updateContext({ variadicArgument, tailPositionArgument });
    });

    return new OTree([], converted, { separator: ', ', indent: 4 });
  }

  /**
   * Render a type.
   *
   * Not usually a thing in Python, but useful for declared variables.
   */
  private renderType(owningNode: ts.Node, type: ts.Type, renderer: PythonVisitorContext, fallback: string): string {
    return doRender(determineJsiiType(renderer.typeChecker, type));

    // eslint-disable-next-line consistent-return
    function doRender(jsiiType: JsiiType): string {
      switch (jsiiType.kind) {
        case 'unknown':
          return fallback;
        case 'error':
          renderer.report(owningNode, jsiiType.message);
          return fallback;
        case 'map':
          return `Dict[str, ${doRender(jsiiType.elementType)}]`;
        case 'list':
          return `List[${doRender(jsiiType.elementType)}]`;
        case 'namedType':
          // in this case, the fallback will hold more information than jsiiType.name
          return fallback;
        case 'builtIn':
          switch (jsiiType.builtIn) {
            case 'boolean':
              return 'bool';
            case 'number':
              return 'number';
            case 'string':
              return 'str';
            case 'any':
              return 'Any';
            default:
              return jsiiType.builtIn;
          }
      }
    }
  }

  private addImport(x: ImportedModule) {
    this.imports.push(x);
    // Sort in reverse order of FQN length
    sortBy(this.imports, (i) => [-i.importedFqn.length]);
  }

  /**
   * Find the import for the FQNs submodule, and return it and the rest of the name
   */
  private importedNameForType(jsiiSym: JsiiSymbol) {
    // Look for an existing import that contains this symbol
    for (const imp of this.imports) {
      if (jsiiSym.fqn.startsWith(`${imp.importedFqn}.`)) {
        const remainder = jsiiSym.fqn.substring(imp.importedFqn.length + 1);
        return `${imp.importName}.${remainder}`;
      }
    }

    // Otherwise look up the Python name of this symbol (but not for fake imports from tests)
    const pythonName = findPythonName(jsiiSym);
    if (!jsiiSym.fqn.startsWith('fake_jsii.') && pythonName) {
      this.syntheticImportsToAdd.push(pythonName);
    }
    return simpleName(jsiiSym.fqn);
  }

  private renderSyntheticImports(): string[] {
    const grouped = groupBy(this.syntheticImportsToAdd, namespaceName);
    return Object.entries(grouped).map(([namespaceFqn, fqns]) => {
      const simpleNames = fqns.map(simpleName);
      return `from ${namespaceFqn} import ${simpleNames.join(', ')}\n`;
    });
  }
}

function mangleIdentifier(originalIdentifier: string) {
  if (startsWithUppercase(originalIdentifier)) {
    // Probably a class, leave as-is
    return originalIdentifier;
  }
  // Turn into snake-case
  const cased = originalIdentifier.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
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

/**
 * Find the Python name of a module or type
 */
function findPythonName(jsiiSymbol: JsiiSymbol): string | undefined {
  if (!jsiiSymbol.sourceAssembly?.assembly) {
    // Don't have accurate info, just guess
    return jsiiSymbol.symbolType !== 'module' ? simpleName(jsiiSymbol.fqn) : guessPythonPackageName(jsiiSymbol.fqn);
  }

  const asm = jsiiSymbol.sourceAssembly?.assembly;
  return recurse(jsiiSymbol.fqn);

  function recurse(fqn: string): string {
    if (fqn === asm.name) {
      return jsiiTargetParameter(asm, 'python.module') ?? guessPythonPackageName(fqn);
    }
    if (asm.submodules?.[fqn]) {
      const modName = jsiiTargetParameter(asm.submodules[fqn], 'python.module');
      if (modName) {
        return modName;
      }
    }

    return `${recurse(namespaceName(fqn))}.${simpleName(jsiiSymbol.fqn)}`;
  }
}

/**
 * Pythonify an assembly name and hope it is correct
 */
function guessPythonPackageName(ref: string) {
  return ref.replace(/^@/, '').replace(/\//g, '.').replace(/-/g, '_');
}
