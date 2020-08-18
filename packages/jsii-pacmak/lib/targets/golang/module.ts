import { CodeMaker } from 'codemaker';
import { Type, Submodule as JsiiSubmodule } from 'jsii-reflect';
import { EmitContext } from './emit-context';
import { GoClass, Enum, Interface } from './types';
import { findTypeInTree, goModuleName, flatMap } from './util';

// JSII golang runtime module name
const JSII_MODULE_NAME = 'github.com/aws-cdk/jsii/jsii';

export type ModuleType = Interface | Enum | GoClass;
type ModuleTypes = ModuleType[];

/*
 * Module represents a single `.go` source file within a package. This can be the root package file or a submodule
 */
export abstract class Module {
  public readonly root: Module;
  public readonly file: string;
  public readonly submodules: Submodule[];
  public readonly types: ModuleTypes;
  // public readonly dependencies: Module[];

  public constructor(
    private readonly typeSpec: readonly Type[],
    private readonly submoduleSpec: readonly JsiiSubmodule[],
    public readonly moduleName: string,
    public readonly filePath: string,
    // If no root is provided, this module is the root
    root?: Module,
  ) {
    this.file = `${filePath}.go`;
    this.root = root || this;
    this.submodules = this.submoduleSpec.map(
      (sm) => new Submodule(this.root, this, sm),
    );

    this.types = this.typeSpec.map(
      (type: Type): ModuleType => {
        if (type.isInterfaceType()) {
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
   * Modules that types within this module reference
   */
  public get dependencies(): Module[] {
    return flatMap(
      this.types,
      (t: ModuleType): Module[] => t.dependencies,
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

    this.emitSubmodules(context);
  }

  private emitHeader(code: CodeMaker) {
    code.line(`package ${this.moduleName}`);
    code.line();
  }

  private emitImports(code: CodeMaker) {
    code.open('import (');
    code.line(`"${JSII_MODULE_NAME}"`);
    this.dependencyImports.forEach((modName) => {
      // If the module is the same as the current one being written, don't emit an import statement
      if (modName !== this.moduleName) {
        code.line(`"${modName}"`);
      }
    });
    code.close(')');
    code.line();
  }

  public emitSubmodules(context: EmitContext) {
    this.submodules.forEach((submodule) => {
      submodule.emit(context);
    });
  }

  private emitTypes(code: CodeMaker) {
    this.types.forEach((type) => {
      type.emit(code);
    });
  }
}

export class Submodule extends Module {
  public readonly parent: Module;

  public constructor(root: Module, parent: Module, assembly: JsiiSubmodule) {
    const moduleName = goModuleName(assembly.name);
    const filePath = `${parent.filePath}/${moduleName}`;

    super(assembly.types, assembly.submodules, moduleName, filePath, root);

    this.parent = parent;
  }
}
