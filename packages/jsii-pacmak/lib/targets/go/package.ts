import { CodeMaker } from 'codemaker';
import {
  Assembly,
  ModuleLike as JsiiModuleLike,
  Type,
  Submodule as JsiiSubmodule,
} from 'jsii-reflect';
import { join } from 'path';
import * as semver from 'semver';

import { VERSION } from '../../version';
import {
  GO_REFLECT,
  ImportedModule,
  INTERNAL_PACKAGE_NAME,
  JSII_RT_MODULE,
  reduceSpecialDependencies,
  toImportedModules,
} from './dependencies';
import { EmitContext } from './emit-context';
import { ReadmeFile } from './readme-file';
import {
  JSII_RT_ALIAS,
  JSII_RT_MODULE_NAME,
  JSII_INIT_PACKAGE,
  JSII_INIT_FUNC,
  JSII_INIT_ALIAS,
} from './runtime';
import { GoClass, GoType, Enum, GoInterface, Struct, GoTypeRef } from './types';
import {
  findTypeInTree,
  goPackageNameForAssembly,
  flatMap,
  tarballName,
} from './util';
import { VersionFile } from './version-file';

export const GOMOD_FILENAME = 'go.mod';
export const GO_VERSION = '1.18';

/*
 * Package represents a single `.go` source file within a package. This can be the root package file or a submodule
 */
export abstract class Package {
  public readonly root: Package;
  public readonly file: string;
  public readonly directory: string;
  public readonly submodules: InternalPackage[];
  public readonly types: GoType[];

  private readonly embeddedTypes = new Map<string, EmbeddedType>();
  private readonly readmeFile?: ReadmeFile;

  public constructor(
    private readonly jsiiModule: JsiiModuleLike,
    public readonly packageName: string,
    public readonly filePath: string,
    public readonly moduleName: string,
    public readonly version: string,
    // If no root is provided, this module is the root
    root?: Package,
  ) {
    this.directory = filePath;
    this.file = join(this.directory, `${packageName}.go`);
    this.root = root ?? this;
    this.submodules = this.jsiiModule.submodules.map(
      (sm) => new InternalPackage(this.root, this, sm),
    );

    this.types = this.jsiiModule.types.map((type: Type): GoType => {
      if (type.isInterfaceType() && type.datatype) {
        return new Struct(this, type);
      } else if (type.isInterfaceType()) {
        return new GoInterface(this, type);
      } else if (type.isClassType()) {
        return new GoClass(this, type);
      } else if (type.isEnumType()) {
        return new Enum(this, type);
      }
      throw new Error(
        `Type: ${type.name} with kind ${type.kind} is not a supported type`,
      );
    });

    if (this.jsiiModule.readme?.markdown) {
      this.readmeFile = new ReadmeFile(
        this.jsiiModule.fqn,
        this.jsiiModule.readme.markdown,
        this.directory,
      );
    }
  }

  /*
   * Packages within this module
   */
  public get dependencies(): Package[] {
    return flatMap(this.types, (t: GoType): Package[] => t.dependencies).filter(
      (mod) => mod.packageName !== this.packageName,
    );
  }

  /*
   * goModuleName returns the full path to the module name.
   * Used for import statements and go.mod generation
   */
  public get goModuleName(): string {
    const moduleName = this.root.moduleName;
    const prefix = moduleName !== '' ? `${moduleName}/` : '';
    const rootPackageName = this.root.packageName;
    const versionSuffix = determineMajorVersionSuffix(this.version);
    const suffix = this.filePath !== '' ? `/${this.filePath}` : ``;
    return `${prefix}${rootPackageName}${versionSuffix}${suffix}`;
  }

  /*
   * Search for a type with a `fqn` within this. Searches all Children modules as well.
   */
  public findType(fqn: string): GoType | undefined {
    return findTypeInTree(this, fqn);
  }

  public emit(context: EmitContext): void {
    this.emitTypes(context);

    this.readmeFile?.emit(context);

    this.emitGoInitFunction(context);
    this.emitSubmodules(context);

    this.emitInternal(context);
  }

