# Contributing to jsii
Thanks for your interest in contributing to AWS JSII! :heart:

This document describes how to set up a development environment and submit your
contributions. Please read it carefully and let us know if it's not up-to date
(or even better, submit a pull request with your corrections! :wink:).

## Pre-requisites
### Toolchain Requirements
Due to the polyglot nature of `jsii`, the toolchain requirements are somewhat
more complicated than for most projects. In order to locally develop `jsii`, you
will need the following tools:

- [Node `8.11.0`] or later
- An OpenJDK-8 distribution (e.g: [Oracle's OpenJDK8], [Amazon Corretto 8])
  + [`maven >= 3.0.5`](https://maven.apache.org)
- [.NET Core `2.0`] or later
  + *Recommended:* [`mono >= 5`](https://www.mono-project.com)
- [Python `3.6.5`] or later
  + [`pip`](https://pip.pypa.io/en/stable/installing/)
  + [`setuptools >= 38.6.0`](https://pypi.org/project/setuptools/)
  + [`wheel`](https://pypi.org/project/wheel/)
  + *Recommended:* [`twine`](https://pypi.org/project/twine/)
- [Ruby `2.4.4p296`] or later
  + [`bundler ~> 1.17.2`](https://bundler.io)

[Node `8.11.0`]: https://nodejs.org/download/release/v8.11.0/
[Oracle's OpenJDK8]: http://openjdk.java.net/install/
[Amazon Corretto 8]: https://aws.amazon.com/corretto/
[.NET Core `2.0`]: https://www.microsoft.com/net/download
[Python `3.6.5`]: https://www.python.org/downloads/release/python-365/
[Ruby `2.4.4p296`]: https://www.ruby-lang.org/en/news/2018/03/28/ruby-2-5-1-released/

### Alterative: build in Docker

We have built a Docker image with all the required tool, which we are using for
our own CI/CD: the ["superchain" image][superchain] from.

[superchain]: https://github.com/aws/jsii/blob/master/superchain/Dockerfile

The image can be built for local usage, too:

```console
$ IMAGE=superchain
$ docker build -t ${IMAGE} ./superchain
```

In order to get an interactive shell within a Docker container using the
*superchain* image you just built:

```console
$ cd jsii # go to the root of the jsii repo
$ docker run --rm --net=host -it -v $PWD:$PWD -w $PWD ${IMAGE}
```

You can then run `npm run build` as described below.

## Getting Started
### Bootstrapping

The project is managed as a [monorepo] using [lerna].

[monorepo]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[lerna]: https://github.com/lerna/lerna

1. Check out this repository.
2. Run `npm run build` to install lerna, bootstrap the repository and perform an
   initial build and test cycle.

### Development Workflow

All packages within this repository have the following scripts:

- `build` - builds the package, usually runs the TypeScript compiler, `tsc`.
- `watch` - watches for file changes and builds them progressively, usually
  running `tsc --watch`.
- `test` - executes all unit tests for the current package.
- `package` - emits publishable artifacts to `dist`.

Each one of these scripts can be executed either from the root of the repo using
`npx lerna run <script> --scope <package>` or from individual modules using
`npm run <script>`.

### Bump

To bump the version of this repository, use the [`npm run bump`] script.

[`npm run bump`]: ./scripts/bump.sh

### Packaging and Bundling

This repository emits artifacts in multiple languages. The [`npm run package`]
script is used to prepare the repository for publishing.

[`npm run package`]: ./scripts/package.sh

Each module that needs to be published implements an npm script called `package`
which emits publishable artifacts to `dist/<lang>` (e.g. `dist/dotnet` for
NuGet, `dist/js` for npm, `dist/java` for Maven Central). All those "dist"
directories are merged into a single .zip file that is later on used in our
CI/CD publishing tasks. Each `<lang>` directory is published to the respective
package repository.

## Implementing Language Bindings

jsii language bindings consist of two main components:

1. __A runtime client library__: a library implemented for each language. This
   library is responsible to manage the child
   [`jsii-runtime`](./packages/jsii-runtime/README.md) process and interact with
   the [jsii-kernel](./packages/jsii-kernel/README.md).
2. __A `jsii-pacmak` generator__: extend the jsii-pacmak project to be able to
   generate proxy classes for a jsii module.

> This section can definitely use some additional information.

### Runtime Client Library

The runtime client library should be implemented as a module under
`packages/jsii-<lang>-runtime`.

The jsii runtime client library usually includes the following components:

- Child process manager: responsible to start/stop the jsii-runtime child
  process.
- Protocol layer: implements the STDIN/STDOUT protocol that interacts with the
  jsii-runtime.
- Proxy layer: includes base classes and serialization utilities to implement
  the generated proxy classes.

> More documentation should be added here. In the meantime, refer to the Java
> implementation as a reference:
>
> - [Process manager](./packages/jsii-java-runtime/project/src/main/java/software/amazon/jsii/JsiiRuntime.java)
> - [Protocol layer](./packages/jsii-java-runtime/project/src/main/java/software/amazon/jsii/JsiiClient.java)
> - [Proxy layer](./packages/jsii-java-runtime/project/src/main/java/software/amazon/jsii/JsiiEngine.java)

### Package Generator

The pacmak code generator should be implemented under
[`jsii-pacmak/lib/targets`](./packages/jsii-pacmak/lib/targets).

The [Python](./packages/jsii-pacmak/lib/targets/python.ts) target is a good
example to work from.
