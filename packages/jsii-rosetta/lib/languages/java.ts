import ts = require('typescript');
import { DefaultVisitor } from './default';
import { AstRenderer } from '../renderer';
import { NO_SYNTAX, OTree } from '../o-tree';
import { builtInTypeName, mapElementType, typeWithoutUndefinedUnion } from '../typescript/types';
import { isReadOnly, matchAst, nodeOfType, quoteStringLiteral, visibility } from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import { jsiiTargetParam } from '../jsii/packages';

interface JavaContext {
  /** @default false */
  readonly ignorePropertyPrefix?: boolean;

  /** @default true */
  readonly convertPropertyToGetter?: boolean;

  readonly insideTypeDeclaration?: InsideTypeDeclaration;

  readonly inKeyValueList?: boolean;

  /**
   * Used when rendering a JavaScript object literal that is _not_ for a struct -
   * we render that as a Map in Java.
   *
   * @default false
   */
  readonly identifierAsString?: boolean;

  /**
   * Used when rendering a JavaScript object literal that is for a struct -
   * maps to a Builder in Java.
   *
   * @default false
   */
  readonly stringLiteralAsIdentifier?: boolean;
}

interface InsideTypeDeclaration {
  readonly typeName: ts.Node | undefined;
}

type JavaRenderer = AstRenderer<JavaContext>;

export class JavaVisitor extends DefaultVisitor<JavaContext> {
  public readonly defaultContext = {};

  public mergeContext(old: JavaContext, update: Partial<JavaContext>): JavaContext {
    return Object.assign({}, old, update);
  }

  public importStatement(importStatement: ImportStatement): OTree {
    const namespace = this.lookupModuleNamespace(importStatement.packageName);
    if (importStatement.imports.import === 'full') {
      return new OTree([`import ${namespace}.*;`], [], { canBreakLine: true });
    }
    return new OTree(
      [],
      importStatement.imports.elements.map(importEl => `import ${namespace}.${importEl.sourceName};`),
      { canBreakLine: true, separator: '\n' },
    );
  }

  /*
   * Because structs are represented in Java as interfaces with a JsiiProxy implementation,
   * do not render struct interfaces in Java snippets - same as we do in Python.
   */
  public structInterfaceDeclaration(_node: ts.InterfaceDeclaration, _renderer: JavaRenderer): OTree {
    return NO_SYNTAX;
  }