  public emitSubmodules(context: EmitContext) {
    for (const submodule of this.submodules) {
      submodule.emit(context);
    }
  }

  /**
   * Determines if `type` comes from a foreign package.
   */
  public isExternalType(type: GoClass | GoInterface) {
    return type.pkg !== this;
  }

  /**
   * Returns the name of the embed field used to embed a base class/interface in a
   * struct.
   *
   * @returns If the base is in the same package, returns the proxy name of the
   * base under `embed`, otherwise returns a unique symbol under `embed` and the
   * original interface reference under `original`.
   *
   * @param type The base type we want to embed
   */
  public resolveEmbeddedType(type: GoClass | GoInterface): EmbeddedType {
    if (!this.isExternalType(type)) {
      return {
        embed: type.proxyName,
        fieldName: type.proxyName,
      };
    }

    const exists = this.embeddedTypes.get(type.fqn);
    if (exists) {
      return exists;
    }

    const typeref = new GoTypeRef(this.root, type.type.reference);
    const original = typeref.scopedName(this);

    const slug = original.replace(/[^A-Za-z0-9]/g, '');
    const aliasName = `Type__${slug}`;

    const embeddedType: EmbeddedType = {
      foriegnTypeName: original,
      foriegnType: typeref,
      fieldName: aliasName,
      embed: `${INTERNAL_PACKAGE_NAME}.${aliasName}`,
    };
    this.embeddedTypes.set(type.fqn, embeddedType);

    return embeddedType;
  }

  protected emitHeader(code: CodeMaker) {
    code.line(`package ${this.packageName}`);
    code.line();
  }

  /**
   * Emits a `func init() { ... }` in a dedicated file (so we don't have to
   * worry about what needs to be imported and whatnot). This function is
   * responsible for correctly initializing the module, including registering
   * the declared types with the jsii runtime for go.
   */
  private emitGoInitFunction(context: EmitContext): void {
    // We don't emit anything if there are not types in this (sub)module. This
    // avoids registering an `init` function that does nothing, which is poor
    // form. It also saves us from "imported but unused" errors that would arise
    // as a consequence.
    if (this.types.length > 0) {
      const { code } = context;

      const initFile = join(this.directory, `${this.packageName}.go`);
      code.openFile(initFile);
      code.line(`package ${this.packageName}`);
      code.line();
      importGoModules(code, [GO_REFLECT, JSII_RT_MODULE]);
      code.line();
      code.openBlock('func init()');
      for (const type of this.types) {
        type.emitRegistration(context);
      }
      code.closeBlock();
      code.closeFile(initFile);
    }
  }

  private emitImports(code: CodeMaker, type: GoType) {
    const toImport = new Array<ImportedModule>();

    toImport.push(...toImportedModules(type.specialDependencies, this));

    for (const goModuleName of new Set(
      type.dependencies.map(({ goModuleName }) => goModuleName),
    )) {
      // If the module is the same as the current one being written, don't emit an import statement
      if (goModuleName !== this.goModuleName) {
        toImport.push({ module: goModuleName });
      }
    }

    importGoModules(code, toImport);
    code.line();
  }

  private emitTypes(context: EmitContext) {
    for (const type of this.types) {
      const filePath = join(
        this.directory,
        `${this.packageName}_${type.name}.go`,
      );
      context.code.openFile(filePath);

      this.emitHeader(context.code);
      this.emitImports(context.code, type);
      type.emit(context);

      context.code.closeFile(filePath);

      this.emitValidators(context, type);
    }
  }

