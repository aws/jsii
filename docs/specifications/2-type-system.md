# The *jsii* type system

## Preamble
The base language for authoring *jsii* libraries for re-use from other languages
is **TypeScript**, which compiles to **JavaScript**. Consequently, the base type
system that *jsii* sources from is that of **TypeScript**.

When used from another language than **TypeScript** or **JavaScript**, *jsii*
libraries are running the **JavaScript** code in a child *node* process, and
data is exchanged using **JSON**-based protocol.

This document describes how **TypeScript** types map into the *jsii* type
system.

The API represented by the *jsii* assembly only covers declarations that are
exported from the main file in the **TypeScript** project (as specified in the
`package.json` file by the `types` attribute). Restrictions described in this
document only apply to such declarations, the rest of the module can leverage
any **TypeScript** feature.

## Basic Types

### Introduction
In order to build useful programs, the simplest units of data need to be
modeled: booleans, numbers, strings, etc... Those basic building blocks are the
foundations on which APIs stand. *jsii* supports much of the same types that
**TypeScript** and **JavaScript** support, although with notable differences.

### Boolean
The *jsii* type system mirrors **TypeScript**'s `boolean`, which is the simplest
primitive data types, with only two supported values: `true` and `false`.

### Number
The *jsii* type system mirrors **TypeScript**'s `number`. All numbers are
floating point values.

### String
The *jsii* type system mirrors **TypeScript**'s `string`. Strings are used to
represent textual data.

### List
**TypeScript** arrays (`Array<T>`, `T[]`, `ReadonlyArray<T>` and `readonly T[]`)
are represented as *lists* in the *jsii* type model. Lists are shared between
the *node* process and the host process by-value, meaning a copy of the array is
produced each time it is passed through the process boundary.

