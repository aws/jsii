# Contributing to jsii
Thanks for your interest in contributing to AWS JSII! :heart:

This document describes how to set up a development environment and submit your
contributions. Please read it carefully and let us know if it's not up-to date
(or even better, submit a pull request with your corrections! :wink:).

## Pre-requisites
### Setup Docker image
Due to the polyglot nature of `jsii`, the toolchain requirements are somewhat
more complicated than for most projects. In order to locally develop `jsii`, you
will need a number of tools.

We have built a Docker image with all the required tools, which we are using for
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

In the shell that pops up, the `npm run` commands in the following sections must
be executed.

### Alternative: Manually install the toolchain
The following tools need to be installed to develop on JSII locally. We recommend
using the docker image from the above section, but if you wish to, you can install
in your development environment.

- [Node `8.11.0`] or later
- [Yarn `1.19.1`] or later
- An OpenJDK-8 distribution (e.g: [Oracle's OpenJDK8], [Amazon Corretto 8])
  + [`maven >= 3.0.5`](https://maven.apache.org)
- [.NET Core `2.1`] or later
  + *Recommended:* [`mono >= 5`](https://www.mono-project.com)
- [Python `3.6.5`] or later
  + [`pip`](https://pip.pypa.io/en/stable/installing/)
  + [`setuptools >= 38.6.0`](https://pypi.org/project/setuptools/)
  + [`wheel`](https://pypi.org/project/wheel/)
  + *Recommended:* [`twine`](https://pypi.org/project/twine/)

[Node `8.11.0`]: https://nodejs.org/download/release/v8.11.0/
[Yarn `1.19.1`]: https://yarnpkg.com/en/docs/install
[Oracle's OpenJDK8]: http://openjdk.java.net/install/
[Amazon Corretto 8]: https://aws.amazon.com/corretto/
[.NET Core `2.0`]: https://www.microsoft.com/net/download
[Python `3.6.5`]: https://www.python.org/downloads/release/python-365/

## Getting Started
### Bootstrapping

The project is managed as a [monorepo] using [lerna].

[monorepo]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[lerna]: https://github.com/lerna/lerna

1. Check out this respository and change directory to its root.
2. Run `yarn install && yarn build` to install lerna, bootstrap the repository
   and perform an initial build and test cycle.

### Development Workflow

All packages within this repository have the following scripts:

- `build` - builds the package, usually runs the TypeScript compiler, `tsc`.
- `watch` - watches for file changes and builds them progressively, usually
  running `tsc --watch`.
- `test` - executes all unit tests for the current package.
- `test:update` - executes all unit tests and overwrites snapshot expectations (those `.snap` files).
- `package` - emits publishable artifacts to `dist`.
- `lint` - run linter against source
- `lint:fix` - lint and auto-correct formatting issues when possible

Each one of these scripts can be executed either from the root of the repo using
`npx lerna run <script> --scope <package>` or from individual modules using
`yarn <script>`.

#### Linting & Formatting

Eslint and Prettier are used to lint and format our typescript code. The `lint`
and `lint:fix` scripts can be run from the root or from a specific module.

You can integrate the linting and formatting workflow with your editor or ide by
installing the approporiate eslint plugin. For example, when using Visual Studio
Code, the [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
exposes a number of options including "fix on save". This will auto correct lint
and formatting errors whenever possible while saving a document.

### Bump

To bump the version of this repository, use the [`yarn bump`] script.

[`yarn bump`]: ./scripts/bump.sh

### Packaging and Bundling

This repository emits artifacts in multiple languages. The [`yarn package`]
script is used to prepare the repository for publishing.

[`yarn package`]: ./scripts/package.sh

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
   [`@jsii/runtime`](./packages/@jsii/runtime/README.md) process and interact with
   the [@jsii/kernel](./packages/@jsii/kernel/README.md).
2. __A `jsii-pacmak` generator__: extend the jsii-pacmak project to be able to
   generate proxy classes for a jsii module.

> This section can definitely use some additional information.

### Runtime Client Library

The runtime client library should be implemented as a module under
`packages/@jsii/<lang>-runtime`.

The jsii runtime client library usually includes the following components:

- Child process manager: responsible to start/stop the **@jsii/runtime** child
  process.
- Protocol layer: implements the STDIN/STDOUT protocol that interacts with the
  **@jsii/runtime**.
- Proxy layer: includes base classes and serialization utilities to implement
  the generated proxy classes.

> More documentation should be added here. In the meantime, refer to the Java
> implementation as a reference:
>
> - [Process manager](./packages/@jsii/java-runtime/project/src/main/java/software/amazon/jsii/JsiiRuntime.java)
> - [Protocol layer](./packages/@jsii/java-runtime/project/src/main/java/software/amazon/jsii/JsiiClient.java)
> - [Proxy layer](./packages/@jsii/java-runtime/project/src/main/java/software/amazon/jsii/JsiiEngine.java)

### Package Generator

The pacmak code generator should be implemented under
[`jsii-pacmak/lib/targets`](./packages/jsii-pacmak/lib/targets).

The [Python](./packages/jsii-pacmak/lib/targets/python.ts) target is a good
example to work from.

## Releasing
### The `jsii/superchain` Docker image

Upon merging new changes to the `master` branch, the `jsii/superchain:nightly`
image will be released by TravisCI after a last validation build.

Upon making a new `jsii` release (when the GitHub release entry - and its
corresponding git tag - is created), the `jsii/superchain:latest` image will
be released by TravisCI after a last validation build.

The latest release information (for both of the Docker image tags) can be seen
on [Docker Hub](https://hub.docker.com/r/jsii/superchain/tags)
