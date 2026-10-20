# A host callback receives correctly deserialized arguments

When the kernel invokes a host override and passes arguments, the host MUST deserialize each argument into the host
representation of its declared type before running the override. A structured (map) argument that was created in the
kernel MUST be delivered to the override with all of its entries intact. When the override forwards that argument back
to the kernel, every value MUST round-trip unchanged.

## Reference Implementation

```ts
// GIVEN
export interface MyFirstStruct {
  readonly astring: string;
  readonly anumber: number;
  readonly firstOptional?: string[];
}

export class DataRenderer {
  public render(data: MyFirstStruct = { anumber: 42, astring: 'bazinga!' }): string {
    return this.renderMap(data);
  }

  public renderMap(map: { [key: string]: any }): string {
    return JSON.stringify(map, null, 2);
  }
}

// Host subclass overriding renderMap, forwarding the kernel-provided argument back to the kernel.
class CustomRenderer extends DataRenderer {
  public override renderMap(map: { [key: string]: any }): string {
    return super.renderMap(map);
  }
}

// WHEN
// render() calls renderMap in the kernel, which the kernel dispatches to the host override, passing the default struct.
const result = new CustomRenderer().render();

// THEN
expect(result).toBe('{\n  "anumber": 42,\n  "astring": "bazinga!"\n}');
```
