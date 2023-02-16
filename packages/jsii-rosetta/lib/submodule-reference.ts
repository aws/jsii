import * as ts from 'typescript';

export type SubmoduleReferenceMap = ReadonlyMap<
  ts.PropertyAccessExpression | ts.LeftHandSideExpression | ts.Identifier | ts.PrivateIdentifier,
  SubmoduleReference
>;

export class SubmoduleReference {
  public static inSourceFile(sourceFile: ts.SourceFile, typeChecker: ts.TypeChecker): SubmoduleReferenceMap {
    const importDeclarations = sourceFile.statements
      .filter((stmt) => ts.isImportDeclaration(stmt))
      .flatMap((stmt) => importedSymbolsFrom(stmt as ts.ImportDeclaration, sourceFile, typeChecker));

    return SubmoduleReference.inNode(sourceFile, typeChecker, new Set(importDeclarations));
  }

  private static inNode(
    node: ts.Node,
    typeChecker: ts.TypeChecker,
    importDeclarations: ReadonlySet<ts.Symbol>,
    map = new Map<
      ts.PropertyAccessExpression | ts.LeftHandSideExpression | ts.Identifier | ts.PrivateIdentifier,
      SubmoduleReference
    >(),
  ): Map<
    ts.PropertyAccessExpression | ts.LeftHandSideExpression | ts.Identifier | ts.PrivateIdentifier,
    SubmoduleReference
  > {
    if (ts.isPropertyAccessExpression(node)) {
      const [head, ...tail] = propertyPath(node);
      const symbol = typeChecker.getSymbolAtLocation(head.name);
      if (symbol && importDeclarations.has(symbol)) {
        // This is a reference within an imported namespace, so we need to record that...
        const firstNonNamespace = tail.findIndex((item) => !isLikelyNamespace(item.name, typeChecker));
        if (firstNonNamespace < 0) {
          map.set(node.expression, new SubmoduleReference(symbol, node.expression, []));
        } else {
          const tailEnd = tail[firstNonNamespace].expression;
          const path = tail.slice(0, firstNonNamespace).map((item) => item.name);
          map.set(tailEnd, new SubmoduleReference(symbol, tailEnd, path));
        }
      }

      return map;
    }

    // Faster than ||-ing a bung of if statements to avoid traversing uninteresting nodes...
    switch (node.kind) {
      case ts.SyntaxKind.ImportDeclaration:
      case ts.SyntaxKind.ExportDeclaration:
        break;
      default:
        for (const child of node.getChildren()) {
          map = SubmoduleReference.inNode(child, typeChecker, importDeclarations, map);
        }
    }

    return map;
  }

  private constructor(
    public readonly root: ts.Symbol,
    public readonly submoduleChain: ts.LeftHandSideExpression | ts.Identifier | ts.PrivateIdentifier,
    public readonly path: readonly ts.Node[],
  ) {}

  public get lastNode(): ts.Node {
    if (this.path.length === 0) {
      const node = this.root.valueDeclaration ?? this.root.declarations[0];
      return ts.isNamespaceImport(node) || ts.isImportSpecifier(node) ? node.name : node;
    }
    return this.path[this.path.length - 1];
  }

  public toString(): string {
    return `${this.constructor.name}<root=${this.root.name}, path=${JSON.stringify(
      this.path.map((item) => item.getText(item.getSourceFile())),
    )}>`;
  }
}

/**
 * Determines what symbols are imported by the given TypeScript import
 * delcaration, in the context of the specified file, using the provided type
 * checker.
 *
 * @param decl        an import declaration.
 * @param sourceFile  the source file that contains the import declaration.
 * @param typeChecker a TypeChecker instance valid for the provided source file.
 *
 * @returns the (possibly empty) list of symbols imported by this declaration.
 */
function importedSymbolsFrom(
  decl: ts.ImportDeclaration,
  sourceFile: ts.SourceFile,
  typeChecker: ts.TypeChecker,
): ts.Symbol[] {
  const { importClause } = decl;

  if (importClause == null) {
    // This is a "for side effects" import, which isn't relevant for our business here...
    return [];
  }

  const { name, namedBindings } = importClause;
  const imports = new Array<ts.Symbol>();

  if (name != null) {
    const symbol = typeChecker.getSymbolAtLocation(name);
    if (symbol == null) {
      throw new Error(`No symbol was defined for node ${name.getText(sourceFile)}`);
    }
    imports.push(symbol);
  }
  if (namedBindings != null) {
    if (ts.isNamespaceImport(namedBindings)) {
      const { name } = namedBindings;
      const symbol = typeChecker.getSymbolAtLocation(name);
      if (symbol == null) {
        throw new Error(`No symbol was defined for node ${name.getText(sourceFile)}`);
      }
      imports.push(symbol);
    } else {
      for (const specifier of namedBindings.elements) {
        const { name } = specifier;
        const symbol = typeChecker.getSymbolAtLocation(name);
        if (symbol == null) {
          throw new Error(`No symbol was defined for node ${name.getText(sourceFile)}`);
        }
        imports.push(symbol);
      }
    }
  }

  return imports;
}

interface PathEntry {
  readonly name: ts.Identifier | ts.PrivateIdentifier | ts.LeftHandSideExpression;
  readonly expression: ts.LeftHandSideExpression;
}

function propertyPath(node: ts.PropertyAccessExpression): readonly PathEntry[] {
  const { expression, name } = node;
  if (!ts.isPropertyAccessExpression(expression)) {
    return [
      { name: expression, expression },
      { name, expression },
    ];
  }
  return [...propertyPath(expression), { name, expression }];
}

/**
 * A heuristic to determine whether the provided node likely refers to some
 * namespace.
 *
 * @param node        the node to be checked.
 * @param typeChecker a type checker that can obtain symbols for this node.
 *
 * @returns true if the node likely refers to a namespace name.
 */
function isLikelyNamespace(node: ts.Node, typeChecker: ts.TypeChecker): boolean {
  if (!ts.isIdentifier(node)) {
    return false;
  }

  // If the identifier was bound to a symbol, we can inspect the declarations of
  // it to validate they are all module or namespace declarations.
  const symbol = typeChecker.getSymbolAtLocation(node);
  if (symbol != null) {
    return (
      symbol.declarations.length > 0 &&
      symbol.declarations.every(
        (decl) => ts.isModuleDeclaration(decl) || ts.isNamespaceExport(decl) || ts.isNamespaceImport(decl),
      )
    );
  }

  // We understand this is likely a namespace if the name does not start with
  // upper-case letter.
  return !startsWithUpperCase(node.text);
}

function startsWithUpperCase(text: string): boolean {
  return text.length > 0 && text[0] === text[0].toUpperCase();
}
