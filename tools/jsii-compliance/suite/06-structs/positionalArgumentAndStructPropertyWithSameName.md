# A positional argument and a struct property of the same name stay distinct

A method may declare a positional parameter and a trailing struct parameter that has a property with the same name as
that positional parameter. In hosts that lift struct properties into named arguments at the call site, this creates a
potential collision. The host MUST keep the two values distinct: the positional argument value MUST be delivered to the
positional parameter, and the struct property value MUST be delivered inside the struct. The kernel MUST therefore
receive the positional value in the positional slot and the struct, as plain data, in the trailing slot.

## Reference Implementation

```ts
// GIVEN
export class Bell {
  public rung = false;
  public ring() {
    this.rung = true;
  }
}

export interface StructParameterType {
  readonly scope: string; // same name as the positional parameter below
  readonly props?: boolean;
}

export class AmbiguousParameters {
  public constructor(public readonly scope: Bell, public readonly props: StructParameterType) {}
}

// WHEN
const bell = new Bell();
const amb = new AmbiguousParameters(bell, { scope: 'Driiiing!' });

// THEN
expect(amb.scope).toBe(bell); // positional value, delivered by reference
expect(amb.props).toEqual({ scope: 'Driiiing!' }); // struct property value
```
