import * as jsii from '@jsii/spec';

import { Assembly } from './assembly';
import { Docs, Documentable } from './docs';
import { Overridable } from './overridable';
import { Parameter } from './parameter';
import {
  SourceLocatable,
  locationInRepository,
  SourceLocation,
} from './source';
import { Type } from './type';
import { MemberKind, TypeMember } from './type-member';
import { TypeSystem } from './type-system';

export abstract class Callable
  implements Documentable, Overridable, TypeMember, SourceLocatable
{
  declare public abstract readonly kind: MemberKind;
  declare public abstract readonly name: string;
  declare public abstract readonly abstract: boolean;

  public constructor(
    public readonly system: TypeSystem,
    public readonly assembly: Assembly,
    public readonly parentType: Type,
    public readonly spec: jsii.Callable,
  ) {}

  /**
   * The parameters of the method/initializer
   */
  public get parameters(): Parameter[] {
    return (this.spec.parameters ?? []).map(
      (p) => new Parameter(this.system, this.parentType, this, p),
    );
  }

  /**
   * Indicates if this method is protected (otherwise it is public)
   */
  public get protected(): boolean {
    return !!this.spec.protected;
  }

  /**
   * Indicates whether this method is variadic or not. When ``true``, the last
   * element of ``#parameters`` will also be flagged ``#variadic``.
   */
  public get variadic(): boolean {
    return !!this.spec.variadic;
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

  public toString() {
    return `${this.kind}:${this.parentType.fqn}.${this.name}`;
  }
}
