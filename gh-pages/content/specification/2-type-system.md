# The _jsii_ type system

## Preamble

The base language for authoring _jsii_ libraries for re-use from other languages is **TypeScript**, which compiles to
**JavaScript**. Consequently, the base type system that _jsii_ sources from is that of **TypeScript**.

When used from another language than **TypeScript** or **JavaScript**, _jsii_ libraries are running the **JavaScript**
code in a child _node_ process, and data is exchanged using **JSON**-based protocol.

This document describes how **TypeScript** types map into the _jsii_ type system.

The API represented by the _jsii_ assembly only covers declarations that are exported from the main file in the
**TypeScript** project (as specified in the `package.json` file by the `types` attribute). Restrictions described in
this document only apply to such declarations, the rest of the module can leverage any **TypeScript** feature.

## Basic Types

### Introduction

In order to build useful programs, the simplest units of data need to be modeled: booleans, numbers, strings, etc...
Those basic building blocks are the foundations on which APIs stand. _jsii_ supports much of the same types that
**TypeScript** and **JavaScript** support, although with notable differences.

### Boolean

The _jsii_ type system mirrors **TypeScript**'s `boolean`, which is the simplest primitive data types, with only two
supported values: `true` and `false`.

### Number

The _jsii_ type system mirrors **TypeScript**'s `number`. All numbers are floating point values.

### String

The _jsii_ type system mirrors **TypeScript**'s `string`. Strings are used to represent textual data.

### List

**TypeScript** arrays (`Array<T>`, `T[]`, `ReadonlyArray<T>` and `readonly T[]`) are represented as _lists_ in the
_jsii_ type model. Lists are shared between the _node_ process and the host process by-value, meaning a copy of the
array is produced each time it is passed through the process boundary.

