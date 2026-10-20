# A host asynchronous override can call the base implementation

When a host override of a promise-returning method invokes the base class implementation, the host MUST be able to call
back into the kernel to run the original method and MUST receive its resolved value. The override MAY combine that value
with its own logic, and the combined result MUST be used as the method's result.

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
class OverrideCallsSuper extends AsyncVirtualMethods {
  public async overrideMe(mult: number) {
    const superValue = await super.overrideMe(mult);
    return superValue * 10 + 1;
  }
}

const obj = new OverrideCallsSuper();

// THEN
expect(await obj.overrideMe(12)).toBe(1441);
expect(await obj.callMe()).toBe(1209);
```
