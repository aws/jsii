import { Assembly } from '@jsii/spec';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

interface SymbolIdOptions {
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
  const tscRootDir = options?.assembly.metadata?.tscRootDir;
  const tscOutDir = packageJson.jsii?.tsc?.outDir;
  if (tscRootDir !== undefined && tscOutDir !== undefined) {
    const paths = path.normalize(sourcePath).split(path.sep);
    const pathDir = paths.shift();
    const outDir = path.normalize(tscOutDir);
    const rootDir = packageJson.jsii.tsc.rootDir ?? path.normalize(tscRootDir);
    // If we find our outDir, replace it with rootDir
    if (outDir === pathDir) {
      sourcePath =
        rootDir === '.' ? paths.join('/') : `${rootDir}/${paths.join('/')}`;
    }
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
