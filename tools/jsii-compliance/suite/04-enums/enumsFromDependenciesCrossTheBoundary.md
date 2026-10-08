# Enum values declared in a dependency cross the boundary

An enum declared in a dependency of the module under test MUST cross the boundary as the correct member: when read from
and written to a property, and when passed to and returned from methods. The host MUST resolve the enum to its
declaration in the dependency, and the member MUST round-trip unchanged.

## Reference Implementation

```ts
// GIVEN (declared in the dependency package)
export enum EnumFromScopedModule {
  VALUE1,
  VALUE2,
}

// GIVEN (declared in the module under test, which depends on the package above)
export class ReferenceEnumFromScopedPackage {
  public foo?: EnumFromScopedModule = EnumFromScopedModule.VALUE2;

  public loadFoo(): EnumFromScopedModule | undefined {
    return this.foo;
  }

  public saveFoo(value: EnumFromScopedModule) {
    this.foo = value;
  }
}

// WHEN / THEN
const obj = new ReferenceEnumFromScopedPackage();
expect(obj.foo).toBe(EnumFromScopedModule.VALUE2);

obj.foo = EnumFromScopedModule.VALUE1;
expect(obj.loadFoo()).toBe(EnumFromScopedModule.VALUE1);

obj.saveFoo(EnumFromScopedModule.VALUE2);
expect(obj.foo).toBe(EnumFromScopedModule.VALUE2);
```
