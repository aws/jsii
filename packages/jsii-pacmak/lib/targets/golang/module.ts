import { CodeMaker } from 'codemaker';
import { Assembly, Type, Submodule as JsiiSubmodule } from 'jsii-reflect';
import { join } from 'path';
import { GoClass, Enum, Interface } from './types';

type ModuleType = Interface | Enum | GoClass;
type ModuleTypes = ModuleType[];

// TODO: Make this a class?
export interface Module {
  root: RootModule;
  packageName: string;
  moduleName: string;
  file: string;
  submodules: Submodule[];
  types: ModuleTypes;
  hasSubmodules(): boolean;
}

function buildSubmodules(
  root: RootModule,
  parent: Module,
  submodules: readonly JsiiSubmodule[],
): Submodule[] {
  return submodules.map((sm) => new Submodule(root, parent, sm));
}

function unknownType(type: Type): never {
  throw new Error(`Type: ${type.name} is not an interface, enum, or class`);
}

function buildModuleTypes(parent: Module, types: readonly Type[]): ModuleTypes {
  return types.map(
    (type: Type): ModuleType => {
      if (type.isInterfaceType()) {
        return new Interface(parent, type);
      } else if (type.isClassType()) {
        return new GoClass(parent, type);
      } else if (type.isEnumType()) {
        return new Enum(parent, type);
      }
      return unknownType(type);
    },
  );
}

function findTypeInTree(module: Module, fqn: string): ModuleType | undefined {
  const result = module.types.find((t) => t.type.fqn === fqn);

  if (result) {
    return result;
  } else if (module.hasSubmodules()) {
    return module.submodules.reduce((accum: ModuleType | undefined, sm) => {
      return accum || findTypeInTree(sm, fqn);
    }, undefined);
  }

  return undefined;
}

export abstract class ModuleFile {
  public constructor(public readonly file: string) {}
  public open(code: CodeMaker): void {
    code.openFile(this.file);
  }

  public close(code: CodeMaker): void {
    code.closeFile(this.file);
  }
}

export class RootModule extends ModuleFile implements Module {
  private readonly assembly: Assembly;
  public readonly packageName: string;
  public readonly moduleName: string;
  public readonly file: string;
  public readonly root: RootModule;

  public constructor(assembly: Assembly) {
    const packageName = assembly.name
      .replace('@', '')
      .replace(/[^a-z0-9_.]/gi, '');
    const file = `${join(...packageName.split('.'))}.go`;
    super(file);

    this.assembly = assembly;
    this.root = this;
    this.packageName = packageName;
    // moduleName == packageName for root;
    this.moduleName = packageName;
    this.file = file;
  }

  public get types(): ModuleTypes {
    return buildModuleTypes(this, Object.values(this.assembly.types));
  }

  public get submodules(): Submodule[] {
    return buildSubmodules(this, this, this.assembly.submodules);
  }

  public get dependencies(): Set<Module> {
    return new Set(
      this.types
        .reduce(
          (accum: Module[], t: ModuleType) => [...accum, ...t.dependencies],
          [],
        )
        .filter((mod) => mod.packageName !== this.packageName),
    );
  }

  public hasSubmodules(): boolean {
    return Boolean(this.submodules.length);
  }

  public findType(fqn: string): ModuleType | undefined {
    return findTypeInTree(this, fqn);
  }

  public emit(code: CodeMaker): void {
    this.open(code);
    code.line(`package ${this.packageName}`);
    code.line();
    this.dependencies.forEach((mod) => {
      if (mod.packageName !== this.packageName) {
        code.line(`import "${mod.packageName}"`);
      }
    });

    if (this.dependencies.size) {
      code.line();
    }

    this.emitTypes(code);
    this.close(code);

    this.emitSubmodules(code);
  }

  public emitTypes(code: CodeMaker) {
    Object.values(this.types).forEach((type) => {
      type.emit(code);
    });
  }

  public emitSubmodules(code: CodeMaker) {
    this.submodules.forEach((submodule) => {
      submodule.emit(code);
    });
  }
}

export class Submodule extends ModuleFile implements Module {
  private readonly assembly: JsiiSubmodule;
  public readonly packageName: string;
  public readonly moduleName: string;
  public readonly file: string;
  public readonly parent: Module;
  public readonly root: RootModule;

  public constructor(
    root: RootModule,
    parent: Module,
    submodule: JsiiSubmodule,
  ) {
    const parentName = parent === root ? '' : `${parent.packageName}/`;
    const moduleName = submodule.name
      .replace('@', '')
      .replace(/[^a-z0-9]/gi, '');
    const packageName = parentName + moduleName;
    const file = `${parentName}${moduleName}.go`;
    super(file);

    this.assembly = submodule;
    this.root = root;
    this.parent = parent;
    this.packageName = packageName;
    this.moduleName = moduleName;
    this.file = file;
  }

  public get types(): ModuleTypes {
    return buildModuleTypes(this, this.assembly.types);
  }

  public get submodules(): Submodule[] {
    return buildSubmodules(this.root, this, this.assembly.submodules);
  }

  public hasSubmodules(): boolean {
    return Boolean(this.submodules.length);
  }

  public get dependencies(): Set<Module> {
    return new Set(
      this.types
        .reduce(
          (accum: Module[], t: ModuleType) => [...accum, ...t.dependencies],
          [],
        )
        .filter((mod) => mod.packageName !== this.packageName),
    );
  }

  public emit(code: CodeMaker): void {
    this.open(code);
    code.line(`package ${this.packageName}`);
    code.line();
    this.dependencies.forEach((mod) => {
      if (mod.packageName !== this.packageName) {
        code.line(`import "${mod.packageName}"`);
      }
    });

    if (this.dependencies.size) {
      code.line();
    }

    this.emitTypes(code);
    this.close(code);

    this.emitSubmodules(code);
  }

  public emitSubmodules(code: CodeMaker) {
    this.submodules.forEach((submodule) => {
      submodule.emit(code);
    });
  }

  private emitTypes(code: CodeMaker): void {
    this.types.forEach((type) => {
      type.emit(code);
    });
  }
}