  private emitValidators(
    { code, runtimeTypeChecking }: EmitContext,
    type: GoType,
  ): void {
    if (!runtimeTypeChecking) {
      return;
    }

    if (type.parameterValidators.length === 0 && type.structValidator == null) {
      return;
    }

    emit.call(
      this,
      join(
        this.directory,
        `${this.packageName}_${type.name}__runtime_type_checks.go`,
      ),
      false,
    );

    emit.call(
      this,
      join(
        this.directory,
        `${this.packageName}_${type.name}__no_runtime_type_checking.go`,
      ),
      true,
    );

    function emit(this: Package, filePath: string, forNoOp: boolean) {
      code.openFile(filePath);
      // Conditional compilation tag...
      code.line(`//go:build ${forNoOp ? '' : '!'}no_runtime_type_checking`);
      code.line();
      this.emitHeader(code);

      if (!forNoOp) {
        const specialDependencies = reduceSpecialDependencies(
          ...type.parameterValidators.map((v) => v.specialDependencies),
          ...(type.structValidator
            ? [type.structValidator.specialDependencies]
            : []),
        );

        importGoModules(code, [
          ...toImportedModules(specialDependencies, this),
          ...Array.from(
            new Set(
              [
                ...(type.structValidator?.dependencies ?? []),
                ...type.parameterValidators.flatMap((v) => v.dependencies),
              ].map((mod) => mod.goModuleName),
            ),
          )
            .filter((mod) => mod !== this.goModuleName)
            .map((mod) => ({ module: mod })),
        ]);
        code.line();
      } else {
        code.line(
          '// Building without runtime type checking enabled, so all the below just return nil',
        );
        code.line();
      }

      type.structValidator?.emitImplementation(code, this, forNoOp);

      for (const validator of type.parameterValidators) {
        validator.emitImplementation(code, this, forNoOp);
      }

      code.closeFile(filePath);
    }
  }

  private emitInternal(context: EmitContext) {
    if (this.embeddedTypes.size === 0) {
      return;
    }

    const code = context.code;

    const fileName = join(this.directory, INTERNAL_PACKAGE_NAME, 'types.go');
    code.openFile(fileName);

    code.line(`package ${INTERNAL_PACKAGE_NAME}`);

    const imports = new Set<string>();

    for (const alias of this.embeddedTypes.values()) {
      if (!alias.foriegnType) {
        continue;
      }

      for (const pkg of alias.foriegnType.dependencies) {
        imports.add(pkg.goModuleName);
      }
    }

    code.open('import (');
    for (const imprt of imports) {
      code.line(`"${imprt}"`);
    }
    code.close(')');

    for (const alias of this.embeddedTypes.values()) {
      code.line(`type ${alias.fieldName} = ${alias.foriegnTypeName}`);
    }

    code.closeFile(fileName);
  }
}

/*
 * RootPackage corresponds to JSII module.
 *
 * Extends `Package` for root source package emit logic
 */
export class RootPackage extends Package {
  public readonly assembly: Assembly;
  public readonly version: string;
  private readonly versionFile: VersionFile;
  private readonly typeCache = new Map<string, GoType | undefined>();

  // This cache of root packages is shared across all root packages derived created by this one (via dependencies).
  private readonly rootPackageCache: Map<string, RootPackage>;

  public constructor(
    assembly: Assembly,
    rootPackageCache = new Map<string, RootPackage>(),
  ) {
    const goConfig = assembly.targets?.go ?? {};
    const packageName = goPackageNameForAssembly(assembly);
    const filePath = '';
    const moduleName = goConfig.moduleName ?? '';
    const version = `${assembly.version}${goConfig.versionSuffix ?? ''}`;

    super(assembly, packageName, filePath, moduleName, version);

    this.rootPackageCache = rootPackageCache;
    this.rootPackageCache.set(assembly.name, this);

    this.assembly = assembly;
    this.version = version;
    this.versionFile = new VersionFile(this.version);
  }

  public emit(context: EmitContext): void {
    super.emit(context);
    this.emitJsiiPackage(context);

    this.emitGomod(context.code);
    this.versionFile.emit(context.code);
  }

