# jsii-diff

__jsii-diff__ compares two jsii assemblies for compatibility.

In the future, it will be able to do generic comparisons, but for
now it will compare assemblies for API compatibility, and exit
with a non-zero exit code if any **stable** APIs have had incompatible
changes.

API items that have no stability are treated as **experimental** (i.e.,
do not affect API compatibility.

## Usage

To compare two JSII packages:

    jsii-diff <path/to/old> [path/to/new]

To compare current package against latest published NPM release:

    # Can leave out . for current directory
    jsii-diff npm:package [.]

## Details

__jsii-diff__ will assert that code written against version **A** of a library
will still typecheck when compiled against version **B** of that library. It
does this by verifying the following properties:

- Any type (class/interface/enum) in **A** must also exist in **B**.
- Enums have only added members.
- Classes and behavioral interfaces have only added members, restricted
  property types and method return types, and only widened argument types.

### Subclassing

In principle, in order to stay API compatible no members can ever be added to
interfaces, and no abstract members can ever be added to classes. This is
because any user of the library could be implementing the interface or could
be inheriting frmo the class. In those cases, the addition of an abstract
member would break their code, since they wouldn't be implementing that
member yet.

Because this contract is a little too restrictive for evolution of libraries,
we assume most interfaces will only be implemented by library classes, so we
can disregard burden on implementors as part of API compatibility evaluation.

If an interface or class is intended to be subclassed by library users,
annotate it with the `@subclassable` annotation. In that case, we will make
sure no (abstract) members are added to it.

### Struct types

Structs (data types, interfaces consisting completely of `readonly`
properties) are treated as bags of data. Their API compatibility will be
evaluated depending on whether they appear in input or output position of
operations. For example, a struct that is used as a method argument is in
input position, and if the struct is the return type of the method it is
in output position.

Input structs may be *weakened*: they may require *less* information in a
newer version. For example, arguments that used to be required may be made
optional.

Similarly, output structs may be *strengthened*: they may provide *more*
information. They may add new fields, or make optional fields required.

__jsii-diff__ will check the evolution of structs against their position
in an operation.

Not completely in-line with weakening is that fields may not be taken away
from input structs: in most languages a consumer may not provide undeclared
fields, so taking away a field may break the Java/C#/Python declaration that
assigns a value to the field. Therefore, though technically removing fields
would be weakening the contract and should be allowed, it is not.

## License

__jsii-diff__ is distributed under the
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
