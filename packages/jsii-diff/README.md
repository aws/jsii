# jsii-diff

__jsii-diff__ compares two jsii assemblies for compatibility.

In the future, it will be able to do generic comparisons.
But for
now it will compare assemblies for API compatibility, and exit
with a non-zero exit code if any __stable__ or __deprecated__ APIs have had incompatible changes.

API items that have no stability are treated as __stable__.
To treat unmarked API items as experimental, pass the `--default-experimental` flag.

## Usage

To compare two JSII packages:

```console
jsii-diff <old> [new]
```

Packages can be identified by either:

* __A path__, in which case it should be the path to a JSII package directory,
  or to a `.jsii` file.
* __An NPM package specifier__ of the form `npm:[<package>[@version]]`, in
  which case the indicated version is downloaded and used. If `@version` is
  left out, the latest version will be used. If `package` is left out,
  the assembly name of `.jsii` in the current directory will be used.

To compare current package against latest published NPM release:

```console
jsii-diff npm:<package>
```

### Stability Error Classes

By default only incompatible changes to `stable` or `deprecated` APIs are treated as errors and fail the command.
Changes to `experimental` or `external` APIs will emit a Warning.

You might change this behavior by passing the `--error-on` flag:

```console
jsii-diff npm:<package> --error-on=stable --error-on=external 
```

Or fail for all incompatible changes:

```console
jsii-diff npm:<package> --error-on=all
```

## Details

__jsii-diff__ will assert that code written against version __A__ of a library
will still typecheck when compiled against version __B__ of that library. It
does this by verifying the following properties:

* Any type (class/interface/enum) in __A__ must also exist in __B__.
* Enums have only added members.
* Classes and interfaces have only added members, or modified existing
  members in an allowed way.
* Property types are the same or have been strengthened (see below).
* Methods have only added optional arguments, existing argument types have
  only been weakened, and the return type has only been strengthened (see below).

### Strengthening and weakening

* *Strengthening* a type refers to *excluding* more possible values. Changing
  a field from `optional` to `required`, or changing a type from `any` to
  `string` are examples of strengthening.

* As the opposite of strengthening, *weakening* refers to *allowing* more
  possible values. Changing a field from `required` to `optional`, or
  changing a type to a superclass or interface are examples of weakening.

An API can change in the following way without breaking its consumer:

* It can *weaken* its input (require *less* from the caller); and
* It can *strengthen* its output (guarantee *more* to the caller).

### Struct types

Structs (interfaces consisting completely of `readonly` properties) are
treated as bags of data. Their API compatibility will be evaluated depending
on whether they appear in input or output position of operations.

* Structs are *weakened* if all types of all of its properties are weakened.
  Normally removing properties would also be considered weakening, but
  because that may cause references to the fields in existing code bases to
  become undefined (which is not allowed in most programming languages) we
  disallow removing properties.
* Structs are *strengthened* if all types of all of its properties are
  strengthened, or if fields are added.

__jsii-diff__ will check the evolution of structs against their position
in an operation, similar to other types. Input structs may be weakened,
and output structs may be strengthened.

### Reference types

Classes and non-struct interface types are considered "reference types". By
default we treat them as being the result of a function call:

* Class instances are the return values calling their constructors.
* Interfaces are only ever implemented by objects returned from the framework,
  or returned by factory functions.

This means their evolution falls under the rules of "strengthening": they
may only add fields, never take any away or make them optional.

#### `@subclassable`

Some classes or interfaces may be intended to be implemented by consumers.
Those should be marked with the docstring tag `@subclassable`.

This will effectively cause changes against those types to be checked against
the rules for weakening as well (i.e., no new (abstract) fields or members
added). This is necessary because otherwise any existing implementor of that
interface would be broken, since they wouldn't be implementing the new
abstract members yet.

`@subclassable` is not the default since most interfaces are not intended
for subclassing, but treating them as such would limit the evolvability of
libraries too much.

## License

__jsii-diff__ is distributed under the
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
