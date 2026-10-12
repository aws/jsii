# ![jsii](./logo/png/128.png)

[![Join the chat at https://cdk.Dev](https://img.shields.io/static/v1?label=Slack&message=cdk.dev&color=brightgreen&logo=slack)](https://cdk.dev)
[![Build Status](https://github.com/aws/jsii/workflows/Main/badge.svg)](https://github.com/aws/jsii/actions?query=workflow%3AMain+branch%3Amain)
[![npm](https://img.shields.io/npm/v/jsii?logo=npm)](https://www.npmjs.com/package/jsii)
[![docker](https://img.shields.io/badge/Docker-public.ecr.aws%2Fjsii%2Fsuperchain-brightgreen?logo=docker)](https://gallery.ecr.aws/jsii/superchain)

## Overview

`jsii` allows code in any language to naturally interact with JavaScript classes. It is the technology that enables the
[AWS Cloud Development Kit][cdk] to deliver polyglot libraries from a single codebase!

[cdk]: https://github.com/aws/aws-cdk

A class library written in **TypeScript** can be used in projects authored in **TypeScript** or **Javascript** (as
usual), but also in **Python**, **Java**, **C#** (and other languages from the _.NET_ family), ...

## :question: Documentation

Head over to our [documentation website](https://aws.github.io/jsii)!

The jsii toolchain is spread out on multiple repositories:

- [aws/jsii-compiler](https://github.com/aws/jsii-compiler) is where the `jsii` compiler is maintained
- [aws/jsii-rosetta](https://github.com/aws/jsii-rosetta) is where the `jsii-rosetta` sample code transliteration tool
  is maintained
- [aws/jsii](https://github.com/aws/jsii) is where the rest of the toolchain is maintained, including:
  - The jsii runtime libraries for the supported jsii target languages
  - `@jsii/spec`, the package that defines the _`.jsii` assembly_ specification
  - `jsii-pacmak`, the bindings generator for jsii packages
  - `jsii-reflect`, a higher-level way to process _`.jsii` assemblies_
  - `jsii-config`, an interactive tool to help configure your jsii package

## :book: Blog Posts

Here's a collection of blog posts (in chronological order) related to `jsii`:

- **2020-01-11:** <a id="blog-mbonig" /> [How to Create CDK Constructs][mbonig-2020-01-11], by [Matthew Bonig][@mbonig]
- **2020-05-27:** <a id="blog-floydpink" /> [Generate Python, Java, and .NET software libraries from a TypeScript
  source][floydpink-2020-05-27], by [Hari Pachuveetil][@floydpink]
- **2020-12-23:** <a id="blog-romainmuller" /> [How the jsii open source framework meets developers where they are][romain-2020-12-23], by [Romain Marcadier][@RomainMuller]

[mbonig-2020-01-11]: https://www.matthewbonig.com/2020/01/11/creating-constructs/
[floydpink-2020-05-27]:
  https://aws.amazon.com/fr/blogs/opensource/generate-python-java-dotnet-software-libraries-from-typescript-source/
[romain-2020-12-23]:
  https://aws.amazon.com/blogs/opensource/how-the-jsii-open-source-framework-meets-developers-where-they-are/
[@mbonig]: http://www.matthewbonig.com/
[@floydpink]: https://harimenon.com/
[@romainmuller]: https://github.com/RomainMuller

> :information_source: If you wrote blog posts about `jsii` and would like to have them referenced here, do not hesitate
> to file a pull request to add the links here!

## :gear: Contributing

See [CONTRIBUTING](./CONTRIBUTING.md).

A thank goes out to [these wonderful people](https://github.com/aws/jsii/graphs/contributors)!

## :balance_scale: License

**jsii** is distributed under the [Apache License, Version 2.0][apache-2.0].

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.

[apache-2.0]: https://www.apache.org/licenses/LICENSE-2.0
