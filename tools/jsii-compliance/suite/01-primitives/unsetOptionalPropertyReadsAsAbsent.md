# Unset optional properties read as absent

An optional property that has never been assigned MUST be read by the host as absent (the host's representation of
"no value"). Assigning an absent value to an optional property MUST be accepted and MUST clear the property in the
kernel.

## Reference Implementation

```ts
// GIVEN
export class Calculator {
  /** The maximum value allowed in this calculator. Optional, with no default. */
  public maxValue?: number;

  public constructor(props: { readonly maximumValue?: number } = {}) {
    this.maxValue = props.maximumValue;
  }
}

// WHEN / THEN
const calculator = new Calculator();

// never assigned: read as absent
expect(calculator.maxValue).toBeUndefined();

// assigning the host's "no value" is accepted and clears the property
expect(() => {
  calculator.maxValue = undefined;
}).not.toThrow();
```
