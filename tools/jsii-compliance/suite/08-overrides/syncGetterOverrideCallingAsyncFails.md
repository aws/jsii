# A synchronous override invoking an async method fails (via a getter)

While the kernel is synchronously evaluating a host override that was reached through a property read, that override
MUST NOT invoke an asynchronous method of the kernel. A synchronous callback cannot wait for an asynchronous result, so
if the override attempts such a call the kernel MUST report an error instead of returning a value. In this case the
override is reached because the host reads a property whose kernel getter invokes the overridden method.

## Reference Implementation

```ts
// GIVEN
export class AsyncVirtualMethods {
  public async callMe(): Promise<number> {
    return Promise.resolve(42);
  }
}

export class SyncVirtualMethods {
  public get callerIsProperty() {
    return this.virtualMethod(10);
  }

  public virtualMethod(n: number): number {
    return n * 2;
  }
}

// Host override that calls back into an asynchronous kernel method.
class SyncOverrides extends SyncVirtualMethods {
  public callAsync = false;

  public override virtualMethod(n: number): number {
    if (this.callAsync) {
      // Invoking an asynchronous kernel method from within a synchronous callback is not allowed.
      return new AsyncVirtualMethods().callMe() as unknown as number;
    }
    return n * 2;
  }
}

// WHEN
const obj = new SyncOverrides();
obj.callAsync = true;

// THEN
expect(() => obj.callerIsProperty).toThrow();
```
