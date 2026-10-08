# Objects can be used through every interface they implement

A value MUST be usable through each of the behavioral interfaces it declares. The host MUST be able to invoke the
methods of an interface on any value typed as that interface, and each call MUST be dispatched to the correct
implementation. This MUST hold regardless of where the implementation lives: a kernel object, a bare object returned by
the kernel as an interface, a host object that subclasses a kernel class, or a pure host implementation of the
interface.

## Reference Implementation

```ts
// GIVEN
export interface IFriendly {
  hello(): string;
}
export interface IFriendlier extends IFriendly {
  goodbye(): string;
  farewell(): string;
}
export interface IRandomNumberGenerator {
  next(): number;
}
export interface IFriendlyRandomGenerator extends IRandomNumberGenerator, IFriendly {}

export abstract class NumericValue {
  public abstract readonly value: number;
}
export class Number extends NumericValue {
  public constructor(public readonly value: number) {
    super();
  }
}
abstract class BinaryOperation extends NumericValue implements IFriendly {
  public constructor(public readonly lhs: NumericValue, public readonly rhs: NumericValue) {
    super();
  }
  public hello() {
    return "Hello, I am a binary operation. What's your name?";
  }
}
export class Add extends BinaryOperation {
  public get value() {
    return this.lhs.value + this.rhs.value;
  }
}
export class Multiply extends BinaryOperation implements IFriendlier, IRandomNumberGenerator {
  public get value() {
    return this.lhs.value * this.rhs.value;
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
export class DoubleTrouble implements IFriendlyRandomGenerator {
  public next() {
    return 12;
  }
  public hello() {
    return 'world';
  }
}
export class Polymorphism {
  public sayHello(friendly: IFriendly) {
    return `oh, ${friendly.hello()}`;
  }
}

// WHEN
// A host subclass of a kernel class, and a pure host implementation of the interfaces.
class SubclassNativeFriendlyRandom extends Number implements IFriendly, IRandomNumberGenerator {
  private nextNumber = 100;
  public constructor() {
    super(908);
  }
  public hello() {
    return 'SubclassNativeFriendlyRandom';
  }
  public next() {
    const result = this.nextNumber;
    this.nextNumber += 100;
    return result;
  }
}
class PureNativeFriendlyRandom implements IFriendlyRandomGenerator {
  private nextNumber = 1000;
  public next() {
    const result = this.nextNumber;
    this.nextNumber += 1000;
    return result;
  }
  public hello() {
    return 'I am a native!';
  }
}

const add = new Add(new Number(10), new Number(20));
const multiply = new Multiply(new Number(10), new Number(30));
const doubleTrouble = new DoubleTrouble();
const poly = new Polymorphism();

// THEN
// A value is reachable through each interface it declares.
expect((add as IFriendly).hello()).toBe("Hello, I am a binary operation. What's your name?");
expect((multiply as IFriendly).hello()).toBe("Hello, I am a binary operation. What's your name?");
expect((multiply as IFriendlier).goodbye()).toBe('Goodbye from Multiply!');
expect((multiply as IRandomNumberGenerator).next()).toBe(89);

expect((doubleTrouble as IFriendlyRandomGenerator).hello()).toBe('world');
expect((doubleTrouble as IFriendlyRandomGenerator).next()).toBe(12);

// Polymorphism accepts any IFriendly, implemented anywhere.
expect(poly.sayHello(add)).toBe("oh, Hello, I am a binary operation. What's your name?");
expect(poly.sayHello(doubleTrouble)).toBe('oh, world');
expect(poly.sayHello(new SubclassNativeFriendlyRandom())).toBe('oh, SubclassNativeFriendlyRandom');
expect(poly.sayHello(new PureNativeFriendlyRandom())).toBe('oh, I am a native!');
```
