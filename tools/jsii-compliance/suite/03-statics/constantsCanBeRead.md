# Constants can be read

`static readonly` properties of a jsii class are constants. The host MUST be able to read constants of any type,
including object references, without creating an instance of the class. Reading a constant MUST return the value
initialized in JavaScript.

## Reference Implementation

```ts
// GIVEN
export class DoubleTrouble {
  public hello() {
    return 'world';
  }
}

export class Statics {
  public static readonly Foo = 'hello';
  public static readonly BAR = 1234;
  public static readonly zooBar: { [name: string]: string } = { hello: 'world' };
  public static readonly ConstObj = new DoubleTrouble();
}

// WHEN
const obj = Statics.ConstObj;

// THEN
expect(Statics.Foo).toBe('hello');
expect(Statics.BAR).toBe(1234);
expect(Statics.zooBar['hello']).toBe('world');
expect(obj.hello()).toBe('world');
```
