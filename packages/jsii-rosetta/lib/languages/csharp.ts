import ts = require('typescript');
import { DefaultVisitor } from './default';
import { AstRenderer } from '../renderer';
import { OTree } from '../o-tree';

interface CSharpLanguageContext {
  readonly dummy?: boolean;
}

type CSharpVisitorContext = AstRenderer<CSharpLanguageContext>;

export class CSharpVisitor extends DefaultVisitor<CSharpLanguageContext> {
  readonly defaultContext = {};

  public mergeContext(old: CSharpLanguageContext, update: CSharpLanguageContext): CSharpLanguageContext {
    return Object.assign({}, old, update);
  }

  public classDeclaration(node: ts.ClassDeclaration, context: CSharpVisitorContext): OTree {
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
