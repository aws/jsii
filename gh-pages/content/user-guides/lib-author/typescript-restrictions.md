# TypeScript Restrictions

Since the API exported by *jsii modules* will be represented in a variety of other languages, certain restrictions are
enforced by the `jsii` compiler.

!!! info
    Since those restrictions are solely intended to ensure the exported API can be represented in other languages, they
    do not apply to any internal declarations such as `#!ts private` members and declarations annotated with the
    `#!ts /** @internal */` tag.

## Dependencies

A *jsii module* can declare dependencies on any other *jsii module* by adding entries in the `dependencies` key in the
`package.json` file. Since most other platforms do not support multiple different versions of the same library to
coexist in the same closure, it is recommended to also declare all such dependencies as `peerDependencies`.

### non-jsii dependencies

Occasionally, a dependency on a *non-jsii module* is useful. Since such dependencies do not have generated bindings in
all the supported languages, they must be bundled with the *jsii module* that depends on them, by adding the library
into the `bundleDependencies` array in `package.json`. 

The API of the *jsii module* can not expose any type from bundled dependencies, since those types would not be available in other languages. Typescript files that include a non-jsii dependency (Eg. a lambda handler for a CDK Construct) must be excluded in the tsconfig.

!!! info
    For more information on `package.json` file contents, refer to the [npm documentation][package-json].

    [package-json]: https://docs.npmjs.com/cli/v6/configuring-npm/package-json

## Naming

### Class Members

Members of *classes* cannot share the same *PascalCased* representation as the declaring *class* itself, as this results
in invalid **C#** code:

```ts hl_lines="2-3 7-8"
export class Foo {
  // 💥 Illegal property name
  public foo: string;
}

export class Bar {
  // 💥 Illegal method name
  public bar(): void { /* ... */ }
}
```

!!! danger
    Due to existing usage, this restriction is only enforced when `jsii` is invoked with the `--strict` option. The
    generated **C#** class name will receive a `_` suffix if any of it's members conflict, which is a breaking change to
    existing **.NET** consumers when a conflicting member is introduced after the initial release.

### Interfaces

The `jsii` type model distinguishes two kinds of *interfaces*:

- *Behavioral interfaces*, which can declare methods and properties
- *Structs*, which are immutable pure data entities, and can consequently only declare `#!ts readonly` properties

A name convention is used to distinguish between these two: *behavioral interfaces* must have a name that starts with a
`I` prefix, while *structs* must not have such a prefix.

!!! info
    The [`/** @struct */` type system hint][hint] can be used to force an *interface* with a name starting with the `I`
    prefix to be handled as a *struct* instead of a *behavioral interface*.

    [hint]: hints.md#forcing-an-interface-to-be-considered-a-struct

```ts hl_lines="5-8"
/**
 * Since there is no `I` prefix, Foo is considered to be a struct.
 */
export interface Foo {
  // 💥 Structs are not allowed to declare methods
  foo(): void;
  // 💥 Structs are not allowed to declare mutable properties
  mutableProperty: number;
  // ✅ Structs can declare immutable properties
  readonly immutableProperty: string;
}

/**
 * Since there is an `I` prefix, IFoo is considered to be a behavioral interface.
 */
export interface IFoo {
  // ✅ Behavioral interfaces can declare methods
  foo(): void;
  // ✅ Behavioral interfaces can declare mutable properties
  mutableProperty: number;
  // ✅ Behavioral interfaces can declare immutable properties
  readonly immutableProperty: string;
}
```

## Inheritance

### Structs

As *structs* are pure data entities, they can only be extended by other *structs*:

```ts hl_lines="3-4 6-7"
export interface Struct { /* ...readonly properties... */ }

// 💥 Structs cannot be extended by behavioral interfaces
export interface IBehavioralInterface extends Struct { /* ... */ }

// 💥 Structs cannot be implemented by classes
export class ConcreteType implements Struct { /* ... */ }

// ✅ Structs can extend other structs
export interface SuperStruct extends Struct { /* ...readonly properties */ }
```

### Member Visibility

The **C#** language does not allow overriding members to change the visibility of the overridden declaration, even if
the updated visibility is more permissive. As a consequence, overridden members are required to retain the same
visibility as their parents.

!!! danger
    This makes changing the visibility of a `#!ts protected` member to `#!ts public` is a breaking change in `jsii`
    libraries!

```ts hl_lines="6-7"
export class Base {
  protected method(): void { /* ... */ }
}

export class Subclass extends Base {
  // 💥 Illegal change of visibility from protected to public
  public method(): void { /* ... */ }
}
```

### Covariant Overrides & Parameter List Changes

