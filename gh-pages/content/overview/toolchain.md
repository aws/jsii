# Toolchain

**jsii** consists of multiple single-purposed programs which can be used to compose various workflows.

!!! info
    We are considering creating an "umbrella entrypoint" to make it easier to consume.

| Name           | Stability    | Description                                                           |
| -------------- | ------------ | --------------------------------------------------------------------- |
| [jsii]         | Stable       | Compiles TypeScript to jsii module                                    |
| [jsii-pacmak]  | Stable       | Creates ready-to-publish language-specific packages from jsii modules |
| [jsii-reflect] | Stable       | Strong-typed reflection library for jsii type systems                 |
| [jsii-diff]    | Stable       | API backwards compatibility checker                                   |
| [jsii-rosetta] | Experimental | Transpile code snippets (in docs) from TypeScript to jsii languages   |
| [jsii-config]  | Experimental | Interactive tool for generating jsii configuration                    |
| [jsii-release] | Community    | Publishes jsii modules to all supported package managers              |
| [jsii-srcmak]  | Community    | Generates relocatable source code in jsii languages from typescript   |
| [jsii-docgen]  | Community    | Generates markdown API documentation for jsii modules                 |

??? question "Stability Definitions"
    - **Stable**: Projects that comply with the [Semantic Versioning][semver] specification, and will hence not change
      behavior or receive other breaking changes across minor and patch version bumps.
    - **Experimental**: Projects that are under active development and may change behavior or receive other breaking
      changes across minor releases.
    - **Community**: a community-maintained project, not officially supported by the *jsii core team*.

    [semver]: https://semver.org/spec/v2.0.0.html


[jsii]: https://github.com/aws/jsii/tree/main/packages/jsii
[jsii-pacmak]: https://github.com/aws/jsii/tree/main/packages/jsii-pacmak
[jsii-reflect]: https://github.com/aws/jsii/tree/main/packages/jsii-reflect
[jsii-config]: https://github.com/aws/jsii/tree/main/packages/jsii-config
[jsii-diff]: https://github.com/aws/jsii/tree/main/packages/jsii-diff
[jsii-rosetta]: https://github.com/aws/jsii/tree/main/packages/jsii-rosetta
[jsii-release]: https://github.com/eladb/jsii-release
[jsii-srcmak]: https://github.com/eladb/jsii-srcmak
[jsii-docgen]: https://github.com/eladb/jsii-docgen
