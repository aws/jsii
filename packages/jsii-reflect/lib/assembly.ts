import * as jsii from '@jsii/spec';

import { ClassType } from './class';
import { Dependency } from './dependency';
import { EnumType } from './enum';
import { InterfaceType } from './interface';
import { ModuleLike } from './module-like';
import { Submodule } from './submodule';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class Assembly extends ModuleLike {
  private _typeCache?: Map<string, Type>;
  private _submoduleCache?: Map<string, Submodule>;
  private _dependencyCache?: Map<string, Dependency>;

  public constructor(
    system: TypeSystem,
    public readonly spec: jsii.Assembly,
  ) {
    super(system);
  }

  public get fqn(): string {
    return this.spec.name;
  }

  /**
   * The version of the spec schema
   */
  public get schema(): jsii.SchemaVersion {
    return this.spec.schema;
  }

  /**
   * The version of the jsii compiler that was used to produce this Assembly.
   */
  public get jsiiVersion(): string {
    return this.spec.jsiiVersion;
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
  public get repository(): {
    readonly type: string;
    readonly url: string;
    readonly directory?: string;
  } {
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
  public get contributors(): readonly jsii.Person[] {
    return this.spec.contributors ?? [];
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
  public get dependencies(): readonly Dependency[] {
    return Array.from(this._dependencies.values());
  }

  /**
   * Return the features used in this assembly
   */
  public get usedFeatures(): readonly jsii.JsiiFeature[] {
    return this.spec.usedFeatures ?? [];
  }

  public findDependency(name: string) {
    const dep = this._dependencies.get(name);
    if (!dep) {
      throw new Error(`Dependency ${name} not found for assembly ${this.name}`);
    }
    return dep;
  }

  /**
   * List if bundled dependencies (these are not expected to be jsii assemblies).
   */
  public get bundled(): { readonly [module: string]: string } {
    return this.spec.bundled ?? {};
  }

  /**
   * The top-level readme document for this assembly (if any).
   */
  public get readme() {
    return this.spec.readme;
  }

  /**
   * Return the those submodules nested directly under the assembly
   */
  public get submodules(): readonly Submodule[] {
    const { submodules } = this._analyzeTypes();
    return Array.from(submodules.entries())
      .filter(([name, _]) => name.split('.').length === 2)
      .map(([_, submodule]) => submodule);
  }

  /**
   * Return all submodules, even those transtively nested
   */
  public get allSubmodules(): readonly Submodule[] {
    const { submodules } = this._analyzeTypes();
    return Array.from(submodules.values());
  }

  /**
   * All types in the assembly and all of its submodules
   */
  public get allTypes(): readonly Type[] {
    return [...this.types, ...this.allSubmodules.flatMap((s) => s.types)];
  }

  /**
   * All classes in the assembly and all of its submodules
   */
  public get allClasses(): readonly ClassType[] {
    return this.allTypes.filter((t) => t instanceof ClassType).map((t) => t);
  }

  /**
   * All interfaces in the assembly and all of its submodules
   */
  public get allInterfaces(): readonly InterfaceType[] {
    return this.allTypes
      .filter((t) => t instanceof InterfaceType)
      .map((t) => t);
  }

  /**
   * All interfaces in the assembly and all of its submodules
   */
  public get allEnums(): readonly EnumType[] {
    return this.allTypes.filter((t) => t instanceof EnumType).map((t) => t);
  }

  public findType(fqn: string) {
    const type = this.tryFindType(fqn);
    if (!type) {
      throw new Error(`Type '${fqn}' not found in assembly ${this.name}`);
    }
    return type;
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

  protected get submoduleMap(): ReadonlyMap<string, Submodule> {
    return this._analyzeTypes().submodules;
  }

  /**
   * All types in the root of the assembly
   */
  protected get typeMap(): ReadonlyMap<string, Type> {
    return this._analyzeTypes().types;
  }

  private get _dependencies() {
    if (!this._dependencyCache) {
      this._dependencyCache = new Map();
      if (this.spec.dependencies) {
        for (const name of Object.keys(this.spec.dependencies)) {
          this._dependencyCache.set(
            name,
            new Dependency(this.system, name, this.spec.dependencies[name]),
          );
        }
      }
    }

    return this._dependencyCache;
  }

  private _analyzeTypes() {
    if (!this._typeCache || !this._submoduleCache) {
      this._typeCache = new Map();

      const submoduleBuilders = this.discoverSubmodules();

      const ts = this.spec.types ?? {};
      for (const [fqn, typeSpec] of Object.entries(ts)) {
        let type: Type;
        switch (typeSpec.kind) {
          case jsii.TypeKind.Class:
            type = new ClassType(this.system, this, typeSpec);
            break;

          case jsii.TypeKind.Interface:
            type = new InterfaceType(this.system, this, typeSpec);
            break;

          case jsii.TypeKind.Enum:
            type = new EnumType(this.system, this, typeSpec);
            break;

          default:
            throw new Error('Unknown type kind');
        }

        // Find containing submodule (potentially through containing nested classes,
        // which DO count as namespaces but don't count as modules)
        let submodule = typeSpec.namespace;
        while (submodule != null && `${this.spec.name}.${submodule}` in ts) {
          submodule = ts[`${this.spec.name}.${submodule}`].namespace;
        }

        if (submodule != null) {
          const moduleName = `${this.spec.name}.${submodule}`;
          submoduleBuilders.get(moduleName)!.addType(type);
        } else {
          this._typeCache.set(fqn, type);
        }
      }

      this._submoduleCache = mapValues(submoduleBuilders, (b) => b.build());
    }
    return { types: this._typeCache, submodules: this._submoduleCache };
  }

  /**
   * Return a builder for all submodules in this assembly (so that we can
   * add types into the objects).
   */
  private discoverSubmodules(): Map<string, SubmoduleBuilder> {
    const system = this.system;

    const ret = new Map<string, SubmoduleBuilder>();
    for (const [submoduleName, submoduleSpec] of Object.entries(
      this.spec.submodules ?? {},
    )) {
      ret.set(
        submoduleName,
        new SubmoduleBuilder(system, submoduleSpec, submoduleName, ret),
      );
    }
    return ret;
  }
}

/**
 * Mutable Submodule builder
 *
 * Allows adding Types before the submodule is frozen to a Submodule class.
 *
 * Takes a reference to the full map of submodule builders, so that come time
 * to translate
 */
class SubmoduleBuilder {
  private readonly types = new Map<string, Type>();

  private _built?: Submodule;

  public constructor(
    private readonly system: TypeSystem,
    private readonly spec: jsii.Submodule,
    private readonly fullName: string,
    private readonly allModuleBuilders: Map<string, SubmoduleBuilder>,
  ) {}

  /**
   * Whether this submodule is a direct child of another submodule
   */
  public isChildOf(other: SubmoduleBuilder) {
    return (
      this.fullName.startsWith(`${other.fullName}.`) &&
      this.fullName.split('.').length === other.fullName.split('.').length + 1
    );
  }

  public build(): Submodule {
    this._built ??= new Submodule(
      this.system,
      this.spec,
      this.fullName,
      mapValues(this.findSubmoduleBuilders(), (b) => b.build()),
      this.types,
    );
    return this._built;
  }

  /**
   * Return all the builders from the map that are nested underneath ourselves.
   */
  private findSubmoduleBuilders() {
    const ret = new Map<string, SubmoduleBuilder>();
    for (const [k, child] of this.allModuleBuilders) {
      if (child.isChildOf(this)) {
        ret.set(k, child);
      }
    }
    return ret;
  }

  public addType(type: Type) {
    this.types.set(type.fqn, type);
  }
}

function mapValues<A, B>(
  xs: ReadonlyMap<string, A>,
  fn: (x: A) => B,
): Map<string, B> {
  const ret = new Map<string, B>();
  for (const [k, v] of xs) {
    ret.set(k, fn(v));
  }
  return ret;
}
