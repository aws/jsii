# jsii-sampiler: a transpiler for code samples

Utility to transcribe example code snippets from TypeScript to other
jsii languages.

Has knowledge about jsii language translation conventions to do the
translations. Only supports a limited set of TypeScript language features.

## Compilability

The sampiler can translate both code that completely compiles and typechecks,
as well as code that doesn't.

In case of non-compiling samples the translations will be based off of
grammatical parsing only. This has the downside that we do not have the type
information available to the exact right thing in all instances.

If the samples don't compile or don't have full type information:

- No way to declare typed variables for Java and C#.
- Can only "see" the fields of structs as far as they are declared in the same
  snippet. Inherited fields or structs declared not in the same snippet are
  invisible.
- When we explode a struct parameter into keyword parameters and we pass it on
  to another callable, we can't know which keyword arguments the called function
  actually takes so we just pass all of them (might be too many).
- When structs contain nested structs, Python and other languages need to know
  the types of these fields to generate the right calls.
- Object literals are used both to represent structs as well as to represent
  dictionaries, and without type information it's impossible to determine
  which is which.

## Void masking

In order to make examples compile, boilerplate code may need to be added
that detracts from the example at hand (such as variable declarations
and imports).

This package supports hiding parts of the original source after
translation.

To mark special locations in the source tree, we use the `void`
expression keyword and or the `comma` operator feature to attach this
expression to another expression.  Both are little-used JavaScript
features that are reliably parsed by TypeScript and do not affect the
semantics of the application in which they appear (so the program
executes the same with or without them).

A handy mnemonic for this feature is that you can use it to "send your
code into the void".

### Hiding statements

Statement hiding looks like this:

```ts
before();    // will be shown

void 0;      // start hiding (the argument to 'void' doesn't matter)
middle();    // will not be shown
void 'show'; // stop hiding

after();     // will be shown again
```

Void masking only works to the end of the enclosing scope, so in some
cases you can omit the `void 'show'` directive to turn hiding back off.

To explicit show that code was hidden, pass `'block'` to the void
statement:


```ts
before();
void 'block'; // start hiding, will render a '# ...'
middle();
```

### Hiding expressions

For hiding expressions, we use `comma` expressions to attach a `void`
statement to an expression value without changing the meaning of the
code.

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

## Build integration

This tool has the ability to hide irrelevant parts of the generated code
snippet (see the section called "void masking" below). Because the samples
should be compilable to extract all necessary type information, and because
they could depend on any package, the following steps need to happen:

* All packages need to be built (by `jsii`). Ideally, the reduced example ends
  up in the assembly.
* After all packages have been built, sample snippets should be checked
  for compilability and supported language constructs (not all language
  features can be translated to other languages). This requires the full
  snippets (before reducing).
* After the full samples have been type-checked, their reduced version
  can be translated and inserted into the various generated packages by
  `jsii-pacmak`.

To avoid an additional dependency of `jsii` on the `jsii-samples` mechanism,
what we'll do instead is mutating the assembly in-place. So simplified,
the workflow looks like this:

* All packages get compiled by `jsii`.
* We postprocess all assemblies using `jsii-samples`, extracting code to
  a side-archive (`.jsii.samples`) and replacing the original version in the
  assembly, and generating all other language versions. This becomes a
  translation table, with the key being a hash of the reduced snippet.
* `jsii-pacmak` replaces snippets from the translation table.

In this process, `jsii-samples` is as much self-contained as possible. It
works on an assembly to produce a lookup file, which `jsii-pacmak` reads.
`jsii-pacmak` has a simple fallback, which is use the unsubtituted example in
case the right example is not available.

Alternatively, since `jsii` doesn't really provide any facilities to mutate
an assembly in-place, we leave the unreduced examples in the source assembly,
and force all downstream renderers (such as the doc renderer and API tooling)
to use `jsii-samples` to reduce the snippets before presenting them. This is
not ideal but probably the way we're going to go because `jsii` doesn't provide
any tooling to mutate an assembly in-place.
