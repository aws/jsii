# Features

## Use-Cases & Limitations

The _jsii_ toolchain allows developers to author class libraries once in TypeScript, while allowing their customers to
consume them in various [other languages](#target-languages). This is used for libraries such as the AWS CDK (
[`aws-cdk-lib`](https://npmjs.com/package/aws-cdk-lib)), and is intended for use in similar contexts: client-side,
design-time SDKs that do not require long-running processes and is not in the path to serve time-sensitive requests.

Due to limitations of its [runtime architecture](./runtime-architecture.md), _jsii libraries_ for languages other than
Javascript/TypeScript are best suited for inclusion in short-running processes, outside of performance-sensitive or
memory-constrained contexts.

While `async` APIs are supported by the _jsii_ type system, support for these should be treated as highly experimental.
In particular, support in the various [target languages](#target-languages) varies greatly, and users may encounter a
variety of bugs or surprising behaviors. The current JavaScript-based cross-language interoperability kernel is also
known to block execution of background micro-tasks when it's waiting for commands from the host process.

The runtime libraries used by _jsii libraries_ are not currently designed for thread safety, and using _jsii libraries_
in multi-thread contexts is unsupported at the moment.

## TypeScript Support

The `jsii` compiler leverages the original [TypeScript] compiler API to compile **TypeScript** source files and produce
**JavaScript** output and _TypeScript declaration files_, while also extracting the compiled module's API signatures in
a _jsii assembly file_.

To determine the version of **TypeScript** that is in use by the installed release of `jsii`, simply look at the
`jsii --version` output:

```console
# jsii --version
5.1.6 (build d8f400c), typescript 5.1.6
```

You can then refer to the [TypeScript] documentation to determine which language features are available in that specific
[TypeScript] release.

!!! warning
    The `jsii` compiler imposes some restrictions on what **TypeScript** features can be used to declare the APIs
    exported by a *jsii module*, in order to ensure those APIs can be consistently represented in other languages. For
    more information, refer to the [TypeScript Restrictions page][restrictions].

    [restrictions]: ../user-guides/lib-author/typescript-restrictions.md

[typescript]: https://www.typescriptlang.org

## Target Languages

The following target languages are currently offered by `jsii-pacmak`, or are currently being developed:

| Language   | Status                                         |
| ---------- | ---------------------------------------------- |
| C#         | :octicons-check-circle-24: Generally Available |
| Go         | :octicons-check-circle-24: Generally Available |
| Java       | :octicons-check-circle-24: Generally Available |
| JavaScript | :octicons-check-circle-24: Generally Available |
| Kotlin     | :octicons-tools-24:        Development         |
| Python     | :octicons-check-circle-24: Generally Available |
| TypeScript | :octicons-check-circle-24: Generally Available |

??? question "Status Definitions"
    - **:octicons-check-circle-24: Generally Available** languages are fully supported. The generated APIs will not
      change in breaking ways across minor and patch releases.
    - **:octicons-beaker-24: Developer Preview** languages are experimental. The generated APIs may change in breaking
      ways across minor releases.
    - **:octicons-tools-24: Development** languages are not yet ready for consumption. They are actively developed and
      may still lack certain essential features.
