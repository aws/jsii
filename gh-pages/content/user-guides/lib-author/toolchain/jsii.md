# jsii

The `jsii` tool wraps the standard **TypeScript** compiler, applies the
[TypeScript restrictions](../typescript-restrictions.md), producing additional
diagnostic messages as necessary.

## Options

!!! info
    This section discusses the main options of `jsii` only. There may be
    additional options not mentioned on this page, which can learn about using
    `jsii --help`.

### `--watch`

The `--watch` option behaves similar to that of the standard **TypeScript**
compiler. It will make `jsii` listen to file changes within the project, and
recompile whenever a source file has changed (including producing diagnostic
messages, and a new `.jsii` assembly file as needed).

This option is useful when iterating on your code, as it provides a faster
feedback loop than periodically manually re-compiling.

### `--project-references`

When `--project-references` is specified, `jsii` will generate a `tsconfig.json`
file that includes `references` to any other local `jsii` project present in the
dependency closure of the current one.

This option is recommended for any project that is part of a mono-repository,
where multiple `jsii` packages are being maintained. It can result in improved
build times, and a better IDE experience.

### `--fail-on-warnings`

The `--fail-on-warnings` option causes compilation top fail if any `warning`
diagnostic is emitted. This setting is recommended for users who want to ensure
the best possible experience for developers using their library in all supported
languages, as it will prevent inadvertent use of one of those languages'
reserved words in an identifier.

!!! warning
    Setting this option might occasionally cause compilation to fail when
    performing a minor version upgrade to `jsii`; in particular when support for
    a new language is introduced (as this may introduce additional reserved
    words, too).

    This situation will be improved in the future, as `jsii` will offer an
    option to only warn about reserved words of languages that are configured
    for the current project.

### :test_tube: Experimental Features

!!! danger
    The features discussed in this section are experimental. Their behavior may
    change as bugs are addressed, and requirements are clarified through early
    adopters. Use at your own risk, and don't forget to [report bugs] you
    encounter while doing so!

    [report bugs]: https://github.com/aws/jsii/issues/new/choose

#### `--tsconfig`, `--validate-tsconfig` _(available from jsii >= 5.2)_

By default, jsii will generate a `tsconfig.json` for you, using best practice
settings that are optimized for widespread support and backwards compatibility.
In some situations it can be useful to provide a custom typescript
configuration file to compile the jsii project.

Use the `--tsconfig` option to provide a path the config file, usually this
will be `--tsconfig=tsconfig.json`.

A user-provider typescript config must follow certain rules to be a valid
config for use with jsii. These rules are enforced by the `--validate-tsconfig`
option. You may choose the level of validation to suit your use case.

--8<-- "partials/tsconfig-rulesets.md"

#### `--strip-deprecated`

The `--strip-deprecated` option modifies the compilation flow such that all
declarations (types, members) documented with the `@deprecated` tag will be
erased from the visible API of the module:

- They will be removed from the **TypeScript** declarations (`.d.ts`) files
- They will be removed from the `.jsii` assembly file
- Inheritance chains of non-`@deprecated` types will have their `@deprecated`
  bases transitively replaced with non-`@deprecated` bases thereof (or if there
  are no such parents, the inheritance relationship will simply be erased)
- Errors will be reported for each remaining use of a `@deprecated` type in the
  API (this includes property types, method parameter types, and method return
  types)

However, in order to ensure the underlying code continues to work as designed,
the *implementation* of such declarations will remain in the **JavaScript**
(`.js`) files produced by the compilation. This is, in fact, similar to marking
all `@deprecated` members `@internal`.

Additionally, a file name can be passed to the `--strip-deprecated` option to
limit the above behavior to a specific set of allow-listed fully-qualified
names. Each line in the file should contain a single fully-qualified name of a
declaration that should be stripped. All `@deprecated` elements not present in
the allow list will be retained. An example allowlist file might look like:

    testpkg.IDeprecated
    testpkg.DeprecatedOne
    testpkg.DeprecatedTwo#deprecatedProperty
    testpkg.DeprecatedTwo#deprecatedMethod

#### `--add-deprecated-warnings`

The `--add-deprecated-warnings` flag modifies the implementation of all
declarations (types, members) documented with the `@deprecated` flag such that,
when the deprecated declaration is used by a dependent, a warning is printed to
the console at runtime.

This is specifically useful to notify users of a jsii module that they are
using deprecated elements and code updates are required.

Additionally, the environment variable `JSII_DEPRECATED` can be set to `error`
or `quiet` to either fail at runtime or silence these warnings, respectively.
By default, this is set to `warn`.

The `JSII_DEPRECATED` environment variable is respected only on modules compiled
with the `--add-deprecated-warnings` flag.
