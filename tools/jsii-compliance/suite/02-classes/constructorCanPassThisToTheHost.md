# A constructor can pass `this` out to the host before returning

When a jsii constructor passes `this` to a host-implemented callback before the constructor has finished running, the
host MUST receive a valid object reference for the still-initializing object and MUST be able to use it. The kernel MUST
assign that object a stable object id and MUST NOT reallocate it: the reference delivered to the callback MUST be the
same reference that the `create` request returns once the constructor completes. Any other arguments passed to the
callback MUST be delivered with their declared types.

## Reference Implementation

```ts
// GIVEN
export enum AllTypesEnum {
  MY_ENUM_VALUE,
  YOUR_ENUM_VALUE = 100,
  THIS_IS_GREAT,
}

export abstract class PartiallyInitializedThisConsumer {
  public abstract consumePartiallyInitializedThis(obj: ConstructorPassesThisOut, dt: Date, ev: AllTypesEnum): string;
}

export class ConstructorPassesThisOut {
  public constructor(consumer: PartiallyInitializedThisConsumer) {
    const result = consumer.consumePartiallyInitializedThis(this, new Date(0), AllTypesEnum.THIS_IS_GREAT);
    if (result !== 'OK') {
      throw new Error(`Expected OK but received ${result}`);
    }
  }
}

// WHEN
class Consumer extends PartiallyInitializedThisConsumer {
  public seen?: ConstructorPassesThisOut;

  public consumePartiallyInitializedThis(obj: ConstructorPassesThisOut, dt: Date, ev: AllTypesEnum): string {
    this.seen = obj;
    expect(dt).toEqual(new Date(0));
    expect(ev).toBe(AllTypesEnum.THIS_IS_GREAT);
    return 'OK';
  }
}

const consumer = new Consumer();
const object = new ConstructorPassesThisOut(consumer);

// THEN
expect(consumer.seen).toBe(object);
```
