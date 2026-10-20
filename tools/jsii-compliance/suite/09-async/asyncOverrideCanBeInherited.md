# Overrides inherited from a host base class are registered

When the host instantiates a class that inherits an asynchronous-method override from one of its own (host-defined) base
classes, that override MUST still be registered with the kernel. Invoking a method that awaits the overridden method MUST
cause the kernel to call back into the inherited host implementation.

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
  public foo() {
    return 2222;
  }
}

// The override is inherited, not declared directly on the instantiated class.
class OverrideAsyncMethodsByBaseClass extends OverrideAsyncMethods {}

const obj = new OverrideAsyncMethodsByBaseClass();

// THEN
expect(await obj.callMe()).toBe(4452);
```
