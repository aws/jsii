# Toolchain

**jsii** consists of multiple single-purposed programs which can be used to compose various workflows.

!!! info
    We are considering creating an "umbrella entrypoint" to make it easier to consume.

| Name            | Release | Stability      | Description                                                           |
| --------------- | ------- | -------------- | --------------------------------------------------------------------- |
| [jsii1]         | `1.x`   | [Maintenance]  | Compiles TypeScript to jsii module (TypeScript 3.9 Syntax)            |
| [jsii]          | `5.0.x` | GA             | Compiles TypeScript to jsii module (TypeScript 5.0 Syntax)            |
| [jsii-pacmak]   | `1.x`   | GA             | Creates ready-to-publish language-specific packages from jsii modules |
| [jsii-reflect]  | `1.x`   | GA             | Strong-typed reflection library for jsii type systems                 |
| [jsii-diff]     | `1.x`   | GA             | API backwards compatibility checker                                   |
| [jsii-rosetta1] | `1.x`   | [Maintenance]  | Transpile code snippets (in docs) from TypeScript to jsii languages   |
| [jsii-rosetta]  | `5.0.x` | Experimental   | Transpile code snippets (in docs) from TypeScript to jsii languages   |
| [jsii-config]   | `1.x`   | Experimental   | Interactive tool for generating jsii configuration                    |
| [jsii-release]  | `1.x`   | Community      | Publishes jsii modules to all supported package managers              |
| [jsii-srcmak]   | `1.x`   | Community      | Generates relocatable source code in jsii languages from typescript   |
| [jsii-docgen]   | `1.x`   | Community      | Generates markdown API documentation for jsii modules                 |

??? question "Stability Definitions"
    - **GA**: Projects that are deemed *Generally Available* and for which customers can expect full support, including
      new features, bug fixes, and security updates.
    - **Experimental**: Projects that are under active development and may change behavior or receive other breaking
      changes across minor releases.
    - **Community**: a community-maintained project, not officially supported by the *jsii core team*.
    - **[Maintenance]**: Project releases under *Maintenance* continue to receive full support, including new features,
      bug fixes, and security updates for a limited time before moving to *Support*.
    - **Support**: Deprecated projects no longer receive new features, and are only updated with severe bug fixes and
      security updates; until they are declared End-of-Support.

    [semver]: https://semver.org/spec/v2.0.0.html


[Maintenance]: ../compiler-and-rosetta-maintenance.md
[jsii1]: https://github.com/aws/jsii/tree/main/packages/jsii
[jsii]: https://github.com/aws/jsii-compiler#readme
[jsii-pacmak]: https://github.com/aws/jsii/tree/main/packages/jsii-pacmak
[jsii-reflect]: https://github.com/aws/jsii/tree/main/packages/jsii-reflect
[jsii-config]: https://github.com/aws/jsii/tree/main/packages/jsii-config
[jsii-diff]: https://github.com/aws/jsii/tree/main/packages/jsii-diff
[jsii-rosetta1]: https://github.com/aws/jsii/tree/main/packages/jsii-rosetta
[jsii-rosetta]: https://github.com/aws/jsii-rosetta#readme
[jsii-release]: https://github.com/eladb/jsii-release
[jsii-srcmak]: https://github.com/eladb/jsii-srcmak
[jsii-docgen]: https://github.com/eladb/jsii-docgen
