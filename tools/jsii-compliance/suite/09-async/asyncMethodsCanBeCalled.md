# Asynchronous methods can be invoked from the host

The host MUST be able to invoke a promise-returning (asynchronous) method on an object reference. It MUST issue the call
as an asynchronous (begin) request, allow the kernel to run its pending callbacks and promises to completion, and then
collect the resolved value, which it MUST return to the caller. This applies both to a method that internally awaits
other asynchronous methods and to an asynchronous method invoked directly.

## Reference Implementation

```ts
// GIVEN
export class AsyncVirtualMethods {
  public async callMe() {
    return (await this.overrideMe(10)) + this.dontOverrideMe() + (await this.overrideMeToo());
  }
  public async overrideMe(mult: number) {
    return Promise.resolve(12 * mult);
  }
  public async overrideMeToo() {
    return Promise.resolve(0);
  }
  public dontOverrideMe() {
    return 8;
  }
}

// WHEN
const obj = new AsyncVirtualMethods();

// THEN
expect(await obj.callMe()).toBe(128);
expect(await obj.overrideMe(44)).toBe(528);
```
