# A struct property typed as a union of a list and an object keeps its value

A struct property may be declared as a union of a list of object references and a single object reference. When the host
passes such a struct to the kernel and receives it back, the property MUST hold a value of the shape the host assigned: a
single object reference MUST be received as an object reference, and a list MUST be received as a list with the same
elements. Object references MUST preserve their identity. A property the host did not set MUST be received as unset.

## Reference Implementation

```ts
// GIVEN
export interface IFriendly {
  hello(): string;
}

export class Add extends BinaryOperation implements IFriendly {
  /* ... */
}

export interface ConfusingToJacksonStruct {
  readonly unionProperty?: Array<IFriendly | AbstractClass> | IFriendly;
}

export class ConfusingToJackson {
  public static roundTripStruct(input: ConfusingToJacksonStruct): ConfusingToJacksonStruct {
    return { unionProperty: input.unionProperty };
  }
}

// WHEN
const friendly = new Add(new Number(1), new Number(2));
const single = ConfusingToJackson.roundTripStruct({ unionProperty: friendly });
const list = ConfusingToJackson.roundTripStruct({ unionProperty: [friendly] });
const unset = ConfusingToJackson.roundTripStruct({});

// THEN
expect(single.unionProperty).toBe(friendly);
expect(list.unionProperty).toEqual([friendly]);
expect((list.unionProperty as IFriendly[])[0]).toBe(friendly);
expect(unset.unionProperty).toBeUndefined();
```
