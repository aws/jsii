import { CodeMaker } from 'codemaker';
import { Assembly, Type, Submodule as JsiiSubmodule } from 'jsii-reflect';
import { join } from 'path';

import { EmitContext } from './emit-context';
import { ReadmeFile } from './readme-file';
import {
  JSII_RT_ALIAS,
  JSII_RT_MODULE_NAME,
  JSII_INIT_PACKAGE,
  JSII_INIT_FUNC,
  JSII_INIT_ALIAS,
} from './runtime';
import { GoClass, GoType, Enum, Interface, Struct } from './types';
import { findTypeInTree, goPackageName, flatMap } from './util';

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
    this.root = root ?? this;
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
        const suffix = pack.filePath !== '' ? `/${pack.filePath}` : ``;
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

  protected emitHeader(code: CodeMaker) {
    code.line(`package ${this.packageName}`);
    code.line();
  }

  protected get usesRuntimePackage(): boolean {
    return (
      this.types.some((type) => type.usesRuntimePackage) ||
      this.submodules.some((sub) => sub.usesRuntimePackage)
    );
  }

  protected get usesInitPackage(): boolean {
    return (
      this.types.some((type) => type.usesInitPackage) ||
      this.submodules.some((sub) => sub.usesInitPackage)
    );
  }

  private emitImports(code: CodeMaker) {
    code.open('import (');
    if (this.usesRuntimePackage) {
      code.line(`${JSII_RT_ALIAS} "${JSII_RT_MODULE_NAME}"`);
    }

    for (const packageName of this.dependencyImports) {
      // If the module is the same as the current one being written, don't emit an import statement
      if (packageName !== this.packageName) {
        code.line(`"${packageName}"`);
      }
    }

    if (this.usesInitPackage) {
      code.line(
        `${JSII_INIT_ALIAS} "${this.root.moduleName}/${this.root.packageName}/${JSII_INIT_PACKAGE}"`,
      );
    }

    code.close(')');
    code.line();
  }

  private emitTypes(context: EmitContext) {
    for (const type of this.types) {
      type.emit(context);
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
    this.emitJsiiPackage(context);
    this.readme?.emit(context);
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

  private emitJsiiPackage({ code }: EmitContext) {
    const dependencies = this.packageDependencies.sort((l, r) =>
      l.moduleName.localeCompare(r.moduleName),
    );

    const file = join(JSII_INIT_PACKAGE, `${JSII_INIT_PACKAGE}.go`);
    code.openFile(file);
    code.line('package jsii');
    code.line();
    code.open('import (');
    code.line(`rt "${JSII_RT_MODULE_NAME}"`);
    code.line('"sync"');
    if (dependencies.length > 0) {
      code.line('// Initialization endpoints of dependencies');
      for (const pkg of dependencies) {
        code.line(
          `${pkg.packageName} "${pkg.root.moduleName}/${pkg.root.packageName}/${JSII_INIT_PACKAGE}"`,
        );
      }
    }
    code.close(')');
    code.line();
    code.line('var once sync.Once');
    code.line();
    code.line(
      `// ${JSII_INIT_FUNC} performs the necessary work for the enclosing`,
    );
    code.line('// module to be loaded in the jsii kernel.');
    code.open(`func ${JSII_INIT_FUNC}() {`);
    code.open('once.Do(func(){');
    if (dependencies.length > 0) {
      code.line('// Ensure all dependencies are initialized');
      for (const pkg of this.packageDependencies) {
        code.line(`${pkg.packageName}.${JSII_INIT_FUNC}()`);
      }
      code.line();
    }
    code.line('// Load this library into the kernel');
    code.line(
      `rt.Load("${this.assembly.name}", "${this.assembly.version}", tarball)`,
    );
    code.close('})');
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
    const packageName = goPackageName(assembly.name);
    const filePath =
      parent === root ? packageName : `${parent.filePath}/${packageName}`;

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
