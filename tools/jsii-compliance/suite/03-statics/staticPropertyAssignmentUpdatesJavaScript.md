# Assigning a static property updates the value in JavaScript

Assigning a value to a static property from the host MUST call the property's setter in the kernel, so that the new value
is observable from JavaScript. The host MUST NOT store the assigned value only on the host side, for example by replacing
the host representation of the property.

## Reference Implementation

```ts
// GIVEN
export class StaticPropertyAssignment {
  public static value = 'default';

  /** Reads `value` from within JavaScript, so that host language assignments are observable. */
  public static readValue(): string {
    return StaticPropertyAssignment.value;
  }

  private constructor() {}
}

// WHEN
const before = StaticPropertyAssignment.readValue();
StaticPropertyAssignment.value = 'assigned';

// THEN
expect(before).toBe('default');
expect(StaticPropertyAssignment.readValue()).toBe('assigned');
expect(StaticPropertyAssignment.value).toBe('assigned');
```

## Kernel Trace

```
> {"api":"sinvoke","fqn":"jsii-calc.StaticPropertyAssignment","method":"readValue","args":[]}
< {"ok":{"result":"default"}}
> {"api":"sset","fqn":"jsii-calc.StaticPropertyAssignment","property":"value","value":"assigned"}
< {"ok":{}}
> {"api":"sinvoke","fqn":"jsii-calc.StaticPropertyAssignment","method":"readValue","args":[]}
< {"ok":{"result":"assigned"}}
> {"api":"sget","fqn":"jsii-calc.StaticPropertyAssignment","property":"value"}
< {"ok":{"value":"assigned"}}
```
