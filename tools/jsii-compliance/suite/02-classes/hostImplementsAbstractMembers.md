# Host implementations of abstract members are invoked by the kernel

When the host subclasses an abstract class and implements its abstract method and abstract property, invoking a concrete
method of the base class on that instance MUST cause the kernel to call back into the host's implementations. Property
reads and writes performed by the kernel MUST be routed to the host's getter and setter, and method calls to the host's
method, so the result reflects the host-provided behavior.

## Reference Implementation

```ts
// GIVEN
export abstract class AbstractSuite {
  protected abstract property: string;
  protected abstract someMethod(str: string): string;

  /** Sets `property` to `seed`, then returns `someMethod(this.property)`. */
  public workItAll(seed: string) {
    this.property = seed;
    return this.someMethod(this.property);
  }
}

// WHEN
class Suite extends AbstractSuite {
  private value = '';

  protected someMethod(str: string): string {
    return `Wrapped<${str}>`;
  }
  protected get property(): string {
    return this.value;
  }
  protected set property(value: string) {
    this.value = `String<${value}>`;
  }
}

const suite = new Suite();

// THEN
expect(suite.workItAll('Oomf!')).toBe('Wrapped<String<Oomf!>>');
```
