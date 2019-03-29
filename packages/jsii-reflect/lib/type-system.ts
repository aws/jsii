import fs = require('fs');
import path = require('path');
import { promisify } from 'util';
import { Assembly } from './assembly';
import { ClassType } from './class';
import { EnumType } from './enum';
import { InterfaceType } from './interface';
import { Method } from './method';
import { Property } from './property';
import { Type } from './type';

const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

export class TypeSystem {
  /**
   * All assemblies in this type system.
   */
  public readonly assemblies = new Array<Assembly>();

  /**
   * The "root" assemblies (ones that loaded explicitly via a "load" call).
   */
  public readonly roots = new Array<Assembly>();

  private readonly _assemblyLookup: { [name: string]: Assembly } = { };

  /**
   * Loads a jsii module or a single .jsii file into the type system.
   *
   * If `fileOrDirectory` is a file, it will be treated as a single .jsii file.
   * If `fileOrDirectory` is a directory, it will be treated as a jsii npm module.
   *
   * @param fileOrDirectory A .jsii file path or a module directory
   */
  public async load(fileOrDirectory: string) {
    if ((await stat(fileOrDirectory)).isDirectory()) {
      return await this.loadModule(fileOrDirectory);
    } else {
      return await this.loadFile(fileOrDirectory);
    }
  }

  public async loadModule(dir: string): Promise<Assembly> {
    const visited = new Set<string>();
    const self = this;

    const out = await _loadModule(dir, true);
    if (!out) {
      throw new Error(`Unable to load module from directory: ${dir}`);
    }

    return out;

    async function _loadModule(moduleDirectory: string, isRoot = false) {
      if (visited.has(moduleDirectory)) {
        return;
      }
      visited.add(moduleDirectory);

      const filePath = path.join(moduleDirectory, 'package.json');
      const pkg = JSON.parse((await readFile(filePath)).toString());
      if (!pkg.jsii) {
        throw new Error(`No "jsii" section in ${filePath}`);
      }

      const root = await self.loadFile(path.join(moduleDirectory, '.jsii'), isRoot);
      const bundled: string[] = pkg.bundledDependencies || pkg.bundleDependencies || [];

      const loadDependencies = async (deps: { [name: string]: string }) => {
        for (const name of Object.keys(deps || {})) {
          if (bundled.includes(name)) {
            continue;
          }
          const depDir = require.resolve(`${name}/package.json`, {
            paths: [ moduleDirectory ]
          });
          await _loadModule(path.dirname(depDir));
        }
      };

      await loadDependencies(pkg.dependencies);
      await loadDependencies(pkg.peerDependencies);

      return root;
    }
  }

  public async loadFile(file: string, isRoot = true) {
    const spec = JSON.parse((await readFile(file)).toString());
    return this.addAssembly(new Assembly(this, spec), isRoot);
  }

  public addAssembly(asm: Assembly, isRoot = true) {
    if (asm.system !== this) {
      throw new Error('Assembly has been created for different typesystem');
    }

    if (!this._assemblyLookup[asm.name]) {
      this._assemblyLookup[asm.name] = asm;
      this.assemblies.push(asm);
    }

    if (isRoot && !this.roots.includes(asm)) {
      this.roots.push(asm);
    }

    return asm;
  }

  /**
   * Determines whether this TypeSystem includes a given assembly.
   *
   * @param name the name of the assembly being looked for.
   */
  public includesAssembly(name: string): boolean {
    return name in this._assemblyLookup;
  }

  public findAssembly(name: string) {
    if (!(name in this._assemblyLookup)) {
      throw new Error(`Assembly "${name}" not found`);
    }
    return this._assemblyLookup[name];
  }

  public findFqn(fqn: string): Type {
    const [ assembly ] = fqn.split('.');
    const asm = this.findAssembly(assembly);
    return asm.findType(fqn);
  }

  public tryFindFqn(fqn: string): Type | undefined {
    const [ assembly ] = fqn.split('.');
    const asm = this.findAssembly(assembly);
    return asm.tryFindType(fqn);
  }

  public findClass(fqn: string): ClassType {
    const type = this.findFqn(fqn);
    if (!(type instanceof ClassType)) {
      throw new Error(`FQN ${fqn} is not a class`);
    }
    return type;
  }

  public findInterface(fqn: string): InterfaceType {
    const type = this.findFqn(fqn);
    if (!(type instanceof InterfaceType)) {
      throw new Error(`FQN ${fqn} is not an interface`);
    }
    return type;
  }

  public findEnum(fqn: string): EnumType {
    const type = this.findFqn(fqn);
    if (!(type instanceof EnumType)) {
      throw new Error(`FQN ${fqn} is not an enum`);
    }
    return type;
  }

  /**
   * All methods in the type system.
   */
  public get methods() {
    const out = new Array<Method>();
    this.assemblies.forEach(a => {
      a.interfaces.forEach(t => out.push(...t.methods));
      a.classes.forEach(t => out.push(...t.methods));
    });
    return out;
  }

  public get properties() {
    const out = new Array<Property>();
    this.assemblies.forEach(a => {
      a.interfaces.forEach(t => out.push(...t.properties));
      a.classes.forEach(t => out.push(...t.properties));
    });
    return out;
  }

  public get classes() {
    const out = new Array<ClassType>();
    this.assemblies.forEach(a => {
      out.push(...a.classes);
    });
    return out;
  }

  public get interfaces() {
    const out = new Array<InterfaceType>();
    this.assemblies.forEach(a => {
      out.push(...a.interfaces);
    });
    return out;
  }

  public get enums() {
    const out = new Array<EnumType>();
    this.assemblies.forEach(a => {
      out.push(...a.enums);
    });
    return out;
  }
}
