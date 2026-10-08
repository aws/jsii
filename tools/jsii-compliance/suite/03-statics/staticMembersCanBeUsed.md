# Static methods and properties can be used

Static methods of a jsii class MUST be invocable from the host without an instance, and MUST accept and return values of
their declared types. Static properties MUST be readable from the host, and static properties that are not `readonly`
MUST also be writable. A value assigned from the host MUST be returned by subsequent reads, and MAY be an object
reference created by the host.

## Reference Implementation

```ts
// GIVEN
export class Statics {
  public constructor(public readonly value: string) {}

  public static staticMethod(name: string) {
    return `hello ,${name}!`;
  }

  private static _instance?: Statics;
  public static get instance(): Statics {
    this._instance ??= new Statics('default');
    return this._instance;
  }
  public static set instance(val: Statics) {
    this._instance = val;
  }

  public static nonConstStatic = 100;
}

// WHEN
const greeting = Statics.staticMethod('Yoyo');
const defaultInstance = Statics.instance;

const newStatics = new Statics('new value');
Statics.instance = newStatics;

// THEN
expect(greeting).toBe('hello ,Yoyo!');
expect(defaultInstance.value).toBe('default');
expect(Statics.instance).toBe(newStatics);
expect(Statics.instance.value).toBe('new value');
expect(Statics.nonConstStatic).toBe(100);
```
