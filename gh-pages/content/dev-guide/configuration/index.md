# Overview

The configuration for `jsii` is recorded in the `package.json` file, which is the standard package manifest for NPM
packages. This document describes the constraints and extensions `jsii` adds to the [package.json schema].

[package.json schema]: https://docs.npmjs.com/files/package.json

## jsii-config

Use [jsii-config](https://github.com/aws/jsii/tree/main/packages/jsii-config) to aid in configuring a new jsii module.

## Additional Requirements & Extensions

In order to be able to generate valid packages for all the supported target package managers, certain fields that are
optional in the standard [package.json schema] are required by `jsii`.

For example, Maven Central requires packages to carry [sufficient metadata], such as _developer information_ and
_license_, in order to be valid for publishing.

| Field        | Required                        | Extensions                       |
| ------------ |:-------------------------------:| -------------------------------- |
| `author`     | :octicons-check-circle-fill-24: | `author.organization`            |
| `license`    | :octicons-check-circle-fill-24: |                                  |
| `main`       | :octicons-check-circle-fill-24: |                                  |
| `repository` | :octicons-check-circle-fill-24: |                                  |
| `stability`  |                                 | The field itself is an extension |
| `types`      | :octicons-check-circle-fill-24: |                                  |

[sufficient metadata]: https://central.sonatype.org/pages/requirements.html#sufficient-metadata

### Attribution & Licensing

- The [`author`][npm-author] field must be set. Although the string form
  (`"The Octocat <octocat@github.com> (https://github.com/octocat)"`) works, it is recommended to set the value using
  the `object` format:
  ```js
  {
    // ...
    "author": {
      "name": "The Octocat",                // Required
      "email": "octocat@github.com",        // Optional
      "url": "https://github.com/octocat",  // Optional
      "organization": false                 // Optional (defaults to false)
    },
    // ...
  }
  ```
  The `organization` field is an extension from the [package.json schema] that can be used to signal the `author` field
  refers to an `organization` and not and individual person.
- The [`license`][npm-license] field must be set to a valid [SPDX license id]. If you do not intend to release your
  package for third-party consumption, `UNLICENSED` (not to be confused with `Unlicense`) is a valid option.

[npm-author]: https://docs.npmjs.com/files/package.json#people-fields-author-contributors
[npm-license]: https://docs.npmjs.com/files/package.json#license
[spdx license id]: https://spdx.org/licenses/

### Source Control Information

The [`repository`][npm-repository] field must be set to the URL of the source-control system (such as a `git`
repository) for the package. The recommended way to provide the value is using the `object` representation:

```js
{
  "repository": {
    "url": "https://github.com/aws/jsii.git", // Required
    "type": "git",                            // Recommended
    "directory": "/path"                      // Optional
  }
}
```

[npm-repository]: https://docs.npmjs.com/files/package.json#repository

### Library Entry Point

Both the [`main`][npm-main] field must be set to the `.js` file that acts as the entry point of your library (what
node's `require('library-name')` will load). Additionally, `TypeScript`'s [`types`][ts-types] field must be set to the
`.d.ts` file corresponding to the `main` file. The assembly emitted by `jsii` will only represent types that are
exported from the `types` file.

[npm-main]: https://docs.npmjs.com/files/package.json#main
[ts-types]:
  https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package

### Package-level API Stability

The [`.jsii` assembly document](../../language-support/assembly.md) allows representing API stability levels on
individual API elements. The default value set for API elements for which a stability declaration is not found can be
configured using the `stability` field of the `package.json` file. It can be set to one of the following values:
`experimental`, `stable`, `deprecated` and `external`. While the exact semantic value of those fields is defined by the
package maintainer, the generic interpretation for those on packages is:

- `experimental` - the package is not yet ready for production usage, as it is still in the early stages of its
  development.
- `stable` - the package is ready for production and its APIs should be expected to adhere to [semantic versioning].
- `deprecated` - the package should no longer be used and may no longer be maintained. It is a good practice to set the
  `deprecated` field in `package.json` with an explanation of how consumers of the package should update their
  dependencies.
- `external` - the package includes APIs that are derived from external artifacts, and the owners of those artifacts
  control their stability.

## The `jsii` section

In order to configure the behavior of `jsii`, the `package.json` file must include a `jsii` section that can contain the
following entries:

| Field               | Type                    | Required                        | Default                              |
| ------------------- | ----------------------- |:-------------------------------:| ------------------------------------ |
| `excludeTypescript` | `#!ts string[]`         |                                 | _none_                               |
| `metadata`          | `#!ts object`           |                                 | _none_                               |
| `projectReferences` | `#!ts boolean`          |                                 | `#!ts true`                          |
| `targets`           | `#!ts object`           | :octicons-check-circle-fill-24: |                                      |
| `tsc`               | `#!ts object`           |                                 | `#!ts { outDir: '.', rootDir: '.' }` |
| `versionFormat`     | `#!ts 'short' | 'full'` |                                 | `#!ts 'full'`                        |

### `excludeTypescript`

By default, `jsii` will include _all_ `*.ts` files (except `.d.ts` files) in the `TypeScript` compiler input. This can
be problematic for example when the package's build or test procedure generates `.ts` files that cannot be compiled with
`jsii`'s compiler settings.

The `excludeTypescript` configuration accepts a list of glob patterns. Files matching any of those patterns will be
excluded from the `TypeScript` compiler input.

### `metadata`

The `metadata` section can be used to record additional metadata as key-value pairs that will be recorded as-is into the
`.jsii` assembly file. That metadata can later be inspected using [`jsii-reflect`][jsii-reflect] utilities, for example.

[jsii-reflect]: https://github.com/aws/jsii/tree/main/packages/jsii-reflect

### `targets`

The `targets` section is where `jsii` packages define which target languages they support. This provides the package
generators with the additional information they require in order to name generated artifacts. Configuration is provided
as a mapping from target name to a configuration object.

The specific configuration accepted for each supported language is presented in dedicated pages:

- [:octicons-book-24: .NET Target](targets/dotnet.md)
- [:octicons-book-24: Go Target](targets/go.md)
- [:octicons-book-24: Java Target](targets/java.md)
- [:octicons-book-24: Python Target](targets/python.md)

### `tsc`

In order to the generated `javascript` can be properly loaded by the `jsii` runtimes, `jsii` generates a
[`tsconfig.json`] file with fixed settings at the beginning of the compilation pass. Certain configuration options can
however be set by the maintainers in order to better suit their development workflow or processes. Those configuration
are set in the `jsii.tsc` section of the `package.json` file, but use the same name as [`tsconfig.json`]:

- `outDir` - path to the directory when artifacts generated by the `TypeScript` compiler will be placed.
  - This influences the location of `.d.ts` and `.js` files, but will not affect the location of the `.jsii` file, which
    will _always_ be placed at the package's root.
- `rootDir` - specifies the root directory that contains all of the `.ts` source files. This is used in conjunction with
  `outDir`, to control the directory structure that gets generated.

Refer to the [TypeScript compiler options reference][ts-options] for more information about those options.

[`tsconfig.json`]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
[ts-options]: https://www.typescriptlang.org/docs/handbook/compiler-options.html

### `versionFormat`

Determines the format of the `jsii` toolchain version string that will be included in the `.jsii` assembly file's
`jsiiVersion` attribute.

- `full` (the default) - a version number including a commit hash will be used
  - For example: `0.14.3 (build 1b1062d)`
- `short` - only the version number of `jsii` will be used
  - For example: `0.14.3`

This option is primarily useful for developing regression tests when developing `jsii` itself, as using the `short`
format reduces volatility in the assemblies generated by development versions of `jsii`. Users of `jsii` are advised to
leave the default setting, as having full version information can be essential when trying to troubleshoot assembly
generation problems.

### Diagnostics

JSII produces a number of diagnostic information. These have been categorized into "error", "warning", "suggestion" and
"message", by default. Diagnostics categorized as "error" will fail the jsii compiler and the rest will be printed to
console.

These can be re-configured to a different category under the `diagnostics` key as so -

```json
"jsii": {
  // ...
  "diagnostics": {
    "documentation/non-existent-parameter": "error",
    "code-style/submodule-name-casing": "suggestion",
    "JSII9998": "error",
    "JSII9001": "warning"
  }
}
```

As noted in the example above, the diagnostic code can be the human readable string, or the numeric code prefixed with
`JSII`.

The full list of diagnostic codes can be found in
[`jsii-diagnostic.ts`](https://github.com/aws/jsii/tree/main/packages/jsii/lib/jsii-diagnostic.ts).

## Dependency considerations

Like any node library, `jsii` packages can declare runtime dependencies using the [`dependencies`][npm-deps] section of
`package.json`.

[npm-deps]: https://docs.npmjs.com/files/package.json#dependencies

### Dependencies that are `jsii` modules

Node modules are conventionally versioned using [semantic versioning], but that is not true of all package managers that
`jsii` is able to target. Additionally, only one version of the `jsii` runtime and kernel can be used within a given
application. In order to avoid version resolution surprises at run-time, `jsii` requires duplicating `jsii` modules
declarations from [`dependencies`][npm-deps] into the [`peerDependencies`][npm-peer-deps] section.

[npm-peer-deps]: https://docs.npmjs.com/files/package.json#peerdependencies
[semantic versioning]: https://semver.org

### Dependencies that are not `jsii` modules

The `jsii` runtimes in non-**javascript** languages do not use `npm install`, and as a consequence cannot rely on
`npm install` bringing in a package's dependencies. As a consequence, dependencies that are not themselves `jsii`
modules, **must** also be referenced in the [`bundledDependencies`][npm-bundled] section, so that they are bundled
within the NPM package.

[npm-bundled]: https://docs.npmjs.com/files/package.json#bundleddependencies
