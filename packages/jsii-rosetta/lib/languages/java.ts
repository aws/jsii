import ts = require('typescript');
import { DefaultVisitor } from './default';
import { AstRenderer } from '../renderer';
import { OTree } from '../o-tree';
import { builtInTypeName } from '../typescript/types';
import { isReadOnly, matchAst, nodeOfType, quoteStringLiteral, visibility } from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import { jsiiTargetParam } from '../jsii/packages';

interface JavaContext {
  /** @default false */
  readonly ignorePropertyPrefix?: boolean;

  /** @default true */
  readonly convertPropertyToGetter?: boolean;

  readonly insideTypeDeclaration?: InsideTypeDeclaration;
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
    return this.methodOrConstructor(node, renderer,
      renderer.currentContext.insideTypeDeclaration!.typeName,
      undefined);
  }

  public methodDeclaration(node: ts.MethodDeclaration, renderer: JavaRenderer): OTree {
    return this.methodOrConstructor(node, renderer,
      node.name,
      this.renderTypeNode(node.type, renderer, 'void'));
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: JavaRenderer): OTree {
    return new OTree([
      this.renderTypeNode(node.type, renderer, 'Object'),
      ' ',
      renderer.convert(node.name),
    ]);
  }

  public block(node: ts.Block, renderer: JavaRenderer): OTree {
    return new OTree(['{'], renderer.convertAll(node.statements), {
      indent: 4,
      suffix: '\n}',
    });
  }

  public variableDeclaration(node: ts.VariableDeclaration, renderer: JavaRenderer): OTree {
    const type = (node.type && renderer.typeOfType(node.type))
        || (node.initializer && renderer.typeOfExpression(node.initializer));

    const renderedType = type ? this.renderType(type, 'Object') : 'Object';

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
    return new OTree([
      'System.out.println(',
      ...renderer.convertAll(args),
      ')',
    ]);
  }

  public templateExpression(node: ts.TemplateExpression, context: JavaRenderer): OTree {
    const result = new Array<string>();
    let first = true;

    if (node.head.rawText) {
      result.push(`"${quoteStringLiteral(node.head.rawText)}"`);
      first = false;
    }

    for (const span of node.templateSpans) {
      result.push(`${first ? '' : ' + '}${context.textOf(span.expression)}`);
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

  private renderTypeNode(typeNode: ts.TypeNode | undefined, renderer: JavaRenderer, fallback: string): string {
    if (!typeNode) {
      return fallback;
    }

    return this.renderType(renderer.typeOfType(typeNode), fallback);
  }

  private renderType(type: ts.Type, fallback: string) {
    const typeScriptBuiltInType = builtInTypeName(type);
    if (!typeScriptBuiltInType) {
      return fallback;
    }

    switch (typeScriptBuiltInType) {
      case 'string':
        return 'String';
      case 'any':
        return 'Object';
      default:
        return typeScriptBuiltInType;
    }
  }

  private methodOrConstructor(
    node: ts.ConstructorDeclaration | ts.MethodDeclaration,
    renderer: JavaRenderer,
    methodOrConstructorName: ts.Node | undefined,
    returnType: string | undefined): OTree {
    return new OTree(
      [
        'public ',
        returnType ? `${returnType} ` : undefined,
        renderer.convert(methodOrConstructorName),
        '(',
        new OTree([], renderer.convertAll(node.parameters), { separator: ', ' }),
        ') ',
      ],
      [
        renderer.convert(node.body)
      ],
      {
        canBreakLine: true
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
