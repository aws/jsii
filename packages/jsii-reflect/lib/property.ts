import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Docs, Documentable } from './docs';
import { Overridable } from './overridable';
import { Type } from './type';
import { TypeReference } from './type-ref';
import { TypeSystem } from './type-system';
// tslint:disable-next-line:ordered-imports
import { TypeMember, MemberKind } from './type-member';

export class Property implements Documentable, Overridable, TypeMember {
  public readonly kind = MemberKind.Property;

  constructor(
    public readonly system: TypeSystem,
    public readonly assembly: Assembly,
    public readonly parentType: Type,
    private readonly spec: jsii.Property) { }

  public toString() {
    return `property:${this.parentType.fqn}.${this.name}`;
  }

  /**
   * The name of the property.
   */
  public get name(): string {
    return this.spec.name;
  }

  /**
   * The type of the property.
   */
  public get type(): TypeReference {
    return new TypeReference(this.system, this.spec.type);
  }

  /**
   * Indicates if this property only has a getter (immutable).
   */
  public get immutable(): boolean {
    return !!this.spec.immutable;
  }

  /**
   * Indicates if this property is protected (otherwise it is public)
   */
  public get protected(): boolean {
    return !!this.spec.protected;
  }

  /**
   * Indicates if this property is abstract
   */
  public get abstract(): boolean {
    return !!this.spec.abstract;
  }

  /**
   * Indicates if this is a static property.
   */
  public get static(): boolean {
    return !!this.spec.static;
  }

  /**
   * A hint that indicates that this static, immutable property is initialized
   * during startup. This allows emitting "const" idioms in different target languages.
   * Implies `static` and `immutable`.
   */
  public get const(): boolean {
    return !!this.spec.const;
  }

  public get overrides(): Type | undefined {
    if (!this.spec.overrides) {
      return undefined;
    }

    return this.system.findFqn(this.spec.overrides.fqn);
  }

  public get docs(): Docs {
    return new Docs(this.system, this, this.spec.docs || {}, this.parentType.docs);
  }
}