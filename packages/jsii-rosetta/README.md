# jsii-rosetta: a transpiler for code samples

Utility to transcribe example code snippets from TypeScript to other jsii languages.

Has knowledge about jsii language translation conventions to do the translations. Only supports a limited set of
TypeScript language features.

## Rosetta for example authors

This section describes what to pay attention to when writing examples that will be converted
by Rosetta.

### Making examples compile

The translator can translate both code that completely compiles and typechecks, as well as code that doesn't.

In case of non-compiling samples the translations will be based off of grammatical parsing only. This has the downside
that we do not have the type information available to the exact thing in all instances. Specifically
struct types will not be able to be inferred from object literals. Have a look at the following piece of code:

```ts
someObject.someMethod('foo', {
  bar: 3,
});
```

In non-TypeScript languages, it is important to know the type of the second
argument to the method here. However, without access to the definition of
`someMethod()`, it's impossible for Rosetta to know the type, and hence
it cannot translate the example. It is therefore important to include necessary
imports, variable declarations, etc, to give Rosetta enough information to figure
out what's going on in this code, and the example should read like this:

```ts
import * as myLib from 'some-library';

declare const someObject: myLib.SomeClass;

someObject.someMethod('foo', {
  bar: 3,
});
```

### Enforcing correct examples

By default, Rosetta will accept non-compiling examples. If you set
`jsiiRosetta.strict` to `true` in your `package.json`,
the Rosetta command will fail if any example contains an error:

```js
/// package.json
{
  "jsiiRosetta": {
    "strict": true
  }
}
```

### Fixtures

To avoid having to repeat common setup every time, code samples can use
"fixtures": a source template where the example is inserted. A fixture must
contain the text `/// here` and typically looks like this:

```ts
const * as module from '@some/dependency';

class MyClass {
  constructor() {
    const obj = new MyObject();

    /// here
  }
}
```

The example will be inserted at the location marked as `/// here` and will have
access to `module`, `obj` and `this`.  Any `import` statements found in the
example will automatically be hoisted at the top of the fixture, where they are
guaranteed to be syntactically valid.

The default file loaded as a fixture is called `rosetta/default.ts-fixture` in
the package directory (if it exists).

Examples can request an alternative fixture by specifying a `fixture` parameter
as part of the code block fence:

````text
```ts fixture=some-fixture
````

Or opt out of using the default fixture by specifying `nofixture`:

````text
```ts nofixture
````

To specify fixtures in an `@example` block, use an accompanying `@exampleMetadata` tag:

````text
/**
 * My cool class
 *
 * @exampleMetadata fixture=with-setup
 * @example
 *
 * new MyCoolClass();
 */
````

### Dependencies

When compiling examples, Rosetta will make sure your package itself and all of
its `dependencies` and `peerDependencies` are available in the dependency
closure that your examples will be compiled in.

If there are packages you want to use in an example that should *not* be part
of your package's dependencies, declare them in `jsiiRosetta.exampleDependencies`
in your `package.json`:

```js
/// package.json
{
  "jsiiRosetta": {
    "exampleDependencies": {
      "@some-other/package": "^1.2.3",
      "@yet-another/package": "*",
    }
  }
}
```

You can also set up a directory with correct dependencies yourself, and pass
`--directory` when running `jsii-rosetta extract`. We recommend using the
automatic closure building mechanism and specifying `exampleDependencies` though.

## Rosetta for package publishers

This section describes how Rosetta integrates into your build process.

### Extract

Rosetta has a number of subcommands. The most important one is `jsii-rosetta extract`.

The `jsii-rosetta extract` command will take one or more jsii assemblies,
extract the snippets from them, will try to compile them with respect to a given
home directory, and finally store all translations in something called a
"tablet".

A couple of things to note here:

* Snippets are always read from the jsii assembly. That means if you make
  changes to examples in source files, you must first re-run `jsii` to
  regenerate the assembly, before re-running `jsii-rosetta extract`.
* The compilation directory will be used to resolve `import`s. Currently, you
  are responsible for building a directory with the correct `node_modules`
  directories in there so that a TypeScript compilation step will find all
  libraries referenced in the examples. This is especially revelant if your
  examples include libraries that depend on the *current* library: it is not
  uncommon to write examples in library `A` showing how to use it in combination
  with library `B`, where `B` depends on `A`. However, since by definition `B`
  *cannot* be in the set of dependencies of `A`, you must build a directory with
  both `B` and `A` in it somewhere in your filesystem and run Rosetta in that
  directory.
* "Extract" will compile samples in parallel. The more assemblies you give it
  at the same time, the more efficient of a job it will be able to do.

The extract command will write a file named `.jsii.tabl.json` next to every
assembly, containing translations for all samples found in the assembly. You
should include this file in your NPM package when you publish, so that
downstream consumers of the package have access to the translations.

An example invocation of `jsii-rosetta extract` looks like this:

```sh
jsii-rosetta extract --directory some/dir $(find . -name .jsii)
```

#### Running in parallel

Since TypeScript compilation takes a lot of time, much time can be gained by
using the CPUs in your system effectively.  `jsii-rosetta extract` will run the
compilations in parallel.

`jsii-rosetta` will use a number of workers equal to half the number of CPU
cores, up to a maximum of 16 workers. This default maximum can be overridden by
setting the `JSII_ROSETTA_MAX_WORKER_COUNT` environment variable.

If you get out of memory errors running too many workers, run a command like
this to raise the memory allowed for your workers:

```sh
/sbin/sysctl -w vm.max_map_count=2251954
```

#### Caching

