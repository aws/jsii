# Object references are labelled with the most derived public type

When the kernel returns an object whose concrete class is not public, it MUST label the reference with the most derived
_public_ type in that object's ancestry. The host MUST represent the reference using that public type: a reference whose
private class extends a public class MUST be usable as that public class, not merely as its root ancestor. When the value
is declared as an interface, the host MUST receive it typed as that interface.

## Reference Implementation

```ts
// GIVEN
export class PublicClass {
  public hello(): void {
    return;
  }
}
export interface IPublicInterface {
  bye(): string;
}
export interface IPublicInterface2 {
  ciao(): string;
}
export class InbetweenClass extends PublicClass implements IPublicInterface2 {
  public ciao(): string {
    return 'ciao';
  }
}
class PrivateClass extends InbetweenClass implements IPublicInterface {
  public bye(): string {
    return 'bye';
  }
}

export class Constructors {
  public static makeClass(): PublicClass {
    return new PrivateClass(); // Wire type should be InbetweenClass
  }
  public static makeInterface(): IPublicInterface {
    return new PrivateClass(); // Wire type should be IPublicInterface
  }
}

// WHEN
const classRef = Constructors.makeClass();
const ifaceRef = Constructors.makeInterface();

// THEN
expect(classRef).toBeInstanceOf(InbetweenClass);
expect(ifaceRef).toBeDefined();
```
