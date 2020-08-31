import { CodeMaker } from 'codemaker';
import { Assembly } from 'jsii-reflect';
import { ReadmeFile } from './readme-file';
import { Type, Submodule as JsiiSubmodule } from 'jsii-reflect';
import { EmitContext } from './emit-context';
import { GoClass, Enum, Interface, Struct } from './types';
import { findTypeInTree, goPackageName, flatMap } from './util';

// JSII golang runtime module name
const JSII_MODULE_NAME = 'github.com/aws-cdk/jsii/jsii';

export type ModuleType = Interface | Enum | GoClass | Struct;

/*
 * Package represents a single `.go` source file within a package. This can be the root package file or a submodule
 */
export abstract class Package {
  public readonly root: Package;
  public readonly file: string;
  public readonly submodules: InternalPackage[];
  public readonly types: ModuleType[];

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
      (type: Type): ModuleType => {
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
    return flatMap(
      this.types,
      (t: ModuleType): Package[] => t.dependencies,
    ).filter((mod) => mod.packageName !== this.packageName);
  }

  /*
   * The module names of this modules dependencies. Used for import statements
   */
  public get dependencyImports(): Set<string> {
    return new Set(
      this.dependencies.map((pack) => {
        // If the package root isn't the same as the current packages root, the
        // package is part of a different module and requires a full module path
        if (pack.root !== this.root) {
          const moduleName = pack.root.moduleName;
          const prefix = moduleName !== '' ? `${moduleName}/` : '';
          const rootPackageName = pack.root.packageName;
          const suffix = pack.filePath !== '' ? `/${pack.filePath}` : '';
          return `${prefix}${rootPackageName}${suffix}`;
        }

        return pack.packageName;
      }),
    );
  }

  /*
   * Search for a type with a `fqn` within this. Searches all Children modules as well.
   */
  public findType(fqn: string): ModuleType | undefined {
    return findTypeInTree(this, fqn);
  }

  public emit(context: EmitContext): void {
    const { code } = context;
    code.openFile(this.file);
    this.emitHeader(code);
    this.emitImports(code);
    this.emitTypes(code);
    code.closeFile(this.file);

    this.emitInternalPackages(context);
  }

  private emitHeader(code: CodeMaker) {
    code.line(`package ${this.packageName}`);
    code.line();
  }

  private emitImports(code: CodeMaker) {
    code.open('import (');
    code.line(`"${JSII_MODULE_NAME}"`);

    for (const packageName of this.dependencyImports) {
      // If the module is the same as the current one being written, don't emit an import statement
      if (packageName !== this.packageName) {
        code.line(`"${packageName}"`);
      }
    }

    code.close(')');
    code.line();
  }

  public emitInternalPackages(context: EmitContext) {
    for (const submodule of this.submodules) {
      submodule.emit(context);
    }
  }

  private emitTypes(code: CodeMaker) {
    for (const type of this.types) {
      type.emit(code);
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
    super.emit(context);

    this.readme?.emit(context);
  }

  /*
   * Override package findType for root Package.
   *
   * This allows resolving type references from other JSII modules
   */
  public findType(fqn: string): ModuleType | undefined {
    return this.packageDependencies.reduce(
      (accum: ModuleType | undefined, current: RootPackage) => {
        if (accum) {
          return accum;
        }
        return current.findType(fqn);
      },
      super.findType(fqn),
    );
  }

  /*
   * Get all JSII module dependencies of the package being generated
   */
  public get packageDependencies(): RootPackage[] {
    return this.assembly.dependencies.map(
      (dep) => new RootPackage(dep.assembly),
    );
  }
}

/*
 * InternalPackage refers to any go package within a given JSII module.
 */
export class InternalPackage extends Package {
  public readonly parent: Package;

  public constructor(root: Package, parent: Package, assembly: JsiiSubmodule) {
    const packageName = goPackageName(assembly.name);
    const filePath = parent === root ? packageName : parent.filePath;

    super(
      assembly.types,
      assembly.submodules,
      packageName,
      filePath,
      root.moduleName,
      root,
    );

    this.parent = parent;
  }
}
