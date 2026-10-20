# Optional constructor parameters can be omitted

The host MUST be able to instantiate a jsii class by sending a `create` request to the kernel. When the trailing
constructor parameter is optional, the host MAY omit it and send no argument for it, in which case the kernel MUST apply
the parameter's default. The host MAY instead provide the optional argument, which the kernel MUST use in place of the
default. Both forms MUST yield a usable object reference.

## Reference Implementation

```ts
// GIVEN
export interface CalculatorProps {
  readonly initialValue?: number;
  readonly maximumValue?: number;
}

export class Calculator {
  public maxValue?: number;

  public constructor(props?: CalculatorProps) {
    this.maxValue = props?.maximumValue;
  }
}

// WHEN
const withoutProps = new Calculator();
const withProps = new Calculator({ maximumValue: 10 });

// THEN
expect(withoutProps).toBeInstanceOf(Calculator);
expect(withProps.maxValue).toBe(10);
```
