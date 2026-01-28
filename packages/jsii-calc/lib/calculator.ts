import {
  Operation,
  NumericValue,
  Number,
  IFriendly,
} from '@scope/jsii-calc-lib';

/* eslint-disable
  @typescript-eslint/no-namespace,
  @typescript-eslint/member-ordering,
*/

/**
 * Even friendlier classes can implement this interface.
 */
export interface IFriendlier extends IFriendly {
  /**
   * Say goodbye.
   * @returns A goodbye blessing.
   */
  goodbye(): string;

  /**
   * Say farewell.
   */
  farewell(): string;
}

/**
 * Generates random numbers.
 */
export interface IRandomNumberGenerator {
  /**
   * Returns another random number.
   * @returns A random number.
   */
  next(): number;
}

export interface IFriendlyRandomGenerator
  extends IRandomNumberGenerator, IFriendly {}

/**
 * Represents an operation with two operands.
 */
export abstract class BinaryOperation extends Operation implements IFriendly {
  /**
   * Creates a BinaryOperation
   * @param lhs Left-hand side operand
   * @param rhs Right-hand side operand
   */
  public constructor(
    public readonly lhs: NumericValue,
    public readonly rhs: NumericValue,
  ) {
    super();
  }

  public hello() {
    return "Hello, I am a binary operation. What's your name?";
  }
}

/**
 * The "+" binary operation.
 */
export class Add extends BinaryOperation {
  public get value() {
    return this.lhs.value + this.rhs.value;
  }

  public toString() {
    return `(${this.lhs.toString()} + ${this.rhs.toString()})`;
  }
}

/**
 * The "*" binary operation.
 */
export class Multiply
  extends BinaryOperation
  implements IFriendlier, IRandomNumberGenerator
{
  public get value() {
    return this.lhs.value * this.rhs.value;
  }

  public toString() {
    return `(${this.lhs.toString()} * ${this.rhs.toString()})`;
  }

  public goodbye() {
    return 'Goodbye from Multiply!';
  }

  public farewell() {
    return 'Farewell to you too!';
  }

  public next() {
    return 89;
  }
}

/**
 * An operation on a single operand.
 */
export abstract class UnaryOperation extends Operation {
  public constructor(public readonly operand: NumericValue) {
    super();
  }
}

/**
 * The negation operation ("-value")
 */
export class Negate extends UnaryOperation implements IFriendlier {
  public get value() {
    return -1 * this.operand.value;
  }

  public toString() {
    return `-${this.operand.toString()}`;
  }

  public hello() {
    return 'I know I am called Negate, but I am friendly';
  }

  public goodbye() {
    return 'See you friend';
  }

  public farewell() {
    return `${this.goodbye()}, oh farewell!`;
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
    public stringStyle = CompositeOperation.CompositionStringStyle.NORMAL;

    /**
     * A set of prefixes to include in a decorated .toString().
     */
    public decorationPrefixes = ['<<[[{{'];

    /**
     * A set of postfixes to include in a decorated .toString().
     */
    public decorationPostfixes = ['}}]]>>'];

    public get value() {
      return this.expression.value;
    }

    /**
     * The expression that this operation consists of.
     * Must be implemented by derived classes.
     */
    public abstract readonly expression: NumericValue;

    public toString() {
      switch (this.stringStyle) {
        case CompositeOperation.CompositionStringStyle.NORMAL:
          return this.expression.toString();
        case CompositeOperation.CompositionStringStyle.DECORATED:
          return (
            this.decorationPrefixes.join('') +
            this.expression.toString() +
            this.decorationPostfixes.join('')
          );
        default:
          throw new Error(`Unknown string style: ${this.stringStyle as any}`);
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
      DECORATED,
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
  public parts: NumericValue[] = [];

  // TODO: some annoying bug in Nashorn will throw this exception if
  // call that prototype's ctor via "apply" instead: java.lang.AssertionError: duplicate code
  public constructor() {
    super();
  }

  public get expression() {
    let curr: NumericValue = new Number(0);
    for (const part of this.parts) {
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
  public constructor(
    public readonly base: NumericValue,
    public readonly pow: NumericValue,
  ) {
    super();
  }

  public get expression(): NumericValue {
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
  /**
   * The initial value of the calculator.
   *
   * NOTE: Any number works here, it's fine.
   *
   * @default 0
   */
  readonly initialValue?: number;

  /**
   * The maximum value the calculator can store.
   *
   * @default none
   */
  readonly maximumValue?: number;
}

/**
 * A calculator which maintains a current value and allows adding operations.
 *
 * Here's how you use it:
 *
 * ```ts
 * const calculator = new calc.Calculator();
 * calculator.add(5);
 * calculator.mul(3);
 * // console.log(calculator.expression.value);
 * ```
 *
 * I will repeat this example again, but in an @example tag.
 *
 * @example
 *
 * const calculator = new calc.Calculator();
 * calculator.add(5);
 * calculator.mul(3);
 * // console.log(calculator.expression.value);
 */
export class Calculator extends composition.CompositeOperation {
  /**
   * Creates a Calculator object.
   * @param props Initialization properties.
   */
  public constructor(props?: CalculatorProps) {
    super();

    props = props ?? {};

    const initialValue = props.initialValue ?? 0;
    this.curr = new Number(initialValue);
    this.maxValue = props.maximumValue;
  }

  /**
   * The current value.
   */
  public curr: NumericValue;

  /**
   * A map of per operation name of all operations performed.
   */
  public readonly operationsMap: { [op: string]: NumericValue[] } = {};

  /**
   * A log of all operations.
   */
  public readonly operationsLog = new Array<NumericValue>();

  /**
   * The maximum value allows in this calculator.
   */
  public maxValue?: number;

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
  public get expression() {
    return this.curr;
  }

  /**
   * Example of a property that accepts a union of types.
   */
  public unionProperty?: Add | Multiply | Power;

  /**
   * Returns teh value of the union property (if defined).
   */
  public readUnionValue() {
    if (!this.unionProperty) {
      return 0;
    }

    return this.unionProperty.value;
  }

  private addOperation(op: string, value: NumericValue) {
    if (this.maxValue && value.value > this.maxValue) {
      throw new Error(
        `Operation ${value.value} exceeded maximum value ${this.maxValue}`,
      );
    }

    let list = this.operationsMap[op];
    if (!list) {
      list = new Array<NumericValue>();
      this.operationsMap[op] = list;
    }
    list.push(value);

    this.operationsLog.push(value);
    this.curr = value;
  }
}

/**
 * Reproduction for https://github.com/aws/jsii/issues/1113
 * Where a method or property named "property" would result in impossible to
 * load Python code.
 */
export class PropertyNamedProperty {
  public readonly property: string = "Hello, I'm property!";
  public readonly yetAnoterOne: boolean = true;
}
export class MethodNamedProperty {
  public property() {
    return "Hello, I'm property()!";
  }

  public readonly elite = 1337;
}
export interface SmellyStruct {
  readonly property: string;
  readonly yetAnoterOne: boolean;
}

/**
 * Ensures abstract members implementations correctly register overrides in various languages.
 */
export abstract class AbstractSuite {
  protected abstract property: string;
  protected abstract someMethod(str: string): string;

  /**
   * Sets `seed` to `this.property`, then calls `someMethod` with `this.property` and returns the result.
   * @param seed a `string`.
   */
  public workItAll(seed: string) {
    this.property = seed;
    return this.someMethod(this.property);
  }
}
