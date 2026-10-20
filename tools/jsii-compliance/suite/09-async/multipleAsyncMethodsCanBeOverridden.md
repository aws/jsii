# Multiple asynchronous methods can be overridden at once

When the host overrides more than one promise-returning method of a class, invoking a method that awaits both overridden
methods MUST cause the kernel to call back into each of the host's overrides, and MUST compose their resolved values into
the final result.

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
class TwoOverrides extends AsyncVirtualMethods {
  public async overrideMe(_mult: number) {
    return 666;
  }
  public async overrideMeToo() {
    return 10;
  }
}

const obj = new TwoOverrides();

// THEN
expect(await obj.callMe()).toBe(684);
```
