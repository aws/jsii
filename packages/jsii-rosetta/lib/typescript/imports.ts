import * as ts from 'typescript';

import { hasAnyFlag, jsiiFqnFromSymbol } from '../jsii/jsii-utils';
import { AstRenderer } from '../renderer';
import { allOfType, matchAst, nodeOfType, stringFromLiteral } from './ast-utils';

/**
 * Our own unification of import statements
 */
export interface ImportStatement {
  readonly node: ts.Node;
  readonly packageName: string;
  readonly imports: FullImport | SelectiveImport;
}

export type FullImport = { readonly import: 'full'; readonly alias: string };
export type SelectiveImport = {
  readonly import: 'selective';
  readonly elements: ImportBinding[];
};

export interface ImportBinding {
  readonly sourceName: string;

  readonly alias?: string;

  /**
   * The FQN of the thing the import refers to
   */
  readonly importedFqn?: string;

  /**
   * Whether the import binding refers to a submodule or not
   */
  readonly isSubmodule: boolean;
}

export function analyzeImportEquals(node: ts.ImportEqualsDeclaration, context: AstRenderer<any>): ImportStatement {
  let moduleName = '???';
  matchAst(node.moduleReference, nodeOfType('ref', ts.SyntaxKind.ExternalModuleReference), (bindings) => {
    moduleName = stringFromLiteral(bindings.ref.expression);
  });

  return {
    node,
    packageName: moduleName,
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
            ...analyzeJsiiImport(context.typeChecker, spec.propertyName),
            sourceName: context.textOf(spec.propertyName),
            alias: context.textOf(spec.name),
          } as ImportBinding;
        }

        return {
          ...analyzeJsiiImport(context.typeChecker, spec.name),
          sourceName: context.textOf(spec.name),
        };
      }),
    );
  }

  return {
    node,
    packageName,
    imports: { import: 'selective', elements },
  };
}

/**
 * Whether or not the given identifier references a submodule in the package we're importing it from
 *
 * This only applies to `import { x [as y] } from '...'` statements. In the case of `import * as x` statements,
 * we are ALWAYS referencing a module.
 *
 * It seems that we get this information in the following way:
 *
 * - If the symbol `x` refers to a class (or something else), TypeScript will say it's a class or
 *   something else.
 * - Otherwise, TyepScript will say the symbol `x` is an `Alias` (defined here).
 * - We resolve the alias to end up with something that's a `ValueModule`.
 */
function analyzeJsiiImport(typeChecker: ts.TypeChecker, node: ts.Node): { isSubmodule: boolean; importedFqn?: string } {
  const sym = typeChecker.getSymbolAtLocation(node);
  if (!sym) {
    return { isSubmodule: false };
  }
  if (!hasAnyFlag(sym.flags, ts.SymbolFlags.Alias)) {
    return {
      importedFqn: jsiiFqnFromSymbol(typeChecker, sym),
      isSubmodule: false,
    };
  }
  const resolved = typeChecker.getAliasedSymbol(sym);
  return {
    importedFqn: jsiiFqnFromSymbol(typeChecker, resolved),
    isSubmodule: hasAnyFlag(resolved.flags, ts.SymbolFlags.ValueModule),
  };
}
