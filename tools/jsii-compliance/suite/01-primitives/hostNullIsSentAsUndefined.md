# An absent host value is transmitted as undefined

When the host supplies its representation of "no value" for an optional constructor argument, method argument, struct
property, list element, or property assignment, that value MUST be transmitted to the kernel as `undefined`. From the
kernel's perspective the value MUST be strictly equal to `undefined`, and an optional struct key that was not given a
value MUST be absent from the object entirely.

## Reference Implementation

```ts
// GIVEN
export class NullShouldBeTreatedAsUndefined {
  public changeMeToUndefined? = 'hello';

  public constructor(_param1: string, optional?: any) {
    if (optional !== undefined) {
      throw new Error('Expecting second constructor argument to be "undefined"');
    }
  }

  public giveMeUndefined(value?: any) {
    if (value !== undefined) {
      throw new Error(`Expected undefined, got: ${JSON.stringify(value)}`);
    }
  }

  public giveMeUndefinedInsideAnObject(input: NullShouldBeTreatedAsUndefinedData) {
    if (input.thisShouldBeUndefined !== undefined) {
      throw new Error('Expected "thisShouldBeUndefined" to be undefined');
    }
    const array = input.arrayWithThreeElementsAndUndefinedAsSecondArgument;
    if (array.length !== 3 || array[1] !== undefined) {
      throw new Error('Expected the middle array element to be undefined');
    }
  }

  public verifyPropertyIsUndefined() {
    if (this.changeMeToUndefined !== undefined) {
      throw new Error('Expecting property "changeMeToUndefined" to be undefined');
    }
  }
}

export interface NullShouldBeTreatedAsUndefinedData {
  readonly thisShouldBeUndefined?: any;
  readonly arrayWithThreeElementsAndUndefinedAsSecondArgument: any[];
}

// WHEN / THEN
// In the host, each `undefined` below is supplied as the host's own "no value" representation.
const obj = new NullShouldBeTreatedAsUndefined('hello', undefined);

expect(() => obj.giveMeUndefined(undefined)).not.toThrow();
expect(() =>
  obj.giveMeUndefinedInsideAnObject({
    thisShouldBeUndefined: undefined,
    arrayWithThreeElementsAndUndefinedAsSecondArgument: ['hello', undefined, 'boom'],
  }),
).not.toThrow();

obj.changeMeToUndefined = undefined;
expect(() => obj.verifyPropertyIsUndefined()).not.toThrow();
```
