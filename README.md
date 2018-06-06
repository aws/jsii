# jsii

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

__jsii__ is a common JavaScript runtime which enables reusing JavaScript modules
from across multiple programming languages.

The jsii compiler uses the TypeScript compiler (and in the future, other
strongly typed languages that compile to JavaScript) to produce type-annotated
bundles which can be used to generate idiomatic class libraries in a variety of
target languages. The generated classes proxy calls to a JavaScript runtime,
effectively allowing __jsii__ modules to be __"written once and used everywhere"__.

> NOTE: Due to performance of the hosted javascript engine and marshaling costs,
__jsii__ modules are likely to be used for development and build tools, as
oppose to performance-sensitive runtime behavior.

# Development Environment

## Prerequisites

Since this repo produces artifacts for multiple programming languages using
__jsii__, it relies on the following toolchains:

 - [Node.js 8.11.0](https://nodejs.org/download/release/v8.11.0/)
 - [Java OpenJDK 8](http://openjdk.java.net/install/)
 - [.NET Core 2.0](https://www.microsoft.com/net/download)
 - [Python 3.6.5](https://www.python.org/downloads/release/python-365/)
 - [Ruby 2.5.1](https://www.ruby-lang.org/en/news/2018/03/28/ruby-2-5-1-released/)

When building on CodeBuild, these toolchains are all included in the
[superchain](https://github.com/awslabs/superchain) docker image. This image can
also be used locally as follows:

```shell
eval $(aws ecr get-login --no-include-email)
IMAGE=260708760616.dkr.ecr.us-east-1.amazonaws.com/superchain:latest
docker pull ${IMAGE}
docker run --net=host -it -v $PWD:$PWD -w $PWD ${IMAGE}
```

This will get you into an interactive docker shell. You can then run
./install.sh and ./build.sh as described below.

## Bootstrapping

The project is managed as a
[monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
using [lerna](https://github.com/lerna/lerna).

1. Check out this repository.
2. Run `./build.sh` to install lerna and bootstrap the repo.

## Workflow

All modules within this repository have the following scripts:

* `prepare` - builds the module (usually runs the TypeScript compiler).
* `watch` - runs `tsc -w` which picks up changes and builds them progressively.
* `test` - uses `nodeunit test/test.*.js` to run all unit tests.

Each one of these scripts can be executed either from the root of the repo using
`lerna run xxx` or from individual modules using `npm run xxx`.

## Release

The `./publish.sh` script can be used to pack and publish a new version.

The script will do the following:

1. Invoke `lerna publish --no-git --no-npm` which will ask that you determine
   the semantic version.
2. For each non-private module, invoke `npm pack` and collect all npm tarballs
   to `dist/staging`
3. Create a single .zip file under `dist/jsii-<version>.zip` with all the tarballs.
4. TODO: release to GitHub.

# Language Support

jsii Language support consists of:

1. A jsii-pacmak code generator
2. A client library

## Code Generator

The pacmak code generator should be implemented under
`packages/jsii-pacmak/lib/generators`. The
[java](packages/jsii-pacmak/lib/generators/java.ts) generator is a good example
to work from.

## Client Library

The client library should be implemented as a module under
`packages/jsii-xxx-runtime` (where `xxx` is the language). You will need to
create a `package.json` file which refers to a build script under `prepare`.

See the [jsii-java-runtime/package.json](packages/jsii-java-runtime/package.json) as a
reference. It is possible to take dependencies on things like jsii-calc and reference them
through the local `node_modules`.

## Packaging and Bundling

Make sure you are specify an `.npmignore` and a `prepack` script  in the runtime
client's `package.json`. These should prepares the directory for the
[pack.sh](./pack.sh) script which creates a tarball of the contents of the
directory.

Eventually, you want the tarball to include `package.json` and the client
library artifacts in a way that they can consumed locally.