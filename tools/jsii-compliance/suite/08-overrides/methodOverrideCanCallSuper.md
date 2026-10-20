# A host method override can invoke the base implementation

When a host override of a synchronous method invokes the base class implementation, the kernel MUST execute the original
JavaScript implementation and return its result to the override. The override MAY return that result unchanged or
combine it with its own logic. The host MUST be able to select between calling the base implementation and computing its
own result on a per-invocation basis.

## Reference Implementation

```ts
// GIVEN
export class SyncVirtualMethods {
  public get callerIsProperty() {
    return this.virtualMethod(10);
  }

  public virtualMethod(n: number): number {
    return n * 2;
  }
}

// Host subclass whose override can delegate to the base implementation.
class SyncOverrides extends SyncVirtualMethods {
  public multiplier = 5;
  public returnSuper = false;

  public override virtualMethod(n: number): number {
    if (this.returnSuper) {
      return super.virtualMethod(n);
    }
    return n * this.multiplier;
  }
}

// WHEN
const obj = new SyncOverrides();

// THEN
expect(obj.callerIsProperty).toBe(10 * 5);

// The override now delegates to the base implementation, which returns n * 2.
obj.returnSuper = true;
expect(obj.callerIsProperty).toBe(10 * 2);
```
