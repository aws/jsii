import ts = require('typescript');
import { DefaultVisitor } from './default';
import { AstRenderer } from '../renderer';
import { OTree } from '../o-tree';

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
      [],
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
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
}
