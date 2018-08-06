import * as base from '@scope/jsii-calc-base';

/**
 * Abstract class which represents a numeric value.
 */
export abstract class Value extends base.Base {
    /**
     * The value.
     */
    abstract readonly value: number

    /**
     * String representation of the value.
     */
    toString() {
        return this.value.toString();
    }
}

/**
 * Represents a concrete number.
 */
export class Number extends Value {
    /**
     * Creates a Number object.
     * @param value The number.
     */
    constructor(readonly value: number) {
        super();
    }

    /**
     * The number multiplied by 2.
     */
    get doubleValue() {
        return 2 * this.value;
    }
}

/**
 * Represents an operation on values.
 */
export abstract class Operation extends Value {
    abstract toString(): string
}

/**
 * Applies to classes that are considered friendly. These classes can be greeted with
 * a "hello" or "goodbye" blessing and they will respond back in a fun and friendly manner.
 */
export interface IFriendly {
    /**
     * Say hello!
     */
    hello(): string
}

/**
 * This is the first struct we have created in jsii
 */
export interface MyFirstStruct {
    /**
     * A string value
     */
    astring: string

    /**
     * An awesome number value
     */
    anumber: number
    firstOptional?: string[]
}

/**
 * This is a struct with only optional properties.
 */
export interface StructWithOnlyOptionals {
    /**
     * The first optional!
     */
    optional1?: string
    optional2?: number
    optional3?: boolean
}

/**
 * Check that enums from @scoped packages can be references.
 * See awslabs/jsii#138
 */
export enum EnumFromScopedModule {
    Value1,
    Value2
}
