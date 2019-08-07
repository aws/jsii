# `.jsii` Assemblies

This document describes the contents of the `.jsii` assembly documents generated
by the `jsii` compiler, and explains the semantics behind the various entities
it represents. This serves as a reference for front-end language implementors.

## Schema

`.jsii` assemblies are JSON-formatted documents. The specification is mastered
under the [`jsii-spec`](../packages/jsii-spec) package. Refer to the inline
documentation in the [`spec.ts`](../packages/jsii-spec/lib/spec.ts) file for
more information about the general content of the assembly documents.

The most important part of the assembly documentation, which is described in
detail in this document, is the `types` map, which contains the descriptions of
all types declared by the `.jsii` assembly. It is a map from `jsii` fully
qualified type names to a type specification.

All `boolean` attributes in the document specification are optional, and are
left out (`undefined`) when `false`.

### Common Attributes

Certain optional attributes are shared by API entities (types and members):

* `docs` - documentation attached to the API entity
  * `deprecated` - contains a message explaining why an API was deprecated
    and/or how users should migrate away
  * `stability` - the stability level of the API entity. The ultimate meaning of
    the stability level is up to the package maintainer, but a baseline
    interpretation of the valid values follows:
      + `experimental` denotes an API that is actively worked on and are not
        subject to semantic versioning gurantees (they may receive breaking
        change on a *minor* version release)
      + `stable` denotes an API that is safe to use in production systems and
        are subject ot semantic versioning guarantees (they may not receive
        breaking changes without a *major* version bump)
      + `deprecated` denotes an API that should no longer be used. The
        `deprecated` entry in the `docs` object should contain a message
        explaining how users should migrate away
      + `external` denotes an API that is not owned by the package's maintainer
        and may change in unexpected ways. Such APIs are usually derived from
        external artifacts, which the package maintainers do not have control
        over.
  * additional entries represent user-defined `JSDoc` tags with meaning defined
    by convention and/or the package maintainer
* `locationInModule` - coordinates of the declaration in the source
  * `fileName` - the path to the source file, relative to the package root
  * `line` - the line number on which the entity is declared (or the first line
    when a declaration spans multiple lines)

### Types

#### Classes

Attribute    | Type        | Description
-------------|-------------|----------------------------------------------------
`kind`       |`'class'`    |Discriminator to identify classes
`abstract`   |`boolean`    |Whether this class is *abstract*
`assembly`   |`string`     |The name of the assembly this class is a part of
`base`       |`string`     |The fully-qualified name of the parent class of this class
`fqn`        |`string`     |The fully-qualified name of the class
`initializer`|`Constructor`|The class' [constructor]
`interfaces` |`string[]`   |The fully-qualified names of interfaces implemented by this class
`methods`    |`Method[]`   |The [methods] declared by this class
`name`       |`string`     |The simple name of the class
`properties` |`Property[]` |The [properties] declared by this class

[constructor]: #constructors
[interfaces]: #interfaces
[methods]: #methods
[properties]: #properties

#### Interfaces

`jsii` interfaces are declarations of type signatures that can be implemented by
classes. *Interface* names must be prefixed with an `I` (e.g: `IFoo`).

Attribute    | Type        | Description
-------------|-------------|----------------------------------------------------
`kind`       |`'inteface'` |Discriminator to identify interfaces
`assembly`   |`string`     |The name of the assembly this interface is a part of
`fqn`        |`string`     |The fully-qualified name of the interface
`interfaces` |`string[]`   |The fully-qualified names of interfaces extended by this inteface
`methods`    |`Method[]`   |The [methods] declared by this interface
`name`       |`string`     |The simple name of the interface
`properties` |`Property[]` |The [properties] declared by this interface

#### Structs (a.k.a. Data Types)

*Structs* (or *Data Types*) are immutable, data-only interfaces:
* They declare no methods
* All [properties] they declare are `readonly`
* They can only implement other *structs*
* They cannot be extended by interfaces that are not *structs*
* They cannot be implemented by *classes*

Unlike regular *interfaes*, `jsii` *struct* names are not required to have
any particular prefix.

Since those are immutable, pure data objects, the `jsii-runtime` exchanges
instances of those *by value*, instead of *by reference*, allowing to save
cross-language communication overhead when working with the data.

Attribute    | Type        | Description
-------------|-------------|----------------------------------------------------
`kind`       |`'inteface'` |Discriminator to identify interfaces
`datatype`   |`true`       |Indicates a *struct* / *data type* declaration
`assembly`   |`string`     |The name of the assembly this struct is a part of
`fqn`        |`string`     |The fully-qualified name of the struct
`interfaces` |`string[]`   |The fully-qualified names of *struct* extended by this *struct*
`name`       |`string`     |The simple name of the struct
`properties` |`Property[]` |The [properties] declared by this struct (all `readonly`)

#### Enums

Attribute    | Type         | Description
-------------|--------------|---------------------------------------------------
`kind`       |`'enum'`      |Discriminator to identify enums
`assembly`   |`string`      |The name of the assembly this enum is a part of
`fqn`        |`string`      |The fully-qualified name of the enum
`members`    |`EnumMember[]`|The [enum members] declared by this enum
`name`       |`string`      |The simple name of the enum

[enum members]: #enum-members

### Members

#### Constructors

Attribute    | Type         | Description
-------------|--------------|---------------------------------------------------
`overrides`  |`string`      |The fully-qualified name of the class/interface that declares the overridden constructor
`parameters` |`Parameter[]` |Parameters of this constructor
`protected`  |`boolean`     |Whether this constructor is protected
`variadic`   |`boolean`     |Whether the last parameter is `variadic`

#### Enum Members

Attribute    | Type         | Description
-------------|--------------|---------------------------------------------------
`name`       |`string`      |The name of the enum member. Must be `UPPER_SNAKE_CASED`

#### Methods

Attribute    | Type          | Description
-------------|---------------|--------------------------------------------------
`abstract`   |`boolean`      |Whether this method is `abstract`
`async`      |`boolean`      |Whether this method is asyncrhonous
`name`       |`string`       |The name of the method
`overrides`  |`string`       |The fully-qualified name of the class/interface that declares the overridden method
`parameters` |`Parameter[]`  |Parameters of this method
`protected`  |`boolean`      |Whether this method is protected
`returns`    |`OptionalValue`|The return type of the method
`static`     |`boolean`      |Whether this method is `static`
`variadic`   |`boolean`      |Whether the last parameter is `variadic`

Methods with the `abstract` feature may only be members of `abstract` classes or
[interfaces], and all methods that are members of [interfaces] must be
`abstract`.

Methods that are `static` cannot feature the `overrides` attribute, as `static`
members are not inherited.

#### Properties

Attribute    | Type          | Description
-------------|---------------|--------------------------------------------------
`abstract`   |`boolean`      |Whether this property is `abstract`
`const`      |`boolean`      |Whether this property is a constant (implies `static` and `immutable`)
`immutable`  |`boolean`      |Whethert his property is immutable
`name`       |`string`       |The name of the property
`optional`   |`boolean`      |Whether this property is optional
`overrides`  |`string`       |The fully-qualified name of the class/interface that declares the overridden property
`protected`  |`boolean`      |Whether this constructor is protected
`static`     |`boolean`      |Whether this property is `static`
`type`       |`TypeReference`|The type of the property

Properties that are `const` must have a `name` that is `UPPER_SNAKE_CASED`. They
represent constants similar to [Enum Members], which can be proactively resolved
by the `jsii` runtimes.

Proeprties that are `static` cannot feature the `overrides` attribute, as
`static` members are not inherited.
