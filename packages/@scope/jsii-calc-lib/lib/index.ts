import * as base from '@scope/jsii-calc-base';
import { Very } from '@scope/jsii-calc-base-of-base';

/**
 * Abstract class which represents a numeric value.
 */
export abstract class NumericValue extends base.Base {
  /**
   * The value.
   */
  public abstract readonly value: number;

  /**
   * String representation of the value.
   */
  public toString() {
    return this.value.toString();
  }
}

/**
 * The general contract for a concrete number.
 */
export interface IDoublable {
  readonly doubleValue: number;
}

/**
 * Represents a concrete number.
 */
export class Number extends NumericValue implements IDoublable {
  /**
   * Creates a Number object.
   * @param value The number.
   */
  public constructor(public readonly value: number) {
    super();
  }

  /**
   * The number multiplied by 2.
   */
  public get doubleValue() {
    return 2 * this.value;
  }
}

/**
 * Represents an operation on values.
 */
export abstract class Operation extends NumericValue {
  public abstract toString(): string;
}

/**
 * Applies to classes that are considered friendly. These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
export interface IFriendly {
  /**
   * Say hello!
   */
  hello(): string;
}

/**
 * This is the first struct we have created in jsii
 */
export interface MyFirstStruct {
  /**
   * A string value
   */
  readonly astring: string;

  /**
   * An awesome number value
   */
  readonly anumber: number;
  readonly firstOptional?: string[];
}

/**
 * This is a struct with only optional properties.
 */
export interface StructWithOnlyOptionals {
  /**
   * The first optional!
   */
  readonly optional1?: string;
  readonly optional2?: number;
  readonly optional3?: boolean;
}

/**
 * Check that enums from \@scoped packages can be references.
 * See awslabs/jsii#138
 */
export enum EnumFromScopedModule {
  VALUE1,
  VALUE2,
}

/**
 * Interface that inherits from packages 2 levels up the tree
 *
 * Their presence validates that .NET/Java/jsii-reflect can track all fields
 * far enough up the tree.
 */
export interface IThreeLevelsInterface extends base.IBaseInterface {
  baz(): void;
}

/**
 * A base class for testing #2647. The method `foo` has a parameter that uses a type
 * from a dependent module. Since Go "reimplments" this method, it will also need
 * to include an "import" statement for the calc-base module.
 *
 * @see https://github.com/aws/jsii/issues/2647
 */
export class BaseFor2647 {
  public constructor(very: Very) {
    very.hey();
  }

  public foo(obj: base.IBaseInterface): void {
    obj.bar();
  }
}

export * as submodule from './submodule';
export * from './duplicate-inherited-prop';
export * as deprecationRemoval from './deprecation-removal';
