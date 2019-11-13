import ts = require('typescript');
import { DefaultVisitor } from './default';
import { AstRenderer } from '../renderer';
import { OTree } from '../o-tree';

interface JavaLanguageContext {
  readonly dummy?: boolean;
}

type JavaVisitorContext = AstRenderer<JavaLanguageContext>;

export class JavaVisitor extends DefaultVisitor<JavaLanguageContext> {
  readonly defaultContext = {};

  public mergeContext(old: JavaLanguageContext, update: JavaLanguageContext): JavaLanguageContext {
    return Object.assign({}, old, update);
  }

  public classDeclaration(node: ts.ClassDeclaration, context: JavaVisitorContext): OTree {
    return new OTree(
      [
        'public ',
        'class ',
        node.name ? context.textOf(node.name) : '???',
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
