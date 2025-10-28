import * as jsii from '@jsii/spec';

import { memoizedWhenLocked } from './_memoized';
import { Assembly } from './assembly';
import { Callable } from './callable';
import { Documentable } from './docs';
import { OptionalValue } from './optional-value';
import { Overridable } from './overridable';
import { SourceLocatable } from './source';
import { Type } from './type';
import { MemberKind, TypeMember } from './type-member';
import { TypeSystem } from './type-system';

/**
 * Symbolic name for the constructor
 */
export const INITIALIZER_NAME = '<initializer>';

export class Method
  extends Callable
  implements Documentable, Overridable, TypeMember, SourceLocatable
{
  public static isMethod(x: Callable): x is Method {
    return x instanceof Method;
  }

  public readonly kind = MemberKind.Method;

  public constructor(
    system: TypeSystem,
    assembly: Assembly,
    parentType: Type,
    public readonly definingType: Type,
    public readonly spec: jsii.Method,
  ) {
    super(system, assembly, parentType, spec);
  }

  /**
   * The name of the method.
   */
  public get name(): string {
    return this.spec.name;
  }

  @memoizedWhenLocked
  public get overrides(): Type | undefined {
    if (!this.spec.overrides) {
      return undefined;
    }

    return this.system.findFqn(this.spec.overrides);
  }

  /**
   * The return type of the method (undefined if void or initializer)
   */
  public get returns(): OptionalValue {
    return new OptionalValue(this.system, this.spec.returns);
  }

  /**
   * Is this method an abstract method (this means the class will also be an abstract class)
   */
  public get abstract(): boolean {
    return !!this.spec.abstract;
  }

  /**
   * Is this method asyncrhonous (this means the return value is a promise)
   */
  public get async(): boolean {
    return !!this.spec.async;
  }

  /**
   * Indicates if this is a static method.
   */
  public get static(): boolean {
    return !!this.spec.static;
  }

  /**
   * The Method that this method overrides, if any
   */
  public get overriddenMethod(): Method | undefined {
    const o = this.overrides;
    if (o && (o.isClassType() || o.isInterfaceType())) {
      return o.ownMethods.find((m) => m.name === this.name);
    }
    return undefined;
  }
}
