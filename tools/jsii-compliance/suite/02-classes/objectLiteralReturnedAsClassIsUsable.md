# A plain object literal returned as a class is usable

When a kernel method returns a plain object literal whose declared return type is a class, the host MUST receive a usable
object reference and MUST be able to read the class's declared properties, returning the values present in the literal.

## Reference Implementation

```ts
// GIVEN
export class JSObjectLiteralToNative {
  public returnLiteral(): JSObjectLiteralToNativeClass {
    return {
      propA: 'Hello',
      propB: 102,
    };
  }
}

export class JSObjectLiteralToNativeClass {
  public propA = 'A';
  public propB = 0;
}

// WHEN
const obj = new JSObjectLiteralToNative().returnLiteral();

// THEN
expect(obj.propA).toBe('Hello');
expect(obj.propB).toBe(102);
```
