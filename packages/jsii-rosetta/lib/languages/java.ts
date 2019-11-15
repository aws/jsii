import ts = require('typescript');
import { DefaultVisitor } from './default';
import { AstRenderer } from '../renderer';
import { OTree } from '../o-tree';
import { flat } from '../util';

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

  private typeHeritage(node: ts.ClassDeclaration, renderer: JavaRenderer): Array<OTree | string | undefined> {
    const supertypes = flat(
        Array.from(node.heritageClauses || []).map(h => Array.from(h.types))
    ).map(t => renderer.convert(t.expression));

    return supertypes.length > 0
        ? [
            ' extends ',
            new OTree(
                [],
                supertypes,
                {
                  separator: ', ',
                },
            ),
        ]
        : [];
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, renderer: JavaRenderer): OTree {
    return renderer.convert(node.name);
  }
}
