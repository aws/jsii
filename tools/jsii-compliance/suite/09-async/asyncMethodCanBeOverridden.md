# Host overrides of asynchronous methods are invoked by the kernel

When the host subclasses a jsii class and overrides a promise-returning method, invoking another asynchronous method on
the instance that awaits the overridden one MUST cause the kernel to call back into the host's override, and the value
the host returns MUST be used as the awaited result. A method the host adds that does not override any base member MUST
NOT be registered as an override, but the host MAY still call it from within its override.

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
class OverrideAsyncMethods extends AsyncVirtualMethods {
  public async overrideMe(_mult: number) {
    return this.foo() * 2;
  }
  // Does not override any base member.
  public foo() {
    return 2222;
  }
}

const obj = new OverrideAsyncMethods();

// THEN
expect(await obj.callMe()).toBe(4452);
```
