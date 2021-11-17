import * as ts from 'typescript';

import { JsiiSymbol, parentSymbol, lookupJsiiSymbolFromNode } from '../jsii/jsii-utils';
import { AstRenderer } from '../renderer';
import { fmap } from '../util';
import { allOfType, matchAst, nodeOfType, stringFromLiteral } from './ast-utils';

/**
 * Our own unification of import statements
 */
export interface ImportStatement {
  readonly node: ts.Node;
  readonly packageName: string;
  readonly imports: FullImport | SelectiveImport;
  readonly moduleSymbol?: JsiiSymbol;
}

export type FullImport = {
  readonly import: 'full';
  readonly alias: string;
};

export type SelectiveImport = {
  readonly import: 'selective';
  readonly elements: ImportBinding[];
};

export interface ImportBinding {
  readonly sourceName: string;

  readonly alias?: string;

  /**
   * The JSII Symbol the import refers to
   */
  readonly importedSymbol?: JsiiSymbol;
}

export function analyzeImportEquals(node: ts.ImportEqualsDeclaration, context: AstRenderer<any>): ImportStatement {
  let moduleName = '???';
  matchAst(node.moduleReference, nodeOfType('ref', ts.SyntaxKind.ExternalModuleReference), (bindings) => {
    moduleName = stringFromLiteral(bindings.ref.expression);
  });

  return {
    node,
    packageName: moduleName,
    moduleSymbol: lookupJsiiSymbolFromNode(context.typeChecker, node.name),
    imports: { import: 'full', alias: context.textOf(node.name) },
  };
}

export function analyzeImportDeclaration(node: ts.ImportDeclaration, context: AstRenderer<any>): ImportStatement {
  const packageName = stringFromLiteral(node.moduleSpecifier);

  const starBindings = matchAst(
    node,
    nodeOfType(
      ts.SyntaxKind.ImportDeclaration,
      nodeOfType(ts.SyntaxKind.ImportClause, nodeOfType('namespace', ts.SyntaxKind.NamespaceImport)),
    ),
  );

  if (starBindings) {
    return {
      node,
      packageName,
      moduleSymbol: lookupJsiiSymbolFromNode(context.typeChecker, starBindings.namespace.name),
      imports: {
        import: 'full',
        alias: context.textOf(starBindings.namespace.name),
      },
    };
  }

  const namedBindings = matchAst(
    node,
    nodeOfType(
      ts.SyntaxKind.ImportDeclaration,
      nodeOfType(
        ts.SyntaxKind.ImportClause,
        nodeOfType(ts.SyntaxKind.NamedImports, allOfType(ts.SyntaxKind.ImportSpecifier, 'specifiers')),
      ),
    ),
  );

  const elements: ImportBinding[] = [];
  if (namedBindings) {
    elements.push(
      ...namedBindings.specifiers.map((spec) => {
        // regular import { name }, renamed import { propertyName, name }
        if (spec.propertyName) {
          // Renamed import
          return {
            sourceName: context.textOf(spec.propertyName),
            alias: context.textOf(spec.name),
            importedSymbol: lookupJsiiSymbolFromNode(context.typeChecker, spec.propertyName),
          } as ImportBinding;
        }

        return {
          sourceName: context.textOf(spec.name),
          importedSymbol: lookupJsiiSymbolFromNode(context.typeChecker, spec.name),
        };
      }),
    );
  }

  return {
    node,
    packageName,
    imports: { import: 'selective', elements },
    moduleSymbol: fmap(elements?.[0]?.importedSymbol, parentSymbol),
  };
}
