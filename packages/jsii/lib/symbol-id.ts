import { Assembly } from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from 'typescript';

import { undoTypesVersionsRedirect } from './types-versions';
import { findUp } from './utils';

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
  readonly assembly?: Assembly;
}

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
 * different from what the TS checker returns).
 */
export function symbolIdentifier(
  typeChecker: ts.TypeChecker,
  sym: ts.Symbol,
  options: SymbolIdOptions = {},
): string | undefined {
  // If this symbol happens to be an alias, resolve it first
  while ((sym.flags & ts.SymbolFlags.Alias) !== 0) {
    sym = typeChecker.getAliasedSymbol(sym);
  }

  const isMember =
    (sym.flags &
      (ts.SymbolFlags.Method |
        ts.SymbolFlags.Property |
        ts.SymbolFlags.EnumMember)) !==
    0;

  const tsName = typeChecker.getFullyQualifiedName(sym);

  // TypeScript fqn looks like "/path/to/file"[.name.in.file]
  const groups = /^"([^"]+)"(?:\.(.*))?$/.exec(tsName);
  if (!groups) {
    return undefined;
  }

  const [, fileName, inFileName] = groups; // inFileName may be absent

  const relFile = Helper.for(typeChecker).assemblyRelativeSourceFile(
    fileName,
    options?.assembly,
  );
  if (!relFile) {
    return undefined;
  }

  // If this is a member symbol, replace the final '.' with a '#'
  const typeSymbol = isMember
    ? (inFileName ?? '').replace(/\.([^.]+)$/, '#$1')
    : inFileName ?? '';

  return `${relFile}:${typeSymbol}`;
}

class Helper {
  private static readonly INSTANCES = new WeakMap<ts.TypeChecker, Helper>();

  public static for(typeChecker: ts.TypeChecker) {
    const cached = this.INSTANCES.get(typeChecker);
    if (cached != null) {
      return cached;
    }
    const helper = new Helper();
    this.INSTANCES.set(typeChecker, helper);
    return helper;
  }

  private readonly packageInfo = new Map<string, PackageInfo | undefined>();

  private constructor() {}

  public assemblyRelativeSourceFile(sourceFileName: string, asm?: Assembly) {
    const packageInfo = this.findPackageInfo(path.dirname(sourceFileName));
    if (!packageInfo) {
      return undefined;
    }

    let sourcePath = removePrefix(
      packageInfo.outdir ?? '',
      path.relative(packageInfo.packageJsonDir, sourceFileName),
    );

    // Modify the namespace if we send in the assembly.
    if (asm) {
      const tscRootDir = packageInfo.tscRootDir ?? asm.metadata?.tscRootDir;
      const tscOutDir = packageInfo.tscOutDir;
      sourcePath = normalizePath(sourcePath, tscRootDir, tscOutDir);
    }

    sourcePath = undoTypesVersionsRedirect(
      sourcePath,
      packageInfo.typesVersions,
    );

    return sourcePath.replace(/(\.d)?\.ts$/, '');

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

  private findPackageInfo(from: string): PackageInfo | undefined {
    if (this.packageInfo.has(from)) {
      return this.packageInfo.get(from);
    }

    const packageJsonDir = findUp(from, (dir) =>
      fs.pathExistsSync(path.join(dir, 'package.json')),
    );

    if (!packageJsonDir) {
      this.packageInfo.set(from, undefined);
      return undefined;
    }

    if (this.packageInfo.has(packageJsonDir)) {
      return this.packageInfo.get(packageJsonDir);
    }

    const { jsii, typesVersions } = fs.readJsonSync(
      path.join(packageJsonDir, 'package.json'),
    );

    const result = {
      packageJsonDir,
      outdir: jsii?.outdir,
      tscRootDir: jsii?.tsc?.rootDir,
      tscOutDir: jsii?.tsc?.outDir,
      typesVersions,
    };
    this.packageInfo.set(from, result);
    this.packageInfo.set(packageJsonDir, result);
    return result;
  }
}

interface PackageInfo {
  readonly packageJsonDir: string;
  readonly outdir: string | undefined;
  readonly tscRootDir: string | undefined;
  readonly tscOutDir: string | undefined;
  readonly typesVersions:
    | {
        readonly [range: string]: {
          readonly [glob: string]: readonly string[];
        };
      }
    | undefined;
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
  return unixize(sourcePath);

  function removeEndSlash(filePath: string) {
    return filePath.endsWith(path.sep)
      ? filePath.slice(0, filePath.length - 1)
      : filePath;
  }
}

/**
 * Turn backslashes in a path into forward slashes
 */
function unixize(p: string) {
  return p.replace(/\\/g, '/');
}
