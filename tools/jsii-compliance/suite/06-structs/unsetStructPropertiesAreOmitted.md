# Unset optional properties are omitted, not sent as empty values

When the host passes a struct or map to the kernel, any optional property or key that has no value MUST be omitted
entirely from the data the kernel receives; the host MUST NOT send it with an explicit empty value. Consequently, a
membership test for an unset key MUST report that the key is absent. The same erasure MUST apply in the other direction:
a map returned from the kernel MUST NOT contain keys whose value is unset.

## Reference Implementation

```ts
// GIVEN
export interface EraseUndefinedHashValuesOptions {
  readonly option1?: string;
  readonly option2?: string;
}

export class EraseUndefinedHashValues {
  /** Returns `true` if `key` is defined in `opts`. */
  public static doesKeyExist(opts: EraseUndefinedHashValuesOptions, key: string): boolean {
    return key in opts;
  }

  /** `prop1` holds no value and is expected to be erased. */
  public static prop1IsNull(): { [key: string]: any } {
    return { prop1: undefined, prop2: 'value2' };
  }

  /** `prop2` holds no value and is expected to be erased. */
  public static prop2IsUndefined(): { [key: string]: any } {
    return { prop1: 'value1', prop2: undefined };
  }
}

// WHEN
const opts: EraseUndefinedHashValuesOptions = { option1: 'option1' };

// THEN
expect(EraseUndefinedHashValues.doesKeyExist(opts, 'option1')).toBe(true);
expect(EraseUndefinedHashValues.doesKeyExist(opts, 'option2')).toBe(false); // unset key is absent

expect(EraseUndefinedHashValues.prop1IsNull()).toEqual({ prop2: 'value2' });
expect(EraseUndefinedHashValues.prop2IsUndefined()).toEqual({ prop1: 'value1' });
```
