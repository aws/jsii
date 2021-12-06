import { Assembly } from '@jsii/spec';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

/**
 * Additional options that may be provided to the symbolIdentifier.
 */
interface SymbolIdOptions {
  /**
   * The assembly that the symbol is found in.
   * This is used to provide the correct root directory
   * as specified in the assembly metadata. In turn,
   * the root directory is used to ensure that the
   * symbolId comes from source code and not compiled code.
   */
  readonly assembly: Assembly;
}

export function symbolIdentifier(
  typeChecker: ts.TypeChecker,
  sym: ts.Symbol,
  options?: SymbolIdOptions,
): string | undefined {
  // If this symbol happens to be an alias, resolve it first
  while ((sym.flags & ts.SymbolFlags.Alias) !== 0) {
    sym = typeChecker.getAliasedSymbol(sym);
  }

  const inFileNameParts: string[] = [];

  let decl: ts.Node | undefined = sym.declarations?.[0];
  while (decl && !ts.isSourceFile(decl)) {
    if (
      ts.isClassDeclaration(decl) ||
      ts.isNamespaceExportDeclaration(decl) ||
      ts.isNamespaceExport(decl) ||
      ts.isModuleDeclaration(decl) ||
      ts.isEnumDeclaration(decl) ||
      ts.isEnumMember(decl) ||
      ts.isInterfaceDeclaration(decl) ||
      ts.isMethodDeclaration(decl) ||
      ts.isMethodSignature(decl) ||
      ts.isPropertyDeclaration(decl) ||
      ts.isPropertySignature(decl)
    ) {
      const name = ts.getNameOfDeclaration(decl);
      const declSym = name ? typeChecker.getSymbolAtLocation(name) : undefined;
      if (declSym) {
        inFileNameParts.unshift(declSym.name);
      }
    }
    decl = decl.parent;
  }
  if (!decl) {
    return undefined;
  }

  const namespace = assemblyRelativeSourceFile(
    decl.getSourceFile().fileName,
    options,
  );

  if (!namespace) {
    return undefined;
  }

  return `${namespace}:${inFileNameParts.join('.')}`;
}

function assemblyRelativeSourceFile(
  sourceFileName: string,
  options?: SymbolIdOptions,
) {
  const packageJsonLocation = findPackageJsonLocation(
    path.dirname(sourceFileName),
  );

  if (!packageJsonLocation) {
    return undefined;
  }

  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonLocation).toString(),
  );

  let sourcePath = removePrefix(
    packageJson.jsii?.outdir ?? '',
    path.relative(path.dirname(packageJsonLocation), sourceFileName),
  );

  // Modify the namespace if we send in the assembly.
  if (options) {
    const tscRootDir = packageJson.jsii?.tsc?.rootDir ?? options?.assembly.metadata?.tscRootDir;
    const tscOutDir = packageJson.jsii?.tsc?.outDir;
    sourcePath = normalizePath(sourcePath, tscRootDir, tscOutDir);
  }

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

/**
 * Ensures that the sourcePath is pointing to the source code
 * and not compiled code. This can happen if the root directory
 * and/or out directory is set for the project. We check to see
 * if the out directory is present in the sourcePath, and if so,
 * we replace it with the root directory.
 */
export function normalizePath(
  sourcePath: string,
  rootDir?: string,
  outDir?: string,
): string {
  if (rootDir === undefined || outDir === undefined) {
    return sourcePath;
  }

  outDir = removeEndSlash(path.normalize(outDir));
  const outDirLength = outDir.split(path.sep).length;
  rootDir = removeEndSlash(path.normalize(rootDir));

  let paths = path.normalize(sourcePath).split(path.sep);
  const pathDir = paths.slice(0, outDirLength).join(path.sep);

  if (outDir === pathDir || outDir === '.') {
    // outDir === '.' is a special case where we do not want
    // to remove any paths from the list.
    if (outDir !== '.') {
      paths = paths.slice(outDirLength);
    }
    sourcePath =
      rootDir === '.' ? paths.join('/') : `${rootDir}/${paths.join('/')}`;
  }
  return sourcePath;

  function removeEndSlash(filePath: string) {
    return filePath.endsWith(path.sep)
      ? filePath.slice(0, filePath.length - 1)
      : filePath;
  }
}
