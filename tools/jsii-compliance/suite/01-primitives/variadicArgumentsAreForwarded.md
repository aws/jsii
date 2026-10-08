# Variadic methods forward all trailing arguments in order

A method declared with a variadic (rest) parameter MUST be invocable from the host with any number of trailing
arguments, including zero. The host MUST pass every supplied argument to the kernel in the order given, appended after
any fixed parameters.

## Reference Implementation

```ts
// GIVEN
export class VariadicMethod {
  private readonly prefix: number[];

  /** @param prefix a prefix used for all values returned by `asArray`. */
  public constructor(...prefix: number[]) {
    this.prefix = prefix;
  }

  /**
   * @param first  the first element of the array (after the `prefix`).
   * @param others other elements to include in the array.
   */
  public asArray(first: number, ...others: number[]): number[] {
    return [...this.prefix, first, ...others];
  }
}

// WHEN
const variadicMethod = new VariadicMethod(1);
const result = variadicMethod.asArray(3, 4, 5, 6);

// THEN
expect(result).toEqual([1, 3, 4, 5, 6]);
```
