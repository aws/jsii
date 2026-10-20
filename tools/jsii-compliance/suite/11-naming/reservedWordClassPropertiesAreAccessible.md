# Class properties named like reserved words remain accessible

A class property whose name is a reserved word in the host language MUST remain accessible from the host, under a
deterministic, documented alternate name chosen by the binding. A method parameter whose name is a reserved word MUST
likewise remain usable. Both MUST map to their original JavaScript names across the boundary.

## Reference Implementation

```ts
// GIVEN
export class ClassWithJavaReservedWords {
  public readonly int: string;

  public constructor(int: string) {
    this.int = int;
  }

  public import(assert: string): string {
    return this.int + assert;
  }
}

export class JavaReservedWords {
  public while = 'hello';
}

// WHEN
const obj = new ClassWithJavaReservedWords('one');
const result = obj.import('two');
const words = new JavaReservedWords();

// THEN
expect(result).toBe('onetwo');
expect(words.while).toBe('hello');
```
