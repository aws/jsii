# Instances returned as an abstract type are fully usable

The host MUST be able to receive an object reference whose declared type is an abstract class or an interface, and MUST
be able to invoke its abstract methods, invoke its concrete (non-abstract) methods, and read properties it inherits from
an interface. A property declared to return an abstract type MUST also yield a usable reference, even when the kernel
backs it with a plain object rather than a class instance.

## Reference Implementation

```ts
// GIVEN
export interface IInterfaceImplementedByAbstractClass {
  readonly propFromInterface: string;
}

export abstract class AbstractClassBase {
  public abstract readonly abstractProperty: string;
}

export abstract class AbstractClass extends AbstractClassBase implements IInterfaceImplementedByAbstractClass {
  public nonAbstractMethod() {
    return 42;
  }
  public abstract abstractMethod(name: string): string;
  public get propFromInterface() {
    return 'propFromInterfaceValue';
  }
}

class ConcreteClass extends AbstractClass {
  public abstractMethod(name: string) {
    return `Hello, ${name}!!`;
  }
  public get abstractProperty() {
    return 'Hello, dude!';
  }
}

export class AbstractClassReturner {
  public giveMeAbstract(): AbstractClass {
    return new ConcreteClass();
  }
  public giveMeInterface(): IInterfaceImplementedByAbstractClass {
    return new ConcreteClass();
  }
  public get returnAbstractFromProperty(): AbstractClassBase {
    return { abstractProperty: 'hello-abstract-property' };
  }
}

// WHEN
const obj = new AbstractClassReturner();
const abstractInstance = obj.giveMeAbstract();
const iface = obj.giveMeInterface();

// THEN
expect(abstractInstance.abstractMethod('John')).toBe('Hello, John!!');
expect(abstractInstance.propFromInterface).toBe('propFromInterfaceValue');
expect(abstractInstance.nonAbstractMethod()).toBe(42);
expect(iface.propFromInterface).toBe('propFromInterfaceValue');
expect(obj.returnAbstractFromProperty.abstractProperty).toBe('hello-abstract-property');
```
