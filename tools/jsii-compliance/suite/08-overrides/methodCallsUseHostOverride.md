# The kernel dispatches a synchronous method to the host override

When a host subclass overrides a synchronous method of a jsii class, every invocation of that method originating in the
kernel MUST be dispatched to the host override. This includes invocations the kernel makes indirectly from another
method and invocations the kernel makes while evaluating a property getter. The value the override returns MUST be the
value the kernel uses. State the override keeps on the host instance MUST be observable on subsequent invocations.

## Reference Implementation

```ts
// GIVEN
export class SyncVirtualMethods {
  public callerIsMethod() {
    return this.virtualMethod(10);
  }

  public get callerIsProperty() {
    return this.virtualMethod(10);
  }
  public set callerIsProperty(x: number) {
    this.virtualMethod(x);
  }

  public virtualMethod(n: number): number {
    return n * 2;
  }
}

// Host subclass overriding the synchronous virtual method.
class SyncOverrides extends SyncVirtualMethods {
  public multiplier = 1;

  public override virtualMethod(n: number): number {
    return 5 * n * this.multiplier;
  }
}

// WHEN
const obj = new SyncOverrides();

// THEN
expect(obj.callerIsMethod()).toBe(10 * 5);

// Host state affects the result the kernel observes.
obj.multiplier = 5;
expect(obj.callerIsMethod()).toBe(10 * 5 * 5);

// The override is also reached when the kernel evaluates a property getter.
expect(obj.callerIsProperty).toBe(10 * 5 * 5);
```
