# An undefined optional map reads as absent, not empty

A property whose declared type is an optional map and whose value is `undefined` in the kernel MUST be read by the host
as absent (the host's representation of "no value"). The host MUST NOT substitute an empty map for the missing value.

## Reference Implementation

```ts
// GIVEN
export class DisappointingCollectionSource {
  /** Some map of strings to numbers, maybe? (Nah, just undefined.) */
  public static readonly maybeMap?: { [key: string]: number } = undefined;

  private constructor() {}
}

// WHEN
const map = DisappointingCollectionSource.maybeMap;

// THEN
expect(map).toBeUndefined();
```