!!! info
    Items in the list may be passed by-reference (according to their type's specification), in which case mutating
    operations performed on those may be visible across the process boundary.

[Find out more here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)

### Enum

As in many languages, `enum` can be used to represent a group of related constants. While **TypeScript** `enum` entries
are associated with a value that is either a `string` or a `number`, the _jsii_ type system does not allow for those to
be down-casted to their value type (e.g: a `string`-valued `enum` entry cannot be directly passed into a `string`
parameter).

!!! info
    Unlike in certain languages such as **Java**, `enum` types cannot declare new properties or methods.

[Find out more here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#enums)

### Any and Unknown

**TypeScript** defines two opaque types: `any` and `unknown` that can be used to represent a value of arbitrary type. The
difference between them is that while `any` is [assignable to any other type][ts-any], `unknown` requires a [type assertion][ts-unknown] or
explicit cast to be performed before it can be assigned.

Both of these types map to an `Any` _primitive type_ in the _jsii_ type system, and the subtle distinction between `any`
and `unknown` is lost in the process.

!!! info
    It is important to note that, contrary to the other types in the **TypeScript** type system, `any` and `unknown`
    types are inherently `null`-able.

[ts-any]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any
[ts-unknown]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown

### Void

As in most languages, the `void` type is used to denote a method does not return anything.

[Find out more here](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)

### Null and Undefined

**JavaScript** differentiates `undefined` and `null` values. While `undefined` denotes that _no value_ has been set,
`null` denotes an intentional signal of there being _no data_. Most other programming languages (particularly statically
typed languages) however lack this distinction, and the _jsii_ type model consequently considers `null` and `undefined`
are semantically equivalent.

!!! info
    Unlike certain other programming languages, such as **Java**, **TypeScript** does not allow `null` (or `undefined`)
    values unless the type signature expressedly supports that (with the exception of `any` and `unknown`, which are
    implicitly `null`-able, as was discussed earlier).

[Find out more here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)

### Object

**TypeScript**'s `object` type denotes anything that is not a _primitive_ type, meaning anything other than a `number`,
`string`, `boolean`, `bigint`, `symbol`, `null` or `undefined`.

In the _jsii_ type model, `object` indicates a block of structured data that can be shared by-value across the process
boundary. As a consequence, they may not include any method.

!!! bug "Unimplemented"
    This type is called `Json` in the current implementation.

!!! question
    The by-value nature of `object` is problematic because **TypeScript** makes no guarantee with respects to the
    absence of methods on `object`, and properties may be dynamic.

[Find out more here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types)

### Promises

_jsii_ supports asynchronous methods, and the **TypeScript** `Promise<T>` type has to be used as the result of `async`
methods. Promises can only be used as the result type of methods, not as the type of a property or parameter.

### Unsupported **TypeScript** basic types

Due to how such types cannot be represented in many other programming languages, the _jsii_ type model does not support
the following **TypeScript** entities:

- Tuples, a group of arbitrarily-typed values, often used as the result type for multi-valued functions.
- The `never` type, which is used as the return type of functions that will not yield control back to their invoker
  (infinite loops, `process.exit()`, ...).
- `bigint` and `symbol` don't have equivalents in many other programming languages and are generally of limited value in
  API design.

## Complex Types

The goal of the _jsii_ is to enable cross-language re-use of class libraries. **TypeScript** enables representing
classic object-oriented concepts, such as _classes_ and _interfaces_. The _jsii_ type system supports some additional
nuances on top of those, to better represent **TypeScript** and **JavaScript** idioms in a way that enables generating
convenient APIs in other languages.

### Classes

Exported **TypeScript** [classes][ts-classes] are represented in the _jsii_ type system, with the following restrictions from plain
**TypeScript**:

- Methods overloads are not supported.
- Overridden methods or properties must retain the exact same type signature as the one declared in a parent type. The
  **jsii** type system strictly enforces the [Liskov substitution principle].

[ts-classes]: https://www.typescriptlang.org/docs/handbook/2/classes.html
[liskov substitution principle]: https://en.wikipedia.org/wiki/Liskov_substitution_principle

### Interfaces & Structs

Exported **TypeScript** interfaces are interpreted as one of two entities in the _jsii_ type system:

- If the `interface` name is prefixed with an `I` (e.g: `ISomething`), it is interpreted as a _behavioral interface_.
- Otherwise (e.g: `Something`), it is interpreted as a _struct_.

#### Behavioral Interfaces

_Behavioral interfaces_ are the usual object-oriented interface: they can extend other _behavioral interfaces_, and can
be extended by _classes_. They may however not extend _structs_.

#### Structs

_Structs_ are used to model the **JavaScript** idiom of receiving options as an object literal passed as the last
parameter of a function. They are a formal description of a bag of properties, and are not meant to be implemented by
other types. Since those types are used as inputs, they can be handled as pure-data, immutable objects, and the
following restrictions apply:

- A _struct_ cannot declare any _method_: they must be kept behavior-free.
- All properties declared by a _struct_ must be `readonly`. The values of the properties may however be mutable.

_Structs_ may extend one or more other _structs_, but cannot extend or be extended by _behavioral interfaces_, and may
not be implemented by _classes_.

### Type Unions

In certain cases, several different kinds of values are acceptable for a given parameter or return type. **TypeScript**
models those cases using _type unions_, which are represented as `TypeA | TypeB`. The _jsii_ type model supports those,
however most other statically typed languages do not have such a concept, making those parameters or return values
difficult to use from those languages, as the value has to be declared using the most generic reference type available
(for example, in **Java**, those are returned as `java.lang.Object`).

When used as inputs (parameters, or properties of a _struct_), it may be possible to generate method overloads that will
allow for a convenient API in languages that support overloads.

In general however, _type unions_ are discouraged and should only be used when there is no alternative way to model the
API.

[Find out more here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

### Type Intersections

Type intersections are supported, with limitations. Type intersections indicate that values, specifically object
instances, must implement two or more interfaces simultaneously. They are written as `TypeA & TypeB`. Type intersections
are supported with the following limitations:

- All branches of the type intersection must be (behavioral) interfaces, not _structs_.
- Type intersections may only appear in input position. That means they may only appear as a function argument,
  or a member of a struct that is exclusively used as a function argument. That excludes them appearing as function
  return types, class or behavioral interface members, or as struct members that are the return types of functions.

Type intersection support was added in:

| Tool | Version |
|------|---------|
| `jsii` | `>= 5.9.6` |
| `jsii-rosetta` | `>= 5.9.5` |
| `jsii-pacmak`, `jsii-reflect`, `jsii-diff` | `>= 1.115.0` |

## Serialization Behavior

When values are passed between the _host_ process and the `node` process, they are serialized as JSON documents. They
can be passed by value or by reference, depending on the type of the value as well as the declared type of the transfer
point (method return type, property type, argument type, ...).

The table below describes the serialization behavior applied for each possible _declared_ type (rows) for a value of a
given dynamic type (columns). The :x: sign expresses cases that are illegal and should cause immediate failure. The term
_primitive_ encompasses `boolean`, `string`, and `number`.

| &nbsp;      | `undefined` | `Date`      | _primitive_ | `Array`     | _instance_  | `object`               |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ---------------------- |
| `void`      | `undefined` | `undefined` | `undefined` | `undefined` | `undefined` | `undefined`            |
| `Date`      | `undefined` | [Date]      | :x:         | :x:         | :x:         | :x:                    |
| _primitive_ | `undefined` | :x:         | [Identity]  | :x:         | :x:         | :x:                    |
| `enum`      | `undefined` | :x:         | [Enum]      | :x:         | :x:         | :x:                    |
| `List`      | `undefined` | :x:         | :x:         | [Array]     | :x:         | :x:                    |
| `Map`       | `undefined` | :x:         | :x:         | :x:         | :x:         | [Mapping]              |
| `interface` | `undefined` | :x:         | :x:         | :x:         | [Reference] | [Reference]            |
| `struct`    | `undefined` | :x:         | :x:         | :x:         | :x:         | [Value]                |
| `class`     | `undefined` | :x:         | :x:         | :x:         | [Reference] | [Reference]            |
| `any`       | `undefined` | [Date]      | [Identity]  | [Array]     | [Reference] | [Value] or [Reference] |

In the case of `object` being passed though `any`, the value may be serialized by [Value] only if the value being passed
does not have any method or dynamic accessor. Otherwise, it must be passed by [Reference] instead.

!!! danger
    The serialization behavior around `undefined` values is affected by the `optional` attribute of the declared type.
    As discussed earlier, the `any` type is implicitly `optional`; but all other types' serialization process will only
    allow serialization of `undefined` if they were declared `optional`.

### Array Serialization

[array]: #array-serialization

Arrays are serialized into the standard JSON representation for them. Each value in the array is serialized according to
the behavior dictated by the declared element type of the list, combined with the dynamic type of the value itself.

### Date Serialization

[date]: #date-serialization

JSON has no standard expression for `Date`. A special JSON object representation is used to allow unambiguously
conveying a date. The wrapper has a single key (`$jsii.date`) with the [ISO 8601-1] UTC representation of the `Date`
value:

```json
{ "$jsii.date": "2020-01-20T14:04:00.000Z" }
```

[iso 8601-1]: https://www.iso.org/obp/ui#iso:std:iso:8601:-1:ed-1:v1:en

### Enum Serialization

[enum]: #enum-serialization

In **JavaScript**, `enum` entries are represented by their value equivalent. In order to support statically typed
representations in other languages, these are serialized using a dedicated wrapper object, using a single key
(`$jsii.enum`) with the fully qualified name of the `enum` entry (formatted as `<enum type fqn>/<entry name>`):

```json
{ "$jsii.enum": "@scope/module.EnumType/ENTRY_NAME" }
```

### Identity Serialization

[identity]: #identity-serialization

The identity serialization is achieved by using the standard JSON representation of the primitive type. JSON strings are
expressed using the `UTF-8` character set.

### Mapping Serialization

[mapping]: #mapping-serialization

Key-value pairs are passed by-value between the processes and is wrapped using a single-key (`$jsii.map`) associated
with the JSON representation of the encoded object; where values are serialized according to the behavior dictated by
the element type of the mapping, combined with the dynamic type of the value itself:

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

[reference]: #reference-serialization

Objects serialized by reference are passed using a special object that provides sufficient information to tie back to
the instance within its owning process. It includes a `$jsii.byref` key associated with a string that uniquely
identifies the instance, and an optional `$jsii.interfaces` key that provides a list of interfaces that the object
implements.

```json
{
  "$jsii.byref": "@scope/module.Foo@1337",
  "$jsii.interfaces": ["@scope/module.IBar", "@scope/module.IBaz"]
}
```

### Value Serialization

[value]: #value-serialization

_Structs_ can be serialized by-value. In those cases, the value is wrapped using a special object that encapsulates the
type information for the provided data as well as the _struct_'s members.

The wrapper uses a single `$jsii.struct` key with a `fqn` key that indicates the fully qualified name of the _struct_
type, and a `data` key that contains the members of the _struct_, serialized according to the behavior described in this
document.

```json
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

### Overview

Typescript allows grouping declarations together in _namespaces_, which are interpreted by _jsii_ as _submodules_.
_Submodules_ names are the fully qualified name of the namespace from the package's root (if a package `foo` defines a
namespace `ns1`, which itself contains `ns2`, the submodule for `ns2` will be named `foo.ns1.ns2`).

_Submodules_ are declared in the _jsii_ assembly under the `submodules` key. This is also where specific
[configuration](#submodule-configuration) is registered, if different from the parent submodule or package.

_Submodules_ are hierarchical, and their fully qualified name is representative of the relationship. For example the
`assm.foo.bar` submodule is considered to be nested under the `assm.foo` submodule.

### Restrictions

_Submodules_ cannot be involved in dependency cycles. While it is possible to build such cycles in **JavaScript**, that
configuration cannot be reliably reprensented in certain other programming languages (e.g: **Python**).

!!! bug "Unimplemented"
    [`jsii`][jsii] does not currently check for circular submodule dependencies. Invalid dependency patterns may result
    in errors at code generation by [`jsii-pacmak`][jsii-pacmak], or at runtime.

Since this would result in ambiguity that cannot be consistently resolved, a given type can only be exported as part of
one _submodule_.

[jsii]: https://github.com/aws/jsii/tree/main/packages/jsii
[jsii-pacmak]: https://github.com/aws/jsii/tree/main/packages/jsii-pacmak

### Declaration

There are two supported ways to introduce _submodules_:

- Using the namespaced export syntax:
  ```ts
  export * as ns from './module';
  ```
- Using an explicit namespace declaration:
  ```ts
  export namespace ns {
    /* ... */
  }
  ```

_Submodules_ declared using the `export * as ns from './module';` syntax can be documented using a markdown document
located at `./module/README.md`.

!!! bug "Unimplemented"
    The `./module/README.md` file support is not yet implemented.

### Submodule Configuration

In languages where this is relevant (e.g: **Python**), _submodules_ are rendered as native _submodules_. In languages
where a namespace system exists (**Java** uses _packages_, **C#** uses _namespaces_, ...), _submodules_ are rendered
using that.

By default, _submodule_ names are rendered appropriately in the target language (this typically involves adjusting the
case of _submodule_ name fragments to the idiomatic form in the language). In certain cases however, a developer can
choose to use a different configuration by defining the _submodule_ using the namespaced-export syntax
(`export * as namespace from './module-name';`) by placing a `.jsiirc.json` file next to the entry point of the
namespaced module. For example, if `./module-name`'s entry point is `foo/bar/module-name/index.ts`, the _submodule_
configuration resides in `foo/bar/module-name/.jsiirc.json`.

Since _submodules_ are hierarchical, the configuration of a given _submodule_ defines the default configuration of
_submodules_ nested under it.

## Code Generation

In order to generate code in various programming languages, [`jsii-pacmak`][jsii-pacmak] needs configuration that
provides naming directives (e.g: **Java** package names, **C#** namespaces, **Python** module names, ...). This
configuration is language-specific and each language implementation specifies and documents its own configuration
schema.

Configuration is sourced in the `package.json` file at the root of the npm package, under the special `jsii` key. The
general schema is described in the [configuration] document.

!!! bug "Unimplemented"
    There is a proposition to allow this configuration to be placed in a `.jsiirc.json` file, which would take
    precedence over what is specified in `package.json`. _Submodules_ introduced using the
    `export * as ns from './module';` syntax would then be able to define _submodule_-local configuration using the
    `./module/.jsiirc.json` file.

[configuration]: ../user-guides/lib-author/configuration/index.md

## References

The [**TypeScript** Handbook][ts-handbook] describes the language's type system and syntax elements that serve as the
basis for the _jsii_ type system. Additionally, the **JavaScript** type system is described in the
[**JavaScript** Fundamentals][js-fundamentals] document.

[js-fundamentals]: https://javascript.info/types
[ts-handbook]: https://www.typescriptlang.org/docs/handbook/2/basic-types.html
