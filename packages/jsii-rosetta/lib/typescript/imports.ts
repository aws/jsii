import * as ts from 'typescript';

import { JsiiSymbol, parentSymbol, lookupJsiiSymbolFromNode } from '../jsii/jsii-utils';
import { AstRenderer } from '../renderer';
import { SubmoduleReferenceMap } from '../submodule-reference';
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
  /**
   * The name of the namespace prefix in the source code. Used to strip the
   * prefix in certain languages (e.g: Java).
   */
  readonly sourceName: string;
  /**
   * The name under which this module is imported. Undefined if the module is
   * not aliased (could be the case for namepsace/submodule imports).
   */
  readonly alias?: string;
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

  const sourceName = context.textOf(node.name);

  return {
    node,
    packageName: moduleName,
    moduleSymbol: lookupJsiiSymbolFromNode(context.typeChecker, node.name),
    imports: { import: 'full', alias: sourceName, sourceName },
  };
}

export function analyzeImportDeclaration(node: ts.ImportDeclaration, context: AstRenderer<any>): ImportStatement;
export function analyzeImportDeclaration(
  node: ts.ImportDeclaration,
  context: AstRenderer<any>,
  submoduleReferences: SubmoduleReferenceMap,
): ImportStatement[];
export function analyzeImportDeclaration(
  node: ts.ImportDeclaration,
  context: AstRenderer<any>,
  submoduleReferences?: SubmoduleReferenceMap,
): ImportStatement | ImportStatement[] {
  const packageName = stringFromLiteral(node.moduleSpecifier);

  const starBindings = matchAst(
    node,
    nodeOfType(
      ts.SyntaxKind.ImportDeclaration,
      nodeOfType(ts.SyntaxKind.ImportClause, nodeOfType('namespace', ts.SyntaxKind.NamespaceImport)),
    ),
  );

  if (starBindings) {
    const sourceName = context.textOf(starBindings.namespace.name);
    const bareImport: ImportStatement = {
      node,
      packageName,
      moduleSymbol: lookupJsiiSymbolFromNode(context.typeChecker, starBindings.namespace.name),
      imports: {
        import: 'full',
        alias: sourceName,
        sourceName,
      },
    };
    if (submoduleReferences == null) {
      return bareImport;
    }

    const rootSymbol = context.typeChecker.getSymbolAtLocation(starBindings.namespace.name);
    const refs = rootSymbol && Array.from(submoduleReferences.values()).filter((ref) => ref.root === rootSymbol);
    // No submodule reference, or only 1 where the path is empty (this is used to signal the use of the bare import so it's not erased)
    if (refs == null || refs.length === 0 || (refs.length === 1 && refs[0].path.length === 0)) {
      return [bareImport];
    }

    return refs.flatMap(({ lastNode, path, root, submoduleChain }, idx, array): ImportStatement[] => {
      if (
        array
          .slice(0, idx)
          .some(
            (other) => other.root === root && context.textOf(other.submoduleChain) === context.textOf(submoduleChain),
          )
      ) {
        // This would be a duplicate, so we're skipping it
        return [];
      }

      const moduleSymbol = lookupJsiiSymbolFromNode(context.typeChecker, lastNode);
      return [
        {
          node,
          packageName: [packageName, ...path.map((node) => context.textOf(node))].join('/'),
          moduleSymbol,
          imports: {
            import: 'full',
            alias: undefined, // No alias exists in the source text for this...
            sourceName: context.textOf(submoduleChain),
          },
        },
      ];
    });
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

  const extraImports = new Array<ImportStatement>();
  const elements: ImportBinding[] = (namedBindings?.specifiers ?? []).flatMap(
    ({ name, propertyName }): ImportBinding[] => {
      // regular import { name }
      // renamed import { propertyName as name }
      const directBinding = {
        sourceName: context.textOf(propertyName ?? name),
        alias: propertyName && context.textOf(name),
        importedSymbol: lookupJsiiSymbolFromNode(context.typeChecker, propertyName ?? name),
      } as const;

      if (submoduleReferences != null) {
        const symbol = context.typeChecker.getSymbolAtLocation(name);
        let omitDirectBinding = false;
        for (const match of Array.from(submoduleReferences.values()).filter((ref) => ref.root === symbol)) {
          if (match.path.length === 0) {
            // This is a namespace binding that is used as-is (not via a transitive path). It needs to be preserved.
            omitDirectBinding = false;
            continue;
          }
          const subPackageName = [packageName, ...match.path.map((node) => node.getText(node.getSourceFile()))].join(
            '/',
          );
          const importedSymbol = lookupJsiiSymbolFromNode(context.typeChecker, match.lastNode);
          const moduleSymbol = fmap(importedSymbol, parentSymbol);
          const importStatement =
            extraImports.find((stmt) => {
              if (moduleSymbol != null) {
                return stmt.moduleSymbol === moduleSymbol;
              }
              return stmt.packageName === subPackageName;
            }) ??
            extraImports[
              extraImports.push({
                moduleSymbol,
                node: match.lastNode,
                packageName: subPackageName,
                imports: { import: 'selective', elements: [] },
              }) - 1
            ];

          (importStatement.imports as SelectiveImport).elements.push({
            sourceName: context.textOf(match.submoduleChain),
            importedSymbol,
          });
        }
        if (omitDirectBinding) {
          return [];
        }
      }

      return [directBinding];
    },
  );

  if (submoduleReferences == null) {
    return {
      node,
      packageName,
      imports: { import: 'selective', elements },
      moduleSymbol: fmap(elements?.[0]?.importedSymbol, parentSymbol),
    };
  }

  return [
    {
      node,
      packageName,
      imports: { import: 'selective', elements },
      moduleSymbol: fmap(elements?.[0]?.importedSymbol, parentSymbol),
    },
    ...extraImports,
  ];
}