  private emitGomod(code: CodeMaker) {
    code.openFile(GOMOD_FILENAME);
    code.line(`module ${this.goModuleName}`);
    code.line();
    code.line(`go ${GO_VERSION}`);
    code.line();
    code.open('require (');
    // Strip " (build abcdef)" from the jsii version
    code.line(`${JSII_RT_MODULE_NAME} v${VERSION}`);
    const dependencies = this.packageDependencies;
    for (const dep of dependencies) {
      code.line(`${dep.goModuleName} v${dep.version}`);
    }
    indirectDependencies(
      dependencies,
      new Set(dependencies.map((dep) => dep.goModuleName)),
    );
    code.close(')');
    code.closeFile(GOMOD_FILENAME);

    /**
     * Emits indirect dependency declarations, which are helpful to make IDEs at
     * ease with the codebase.
     */
    function indirectDependencies(
      pkgs: RootPackage[],
      alreadyEmitted: Set<string>,
    ): void {
      for (const pkg of pkgs) {
        const deps = pkg.packageDependencies;
        for (const dep of deps) {
          if (alreadyEmitted.has(dep.goModuleName)) {
            continue;
          }
          alreadyEmitted.add(dep.goModuleName);
          code.line(`${dep.goModuleName} v${dep.version} // indirect`);
        }
        indirectDependencies(deps, alreadyEmitted);
      }
    }
  }

  /*
   * Override package findType for root Package.
   *
   * This allows resolving type references from other JSII modules
   */
  public findType(fqn: string): GoType | undefined {
    if (!this.typeCache.has(fqn)) {
      this.typeCache.set(
        fqn,
        this.packageDependencies.reduce(
          (accum: GoType | undefined, current: RootPackage) => {
            if (accum) {
              return accum;
            }
            return current.findType(fqn);
          },
          super.findType(fqn),
        ),
      );
    }
    return this.typeCache.get(fqn);
  }

  /*
   * Get all JSII module dependencies of the package being generated
   */
  public get packageDependencies(): RootPackage[] {
    return this.assembly.dependencies.map(
      (dep) =>
        this.rootPackageCache.get(dep.assembly.name) ??
        new RootPackage(dep.assembly, this.rootPackageCache),
    );
  }

  protected emitHeader(code: CodeMaker) {
    if (this.assembly.description !== '') {
      code.line(`// ${this.assembly.description}`);
    }
    code.line(`package ${this.packageName}`);
    code.line();
  }

  private emitJsiiPackage({ code }: EmitContext) {
    const dependencies = this.packageDependencies.sort((l, r) =>
      l.moduleName.localeCompare(r.moduleName),
    );

    const file = join(JSII_INIT_PACKAGE, `${JSII_INIT_PACKAGE}.go`);
    code.openFile(file);
    code.line(
      `// Package ${JSII_INIT_PACKAGE} contains the functionaility needed for jsii packages to`,
    );
    code.line(
      '// initialize their dependencies and themselves. Users should never need to use this package',
    );
    code.line('// directly. If you find you need to - please report a bug at');
    code.line('// https://github.com/aws/jsii/issues/new/choose');
    code.line(`package ${JSII_INIT_PACKAGE}`);
    code.line();

    const toImport: ImportedModule[] = [
      JSII_RT_MODULE,
      { module: 'embed', alias: '_' },
    ];
    if (dependencies.length > 0) {
      for (const pkg of dependencies) {
        toImport.push({
          alias: pkg.packageName,
          module: `${pkg.root.goModuleName}/${JSII_INIT_PACKAGE}`,
        });
      }
    }
    importGoModules(code, toImport);

    code.line();
    code.line(`//go:embed ${tarballName(this.assembly)}`);
    code.line('var tarball []byte');
    code.line();

    code.line(
      `// ${JSII_INIT_FUNC} loads the necessary packages in the @jsii/kernel to support the enclosing module.`,
    );
    code.line(
      '// The implementation is idempotent (and hence safe to be called over and over).',
    );
    code.open(`func ${JSII_INIT_FUNC}() {`);
    if (dependencies.length > 0) {
      code.line('// Ensure all dependencies are initialized');
      for (const pkg of this.packageDependencies) {
        code.line(`${pkg.packageName}.${JSII_INIT_FUNC}()`);
      }
      code.line();
    }
    code.line('// Load this library into the kernel');
    code.line(
      `${JSII_RT_ALIAS}.Load("${this.assembly.name}", "${this.assembly.version}", tarball)`,
    );
    code.close('}');

    code.closeFile(file);
  }
}

/*
 * InternalPackage refers to any go package within a given JSII module.
 */
