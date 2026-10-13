# JSON values cross the boundary unchanged

A JSON value built with the host's native JSON representation MUST be received by the kernel as exactly the same JSON
data: the same keys, values and nesting. This MUST hold for any key, and when the JSON value is nested inside a native
map or list.

## Reference Implementation

```ts
// GIVEN
export class JsonFormatter {
  public static stringify(value?: any): string | undefined {
    return JSON.stringify(value, null, 2);
  }
}

const json = {
  '$jsii.date': '1970-01-01T00:00:00.000Z',
  nested: { '$jsii.enum': 'jsii-calc.AllTypesEnum/MY_ENUM_VALUE' },
  list: [{ '$jsii.map': { key: 'value' } }],
};

// WHEN / THEN
// The host builds `json` with its native JSON representation.
expect(JSON.parse(JsonFormatter.stringify(json)!)).toEqual(json);

// The host builds `{ payload: json }` with its native map type.
expect(JSON.parse(JsonFormatter.stringify({ payload: json })!)).toEqual({
  payload: json,
});
```
