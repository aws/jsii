import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Docs, Documentable } from './docs';
import { OptionalValue } from './optional-value';
import { Overridable } from './overridable';
import { locationInRepository, SourceLocatable, SourceLocation } from './source';
import { Type } from './type';
import { MemberKind, TypeMember } from './type-member';
import { TypeSystem } from './type-system';

export class Property extends OptionalValue implements Documentable, Overridable, TypeMember, SourceLocatable {
  public readonly kind = MemberKind.Property;

  public constructor(
    system: TypeSystem,
    public readonly assembly: Assembly,
    public readonly parentType: Type,
    public readonly definingType: Type,
    private readonly propSpec: jsii.Property) {
    super(system, propSpec);
  }

  public toString() {
    return `property:${this.parentType.fqn}.${this.name}`;
  }

  /**
   * The name of the property.
   */
  public get name(): string {
    return this.propSpec.name;
  }

  /**
   * Indicates if this property only has a getter (immutable).
   */
  public get immutable(): boolean {
    return !!this.propSpec.immutable;
  }

  /**
   * Indicates if this property is protected (otherwise it is public)
   */
  public get protected(): boolean {
    return !!this.propSpec.protected;
  }

  /**
   * Indicates if this property is abstract
   */
  public get abstract(): boolean {
    return !!this.propSpec.abstract;
  }

  /**
   * Indicates if this is a static property.
   */
  public get static(): boolean {
    return !!this.propSpec.static;
  }

  /**
   * A hint that indicates that this static, immutable property is initialized
   * during startup. This allows emitting "const" idioms in different target languages.
   * Implies `static` and `immutable`.
   */
  public get const(): boolean {
    return !!this.propSpec.const;
  }

  public get overrides(): Type | undefined {
    if (!this.propSpec.overrides) {
      return undefined;
    }

    return this.system.findFqn(this.propSpec.overrides);
  }

  public get docs(): Docs {
    return new Docs(this.system, this, this.propSpec.docs || {}, this.parentType.docs);
  }

  /**
   * Return the location in the module
   */
  public get locationInModule(): SourceLocation | undefined {
    return this.propSpec.locationInModule;
  }

  /**
   * Return the location in the repository
   */
  public get locationInRepository(): SourceLocation | undefined {
    return locationInRepository(this);
  }
}
