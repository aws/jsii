# jsii Package Maker

A tool for generating language-specific packages from jsii modules.

## Usage

```shell
$ jsii-pacmak <language> <jsii-bundle-dir> <outdir>
```

 * `language` is the target language (e.g. `java`)
 * `jsii-bundle-dir` is a directory with the `assembly.jsii` file produced
   by the jsii compiler.
 * `outdir` is the directory into which the package is generated.

## Adding support for new languages

The following components are needed for each jsii language.

### Package Generator ###

Each language implements a class derived from `Generator` which is the base
class for all jsii package generators. **jsii-pacmak** will look for your
language implementation under `lib/generators` and will instantiate your class
when invoked with that language.

The generator implements hooks which are called and instruct your derived
generator to emit code elements such as classes, methods and properties. The
`.code` object can be used to generate files, code blocks and emit indented
lines.

The `test/test-all-generators` program will compile a "complience module" (see
below) and will generate packages for all supported languages, outputs will be
printed to stdout.

## jsii Runtime ##

The generated code will likely need a runtime library implemented in the target
language which will host the JavaScript engine and will handle common tasks like
marshaling/unmarshaling, module loading, etc.

Until we have full documentation, please use the **jsii-java-runtime** library
as a reference implementation.

## Compliance Test ##

The `jsii-calc-lib` and `jsii-calc` modules implement a jsii "compliance test"
which covers all the features currently supported by jsii. These classes are
used to implement a compliance test for each language.

Until we have full documentation (or an ability to automatically generate those
tests somehow), please refer to the **jsii-java-runtime** library as a reference
(see the `org.jsii.Compliance` test class.)

