# Host objects passed as interfaces keep a stable identity across the boundary

When the host passes one of its own objects to the kernel as a behavioral interface, that object MUST be given a stable
reference. When the kernel later returns the object to the host, the host MUST receive the very same object it sent, not
a new proxy. When the host passes the object in again, the kernel MUST reuse the existing reference rather than creating
a second one. Throughout, the kernel MUST be able to call back into the host object's members. This MUST hold both for a
host object that subclasses a kernel class and for a pure host object that only implements the interface.

## Reference Implementation

```ts
// GIVEN
export interface IRandomNumberGenerator {
  next(): number;
}

export abstract class NumericValue {
  public abstract readonly value: number;
}
export class Number extends NumericValue {
  public constructor(public readonly value: number) {
    super();
  }
}

export class NumberGenerator {
  public constructor(public generator: IRandomNumberGenerator) {}

  public nextTimes100() {
    return this.generator.next() * 100;
  }

  public isSameGenerator(gen: IRandomNumberGenerator) {
    return this.generator === gen;
  }
}

// WHEN
// A pure host object, and a host object that subclasses a kernel class.
class PureNativeFriendlyRandom implements IRandomNumberGenerator {
  private nextNumber = 1000;
  public next() {
    const result = this.nextNumber;
    this.nextNumber += 1000;
    return result;
  }
}
class SubclassNativeFriendlyRandom extends Number implements IRandomNumberGenerator {
  private nextNumber = 100;
  public constructor() {
    super(908);
  }
  public next() {
    const result = this.nextNumber;
    this.nextNumber += 100;
    return result;
  }
}

const subclassed = new SubclassNativeFriendlyRandom();
const generatorForSubclassed = new NumberGenerator(subclassed);

const pure = new PureNativeFriendlyRandom();
const generatorForPure = new NumberGenerator(pure);

// THEN
// The object returned by the kernel is the same object that was passed in.
expect(generatorForSubclassed.generator).toBe(subclassed);
expect(generatorForSubclassed.isSameGenerator(subclassed)).toBe(true);
// The kernel calls back into the host object, and the reference is stable across calls.
expect(generatorForSubclassed.nextTimes100()).toBe(10000);
expect(generatorForSubclassed.nextTimes100()).toBe(20000);

expect(generatorForPure.generator).toBe(pure);
expect(generatorForPure.isSameGenerator(pure)).toBe(true);
expect(generatorForPure.nextTimes100()).toBe(100000);
expect(generatorForPure.nextTimes100()).toBe(200000);
```
