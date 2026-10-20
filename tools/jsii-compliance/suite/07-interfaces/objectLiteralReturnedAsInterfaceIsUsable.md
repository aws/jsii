# Object literals returned as an interface can be used through it

The kernel may return a bare object that implements a behavioral interface without being an instance of any exported
class. The host MUST receive such a value typed as the declared interface and MUST be able to invoke all of the
interface's members on it, each call reaching the JavaScript implementation.

## Reference Implementation

```ts
// GIVEN
export interface IFriendly {
  hello(): string;
}
export interface IRandomNumberGenerator {
  next(): number;
}
export interface IFriendlyRandomGenerator extends IRandomNumberGenerator, IFriendly {}

export class JSObjectLiteralForInterface {
  public giveMeFriendly(): IFriendly {
    return {
      hello: () => 'I am literally friendly!',
    };
  }

  public giveMeFriendlyGenerator(): IFriendlyRandomGenerator {
    return {
      hello: () => 'giveMeFriendlyGenerator',
      next: () => 42,
    };
  }
}

// WHEN
const subject = new JSObjectLiteralForInterface();
const friendly = subject.giveMeFriendly();
const generator = subject.giveMeFriendlyGenerator();

// THEN
expect(friendly.hello()).toBe('I am literally friendly!');
expect(generator.hello()).toBe('giveMeFriendlyGenerator');
expect(generator.next()).toBe(42);
```
