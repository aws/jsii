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
        node.name ? renderer.textOf(node.name) : '???',
        // hasHeritage ? '(' : '',
        // ...heritage,
        // hasHeritage ? ')' : '',
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
}