Rosetta extract will translate all examples found in `.jsii` and write the
translations to `.jsii.tabl.json`. From compilation to compilation, many of these
examples won't have changed. Since TypeScript compilation is a fairly expensive
process, we would like to avoid doing unnecessary work as much as possible.

To that end, rosetta can reuse translations from a cache, and write
new translations into the same cache:

```sh
jsii-rosetta extract \
  --directory some/dir \
  --cache cache.json \
  [--trim-cache] \
  $(find . -name .jsii)
```

The `--trim-cache` flag will remove any old translations from the cache that
don't exist anymore in any of the given assemblies. This prevents the cache from
growing endlessly over time (an equivalent `jsii-rosetta trim-cache` command is
available if your workflow involves running `extract` in multiple distinct
invocations and want to retain the cache between them).

### Infuse

The `jsii-rosetta infuse` command increases the coverage of examples for classes
in the assembly.

It finds classes in the assembly that don't have an example associated with them
yet (as specified via the `@example` tag in the doc comments), but that are used
in another example found elsewhere—in either a `README` or an example of another
class—it will copy the example to all classes involved.  This will make sure
your handwritten examples go as far as possible.

Note that in order to do this, `infuse` will *modify* the assemblies it is
given.

`rosetta infuse` depends on the analysis perfomed by `rosetta extract`, and must
therefore be run after `extract`. It can also be run as part of `extract`, by
passing the `--infuse` flag:

```sh
jsii-rosetta extract \
  --directory some/dir \
  --infuse \
  $(find . -name .jsii)
```

### Translations and pacmak

`jsii-pacmak` will read translation from tablets to substitute translated examples
into the generated source bindings. `pacmak` will automatically read individual
`.jsii.tabl.json` files if present, and can additionally also read from a global
tablet file.

When a translation for a code sample cannot be found, `pacmak` can be configured
to do one of the following:

* Leave the sample untranslated (default)
* Translate the sample in-place (this will slow down generation a lot, and you
  will not have the fine control over the compilation environment that you would
  have if you were to use the `extract` command)
* Fail

Example:

```sh
jsii-pacmak \
  [--rosetta-tablet=global.json] \
  [--rosetta-unknown-snippets=verbatim|translate|fail]
```

### Data flow

The diagram below shows how data flows through the jsii tools when used together:

```text
┌───────────┐
│           │
│  Source   ├───┐
│           │   │    ╔══════════╗    ┌────────────┐     ╔═══════════════╗    ┌──────────┐
└───────────┘   │    ║          ║    │            │     ║    rosetta    ║    │          │
                ├───▶║   jsii   ║───▶│  assembly  │────▶║    extract    ║───▶│  tablet  │
┌───────────┐   │    ║          ║    │            │     ║               ║    │          │
│           │   │    ╚══════════╝    └────────────┘     ╚═══════════════╝    └──────────┘
│  README   │───┘                           │                                      │
│           │                               │                                      │
└───────────┘                               │           ╔═══════════════╗          │
                                            │           ║    rosetta    ║          │
                                            └──────────▶║    infuse     ║◀─────────┘
                                                        ║               ║
                                                        ╚═══════════════╝
                                                                │
                                            ┌───────────────────┴───────────────────┐
                                            │                                       │
                                            ▼                                       ▼
                                     ┌────────────┐                           ┌──────────┐
                                     │            │                           │          │
                                     │ assembly'  │                           │ tablet'  │
                                     │            │                           │          │
                                     └────────────┘                           └──────────┘
                                            │                                       │
                                            │                                       │
                                            │                                       ▼              ┌─────────────┐
                                            │                               ╔═══════════════╗     ┌┴────────────┐│
                                            │                               ║               ║     │             ││
                                            └──────────────────────────────▶║    pacmak     ║────▶│  packages   ││
                                                                            ║               ║     │             ├┘
                                                                            ╚═══════════════╝     └─────────────┘
                                                                               (potentially
                                                                             live-translates)
```

## Advanced topics

### Hiding code from samples

In order to make examples compile, boilerplate code may need to be added that detracts from the example at hand (such as
variable declarations and imports).

This package supports hiding parts of the original source after translation.

To mark special locations in the source tree, we can use one of three mechanisms:

* Use a `void` expression statement to mark statement locations in the AST.
* Use the `comma` operator combined with a `void` expression to mark expression locations in the AST.
* Use special directive comments (`/// !hide`, `/// !show`) to mark locations that span AST nodes. This is less reliable
  (because the source location of translated syntax sometimes will have to be estimated) but the only option if you want
  to mark non-contiguous nodes (such as hide part of a class declaration but show statements inside the constructor).

The `void` expression keyword and or the `comma` operator feature are little-used JavaScript features that are reliably
parsed by TypeScript and do not affect the semantics of the application in which they appear (so the program executes
the same with or without them).

A handy mnemonic for this feature is that you can use it to "send your code into the void".

#### Hiding statements

Statement hiding looks like this:

```ts
before(); // will be shown

void 0; // start hiding (the argument to 'void' doesn't matter)
middle(); // will not be shown
void 'show'; // stop hiding

after(); // will be shown again
```

#### Hiding expressions

For hiding expressions, we use `comma` expressions to attach a `void` statement to an expression value without changing
the meaning of the code.

Example:

```ts
foo(1, 2, (void 1, 3));
```

Will render as

```ts
foo(1, 2)
```

Also supports a visible ellipsis:

```ts
const x = (void '...', 3);
```

Renders to:

```ts
x = ...
```

#### Hiding across AST nodes

Use special comment directives:

```ts
before();
/// !hide
notShown();
/// !show
after();
```

(May also start with `/// !show` and `/// !hide`).
