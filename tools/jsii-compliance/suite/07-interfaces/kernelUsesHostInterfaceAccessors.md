# The kernel invokes host-implemented interface property accessors

When the host provides an implementation of a behavioral interface that declares properties, the kernel MUST read those
properties through the host's getter and write them through the host's setter. Each read the kernel performs MUST return
the value the host's getter produces, and each write MUST invoke the host's setter with the assigned value, so that any
transformation the host applies is observable on the next read.

## Reference Implementation

```ts
// GIVEN
export interface IInterfaceWithProperties {
  readonly readOnlyString: string;
  readWriteString: string;
}

export class UsesInterfaceWithProperties {
  public constructor(public readonly obj: IInterfaceWithProperties) {}

  public justRead() {
    return this.obj.readOnlyString;
  }

  public writeAndRead(value: string) {
    this.obj.readWriteString = value;
    return this.obj.readWriteString;
  }
}

// WHEN
// A host implementation whose accessors transform the values that cross the boundary.
class Impl implements IInterfaceWithProperties {
  private x = '';
  public get readOnlyString() {
    return 'READ_ONLY_STRING';
  }
  public get readWriteString() {
    return `${this.x}?`;
  }
  public set readWriteString(value: string) {
    this.x = `${value}!`;
  }
}
const interact = new UsesInterfaceWithProperties(new Impl());

// THEN
expect(interact.justRead()).toBe('READ_ONLY_STRING');
expect(interact.writeAndRead('Hello')).toBe('Hello!?');
```
