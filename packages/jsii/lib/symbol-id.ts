import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

/**
 * Return a symbol identifier for the given symbol
 *
 * The symbol identifier identifies a TypeScript symbol in a source file inside
 * a package. We can use this to map between jsii entries in the manifest, and
 * entities in the TypeScript source code.
 *
 * Going via symbol id is the only way to identify symbols in submodules. Otherwise,
 * all the TypeScript compiler sees is:
 *
 * ```
 * /my/package/lib/source/directory/dist.js <containing> MyClass
 * ```
 *
 * And there's no way to figure out what submodule name
 * `lib/source/directory/dist` is exported as.
 *
 * The format of a symbol id is:
 *
 * ```
 * relative/source/file:Name.space.Class[#member]
 * ```
 *
 * We used to build this identifier ourselves. Turns out there was a built-in
 * way to get pretty much the same, by calling `typeChecker.getFullyQualifiedName()`.
 * Whoops ^_^ (this historical accident is why the format is similar to but
 * different from what the TS checker erturns).
 */
export function symbolIdentifier(
  typeChecker: ts.TypeChecker,
  sym: ts.Symbol,
): string | undefined {
  // If this symbol happens to be an alias, resolve it first
  while ((sym.flags & ts.SymbolFlags.Alias) !== 0) {
    sym = typeChecker.getAliasedSymbol(sym);
  }

  const tsName = typeChecker.getFullyQualifiedName(sym);
  // TypeScript fqn looks like "/path/to/file"[.name.in.file]
  const groups = /^"([^"]+)"(?:\.(.*))?$/.exec(tsName);
  if (!groups) {
    return undefined;
  }

  const [, fileName, typeName] = groups; // typeName may be absent

  const relFile = assemblyRelativeSourceFile(fileName);
  if (!relFile) {
    return undefined;
  }

  return `${relFile}:${typeName ?? ''}`;
}

function assemblyRelativeSourceFile(sourceFileName: string) {
  const packageJsonLocation = findPackageJsonLocation(
    path.dirname(sourceFileName),
  );

  if (!packageJsonLocation) {
    return undefined;
  }

  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonLocation).toString(),
  );

  const sourcePath = removePrefix(
    packageJson.jsii?.outdir ?? '',
    path.relative(path.dirname(packageJsonLocation), sourceFileName),
  );

  return sourcePath.replace(/(\.d)?\.ts$/, '');

  function findPackageJsonLocation(currentPath: string): string | undefined {
    const candidate = path.join(currentPath, 'package.json');
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const parentPath = path.resolve(currentPath, '..');
    return parentPath !== currentPath
      ? findPackageJsonLocation(parentPath)
      : undefined;
  }

  function removePrefix(prefix: string, filePath: string) {
    const prefixParts = prefix.split(/[/\\]/g);
    const pathParts = filePath.split(/[/\\]/g);
    let i = 0;
    while (prefixParts[i] === pathParts[i]) {
      i++;
    }
    return pathParts.slice(i).join('/');
  }
}
