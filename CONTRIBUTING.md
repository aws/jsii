# Contributing to jsii

We welcome contributions of any kind.

This section includes information for contributors.

## Development Environment

Since this repo produces artifacts for multiple programming languages using
__jsii__, it relies on the following toolchains:

 - [Node.js 8.11.0](https://nodejs.org/download/release/v8.11.0/)
 - [Java OpenJDK 8](http://openjdk.java.net/install/)
 - [.NET Core 2.0](https://www.microsoft.com/net/download)
 - [Python 3.6.5](https://www.python.org/downloads/release/python-365/)
 - [Ruby 2.5.1](https://www.ruby-lang.org/en/news/2018/03/28/ruby-2-5-1-released/)

A `jsii/superchain` Docker image is available and includes all the required
tools, including those necessary to build `jsii` itself.

This image can also be built and used locally:

```console
$ IMAGE=superchain
$ docker build -t ${IMAGE} ./superchain
```

This will get you into an interactive docker shell:

```console
$ cd jsii # Go to where your JSII package source is located
$ docker run --rm -it --net=host -v $PWD:$PWD -w $PWD ${IMAGE}
```

You can then run `./build.sh` as described below.

### Bootstrapping

The project is managed as a
[monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
using [lerna](https://github.com/lerna/lerna).

1. Check out this repository.
2. Run `./build.sh` to install lerna, bootstrap the repo and perform an initial
   build + test cycle.

### Workflow

All modules within this repository have the following scripts:

* `build` - builds the module (usually runs the TypeScript compiler).
* `watch` - runs `tsc -w` which picks up changes and builds them progressively.
* `test` - uses `nodeunit test/test.*.js` to run all unit tests.
* `package` - emits publishable artifacts to `dist/<lang>`

Each one of these scripts can be executed either from the root of the repo using
`npx lerna run <script> --scope <package>` or from individual modules using
`npm run <script>`.

### Bump

To bump the version of this repository, use the [`./bump.sh`](./bump.sh) script.

### Packaging and Bundling

This repository emits artifacts in multiple languages. The
[`pack.sh`](./pack.sh) and [`bundle.sh`](./bundle.sh) scripts are used to
prepare the repository for publishing.

Each module that needs to be published implements an npm script called `package`
which emits publishable artifacts to `dist/<lang>` (e.g. `dist/dotnet` for
NuGet, `dist/js` for npm, `dist/java` for Maven Central). All those "dist"
directories are merged into a single .zip file that is later on used in our
CI/CD publishing tasks. Each `lang` directory is published to the respective
repository.

## Implementing Language Bindings

jsii language bindings consist of two main components:

1. __A runtime client library__: a library implemented for each language. This
   library is responsible to manage the child
   [`jsii-runtime`](./packages/jsii-runtime/README.md) process and interact with
   the [jsii-kernel](./packages/jsii-kernel/README.md).
2. __jsii-pacmak generator__: extend the jsii-pacmak project to be able to generate
   proxy classes for a jsii module.

> This section can definitely use some additional information.

### Runtime Client Library

The runtime client library should be implemented as a module under
`packages/jsii-<lang>-runtime`.

The jsii runtime client library usually includes the following components:

- Child process manager: responsible to start/stop the jsii-runtime child process.
- Protocol layer: implements the STDIN/STDOUT protocol that interacts with the jsii-runtime.
- Proxy layer: includes base classes and serialization utilities to implement the generated proxy classes.

More documentation should be added here. In the meantime, refer to the Java
implementation as a reference:

- [Process manager](./packages/jsii-java-runtime/project/src/main/java/software/amazon/jsii/JsiiRuntime.java)
- [Protocol layer](./packages/jsii-java-runtime/project/src/main/java/software/amazon/jsii/JsiiClient.java)
- [Proxy layer](./packages/jsii-java-runtime/project/src/main/java/software/amazon/jsii/JsiiEngine.java)

### Package Generator

The pacmak code generator should be implemented under
[`jsii-pacmak/lib/targets`](./packages/jsii-pacmak/lib/targets).

The [java](./packages/jsii-pacmak/lib/targets/java.ts) target is a good example
to work from.
