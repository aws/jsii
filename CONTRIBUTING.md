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

[superchain]: https://github.com/aws/jsii/blob/main/superchain/Dockerfile

The image can be built for local usage, too:

```console
$ IMAGE=superchain
$ docker build -t ${IMAGE} -f superchain/Dockerfile .
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

- [Node `14.6.0`] or later
- [Yarn `1.19.1`] or later
- An OpenJDK-8 distribution (e.g: [Oracle's OpenJDK8], [Amazon Corretto 8])
  + [`maven >= 3.0.5`](https://maven.apache.org)
- [.NET `6.0`] or later
  + *Recommended:* [`mono >= 6`](https://www.mono-project.com)
- [Python `3.7.3`] or later
  + [`pip`](https://pip.pypa.io/en/stable/installing/)
  + [`setuptools >= 38.6.0`](https://pypi.org/project/setuptools/)
  + [`wheel`](https://pypi.org/project/wheel/)
  + *Recommended:* [`twine`](https://pypi.org/project/twine/)
- [Go] `1.18` or newer

[Node `14.6.0`]: https://nodejs.org/download/release/v14.6.0/
[Yarn `1.19.1`]: https://yarnpkg.com/en/docs/install
[Oracle's OpenJDK8]: http://openjdk.java.net/install/
[Amazon Corretto 8]: https://aws.amazon.com/corretto/
[.NET `6.0`]: https://www.microsoft.com/net/download
[Python `3.7.3`]: https://www.python.org/downloads/release/python-373/
[Go]: https://go.dev/dl/

## Getting Started
### Bootstrapping

The project is managed as a [monorepo] using [lerna].

[monorepo]: https://github.com/babel/babel/blob/main/doc/design/monorepo.md
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

#### Reproducting Bugs (Test-Driven Solving)

Troubleshooting bugs usually starts with adding a new test that demonstrates the
faulty behavior, then modifying implementations until the test passes.

The `jsii-calc` and `@scope/*` packages are used to test expected brhavior from
the compiler (note that the [aws/jsii-compiler](github.com/aws/jsii-compiler)
repository as a separate copy of these under the `fixtures` directory), as well
as downstream tooling (`jsii-pacmak`, `jsii-rosetta`, etc...). Each language
runtime has its own test suite, within which is a _compliance_ suite that tests
the same behaviors in all languages, and which should contain tests related to
behavior that isn't strictly specific to the given language.

The `yarn test:update` script in each package runs all tests and updates
snapshots when necessary. It is usually necessary to run this script at least in
`jsii-pacmak` and `jsii-reflect` after changing code in the `jsii-calc` or
`@scope/*` packages.

#### Debugging runtime behavior

Cross-language runtime behavior can be challenging to debug, as data is passed
across process boundaries through Inter-Process Communication (IPC) channels.
Further complicating things, the `@jsii/runtime` library packaged in the various
language runtimes is bundled (by `webpack`), which can make the Javascript
runtime code more complicated to follow.

Setting various environment variables can help understanding what is happening
better:

- `JSII_DEBUG=1` turns on verbose debug logging, which will cause the program to
  emit extensive IPC tracing information to `STDERR`. This information can help
  identify where things start to behave in unexpected ways, but can be a little
  difficult to digest... One may want to refer to the [kernel API][kernel-api]
  documentation to make sense of those traces.

- `JSII_DEBUG_TIMING=1` turns on specific timing information from the
  `@jsii/kernel` high level API processing, which can be useful to narrow down
  the possible causes for performance issues.

- `JSII_RUNTIME` can be set to point to the `bin/jsii-runtime` script within the
  `@jsii/runtime` package in order to use a local, non-`webpack`ed version of
  the runtime program. This can be particularly helpful when trying to diagnose
  a problem within a debugger session.

- `NODE_OPTIONS` can be used to configure specific behaviors of the underlying
  `node` runtime, such as specifying `--inspect-brk` to cause the node process
  to wait for a debugger to attach before proceeding. This is useful to attach
  Node dev tools to the runtime as it starts in order to use its debugger.

The [Visual Studio Code](https://code.visualstudio.com) _JavaScript Debug
Terminal_ feature can be particularly useful paired with appropriate
`JSII_RUNTIME` setting to run arbitrary jsii programs, automatically attaching
the VSCode debugger at startup. These terminals inject a specially crafted
`NODE_OPTIONS` variable that allows the VSCode debugger to consistently attach
to all `node` processes spawned within its context, including child processes
(which can be problematic when running with `--inspect-brk`, as the default
debugger interface's port can only be used by one process at a time).

Finally, the `debugger` Javascript statement can be added anywhere in the
runtime code or tested libraries in order to cause debuggers (if attached) to
pause. This can be easier (and more reliable) to set up than traditional
conditional break points.

[kernel-api]: https://aws.github.io/jsii/specification/3-kernel-api/

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
### The `public.ecr.aws/jsii/superchain` Docker image

Upon merging new changes to the `main` branch, the `public.ecr.aws/jsii/superchain:1-buster-slim-nightly`
image will be released after a last validation build.

Upon making a new `jsii` release (when the GitHub release entry - and its
corresponding git tag - is created), the `public.ecr.aws/jsii/superchain:1-buster-slim` image will
be released after a last validation build.

The latest release information (for both of the Docker image tags) can be seen
on [ECR Public Gallery](https://gallery.ecr.aws/jsii/superchain)
