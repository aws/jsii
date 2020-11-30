# jsii-rosetta: a transpiler for code samples

Utility to transcribe example code snippets from TypeScript to other jsii languages.

Has knowledge about jsii language translation conventions to do the translations. Only supports a limited set of
TypeScript language features.

## Compilability

The translator can translate both code that completely compiles and typechecks, as well as code that doesn't.

In case of non-compiling samples the translations will be based off of grammatical parsing only. This has the downside
that we do not have the type information available to the exact right thing in all instances.

If the samples don't compile or don't have full type information:

- No way to declare typed variables for Java and C#.
- Can only "see" the fields of structs as far as they are declared in the same snippet. Inherited fields or structs
  declared not in the same snippet are invisible.
- When we explode a struct parameter into keyword parameters and we pass it on to another callable, we can't know which
  keyword arguments the called function actually takes so we just pass all of them (might be too many).
- When structs contain nested structs, Python and other languages need to know the types of these fields to generate the
  right calls.
- Object literals are used both to represent structs as well as to represent dictionaries, and without type information
  it's impossible to determine which is which.

### Enforcing Compilability

Package owners can enable enforcement of compiling code sample by setting the `jsii.rosetta.strict` assembly metadata
entry to `true`:

```js
/// package.json
{
  // ...
  "jsii": {
    // ...
    "metadata": {
      "jsii": {
        "rosetta": {
          "strict": true
        }
      }
    }
    // ...
  },
  // ...
}
```

This effectively enables the `--strict` option (which is equivalent to setting `--compile` and `--fail`, causing
`jsii-rosetta` to exit in error if any code sample fails to compile) when translating code samples from the assembly.

## Hiding code from samples

In order to make examples compile, boilerplate code may need to be added that detracts from the example at hand (such as
variable declarations and imports).

This package supports hiding parts of the original source after translation.

To mark special locations in the source tree, we can use one of three mechanisms:

- Use a `void` expression statement to mark statement locations in the AST.
- Use the `comma` operator combined with a `void` expression to mark expression locations in the AST.
- Use special directive comments (`/// !hide`, `/// !show`) to mark locations that span AST nodes. This is less reliable
  (because the source location of translated syntax sometimes will have to be estimated) but the only option if you want
  to mark non-contiguous nodes (such as hide part of a class declaration but show statements inside the constructor).

The `void` expression keyword and or the `comma` operator feature are little-used JavaScript features that are reliably
parsed by TypeScript and do not affect the semantics of the application in which they appear (so the program executes
the same with or without them).

A handy mnemonic for this feature is that you can use it to "send your code into the void".

### Hiding statements

Statement hiding looks like this:

```ts
before(); // will be shown

void 0; // start hiding (the argument to 'void' doesn't matter)
middle(); // will not be shown
void 'show'; // stop hiding

after(); // will be shown again
```

### Hiding expressions

For hiding expressions, we use `comma` expressions to attach a `void` statement to an expression value without changing
the meaning of the code.

Example:

```ts
foo(1, 2, (void 1, 3));
```

Will render as

```
foo(1, 2)
```

Also supports a visible ellipsis:

```ts
const x = (void '...', 3);
```

Renders to:

```
x = ...
```

### Hiding across AST nodes

Use special comment directives:

```ts
before();
/// !hide
notShown();
/// !show
after();
```

(May also start with `/// !show` and `/// !hide`).

## Fixtures

To avoid having to repeat common setup every time, code samples can use "fixtures": a source template where the example
is inserted. A fixture must contain the text `/// here` and may look like this:

```ts
const module = require('@some/dependency');

class MyClass {
  constructor() {
    const obj = new MyObject();

    /// here
  }
}
```

The example will be inserted at the location marked as `/// here` and will have access to `module`, `obj` and `this`.
Any `import` statements found in the example will automatically be hoisted at the top of the fixture, where they are
guaranteed to be syntactically valid.

The default file loaded as a fixture is called `rosetta/default.ts-fixture` in the package directory (if it exists).

Examples can request an alternative fixture by specifying a `fixture` parameter as part of the code block fence:

    ` ` `ts fixture=some-fixture
    ...

Or opt out of using the default fixture by specifying `nofixture`.

## Build integration

Because we want to control the compilation environment when compiling examples, extracting and compiling all samples can
be run as an external build step in a monorepo. This allows you to set up an environment with all desired packages and
compile all samples in one go.

The `jsii-rosetta extract` command will take one or more jsii assemblies, extract the snippets from them, will try to
compile them with respect to a given home directory, and finally store all translations in something called a "tablet"
(which is a lookup map from the original snippet to all of its translations).

A translation tablet will automatically be used by `jsii-pacmak` if present, so it can subsitute the translated examples
into the converted source code when writing out the converted code. When not given a tablet, `jsii-pacmak` can still
live-convert samples, but you will not have the fine control over the compilation environment that you would have if you
were to use the `extract` command.

Works like this:

```
$ jsii-rosetta extract --compile $(find . -name .jsii) --directory some/dir
$ jsii-pacmak --samples-tablet .jsii-samples.tbl
```

(The `extract` command is the default and may be omitted, but if you're passing assembliess as arguments you should
terminate the option list by passing `--`).

### Running in parallel

Since TypeScript compilation takes a lot of time, much time can be gained by using the CPUs in your system effectively.
`jsii-rosetta extract` will run the compilations in parallel if support for NodeJS Worker Threads is detected.

Worker threads are enabled by default on NodeJS 12.x, and can be enabled on NodeJS 10.x by using a flag:

```
$ node --experimental-worker /path/to/jsii-rosetta extract ...
```
