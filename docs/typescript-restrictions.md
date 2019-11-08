# Restrictions over vanilla **TypeScript**

`jsii` can only accept APIs that can be represented in all the supported target
languagues, and **TypeScript** is a feature-rich, modern programming language. As a
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

**C#**         | **Java**       | **Python**
---------------|----------------|---------------
`abstract`     | `abstract`     | `False`
`base`         | `assert`       | `None`
`bool`         | `boolean`      | `True`
`byte`         | `byte`         | `and`
`char`         | `char`         | `assert`
`checked`      | `double`       | `def`
`decimal`      | `final`        | `del`
`delegate`     | `float`        | `elif`
`double`       | `goto`         | `except`
`event`        | `int`          | `from`
`explicit`     | `long`         | `global`
`extern`       | `native`       | `is`
`fixed`        | `short`        | `lambda`
`float`        | `strictfp`     | `nonlocal`
`foreach`      | `synchronized` | `not`
`goto`         | `throws`       | `or`
`implicit`     | `transient`    | `pass`
`int`          | `volatile`     | `raise`
`internal`     |                |
`is`           |                |
`lock`         |                |
`long`         |                |
`namespace`    |                |
`object`       |                |
`operator`     |                |
`out`          |                |
`override`     |                |
`params`       |                |
`readonly`     |                |
`ref`          |                |
`sbyte`        |                |
`sealed`       |                |
`short`        |                |
`sizeof`       |                |
`stackalloc`   |                |
`string`       |                |
`struct`       |                |
`uint`         |                |
`ulong`        |                |
`unchecked`    |                |
`unsafe`       |                |
`ushort`       |                |
`using`        |                |
`virtual`      |                |
`volatile`     |                |

Code generators from `jsii-pacmak` will try to work around those reserved words
when they are encoutered, but may resort to using names that could clash with
other identifiers used in your api, or result in sub-optimal experience for
users in languages with conflicts.

[`jsii/lib/reserved-words.ts`]: ../packages/jsii/lib/reserved-words.ts

## Behavioral Interfaces & Structs

`jsii` considers **TypeScript** interfaces in two distinct categories: *Structs*
and *Behavioral Interfaces*. Both of those entities are represeted using
**TypeScript** interfaces, but have distinct sets of requirements.

### Behavioral Interfaces

Behavioral interfaces are the specification of a contract that a type can elect
to adhere to. They can define a number of `public` members which can be
properties or methods. `jsii` requires that behavioral interfaces have names
prefixed with an upper-case `I`.

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
have names starting with an upper-case `I` (making it possible to define a
behavioral interface that only declares read-only properties as part of it's
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

Structs can be extended by other structs, but may not extend (or be extende by)
behavioral interfaces nor be implemented by classes.

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
