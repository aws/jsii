import jsii = require('jsii-spec');
import { ClassType } from './class';
import { Dependency } from './dependency';
import { EnumType } from './enum';
import { InterfaceType } from './interface';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class Assembly {
  private _typeCache?: { [fqn: string]: Type };
  private _dependencyCache?: { [name: string]: Dependency };

  public constructor(
    public readonly system: TypeSystem,
    private readonly spec: jsii.Assembly) { }

  /**
   * The version of the spec schema
   */
  public get schema(): jsii.SchemaVersion {
    return this.spec.schema;
  }

  /**
   * The name of the assembly
   */
  public get name(): string {
    return this.spec.name;
  }

  /**
   * Description of the assembly, maps to "description" from package.json
   * This is required since some package managers (like Maven) require it.
   */
  public get description(): string {
    return this.spec.description;
  }

  /**
   * The metadata associated with the assembly, if any.
   */
  public get metadata(): { readonly [key: string]: any } | undefined {
    return this.spec.metadata;
  }

  /**
   * The url to the project homepage. Maps to "homepage" from package.json.
   */
  public get homepage(): string {
    return this.spec.homepage;
  }

  /**
   * The module repository, maps to "repository" from package.json
   * This is required since some package managers (like Maven) require it.
   */
  public get repository(): { type: string, url: string, directory?: string } {
    return this.spec.repository;
  }

  /**
   * The main author of this package.
   */
  public get author(): jsii.Person {
    return this.spec.author;
  }

  /**
   * Additional contributors to this package.
   */
  public get contributors(): jsii.Person[] {
    return this.spec.contributors || [];
  }

  /**
   * A fingerprint that can be used to determine if the specification has changed.
   */
  public get fingerprint(): string {
    return this.spec.fingerprint;
  }

  /**
   * The version of the assembly
   */
  public get version(): string {
    return this.spec.version;
  }

  /**
   * The SPDX name of the license this assembly is distributed on.
   */
  public get license(): string {
    return this.spec.license;
  }

  /**
   * A map of target name to configuration, which is used when generating packages for
   * various languages.
   */
  public get targets() {
    return this.spec.targets;
  }

  /**
   * Dependencies on other assemblies (with semver), the key is the JSII assembly name.
   */
  public get dependencies(): Dependency[] {
    return Object.keys(this._dependencies).map(name => this._dependencies[name]);
  }

  public findDependency(name: string) {
    const dep = this._dependencies[name];
    if (!dep) {
      throw new Error(`Dependency ${name} not found for assembly ${this.name}`);
    }
    return dep;
  }

  /**
   * List if bundled dependencies (these are not expected to be jsii assemblies).
   */
  public get bundled(): { [module: string]: string } {
    return this.spec.bundled || { };
  }

  /**
   * The top-level readme document for this assembly (if any).
   */
  public get readme() {
    return this.spec.readme;
  }

  /**
   * All types in the assembly, keyed by their fully-qualified-name
   */
  public get types(): Type[] {
    return Object.keys(this._types).map(key => this._types[key]);
  }

  public get classes(): ClassType[] {
    return this.types.filter(t => t instanceof ClassType).map(t => t as ClassType);
  }

  public get interfaces(): InterfaceType[] {
    return this.types.filter(t => t instanceof InterfaceType).map(t => t as InterfaceType);
  }

  public get enums(): EnumType[] {
    return this.types.filter(t => t instanceof EnumType).map(t => t as EnumType);
  }

  public findType(fqn: string) {
    const type = this._types[fqn];
    if (!type) {
      throw new Error(`Type '${fqn}' not found in assembly ${this.name}`);
    }
    return type;
  }

  public tryFindType(fqn: string): Type | undefined {
    return this._types[fqn];
  }

  /**
   * Validate an assembly after loading
   *
   * If the assembly was loaded without validation, call this to validate
   * it after all. Throws an exception if validation fails.
   */
  public validate() {
    jsii.validateAssembly(this.spec);
  }

  private get _dependencies() {
    if (!this._dependencyCache) {
      this._dependencyCache = { };
      if (this.spec.dependencies) {
        for (const name of Object.keys(this.spec.dependencies)) {
          this._dependencyCache[name] = new Dependency(this.system, name, this.spec.dependencies[name]);
        }
      }
    }

    return this._dependencyCache;
  }

  private get _types() {
    if (!this._typeCache) {
      this._typeCache = { };

      const ts = this.spec.types || { };
      for (const fqn of Object.keys(ts)) {
        const type = ts[fqn];
        switch (type.kind) {
          case jsii.TypeKind.Class:
            this._typeCache[fqn] = new ClassType(this.system, this, type);
            break;

          case jsii.TypeKind.Interface:
            this._typeCache[fqn] = new InterfaceType(this.system, this, type);
            break;

          case jsii.TypeKind.Enum:
            this._typeCache[fqn] = new EnumType(this.system, this, type);
            break;

          default:
            throw new Error('Unknown type kind');
        }
      }
    }

    return this._typeCache;
  }
}