In **TypeScript**, overriding members can have a signature that differs from the overridden member as long as the new
signature is compatible with the parent. This is however not supported as:

- **Java** and **C#** do not support omitting parameters when overriding or implementing a member
- **C#** does not support overriding or implementing a member using covariant parameter or return types

!!! note
    **C# 9** introduces support for covariant return types, which would allow relaxing this restriction, however `jsii`
    must build code targetting the `.NET Core 3.1` runtime, which only supports **C# 8**. Once `.NET Core 3.1` becimes
    end-of-life, this may change.

```ts hl_lines="6-7 9-10 12-13"
export class Base {
  public method(param: any): any { /* ... */ }
}

export class Child extends Base {
  // 💥 Parameter signatures do not match
  public method(): any { /* ... */ }

  // 💥 Parameter types do not match, even though they are covariant
  public method(param: string): any { /* ... */ }

  // 💥 Return type does not match, even though it is covariant
  public method(param: any): string { /* ... */ }
}
```

## Index Signatures

**TypeScript** allows declaring _additional properties_ through the use of index signatures. These are however not
supported by the _jsii type system_ and are rejected by the compiler.

!!! info
    Version `1.x` of the compiler _silently ignores_ index signatures instead of reporting a compilation error. Users
    with offending APIs migrating from `jsii@1.x` to `jsii@5.0` or newer need to either remove those declarations, or
    explicitly ignore them using the [`@jsii ignore` tag](./hints.md#excluding-a-declaration-from-multi-language-support).

```ts hl_lines="4-5"
export interface WithIndexSignature {
  public readonly name: string;

  // 💥 Index signatures are not supported
  public [key: string]: unknown;
}
```

## TypeScript Mapped Types

!!! info
    These are also referred to as "Generics", "Parameterized Types", "Utility Types", ...

Parameterized types are not consistently supported in all supported target languages. **Go** support for generics is
relatively limited (for good reasons) compared to TypeScript and most Object-Oriented languages, and the differences in
generic semantics between **TypeScript**, **C#** and **Java** make it difficult to correctly represent such types in all
those languages. As a consequence, `jsii` does not support declaring parameterized types.

Certain *built-in* TypeScript types can however be used in `jsii` modules:

- `Array<T>`, which is equivalent to `T[]`
- `Record<string, T>`, which is equivalent to `{ [key: string]: T }`
- `Promise<T>`, which is the return type of any *asynchronous* method

```ts hl_lines="1-4"
// 💥 Parameterized types cannot be introduced
export interface Parameterized<T> {
  readonly value: T;
}

export interface IAsyncFooMaker {
  // ✅ Asynchronous methods must return promises
  makeFoo(): Promise<Foo>;
  // ✅ Arrays are supported
  makeFoos(count: number): Array<Promise<Foo>>;
}
```

!!! danger "`#!ts Pick<T, Keys>` and `#!ts Omit<T, Keys>`"
    Users are often tempted to use `#!ts Pick<T, Keys>` and `#!ts Omit<T, Keys>` when creating higher level abstractions
    of types exposed by their dependencies, and they want to expose all configuration options from the upstream
    implementation except for some specific properties which are determined fully by the new abstraction.

    `#!ts Pick<T, Keys>` and `#!ts Omit<T, Keys>` are not supported as they would result in open-ended implementation
    requirements to exist in languages such as **Java** and **C#** where such things are not possible.

    Users with this particular use-case should investigate generating code in order to reproduce the upstream type
    without the filtered out fields. For example, this can be done with [`projen`](http://npmjs.com/package/projen)
    using [`jsii-struct-builder`](https://github.com/mrgrain/jsii-struct-builder).

## Type Aliases

TypeScript supports type aliasing using the `#!ts export type Name = ...` syntax. While this is not considered a
compilation error by the `jsii` compiler, those types are implicitly de-sugared by the compiler for all language targets
except for **TypeScript**.

```ts hl_lines="1-2 5-6"
// 👻 Only visible in TypeScript
export type FooOrBar = Foo | Bar;

export interface Props {
  // ⚠️ Effectively `readonly fooOrBar: Foo | Bar;` in non-TypeScript
  readonly fooOrBar: FooOrBar;
}
```

## Soft-Reserved Words

In order to guarantee a consistent developer experience across all supported languages, `jsii` emits warnings whenever
a declaration is named after any target language's *reserved words*, as those will need renaming in target languages:

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

!!! info
    The list of reserved words is derived from [`jsii/lib/reserved-words.ts`][reserved-words.ts].

    [reserved-words.ts]: https://github.com/aws/jsii/tree/main/packages/jsii/lib/reserved-words.ts
