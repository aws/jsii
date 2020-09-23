import { CodeMaker } from 'codemaker';
import { Assembly } from 'jsii-reflect';
import { ReadmeFile } from './readme-file';
import { Type, Submodule as JsiiSubmodule } from 'jsii-reflect';
import { EmitContext } from './emit-context';
import { GoClass, GoType, Enum, Interface, Struct } from './types';
import { findTypeInTree, goPackageName, flatMap } from './util';
import {
  JSII_EMBEDDED_LOAD_FN,
  JSII_MODULE_NAME,
  JSII_RT_ALIAS,
  ModuleLoad,
} from './runtime';

/*
 * Package represents a single `.go` source file within a package. This can be the root package file or a submodule
 */
export abstract class Package {
  public readonly root: Package;
  public readonly file: string;
  public readonly submodules: InternalPackage[];
  public readonly types: GoType[];

  public constructor(
    private readonly typeSpec: readonly Type[],
    private readonly submoduleSpec: readonly JsiiSubmodule[],
    public readonly packageName: string,
    public readonly filePath: string,
    public readonly moduleName: string,
    // If no root is provided, this module is the root
    root?: Package,
  ) {
    this.file = `${filePath}/${packageName}.go`;
    this.root = root || this;
    this.submodules = this.submoduleSpec.map(
      (sm) => new InternalPackage(this.root, this, sm),
    );

    this.types = this.typeSpec.map(
      (type: Type): GoType => {
        if (type.isInterfaceType() && type.datatype) {
          return new Struct(this, type);
        } else if (type.isInterfaceType()) {
          return new Interface(this, type);
        } else if (type.isClassType()) {
          return new GoClass(this, type);
        } else if (type.isEnumType()) {
          return new Enum(this, type);
        }
        throw new Error(
          `Type: ${type.name} with kind ${type.kind} is not a supported type`,
        );
      },
    );
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
   * The module names of this modules dependencies. Used for import statements
   */
  public get dependencyImports(): Set<string> {
    return new Set(
      this.dependencies.map((pack) => {
        const moduleName = pack.root.moduleName;
        const prefix = moduleName !== '' ? `${moduleName}/` : '';
        const rootPackageName = pack.root.packageName;
        const suffix = pack.filePath !== '' ? `/${pack.filePath}` : '';
        return `${prefix}${rootPackageName}${suffix}`;
      }),
    );
  }

  /*
   * Search for a type with a `fqn` within this. Searches all Children modules as well.
   */
  public findType(fqn: string): GoType | undefined {
    return findTypeInTree(this, fqn);
  }

  public emit(context: EmitContext): void {
    const { code } = context;
    code.openFile(this.file);
    this.emitHeader(code);
    this.emitImports(code);
    this.emitTypes(context);
    code.closeFile(this.file);

    this.emitInternalPackages(context);
  }

  public emitInternalPackages(context: EmitContext) {
    for (const submodule of this.submodules) {
      submodule.emit(context);
    }
  }

  public emitLibLoad(code: CodeMaker) {
    code.line(`jsii.${JSII_EMBEDDED_LOAD_FN}()`);
  }

  protected emitHeader(code: CodeMaker) {
    code.line(`package ${this.packageName}`);
    code.line();
  }

  protected emitTypes(context: EmitContext) {
    for (const type of this.types) {
      type.emit(context);
    }
  }

  protected get imports(): readonly GoImport[] {
    const result: GoImport[] = [
      { alias: JSII_RT_ALIAS, package: JSII_MODULE_NAME },
      { package: `${this.root.moduleName}/${this.root.packageName}/jsii` },
    ];
    for (const packageName of this.dependencyImports) {
      if (packageName !== this.packageName) {
        result.push({ package: packageName });
      }
    }
    return result;
  }

  protected emitImports(code: CodeMaker) {
    const imports = this.imports;
    if (imports.length === 0) {
      return;
    }

    code.open('import (');
    for (const goImport of Array.from(imports).sort(sortImports)) {
      if (goImport.alias) {
        code.line(`${goImport.alias} ${JSON.stringify(goImport.package)}`);
      } else {
        code.line(JSON.stringify(goImport.package));
      }
    }
    code.close(')');
    code.line();

    function sortImports(left: GoImport, right: GoImport) {
      return left.package.localeCompare(right.package);
    }
  }
}

/*
 * RootPackage corresponds to JSII module.
 *
 * Extends `Package` for root source package emit logic
 */
export class RootPackage extends Package {
  public readonly assembly: Assembly;
  private readonly readme?: ReadmeFile;

  public constructor(assembly: Assembly) {
    const packageName = goPackageName(assembly.name);
    const filePath = '';
    const moduleName = assembly.targets?.go?.moduleName ?? '';

    super(
      Object.values(assembly.types),
      assembly.submodules,
      packageName,
      filePath,
      moduleName,
    );

    this.assembly = assembly;

    if (this.assembly.readme?.markdown) {
      this.readme = new ReadmeFile(
        this.packageName,
        this.assembly.readme.markdown,
      );
    }
  }

  public emit(context: EmitContext): void {
    this.emitLoadFunction(context);

    const { code } = context;
    code.openFile(this.file);
    this.emitHeader(code);
    this.emitImports(code);
    this.emitTypes(context);
    code.closeFile(this.file);

    this.emitInternalPackages(context);

    this.readme?.emit(context);
  }

  private emitLoadFunction(context: EmitContext): void {
    new ModuleLoad(this.assembly.name, this.assembly.version, this).emit(
      context,
    );
  }

  /*
   * Override package findType for root Package.
   *
   * This allows resolving type references from other JSII modules
   */
  public findType(fqn: string): GoType | undefined {
    return this.packageDependencies.reduce(
      (accum: GoType | undefined, current: RootPackage) => {
        if (accum) {
          return accum;
        }
        return current.findType(fqn);
      },
      super.findType(fqn),
    );
  }

  /*
   * Override with known package imports for root package, used for load call functionality */
  public get dependencyImports(): Set<string> {
    return new Set(super.dependencyImports);
  }

  /*
   * Get all JSII module dependencies of the package being generated
   */
  public get packageDependencies(): RootPackage[] {
    return this.assembly.dependencies.map(
      (dep) => new RootPackage(dep.assembly),
    );
  }

  protected emitHeader(code: CodeMaker) {
    if (this.assembly.description !== '') {
      code.line(`// ${this.assembly.description}`);
    }
    code.line(`package ${this.packageName}`);
    code.line();
  }
}

/*
 * InternalPackage refers to any go package within a given JSII module.
 */
export class InternalPackage extends Package {
  public readonly pkg: Package;

  public constructor(root: Package, pkg: Package, assembly: JsiiSubmodule) {
    const packageName = goPackageName(assembly.name);
    const filePath = pkg === root ? packageName : pkg.filePath;

    super(
      assembly.types,
      assembly.submodules,
      packageName,
      filePath,
      root.moduleName,
      root,
    );

    this.pkg = pkg;
  }
}

interface GoImport {
  /**
   * The alias name to emit for this package import, if any.
   *
   * @default none
   */
  readonly alias?: string;

  /**
   * The package to be imported.
   */
  readonly package: string;
}
