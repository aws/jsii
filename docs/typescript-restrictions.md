# Restrictions over vanilla **TypeScript**

`jsii` can only accept APIs that can be represented in all the supported target
languages, and **TypeScript** is a feature-rich, modern programming language. As a
consequence, `jsii` needs to impose restrictions on what **TypeScript** language
features can be used. Certain common **Javascript** idioms are also interpreted
specially by `jsii` in order to support providing a more consistent developer
experience across various languages.

As `jsii` only needs to represent those types that are part of the *exported*
APIs of the package, the restrictions outlined in this document do not apply to
*private* (or *internal*) types and functions.

## Reserved Words

### Target language considerations

`jsii` will emit warnings if reserved words are used as identifiers for any API
element (which will cause a compilation failure if `--fail-on-warnings` is set).
The list of reserved words (which are not also reserved in **TypeScript**),
derived from [`jsii/lib/reserved-words.ts`] is:

**C#**         | **Java**       | **Python**   | **Go**
---------------|----------------|--------------|-------------
`abstract`     | `abstract`     | `False`      | `break`
`base`         | `assert`       | `None`       | `case`
`bool`         | `boolean`      | `True`       | `chan`
`byte`         | `byte`         | `and`        | `const`
`char`         | `char`         | `assert`     | `continue`
`checked`      | `double`       | `def`        | `default`
`decimal`      | `final`        | `del`        | `defer`
`delegate`     | `float`        | `elif`       | `else`
`double`       | `goto`         | `except`     | `fallthrough`
`event`        | `int`          | `from`       | `for`
`explicit`     | `long`         | `global`     | `func`
`extern`       | `native`       | `is`         | `go`
`fixed`        | `short`        | `lambda`     | `goto`
`float`        | `strictfp`     | `nonlocal`   | `if`
`foreach`      | `synchronized` | `not`        | `import`
`goto`         | `throws`       | `or`         | `interface`
`implicit`     | `transient`    | `pass`       | `map`
`int`          | `volatile`     | `raise`      | `package`
`internal`     |                |              | `range`
`is`           |                |              | `return`
`lock`         |                |              | `select`
`long`         |                |              | `struct`
`namespace`    |                |              | `switch`
`object`       |                |              | `type`
`operator`     |                |              | `var`
`out`          |                |              |
`override`     |                |              |
`params`       |                |              |
`readonly`     |                |              |
`ref`          |                |              |
`sbyte`        |                |              |
`sealed`       |                |              |
`short`        |                |              |
`sizeof`       |                |              |
`stackalloc`   |                |              |
`string`       |                |              |
`struct`       |                |              |
`uint`         |                |              |
`ulong`        |                |              |
`unchecked`    |                |              |
`unsafe`       |                |              |
`ushort`       |                |              |
`using`        |                |              |
`virtual`      |                |              |
`volatile`     |                |              |

Code generators from `jsii-pacmak` will try to work around those reserved words
when they are encountered, but may resort to using names that could clash with
other identifiers used in your API, or result in suboptimal experience for
users in languages with conflicts.

[`jsii/lib/reserved-words.ts`]: ../packages/jsii/lib/reserved-words.ts

## Type Members

### Naming

Methods and properties declared on *classes* cannot be named after the class (
meaning they cannot share the same PascalCased representation), as this results
in illegal **C#** code:

> :memo: Due to existing usage (in such cases, an `_` is appended at the end of
> the **type** name, effectively breaking existing .NET code if such a member
> is introduced post-release), this restriction is only enforced when `jsii` is
> invoked with the `--strict` parameter.
>
> It will be upgraded to *always* be an error in a future release.

```ts
export class Name {
  // ⛔️ Illegal property name
  public name: string;
}

export class Name {
  // ⛔️ Illegal method name
  public name(): void { /* ... */ }
}
```

### Overriding

The visibility of a type member cannot be changed when it is overridden, even if
the change increases the visibility of said member, as this would result in
illegal **C#** code:

```ts
export class Base {
  protected method(): void { /* ... */ }
}

export class Child {
  // ⛔️ Illegal change of visibility when overriding a member
  public method(): void { /* ... */ }
}
```

Additionally, **C#** does not allow changing the type signature of members while
overriding them, even if the updated type signature is a strict specialization
of the original one, and this is consequently also forbidden in `jsii`:

```ts
export class Base {
  public method(): any { /* ... */ }
}

export class Child {
  // ⛔️ Illegal change of signature when overriding a member
  public method(): string { /* ... */ }
}
```

## Behavioral Interfaces & Structs

`jsii` considers **TypeScript** interfaces in two distinct categories: *Structs*
and *Behavioral Interfaces*. Both of those entities are represeted using
**TypeScript** interfaces, but have distinct sets of requirements.

### Behavioral Interfaces

Behavioral interfaces are the specification of a contract that a type can elect
to adhere to. They can define a number of `public` members which can be
properties or methods. `jsii` requires that behavioral interfaces have names
prefixed with an uppercase `I`.

```ts
// ⛔️ Illegal name
export interface Foo { /* ... */ }
// ✅ Legal
export interface IFoo { /* ... */ }

// ⛔️ Illegal name
export interface InstanceProvider { /* ... */ }
// ✅ Legal
export interface IInstanceProvider { /* ... */ }

// ⛔️ Illegal extension of a struct
export interface IBar extends SomeStruct { /* ... */ }
```

Interfaces can be implemented by classes or extended by other interfaces, but
may not extend (or be extended by) structs.

### Structs

Structs, on the other hand, are pure data constructs. They may not declare
methods, only `readonly` properties. Those types model what **Javascript**
developers use to model keyword arguments, where they typically pass an object
literal with configuration values to a method or constructor. Structs do not
have names starting with an uppercase `I` (making it possible to define a
behavioral interface that only declares read-only properties as part of its
contract).

```ts
// ⛔️ Illegal
export interface Foo {
  foo(): void; // Structs cannot define methods
}

// ⛔️ Illegal
export interface Bar {
  foo: number; // Struct members must be readonly
}
// ✅ Legal
export interface Baz {
  readonly foo: number;
}

// ⛔️ Illegal extension of a behavioral interface
export interface SomeStruct extends IBehavioralInterface { /* ... */ }
// ✅ Legal
export interface SomeStruct extends OtherStruct { /* ... */ }

// ⛔️ Illegal implementation of a struct
export class BazImpl implements Baz { /* ... */ }
```

Structs can be extended by other structs, but may not extend (or be extended by)
behavioral interfaces, nor can they be implemented by classes.

## Parameterized Types (a.k.a. "Generics")

Due to the lack of a *generics* concept in certain candidate programming
languages (such as **go**), **TypeScript** parameterized types are not
supported by `jsii`, with the exception of standard promises (`Promise<T>`) as
well as arrays (`Array<T>`, which is equivalent to `T[]`).

```ts
// ⛔️ Illegal
export interface Provider<ValueType> {
  get(): ValueType;
}

// ✅ Legal
export interface AsyncFooMaker {
  makeFoo(): Promise<Bar>;
  makeFoos(count: number): Array<Promise<Bar>>;
}
```
