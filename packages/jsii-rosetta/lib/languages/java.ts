import ts = require('typescript');
import { DefaultVisitor } from './default';
import { AstRenderer } from '../renderer';
import { OTree } from '../o-tree';
import { builtInTypeName } from '../typescript/types';

interface JavaContext {
  readonly dummy?: boolean;
}

type JavaRenderer = AstRenderer<JavaContext>;

export class JavaVisitor extends DefaultVisitor<JavaContext> {
  readonly defaultContext = {};

  public mergeContext(old: JavaContext, update: Partial<JavaContext>): JavaContext {
    return Object.assign({}, old, update);
  }

  public classDeclaration(node: ts.ClassDeclaration, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        'public ',
        'class ',
        renderer.convert(node.name),
        ...this.typeHeritage(node, renderer),
        ' {',
      ],
      renderer.convertAll(node.members),
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
  }

  public methodDeclaration(node: ts.MethodDeclaration, renderer: JavaRenderer): OTree {
    const methodName = renderer.convert(node.name);
    const returnType = this.renderTypeNode(node.type, renderer);

    return new OTree(
      [
        'public ',
        returnType,
        ' ',
        methodName,
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

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: JavaRenderer): OTree {
    return new OTree([
      this.renderTypeNode(node.type, renderer),
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

  public printStatement(args: ts.NodeArray<ts.Expression>, renderer: JavaRenderer) {
    return new OTree([
      'System.out.println(',
      ...(renderer.convertAll(args)),
      ');',
    ]);
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, renderer: JavaRenderer): OTree {
    return renderer.convert(node.name);
  }

  private typeHeritage(node: ts.ClassDeclaration, renderer: JavaRenderer): Array<OTree | string | undefined> {
    return [
        ...this.extractSuperTypes(node, renderer, ts.SyntaxKind.ExtendsKeyword, 'extends'),
        ...this.extractSuperTypes(node, renderer, ts.SyntaxKind.ImplementsKeyword, 'implements'),
    ];
  }

  private extractSuperTypes(node: ts.ClassDeclaration, renderer: JavaRenderer, heritageKeyword: ts.SyntaxKind, outputKeyword: string): Array<OTree | string | undefined> {
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

  private renderTypeNode(typeNode: ts.TypeNode | undefined, renderer: JavaRenderer): string {
    if (!typeNode) {
      return 'void';
    }

    const type = renderer.typeOfType(typeNode);

    const typeScriptBuiltInType = builtInTypeName(type);
    if (!typeScriptBuiltInType) {
      return '???';
    }

    switch (typeScriptBuiltInType) {
      case 'string': return 'String';
      default: return typeScriptBuiltInType;
    }
  }
}