> :information_source: Items in the list may be passed by-reference (according
> to their type's specification), in which case mutating operations performed on
> those may be visible across the process boundary.

### Enum
As in many languages, `enum` can be used to represent a group of related
constants. Whle **TypeScript** `enum` entries are associated with a value that
is either a `string` or a `number`, the *jsii* type system does not allow for
those to be down-casted to their value type (e.g: a `string`-valued `enum` entry
cannot be directly passed into a `string` parameter).

> :information_source: Unlike in certain languages such as **Java**, `enum`
> types cannot declare new properties or methods.

### Any and Unknown
**TypeScript** defines two opaque types: `any` and `unknown` that can be used to
represent a value of arbitary type. The difference between them is that while
`any` is assignable to any other type, `unknown` requires a type assertion or
explicit cast to be performed before it can be assigned.

Both of these types map to an `Any` *primitive type* in the *jsii* type system,
and the subtle distinction between `any` and `unknown` is lost in the process.

> :information_source: It is important to note that, contrary to the other types
> in the **TypeScript** type system, `any` and `unknown` types are inherently
> `null`-able.

### Void
As in most languages, the `void` type is used to denote a method does not return
anything.

### Null and Undefined
**JavaScript** differentiates `undefined` and `null` values. While `undefined`
denotes that *no value* has been set, `null` denotes an intentional signal of
there being *no data*. Most other programming languages (particularly statically
typed languages) however lack this distinction, and the *jsii* type model
consequently considers `null` and `undefined` are semantically equivalent.

> :information_source: Unlike certain other programming languages, such as
> **Java**, **TypeScript** does not allow `null` (or `undefined`) values unless
> the type signature expressedly supports that (with the exception of `any` and
> `unknown`, which are implicitly `null`-able, as was discussed earlier).

### Object
**TypeScript**'s `object` type denotes anything that is not a *primitive* type,
meaning anything other than a `number`, `srting`, `boolean`, `biging`, `symbol`,
`null` or `undefined`.

In the *jsii* type model, `object` indicates a block of structured data that can
be shared by-value across the process boundary. As a consequence, they may not
include any method.

> :construction: This type is called `Json` in the current implementation.

> :question: The by-value nature of `object` is problematic because
> **TypeScript** makes no guarantee with respects to the absence of methods on
> `object`, and properties may be dynamic.

### Promises
*jsii* supports asynchronous methods, and the **TypeScript** `Promise<T>` type
has to be used as the result of `async` methods. Promises can only be used as
the result type of methods, not as the type of a property or parameter.

### Unsupported **TypeScript** basic types
Due to how such types cannot be represented in many other programming languages,
the *jsii* type model does not support the following **TypeScript** entities:
- Tuples, a group of arbitrarily-typed values, often used as the result type for
  multi-valued functions.
- The `never` type, which is used as the return type of functions that will not
  yield control back to their invoker (infinite loops, `process.exit()`, ...).
- `bigint` and `symbol` don't have equivalents in many other programming
  languages and are generally of limited value in API design.


## Complex Types
The goal of *jsii* is to enable cross-language re-use of class libraries.
**TypeScript** enables representing classic object-oriented concepts such as
*classes*, *interfaces* and such. The *jsii* type system supports some
additional nuances on top of those, to better represent **TypeScript** and
**JavaScript** idioms in a way that enables generating convenient APIs in other
languages.

### Classes
Exported **TypeScript** classes are represented in the *jsii* type system, with
the following restrictions from plain **TypeScript**:
- Methods overloads are not supported.
- Overridden methods or properties must retain the exact same type signature as
  the one declared in a parent type. The **jsii** type system strictly enforces
  the [Liskov substitution principle].

[Liskov substitution principle]: https://en.wikipedia.org/wiki/Liskov_substitution_principle

### Interfaces & Structs
Exported **TypeScript** interfaces are interpreted as one of two entities in the
*jsii* type system:
- If the `interface` name is prefixed with an `I` (e.g: `ISomething`), it is
  interpreted as a *behavioral interface*.
- Otherwise (e.g: `Something`), it is interpreted as a *struct*.

#### Behavioral Interfaces
*Behavioral interfaces* are the usual object-oriented interface: they can extend
other *behavioral interfaces*, and can be extended by *classes*. They may
however not extend *structs*.

#### Structs
*Structs* are used to model the **JavaScript** idiom of receiving options as an
object literal passed as the last parameter of a function. They are a formal
description of a bag of properties, and are not meant to be implemented by other
types. Since those types are used as inputs, they can be handled as pure-data,
immutable objects, and the following restrictions apply:
- A *struct* cannot declare any *method*: they must be kept behavior-free.
- All properties declared by a *struct* must be `readonly`. The values of the
  properties may however be mutable.

*Structs* may extend one or more other *structs*, but cannot extend or be
extended by *behavioral interfaces*, and may not be implemented by *classes*.

### Type Unions
In certain cases, several different kinds of values are acceptable for a given
parameter or return type. **TypeScript** models those cases using *type unions*,
which are represented as `TypeA | TypeB`. The *jsii* type model supports those,
however most other statically typed languages do not have such a concept, making
those parameters or return values difficult to use from those languages, as the
value has to be declared using the most generic reference type available (for
example, in **Java**, those are returned as `java.lang.Object`).

When used as inputs (parameters, or properties of a *struct*), it may be
possible to generate method overloads that will allow for a convenient API in
languages that support overloards.

In general however, *type unions* are discouraged and should only be used when
there is no alternate way to model the API.


## Serialization Behavior

When values are passed between the *host* process and the `node` process, they
are serialized as JSON documents. They can be passed by value or by reference,
depending on the type of the value as well as the declared type of the transfer
point (method return type, property type, argument type, ...).

The table below describes the serialization behavior applied for each possible
*declared* type (rows) for a value of a given dynamic type (columns). The :x:
sign expresses cases that are illegal and should cause immediate failure. The
term *primitive* encompasses `boolean`, `string`, and `number`.

&nbsp;      | `undefined` | `Date`      | *primitive* | `Array`     | *instance*  | `object`
------------|-------------|-------------|-------------|-------------|-------------|-------------
`void`      | `undefined` | `undefined` | `undefined` | `undefined` | `undefined` | `undefined`
`Date`      | `undefined` | [Date]      | :x:         | :x:         | :x:         | :x:
*primitive* | `undefined` | :x:         | [Identity]  | :x:         | :x:         | :x:
`enum`      | `undefined` | :x:         | [Enum]      | :x:         | :x:         | :x:
`List`      | `undefined` | :x:         | :x:         | [Array]     | :x:         | :x:
`Map`       | `undefined` | :x:         | :x:         | :x:         | :x:         | [Mapping]
`interface` | `undefined` | :x:         | :x:         | :x:         | [Reference] | [Reference]
`struct`    | `undefined` | :x:         | :x:         | :x:         | :x:         | [Value]
`class`     | `undefined` | :x:         | :x:         | :x:         | [Reference] | [Reference]
`any`       | `undefined` | [Date]      | [Identity]  | [Array]     | [Reference] | [Value] or [Reference]

In the case of `object` being passed though `any`, the value may be serialized
by [Value] only if the value being passed does not have any method or dynamic
accessor. Otherwise, it must be passed by [Reference] instead.

> :warning: The serialization behavior around `undefined` values is affected by
> the `optional` attribute of the declared type. As discussed earlier, the `any`
> type is implicitly `optional`; but all other types' serialization process will
> only allow serialization of `undefined` if they were declared `optional`.


### Array Serialization
[Array]: #array-serialization

Arrays are serialized into the standard JSON representation for them. Each value
in the array is serialized according to the behavior dictated by the declared
element type of the list, combined with the dynamic type of the value itself.

### Date Serialization
[Date]: #date-serialization

JSON has no standard expression for `Date`. A special JSON object representation
is used to allow unambiguously conveying a date. The wrapper has a single key
(`$jsii.date`) with the [ISO 8601-1] UTC representation of the `Date` value:

```json
{ "$jsii.date": "2020-01-20T14:04:00.000Z" }
```

[ISO 8601-1]: https://www.iso.org/obp/ui#iso:std:iso:8601:-1:ed-1:v1:en

### Enum Serialization
[Enum]: #enum-serialization

In **JavaScript**, `enum` entries are represented by their value equivalent. In
order to support statically typed representations in other languages, these are
serialized using a dedicated wrapper object, using a single key (`$jsii.enum`)
with the fully qualified name of the `enum` entry:

```json
{ "$jsii.enum": "@scope/module.EnumType.ENTRY_NAME" }
```

### Identity Serialization
[Identity]: #identity-serialization

The identity serialization is achieved by using the standard JSON representation
of the primitive type. JSON strings are expressed using the `UTF-8` character
set.

### Mapping Serialization
[Mapping]: #mapping-serialization

Key-value pairs are passed by-value between the processes and is wrapped using a
single-key (`$jsii.map`) associated with the JSON representation of the encoded
object; where values are serialized according to the behavior dictated by the
element type of the mapping, combined with the dynamic type of the value itself:

```json
{
  "$jsii.map": {
    "foo": {
      "date": { "$jsii.date": "2020-01-20T14:04:00.000Z" },
      "map": { "$jsii.map": {} }
    }
  }
}
```

### Reference Serialization
[Reference]: #reference-serialization

Objects serialized by reference are passed using a special object that provides
sufficient information to tie back to the instance within it's owning process.
It includes a `$jsii.byref` key associated with a string that uniquely
identifies the instance, and an optional `$jsii.interfaces` key that provides a
list of interfaces that the object implements.

```js
{
  "$jsii.byref": "@scope/module.Foo@1337",
  "$jsii.interfaces": ["@scope/module.IBar", "@scope/module.IBaz"]
}
```

### Value Serialization
[Value]: #value-serialization

*Structs* can be serialized by-value. In those cases, the value is wrapped using
a special object that encapsulates the type information for the provided data as
well as the *struct*'s members.

The wrapper uses a single `$jsii.struct` key with a `fqn` key that indicates the
fully qualified name of the *struct* type, and a `data` key that contains the
members of the *struct*, serialized according to the behavior described in this
document.

```js
{
  "$jsii.struct": {
    "fqn": "@scope/module.StructType",
    "data": {
      "enumValue": { "$jsii.enum": "@scope/module.EnumType.ENTRY_NAME" },
      "stringProperty": "Hello, I'm a string!"
    }
  }
}
```

## Submodules

> :construction: The *submodules* feature is still under active development and
> the specific behavior around it (in particular with respects to code
> generation) are still subject to change.

### Overview

Typescript allows grouping declarations together in *namespaces*, which are
interpreted by *jsii* as *submodules*. *Submodules* names are the fully
qualified name of the namespace from the package's root (if a package `foo`
defines a namespace `ns1`, which itself contains `ns2`, the submodule for `ns2`
will be named `foo.ns1.ns2`).