  public classDeclaration(node: ts.ClassDeclaration, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        'public ',
        'class ',
        renderer.convert(node.name),
        ...this.typeHeritage(node, renderer.updateContext({ ignorePropertyPrefix: true })),
        ' {',
      ],
      renderer
        .updateContext({ insideTypeDeclaration: { typeName: node.name } })
        .convertAll(node.members),
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
  }

  public propertyDeclaration(node: ts.PropertyDeclaration, renderer: JavaRenderer): OTree {
    const vis = visibility(node);

    return new OTree(
      [
        vis,
        isReadOnly(node) ? ' final' : '',
        ' ',
        this.renderTypeNode(node.type, renderer, 'Object'),
        ' ',
        renderer.convert(node.name),
        ';',
      ],
      [],
      {
        canBreakLine: true,
      },
    );
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, renderer: JavaRenderer): OTree {
    return this.renderProcedure(node, renderer,
      renderer.currentContext.insideTypeDeclaration!.typeName,
      undefined);
  }

  public methodDeclaration(node: ts.MethodDeclaration, renderer: JavaRenderer): OTree {
    return this.renderProcedure(node, renderer,
      node.name,
      this.renderTypeNode(node.type, renderer, 'void'));
  }

  public functionDeclaration(node: ts.FunctionDeclaration, renderer: JavaRenderer): OTree {
    return this.renderProcedure(node, renderer,
      node.name,
      this.renderTypeNode(node.type, renderer, 'void'));
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: JavaRenderer): OTree {
    return new OTree([
      this.renderTypeNode(node.type, renderer),
      ' ',
      renderer.convert(node.name),
    ]);
  }

  public block(node: ts.Block, renderer: JavaRenderer): OTree {
    return this.renderBlock(renderer.convertAll(node.statements));
  }

  public variableDeclaration(node: ts.VariableDeclaration, renderer: JavaRenderer): OTree {
    const type = (node.type && renderer.typeOfType(node.type))
        || (node.initializer && renderer.typeOfExpression(node.initializer));

    const renderedType = type ? this.renderType(node, type, renderer, 'Object') : 'Object';

    return new OTree(
      [
        renderedType,
        ' ',
        renderer.convert(node.name),
        ' = ',
        renderer.convert(node.initializer),
        ';'
      ],
      [],
      {
        canBreakLine: true,
      }
    );
  }

  public expressionStatement(node: ts.ExpressionStatement, renderer: JavaRenderer): OTree {
    const inner = renderer.convert(node.expression);
    return inner.isEmpty
      ? inner
      : new OTree([inner, ';'], [], { canBreakLine: true });
  }

  public ifStatement(node: ts.IfStatement, renderer: JavaRenderer): OTree {
    const ifStmt = new OTree(
      [
        'if (',
        renderer.convert(node.expression),
        ') ',
      ],
      [
        renderer.convert(node.thenStatement),
      ],
      {
        canBreakLine: true,
      },
    );
    const elseStmt = node.elseStatement
      ? new OTree(['else '], [renderer.convert(node.elseStatement)], { canBreakLine: true })
      : undefined;

    return elseStmt
      ? new OTree(
        [],
        [ifStmt, elseStmt],
        {
          separator: ' ',
          canBreakLine: true,
        },
      )
      : ifStmt;
  }

  public forOfStatement(node: ts.ForOfStatement, renderer: JavaRenderer): OTree {
    // This is what a "for (const x of ...)" looks like in the AST
    let variableName = '???';

    matchAst(node.initializer,
      nodeOfType(ts.SyntaxKind.VariableDeclarationList,
        nodeOfType('var', ts.SyntaxKind.VariableDeclaration)),
      bindings => {
        variableName = renderer.textOf(bindings.var.name);
      });

    return new OTree(
      [
        'for (Object ',
        variableName,
        ' : ',
        renderer.convert(node.expression),
        ') ',
      ],
      [
        renderer.convert(node.statement),
      ],
      {
        canBreakLine: true,
      },
    );
  }

  public printStatement(args: ts.NodeArray<ts.Expression>, renderer: JavaRenderer) {
    return new OTree(
      [
        'System.out.println(',
        args.length === 1
          ? renderer.convert(args[0])
          : new OTree([], ['""', ...renderer.convertAll(args)], { separator: ' + ' }),
        ')',
      ],
    );
  }

  public templateExpression(node: ts.TemplateExpression, renderer: JavaRenderer): OTree {
    const result = new Array<string>();
    let first = true;

    if (node.head.rawText) {
      result.push(`"${quoteStringLiteral(node.head.rawText)}"`);
      first = false;
    }

    for (const span of node.templateSpans) {
      result.push(`${first ? '' : ' + '}${renderer.textOf(span.expression)}`);
      first = false;
      if (span.literal.rawText) {
        result.push(` + "${quoteStringLiteral(span.literal.rawText)}"`);
      }
    }

    return new OTree(result);
  }

  public newExpression(node: ts.NewExpression, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        'new ',
        renderer.updateContext({
          ignorePropertyPrefix: true,
          convertPropertyToGetter: false,
        }).convert(node.expression),
        '(',
        this.argumentList(node.arguments, renderer),
        ')',
      ],
      [],
      {
        canBreakLine: true,
      },
    );
  }

  public regularCallExpression(node: ts.CallExpression, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        renderer.updateContext({ convertPropertyToGetter: false }).convert(node.expression),
        '(',
        this.argumentList(node.arguments, renderer),
        ')',
      ],
    );
  }

  public asExpression(node: ts.AsExpression, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        '(',
        this.renderTypeNode(node.type, renderer, 'Object'),
        ')',
        renderer.convert(node.expression),
      ],
    );
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        'asList('
      ],
      renderer.convertAll(node.elements),
      {
        separator: ', ',
        suffix: ')',
        indent: 4,
      },
    );
  }

  public knownStructObjectLiteralExpression(node: ts.ObjectLiteralExpression, structType: ts.Type, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        structType.symbol.name,
        '.builder()',
      ],
      [
        ...renderer.convertAll(node.properties),
        new OTree([renderer.mirrorNewlineBefore(node.properties[0])], ['.build()']),
      ],
      {
        indent: 8,
      },
    );
  }

  public unknownTypeObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: JavaRenderer): OTree {
    return this.keyValueObjectLiteralExpression(node, undefined, renderer);
  }

  public keyValueObjectLiteralExpression(node: ts.ObjectLiteralExpression, _valueType: ts.Type | undefined, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        'Map.of(',
      ],
      renderer.updateContext({ inKeyValueList: true }).convertAll(node.properties),
      {
        suffix: ')',
        separator: ', ',
        indent: 8,
      },
    );
  }

  public propertyAssignment(node: ts.PropertyAssignment, renderer: JavaRenderer): OTree {
    return renderer.currentContext.inKeyValueList
      ? this.propertyAssignmentInMap(node, renderer)
      : this.propertyAssignmentInBuilder(node, renderer);
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, renderer: JavaRenderer): OTree {
    const rightHandSide = renderer.convert(node.name);
    let parts: Array<OTree | string | undefined>;

    if (renderer.currentContext.ignorePropertyPrefix) {
      // ignore al prefixes when resolving properties
      // only used for type names, in things like
      // 'MyClass extends cdk.Construct'
      // and 'new' expressions
      parts = [rightHandSide];
    } else {
      const leftHandSide = renderer.textOf(node.expression);
      if (leftHandSide === 'this') {
        // for 'this', assume this is a field, and access it directly
        parts = ['this', '.', rightHandSide];
      } else {
        // add a 'get' prefix to the property name, and change the access to a method call, if required
        const renderedRightHandSide = renderer.currentContext.convertPropertyToGetter === false
          ? rightHandSide
          : `get${capitalize(node.name.text)}()`;
        // strip any trailing ! from the left-hand side, as they're not meaningful in Java
        parts = [stripTrailingBang(leftHandSide), '.', renderedRightHandSide];
      }
    }

    return new OTree(parts);
  }

  public stringLiteral(node: ts.StringLiteral, renderer: JavaRenderer): OTree {
    return renderer.currentContext.stringLiteralAsIdentifier
      ? this.identifier(node, renderer)
      : super.stringLiteral(node, renderer);
  }

  public identifier(node: ts.Identifier | ts.StringLiteral, renderer: JavaRenderer): OTree {
    const nodeText = node.text;
    return new OTree([
      renderer.currentContext.identifierAsString ? JSON.stringify(nodeText) : nodeText,
    ]);
  }

  private propertyAssignmentInMap(node: ts.PropertyAssignment, renderer: JavaRenderer): OTree {
    return new OTree(
      [],
      [
        renderer.updateContext({ identifierAsString: true }).convert(node.name),
        ', ',
        renderer.updateContext({ inKeyValueList: false }).convert(node.initializer),
      ],
      {
        canBreakLine: true,
      },
    );
  }

  private propertyAssignmentInBuilder(node: ts.PropertyAssignment, renderer: JavaRenderer): OTree {
    return new OTree(
      [],
      [
        '.',
        renderer.updateContext({ stringLiteralAsIdentifier: true }).convert(node.name),
        '(',
        renderer.convert(node.initializer),
        ')',
      ],
      {
        canBreakLine: true,
      },
    );
  }

  private lookupModuleNamespace(packageName: string): string {
    // get the Java package name from the referenced package (if available)
    const resolvedNamespace = jsiiTargetParam(packageName, 'java.package');

    // return that or some default-derived module name representation
    return resolvedNamespace ||
      packageName.split(/[^a-zA-Z0-9]+/g)
        .filter(s => s !== '')
        .join('.');
  }

  private typeHeritage(node: ts.ClassDeclaration, renderer: JavaRenderer): Array<OTree | string | undefined> {
    return [
      ...this.extractSuperTypes(node, renderer, ts.SyntaxKind.ExtendsKeyword, 'extends'),
      ...this.extractSuperTypes(node, renderer, ts.SyntaxKind.ImplementsKeyword, 'implements'),
    ];
  }

  private extractSuperTypes(
    node: ts.ClassDeclaration,
    renderer: JavaRenderer,
    heritageKeyword: ts.SyntaxKind,
    outputKeyword: string): Array<OTree | string | undefined> {
    const heritageClause = (node.heritageClauses || [])
      .find(hc => hc.token === heritageKeyword);
    const superTypes = heritageClause
      ? heritageClause.types.map(t => renderer.convert(t.expression))
      : [];
    return superTypes.length > 0
      ? [
        ` ${outputKeyword} `,
        new OTree([], superTypes, { separator: ', ' }),
      ]
      : [];
  }

  private renderTypeNode(typeNode: ts.TypeNode | undefined, renderer: JavaRenderer, fallback?: string): string {
    fallback = fallback || (typeNode
      ? lastElement(renderer.textOf(typeNode).split('.')) // remove any namespace prefixes
      : 'Object');

    if (!typeNode) {
      return fallback;
    }

    const type = renderer.typeOfType(typeNode);

    // this means the snippet didn't have enough info for the TypeScript compiler to figure out the type -
    // so, just render the fallback
    if ((type as any).intrinsicName === 'error') {
      return fallback;
    }

    return this.renderType(typeNode, type, renderer, fallback);
  }

  private renderType(owningNode: ts.Node, type: ts.Type, renderer: JavaRenderer, fallback: string): string {
    const nonUnionType = typeWithoutUndefinedUnion(type);
    if (!nonUnionType) {
      renderer.report(owningNode, 'Type unions in examples are not supported');
      return fallback;
    }

    const mapValuesType = mapElementType(nonUnionType, renderer);
    if (mapValuesType) {
      return `Map<String, ${this.renderType(owningNode, mapValuesType, renderer, 'Object')}>`;
    }

    // User-defined or aliased type
    if (type.aliasSymbol) {
      return type.aliasSymbol.name;
    }
    if (type.symbol) {
      return type.symbol.name;
    }

    const typeScriptBuiltInType = builtInTypeName(nonUnionType);
    if (!typeScriptBuiltInType) {
      return fallback;
    }

    switch (typeScriptBuiltInType) {
      case 'string':
        return 'String';
      case 'number':
        return 'int';
      case 'any':
        return 'Object';
      default:
        return typeScriptBuiltInType;
    }
  }

  private renderProcedure(
    node: ts.ConstructorDeclaration | ts.MethodDeclaration | ts.FunctionDeclaration,
    renderer: JavaRenderer,
    methodOrConstructorName: ts.Node | undefined,
    returnType: string | undefined): OTree {

    const overloads = new Array<OTree>();
    for (let i = 0 ; i < node.parameters.length; i++) {
      const param = node.parameters[i];
      if (!!param.questionToken || !!param.initializer) {
        // The parameter is either optional, or has a default -
        // render an overload that delegates to a version with one more parameter.
        // Note that we don't check that all parameters with indexes > i are also optional/have a default -
        // we assume the TypeScript compiler does that for us.

        // parameters up to but excluding the current one
        const parametersUpToIth = node.parameters.slice(0, i);
        // how should the call to the next overload look
        const callExpr = ts.isConstructorDeclaration(node)
          ? 'this'
          : renderer.convert(methodOrConstructorName);

        overloads.push(this.renderOverload(
          returnType, renderer, methodOrConstructorName,
          parametersUpToIth,
          // the body is the call to the next overload
          this.renderBlock([new OTree(
            [
              '\n',
              callExpr,
              '(',
            ],
            [
              ...parametersUpToIth.map(param => renderer.convert(param.name)),
              param.initializer ? renderer.convert(param.initializer) : 'null',
            ],
            {
              separator: ', ',
              suffix: ');',
            },
          )]),
        ));
      }
    }
    // render the primary overload
    overloads.push(this.renderOverload(
      returnType, renderer, methodOrConstructorName,
      node.parameters,
      renderer.convert(node.body),
    ));

    return new OTree(
      [],
      overloads,
      {
        canBreakLine: true,
        separator: '\n\n',
      },
    );
  }

  private renderOverload(
    returnType: string | undefined,
    renderer: JavaRenderer,
    methodOrConstructorName: ts.Node | undefined,
    parameters: ts.ParameterDeclaration[] | ts.NodeArray<ts.ParameterDeclaration>,
    body: OTree): OTree {

    return new OTree(
      [
        'public ',
        returnType ? `${returnType} ` : undefined,
        renderer.convert(methodOrConstructorName),
        '(',
        new OTree([], renderer.convertAll(parameters), { separator: ', ' }),
        ') ',
      ],
      [
        body,
      ],
      {
        canBreakLine: true
      },
    );
  }

  private renderBlock(blockContents: OTree[]) {
    return new OTree(
      [
        '{',
      ],
      blockContents,
      {
        indent: 4,
        suffix: '\n}',
      },
    );
  }
}

function stripTrailingBang(str: string): string {
  return str.replace(/!+$/, '');
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lastElement(strings: string[]): string {
  return strings[strings.length - 1];
}
