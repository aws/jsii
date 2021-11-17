import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

export function symbolIdentifier(
  typeChecker: ts.TypeChecker,
  sym: ts.Symbol,
): string | undefined {
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
  const namespace = assemblyRelativeSourceFile(decl.getSourceFile().fileName);

  if (!namespace) {
    return undefined;
  }

  return `${namespace}:${inFileNameParts.join('.')}`;
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
