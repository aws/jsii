import { CodeMaker } from 'codemaker';
import { Assembly } from 'jsii-reflect';
import { join } from 'path';
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
    public readonly moduleName: string,
    public readonly filePath: string,
    // If no root is provided, this module is the root
    root?: Package,
  ) {
    this.file = `${filePath}.go`;
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
    ).filter((mod) => mod.moduleName !== this.moduleName);
  }

  /*
   * The module names of this modules dependencies. Used for import statements
   */
  public get dependencyImports(): Set<string> {
    return new Set(this.dependencies.map((mod) => mod.moduleName));
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
    code.line(`package ${this.moduleName}`);
    code.line();
  }

  private emitImports(code: CodeMaker) {
    code.open('import (');
    code.line(`"${JSII_MODULE_NAME}"`);

    for (const modName of this.dependencyImports) {
      // If the module is the same as the current one being written, don't emit an import statement
      if (modName !== this.moduleName) {
        code.line(`"${modName}"`);
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

  public constructor(assembly: Assembly) {
    const moduleName = goPackageName(assembly.name);
    const filePath = join(...moduleName.split('.'));

    super(
      Object.values(assembly.types),
      assembly.submodules,
      moduleName,
      filePath,
    );

    this.assembly = assembly;
  }

  public emit(context: EmitContext): void {
    super.emit(context);

    if (this.assembly.readme?.markdown) {
      new ReadmeFile(this.moduleName, this.assembly.readme.markdown);
    }
  }
}

/*
 * InternalPackage refers to any go package within a given JSII module.
 */
export class InternalPackage extends Package {
  public readonly parent: Package;

  public constructor(root: Package, parent: Package, assembly: JsiiSubmodule) {
    const moduleName = goPackageName(assembly.name);
    const filePath = `${parent.filePath}/${moduleName}`;

    super(assembly.types, assembly.submodules, moduleName, filePath, root);

    this.parent = parent;
  }
}