export class InternalPackage extends Package {
  public readonly parent: Package;

  public constructor(root: Package, parent: Package, assembly: JsiiSubmodule) {
    const packageName = goPackageNameForAssembly(assembly);
    const filePath =
      parent === root ? packageName : `${parent.filePath}/${packageName}`;

    super(assembly, packageName, filePath, root.moduleName, root.version, root);

    this.parent = parent;
  }
}

/**
 * Go requires that when a module major version is v2.0 and above, the module
 * name will have a `/vNN` suffix (where `NN` is the major version).
 *
 * > Starting with major version 2, module paths must have a major version
 * > suffix like /v2 that matches the major version. For example, if a module
 * > has the path example.com/mod at v1.0.0, it must have the path
 * > example.com/mod/v2 at version v2.0.0.
 *
 * @see https://golang.org/ref/mod#major-version-suffixes
 * @param version The module version (e.g. `2.3.0`)
 * @returns a suffix to append to the module name in the form (`/vNN`). If the
 * module version is `0.x` or `1.x`, returns an empty string.
 */
function determineMajorVersionSuffix(version: string) {
  const sv = semver.parse(version);
  if (!sv) {
    throw new Error(
      `Unable to parse version "${version}" as a semantic version`,
    );
  }

  // suffix is only needed for 2.0 and above
  if (sv.major <= 1) {
    return '';
  }

  return `/v${sv.major}`;
}

function importGoModules(code: CodeMaker, modules: readonly ImportedModule[]) {
  if (modules.length === 0) {
    return;
  }

  const aliasSize = Math.max(...modules.map((mod) => mod.alias?.length ?? 0));
  code.open('import (');
  const sortedModules = Array.from(modules).sort(compareImportedModules);
  for (let i = 0; i < sortedModules.length; i++) {
    const mod = sortedModules[i];
    // Separate module categories from each other modules with a blank line.
    if (
      i > 0 &&
      (isBuiltIn(mod) !== isBuiltIn(sortedModules[i - 1]) ||
        isSpecial(mod) !== isSpecial(sortedModules[i - 1]))
    ) {
      code.line();
    }
    if (mod.alias) {
      code.line(`${mod.alias.padEnd(aliasSize, ' ')} "${mod.module}"`);
    } else {
      code.line(`"${mod.module}"`);
    }
  }
  code.close(')');

  /**
   * A comparator for `ImportedModule` instances such that built-in modules
   * always appear first, followed by the rest. Then within these two groups,
   * aliased imports appear first, followed by the rest.
   */
  function compareImportedModules(
    l: ImportedModule,
    r: ImportedModule,
  ): number {
    const lBuiltIn = isBuiltIn(l);
    const rBuiltIn = isBuiltIn(r);
    if (lBuiltIn && !rBuiltIn) {
      return -1;
    }
    if (!lBuiltIn && rBuiltIn) {
      return 1;
    }

    const lSpecial = isSpecial(l);
    const rSpecial = isSpecial(r);
    if (lSpecial && !rSpecial) {
      return -1;
    }
    if (!lSpecial && rSpecial) {
      return 1;
    }

    return l.module.localeCompare(r.module);
  }

  function isBuiltIn(mod: ImportedModule): boolean {
    // Standard library modules don't have any "." in their path, whereas any
    // other module has a DNS portion in them, which must include a ".".
    return !mod.module.includes('.');
  }

  function isSpecial(mod: ImportedModule): boolean {
    return mod.alias === JSII_RT_ALIAS || mod.alias === JSII_INIT_ALIAS;
  }
}

/**
 * Represents an embedded Go type.
 */
interface EmbeddedType {
  /**
   * The field name for the embedded type.
   */
  readonly fieldName: string;

  /**
   * The embedded type name to use. Could be either a struct proxy (if the base
   * type is in the same package) or an internal alias for a foriegn type name.
   */
  readonly embed: string;

  /**
   * Refernce to the foreign type (if this is a foriegn type)
   */
  readonly foriegnType?: GoTypeRef;

  /**
   * The name of the foriegn type.
   */
  readonly foriegnTypeName?: string;
}
