import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Callable } from './callable';
import { Documentable } from './docs';
import { Overridable } from './overridable';
import { SourceLocatable } from './source';
import { Type } from './type';
import { MemberKind, TypeMember } from './type-member';
import { TypeReference } from './type-ref';
import { TypeSystem } from './type-system';

/**
 * Symbolic name for the constructor
 */
export const INITIALIZER_NAME = '<initializer>';

export class Method extends Callable implements Documentable, Overridable, TypeMember, SourceLocatable {
  public readonly kind = MemberKind.Method;

  constructor(
    system: TypeSystem,
    assembly: Assembly,
    parentType: Type,
    private readonly methodSpec: jsii.Method) {
    super(system, assembly, parentType, methodSpec);
  }

  /**
   * The name of the method.
   */
  public get name(): string {
    return this.methodSpec.name;
  }

  /**
   * The return type of the method (undefined if void or initializer)
   */
  public get returns(): TypeReference {
    return new TypeReference(this.system, this.methodSpec.returns);
  }

  /**
   * Is this method an abstract method (this means the class will also be an abstract class)
   */
  public get abstract(): boolean {
    return !!this.methodSpec.abstract;
  }

  /**
   * Indicates if this is a static method.
   */
  public get static(): boolean {
    return !!this.methodSpec.static;
  }
}
