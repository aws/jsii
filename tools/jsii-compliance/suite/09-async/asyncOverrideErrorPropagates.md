# Errors thrown by host asynchronous overrides propagate to the caller

When the kernel calls back into a host override of a promise-returning method and that override throws, the host MUST
transport the failure to the kernel. The awaiting kernel method MUST then reject, and the host that invoked the
asynchronous method MUST observe an error rather than a result. The original error's message MUST be preserved.

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
class Throwing extends AsyncVirtualMethods {
  public async overrideMe(_mult: number): Promise<number> {
    throw new Error('Thrown by native code');
  }
}

const obj = new Throwing();

// THEN
await expect(obj.callMe()).rejects.toThrow('Thrown by native code');
```