*Submodules* may use different [code-generation configuration](#code-generation)
than their parent submodule or package.

> :construction: *Submodule*-level code-generation configuration is not yet
> implemented.

### Restrictions

*Submodules* cannot be involved in dependency cycles. While it is possible to
build such cycles in **JavaScript**, that configuration cannot be reliably
reprensented in certain other programming languages (e.g: **Python**).

> :construction: [`jsii`] does not currently check for circular submodule
> dependencies. Invalid dependency patterns may result in errors at code
> generation by [`jsii-pacmak`], or at runtime.

Since this would result in ambiguity that cannot be consistently resolved, a
given type can only be exported as part of one *submodule*.

[`jsii`]: ../../packages/jsii
[`jsii-pacmak`]: ../../packages/jsii-pacmak

### Declaration

There are two supported ways to introduce *submodules*:
* Using the namespaced export syntax:
  ```ts
  export * as ns from './module';
  ```
* Using an explicit namespace declaration:
  ```ts
  export namespace ns { /* ... */ }
  ```

*Submodules* declared using the `export * as ns from './module';` syntax can be
documented using a markdown document located at `./module/README.md`.

> :construction: The `./module/README.md` file support is not yet implemented.

### Code Generation

In languages where this is relevant (e.g: **Python**), *submodules* are rendered
as native *submodules*. In languages where a namespace system exists (**Java**
uses *packages*, **C#** uses *namespaces*, ...), *submodules* are rendered using
that.

## Code Generation

In order to generate code in various programming languages, [`jsii-pacmak`]
needs configuration that provides naming directives (e.g: **Java** package
names, **C#** namespaces, **Python** module names, ...). This configuration is
language-specific and each language implementation specifies and documents its
own configuration schema.

Configuration is sourced in the `package.json` file at the root of the npm
package, under the special `jsii` key. The general schema is described in the
[configuration] document.

> :construction: There is a proposition to allow this configuration to be placed
> in a `.jsiirc.json` file, which would take precedence over what is specified
> in `package.json`. *Submodules* introduced using the
> `export * as ns from './module';` syntax would then be able to define
> *submodule*-local configuration using the `./module/.jsiirc.json` file.

[configuration]: ../configuration.md

## References

The [**TypeScript** Handbook] describes the language's type system and syntax
elements that serve as the basis for the *jsii* type system. Additionally, the
**JavaScript** type system is described in the [**JavaScript** Fundamentals]
document.

[**JavaScript** Fundamentals]: https://javascript.info/types
[**TypeScript** Handbook]: https://www.typescriptlang.org/docs/handbook/basic-types.html

--------------------------------------------------------------------------------

Continue to [Kernel API](./3-kernel-api.md)
