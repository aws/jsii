import * as jsii from '@jsii/spec';

import { Assembly } from './assembly';
import { Docs, Documentable } from './docs';
import { OptionalValue } from './optional-value';
import { Overridable } from './overridable';
import {
  locationInRepository,
  SourceLocatable,
  SourceLocation,
} from './source';
import { Type } from './type';
import { MemberKind, TypeMember } from './type-member';
import { TypeSystem } from './type-system';

export class Property
  extends OptionalValue
  implements Documentable, Overridable, TypeMember, SourceLocatable
{
  public readonly kind = MemberKind.Property;

  public constructor(
    system: TypeSystem,
    public readonly assembly: Assembly,
    public readonly parentType: Type,
    public readonly definingType: Type,
    public readonly spec: jsii.Property,
  ) {
    super(system, spec);
  }

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

    return this.system.findFqn(this.spec.overrides);
  }

  public get docs(): Docs {
    return new Docs(
      this.system,
      this,
      this.spec.docs ?? {},
      this.parentType.docs,
    );
  }

  /**
   * Return the location in the module
   */
  public get locationInModule(): SourceLocation | undefined {
    return this.spec.locationInModule;
  }

  /**
   * Return the location in the repository
   */
  public get locationInRepository(): SourceLocation | undefined {
    return locationInRepository(this);
  }

  /**
   * The Property that this property overrides, if any
   */
  public get overriddenProperty(): Property | undefined {
    const o = this.overrides;
    if (o && (o.isClassType() || o.isInterfaceType())) {
      return o.ownProperties.find((p) => p.name === this.name);
    }
    return undefined;
  }
}
