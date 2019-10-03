import ts = require('typescript');
import { AstConverter } from '../converter';
import { allOfType, matchAst, nodeOfType, stringFromLiteral } from "./ast-utils";

/**
 * Our own unification of import statements
 */
export interface ImportStatement {
  node: ts.Node;
  packageName: string;
  imports: FullImport | SelectiveImport;
}

export type FullImport =  { import: 'full', alias: string };
export type SelectiveImport =  { import: 'selective', elements: ImportBinding[] };

export interface ImportBinding {
  sourceName: string;
  alias?: string;
}

export function analyzeImportEquals(node: ts.ImportEqualsDeclaration, context: AstConverter<any>): ImportStatement {
  let moduleName = '???';
  matchAst(node.moduleReference,
    nodeOfType('ref', ts.SyntaxKind.ExternalModuleReference),
    bindings => {
      moduleName = stringFromLiteral(bindings.ref.expression);
    });

  return {
    node,
    packageName: moduleName,
    imports: { import: 'full', alias: context.textOf(node.name) }
  };
}

export function analyzeImportDeclaration(node: ts.ImportDeclaration, context: AstConverter<any>): ImportStatement {
  const packageName = stringFromLiteral(node.moduleSpecifier);

  const starBindings = matchAst(node,
    nodeOfType(ts.SyntaxKind.ImportDeclaration,
      nodeOfType(ts.SyntaxKind.ImportClause,
        nodeOfType('namespace', ts.SyntaxKind.NamespaceImport))));

  if (starBindings) {
    return {
      node,
      packageName,
      imports: { import: 'full', alias: context.textOf(starBindings.namespace.name) }
    };
  }

  const namedBindings = matchAst(node,
    nodeOfType(ts.SyntaxKind.ImportDeclaration,
      nodeOfType(ts.SyntaxKind.ImportClause,
        nodeOfType(ts.SyntaxKind.NamedImports,
          allOfType(ts.SyntaxKind.ImportSpecifier, 'specifiers')))));

  const elements: ImportBinding[] = [];
  if (namedBindings) {
    elements.push(...namedBindings.specifiers.map(spec => (
    // regular import { name }, renamed import { propertyName, name }
    spec.propertyName ? {
      sourceName: context.textOf(spec.propertyName),
      alias: spec.name ? context.textOf(spec.name) : '???'
    } : {
      sourceName: spec.name ? context.textOf(spec.name) : '???'
    })));
  }

  return {
    node,
    packageName,
    imports: { import: 'selective', elements }
  };
}