# Classes with a private constructor are created via a static factory

When a class declares a private constructor, the host MUST NOT expose a way to construct it directly and MUST instead
obtain instances through the class's static factory method, invoked as a static method on the type. On the returned
reference, the host MUST be able to read a read-only property and MUST be able to both read and assign a read-write
property.

## Reference Implementation

```ts
// GIVEN
export class ClassWithPrivateConstructorAndAutomaticProperties {
  public static create(readOnlyString: string, readWriteString: string) {
    return new ClassWithPrivateConstructorAndAutomaticProperties(readOnlyString, readWriteString);
  }

  private constructor(
    public readonly readOnlyString: string,
    public readWriteString: string,
  ) {}
}

// WHEN
const obj = ClassWithPrivateConstructorAndAutomaticProperties.create('Hello', 'Bye');
const initialReadWrite = obj.readWriteString;
obj.readWriteString = 'Hello';

// THEN
expect(initialReadWrite).toBe('Bye');
expect(obj.readOnlyString).toBe('Hello');
expect(obj.readWriteString).toBe('Hello');
```
