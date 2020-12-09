# Features

## TypeScript Support

The `jsii` compiler leverages the original [TypeScript] compiler API to compile **TypeScript** source files and produce
**JavaScript** output and _TypeScript declaration files_, while also extracting the compiled module's API signatures in
a _jsii assembly file_.

To determine the version of **TypeScript** that is in use by the installed release of `jsii`, simply look at the
`jsii --version` output:

```console
# jsii --version
1.15.0 (build 585166b), typescript 3.9.7
```

You can then refer to the [TypeScript] documentation to determine which language features are available in that specific
[TypeScript] release.

!!! warning
    The `jsii` compiler imposes some restrictions on whath **TypeScript** features can be used to declare the APIs
    exported by a *jsii module*, in order to ensure those APIs can be consistently represented in other languages. For
    more information, refer to the [TypeScript Restrictions page][restrictions].

    [restrictions]: user-guide/typescript-restrictions.md

[typescript]: https://www.typescriptlang.org

## Target Languages

The following target languages are currently offered by `jsii-pacmak`, or are currently being developed:

| Language   | Status                                         |
| ---------- | ---------------------------------------------- |
| C#         | :octicons-check-circle-24: Generally Available |
| Go         | :octicons-tools-24: Development                |
| Java       | :octicons-check-circle-24: Generally Available |
| Kotlin     | :octicons-tools-24: Development                |
| Python     | :octicons-check-circle-24: Generally Available |

!!! info
    - **:octicons-check-circle-24: Generally Available** languages are fully supported. The generated APIs will not
      change in breaking ways across minor and patch releases.
    - **:octicons-beaker-24: Developer Preview** languages are experimental. The generated APIs may change in breaking
      ways across minor releases.
    - **:octicons-tools-24: Development** languages are not yet ready for consumption. They are actively developed and
      may still lack certain essential features.
