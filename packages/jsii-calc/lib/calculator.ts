import { Operation, Value, Number, IFriendly } from '@scope/jsii-calc-lib'

/**
 * Even friendlier classes can implement this interface.
 */
export interface IFriendlier extends IFriendly {
    /**
     * Say goodbye.
     * @returns A goodbye blessing.
     */
    goodbye(): string

    /**
     * Say farewell.
     */
    farewell(): string
}

/**
 * Generates random numbers.
 */
export interface IRandomNumberGenerator {
    /**
     * Returns another random number.
     * @returns A random number.
     */
    next(): number
}

export interface IFriendlyRandomGenerator extends IRandomNumberGenerator, IFriendly {

}

/**
 * Represents an operation with two operands.
 */
export abstract class BinaryOperation extends Operation implements IFriendly {
    /**
     * Creates a BinaryOperation
     * @param lhs Left-hand side operand
     * @param rhs Right-hand side operand
     */
    constructor(readonly lhs: Value, readonly rhs: Value) {
        super();
    }

    hello() {
        return 'Hello, I am a binary operation. What\'s your name?';
    }
}

/**
 * The "+" binary operation.
 */
export class Add extends BinaryOperation {
    get value() {
        return this.lhs.value + this.rhs.value;
    }

    toString() {
        return `(${this.lhs} + ${this.rhs})`
    }
}

/**
 * The "*" binary operation.
 */
export class Multiply extends BinaryOperation implements IFriendlier, IRandomNumberGenerator {
    get value() {
        return this.lhs.value * this.rhs.value;
    }

    toString() {
        return `(${this.lhs} * ${this.rhs})`
    }

    goodbye() {
        return 'Goodbye from Multiply!';
    }

    farewell() {
        return 'Farewell to you too!';
    }

    next() {
        return 89;
    }
}

/**
 * An operation on a single operand.
 */
export abstract class UnaryOperation extends Operation {
    constructor(readonly operand: Value) {
        super();
    }
}

/**
 * The negation operation ("-value")
 */
export class Negate extends UnaryOperation implements IFriendlier {
    get value() {
        return -1 * this.operand.value;
    }

    toString() {
        return `-${this.operand}`;
    }

    hello() {
        return 'I know I am called Negate, but I am friendly';
    }

    goodbye() {
        return 'See you friend';
    }

    farewell() {
        return this.goodbye() + ', oh farewell!';
    }
}

/**
 * Utilities for composing multiple operations.
 */
export namespace composition {
    /**
     * Abstract operation composed from an expression of other operations.
     */
    export abstract class CompositeOperation extends Operation {
        /**
         * The .toString() style.
         */
        public stringStyle = CompositeOperation.CompositionStringStyle.NORMAL

        /**
         * A set of prefixes to include in a decorated .toString().
         */
        public decorationPrefixes = [ '<<[[{{' ]

        /**
         * A set of postfixes to include in a decorated .toString().
         */
        public decorationPostfixes = [ '}}]]>>' ];

        get value() {
            return this.expression.value;
        }

        /**
         * The expression that this operation consists of.
         * Must be implemented by derived classes.
         */
        abstract readonly expression: Value;

        toString() {
            switch (this.stringStyle) {
                case CompositeOperation.CompositionStringStyle.NORMAL:
                    return this.expression.toString();
                case CompositeOperation.CompositionStringStyle.DECORATED:
                    return this.decorationPrefixes.join('') + this.expression.toString() + this.decorationPostfixes.join('');
                default:
                    throw new Error(`Unknown string style: ${this.stringStyle}`);
            }
        }
    }

    export namespace CompositeOperation {
        /**
         * Style of .toString() output for CompositeOperation.
         */
        export enum CompositionStringStyle {
            /** Normal string expression */
            NORMAL,

            /** Decorated string expression */
            DECORATED
        }
    }
}

/**
 * An operation that sums multiple values.
 */
export class Sum extends composition.CompositeOperation {

    /**
     * The parts to sum.
     */
    parts: Value[] = [];

    // TODO: some annoying bug in Nashorn will throw this exception if
    // call that prototype's ctor via "apply" instead: java.lang.AssertionError: duplicate code
    constructor() {
        super();
    }

    get expression() {
        let curr: Value = new Number(0);
        for (let part of this.parts) {
            curr = new Add(curr, part);
        }
        return curr;
    }
}

/**
 * The power operation.
 */
export class Power extends composition.CompositeOperation {

    /**
     * Creates a Power operation.
     * @param base The base of the power
     * @param pow The number of times to multiply
     */
    constructor(readonly base: Value, readonly pow: Value) {
        super();
    }

    get expression(): Value {
        let curr: Operation = new Number(1);
        for (let i = 0; i < this.pow.value; ++i) {
            curr = new Multiply(curr, this.base);
        }
        return curr;
    }
}

/**
 * Properties for Calculator.
 */
export interface CalculatorProps {
    readonly initialValue?: number
    readonly maximumValue?: number
}

/**
 * A calculator which maintains a current value and allows adding operations.
 */
export class Calculator extends composition.CompositeOperation {

    /**
     * Creates a Calculator object.
     * @param props Initialization properties.
     */
    constructor(props?: CalculatorProps) {
        super();

        props = props || { };

        const initialValue = props.initialValue ? props.initialValue : 0;
        this.curr = new Number(initialValue);
        this.maxValue = props.maximumValue;
    }

    /**
     * The current value.
     */
    public curr: Value

    /**
     * A map of per operation name of all operations performed.
     */
    public readonly operationsMap: { [op: string]: Value[] } = { }

    /**
     * A log of all operations.
     */
    public readonly operationsLog = new Array<Value>();

    /**
     * The maximum value allows in this calculator.
     */
    public maxValue?: number

    /**
     * Adds a number to the current value.
     */
    public add(value: number) {
        this.addOperation('add', new Add(this.curr, new Number(value)));
    }

    /**
     * Multiplies the current value by a number.
     */
    public mul(value: number) {
        this.addOperation('mul', new Multiply(this.curr, new Number(value)));
    }

    /**
     * Raises the current value by a power.
     */
    public pow(value: number) {
        this.addOperation('pow', new Power(this.curr, new Number(value)));
    }

    /**
     * Negates the current value.
     */
    public neg() {
        this.addOperation('neg', new Negate(this.curr));
    }

    /**
     * Returns the expression.
     */
    get expression() {
        return this.curr;
    }

    /**
     * Example of a property that accepts a union of types.
     */
    public unionProperty?: Add | Multiply | Power

    /**
     * Returns teh value of the union property (if defined).
     */
    public readUnionValue() {
        if (!this.unionProperty) {
            return 0;
        }

        return this.unionProperty.value;
    }

    private addOperation(op: string, value: Value) {
        if (this.maxValue && value.value > this.maxValue) {
            throw new Error(`Operation ${value} exceeded maximum value ${this.maxValue}`);
        }

        let list = this.operationsMap[op];
        if (!list) {
            list = new Array<Value>();
            this.operationsMap[op] = list;
        }
        list.push(value);

        this.operationsLog.push(value);
        this.curr = value;
    }
}
