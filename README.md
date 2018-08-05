# jsii

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiOThRRFVsVlRBTEhocVZOckE0bFlFWEtwNU0xUmtNUlRRclY0R2VYTGJaOXRlaVdaVnREV2lhVGtDUzQzUDRMMCtuYWpSTWo4N1FGTEV5Zm9yZ0dEb2dBPSIsIml2UGFyYW1ldGVyU3BlYyI6InFVbktYSlpDem1YN1JCeU8iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

__jsii__ allows code in any language to naturally interact with JavaScript classes.

For example, consider the following TypeScript class:

```ts
export class HelloJsii {
    public sayHello(name: string) {
        return `Hello, ${name}!`
    }
}
```

By compiling our source module using __jsii__, we can now package it as modules
in one of the supported target languages. Each target module has the exact same
API as the source. This allows users of that target language to use `HelloJsii`
like any other class.

> NOTE: Due to performance of the hosted JavaScript engine and marshaling costs,
__jsii__ modules are likely to be used for development and build tools, as
oppose to performance-sensitive runtime behavior.

From Java:

```java
HelloJsii hello = new HelloJsii();
hello.sayHello("World"); // => Hello, World!
```

From .NET:

```csharp
var hello = new HelloJsii();
hello.SayHello("World"); // => Hello, World!
```

From Python (WIP):

```python
hello = HelloJsii()
hello.say_hello("World"); # => Hello, World!
```

From Ruby (WIP):

```ruby
hello = HelloJsii.new
hello.say_hello 'World' # => Hello, World!
```

[Here's](#what-kind-of-sorcery-is-this) how it works.

## Getting Started

Let's create our first jsii TypeScript module.

### Initialize the project

Define a `package.json`:

```json
{
  "name": "hello-jsii",
  "version": "1.0.0",
  "license": "Apache-2.0",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "scripts": {
    "build": "jsii",
    "watch": "jsii -w",
    "package": "jsii-pacmak -v"
  },
  "devDependencies": {
    "jsii": "^0.6.0",
    "jsii-pacmak": "^0.6.0"
  },
  "jsii": {
    "outdir": "dist",
    "targets": {
      "java": {
        "package": "com.acme.hello",
        "maven": {
          "groupId": "com.acme.hello",
          "artifactId": "hello-jsii"
        }
      },
      "dotnet": {
        "namespace": "Acme.Hello"
      },
      "sphinx": { }
    }
  }
}
```

What's going on here?

#### `jsii`

The `jsii` section in your `package.json` is the [jsii
configuration](#configuration) for your module. It tells jsii which target
languages to package, and includes additional required information for the
jsii packager (also known as "pacmak").

#### `npm run build``

The `build` script script uses `jsii` to compile your code.

`jsii` wraps the TypeScript compiler (`tsc`) and will compile your .ts files into .js files.

Note that `jsii` is rather opinionated about how the TypeScript compiler is configured (for now),
so it will generate a `tsconfig.json` file for you with the correct options so you an spin up
a TypeScript-supporting IDE. No need to check-in this file.

The `watch` script (optional) will invoke `tsc -w` which will monitor your
filesystem for changes and recompile your .ts files to .js (note that jsii
errors will not be reported in this mode)

#### `npm run package`

The `package` script invokes `jsii-pacmak`, which is the __jsii packager__.

Pacmak will will generate _and compile_ your package to all target languages. The output packages
will be emitted to `outdir` (in the above case `dist`).

The `-v` switch tells pacmak to print some messages.

Run `jsii-pacmak --help` for more options.

#### Required package.json fields

* `license` is required (with SPDX license identifier).
* `main` and `types` are also required and specify the javascript and typescript
  declarations entry points of the module.
* `version` is required.

### Module Code

Okay, we are ready to write some code. Create a `lib/index.ts` file:

```ts
export class HelloJsii {
  public sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}
```

### Build

And build your module:

```console
$ npm run build
```

If build succeeds, you will see the resulting .js file (`lib/index.js`) produced by the
TypeScript compiler.

You should also see a `.jsii` file in the root:

```json
{
  "fingerprint": "HB39Oy4HWtsnwdRnAFYl+qlmy8Z2tmaGM2KDDe9/hHo=",
  "license": "Apache-2.0",
  "name": "hello-jsii",
  "schema": "jsii/1.0",
  "targets": {
    "dotnet": {
      "namespace": "Acme.Hello"
    },
    "java": {
      "maven": {
        "artifactId": "hello-jsii",
        "groupId": "com.acme.hello"
      },
      "package": "com.acme.hello"
    },
    "js": {
      "npm": "hello-jsii"
    }
  },
  "types": {
    "hello-jsii.HelloJsii": {
      "assembly": "hello-jsii",
      "fqn": "hello-jsii.HelloJsii",
      "initializer": {
        "initializer": true
      },
      "kind": "class",
      "methods": [
        {
          "name": "sayHello",
          "parameters": [
            {
              "name": "name",
              "type": {
                "primitive": "string"
              }
            }
          ],
          "returns": {
            "primitive": "string"
          }
        }
      ],
      "name": "HelloJsii",
      "namespace": "hello-jsii"
    }
  },
  "version": "1.0.0"
}
```

This file includes all the information needed in order to package your module into every
jsii-supported language. It contains the module metadata from `package.json` and a full declaration
of your module's public API.

### Packaging

Okay, now the magic happens:

```console
$ npm run package
[jsii-pacmak] [INFO] Building hello-jsii (java,dotnet,sphinx,npm) into dist
```

Now, if you check out the contents of `dist`, you'll find:

```
├── dotnet
│   └── Acme.Hello
│       ├── Acme.Hello.csproj
│       ├── AssemblyInfo.cs
│       ├── HelloJsii.cs
│       └── hello-jsii-1.0.0.tgz
├── java
│   └── com
│       └── acme
│           └── hello
│               └── hello-jsii
│                   ├── 1.0.0
│                   │   ├── hello-jsii-1.0.0-javadoc.jar
│                   │   ├── hello-jsii-1.0.0-javadoc.jar.md5
│                   │   ├── hello-jsii-1.0.0-javadoc.jar.sha1
│                   │   ├── hello-jsii-1.0.0-sources.jar
│                   │   ├── hello-jsii-1.0.0-sources.jar.md5
│                   │   ├── hello-jsii-1.0.0-sources.jar.sha1
│                   │   ├── hello-jsii-1.0.0.jar
│                   │   ├── hello-jsii-1.0.0.jar.md5
│                   │   ├── hello-jsii-1.0.0.jar.sha1
│                   │   ├── hello-jsii-1.0.0.pom
│                   │   ├── hello-jsii-1.0.0.pom.md5
│                   │   └── hello-jsii-1.0.0.pom.sha1
│                   ├── maven-metadata.xml
│                   ├── maven-metadata.xml.md5
│                   └── maven-metadata.xml.sha1
├── js
│   └── hello-jsii@1.0.0.jsii.tgz
└── sphinx
    └── hello-jsii.rst
```

These files are ready-to-publish artifacts for each target language. You can
see the npm tarball under `js`, the Maven repo under `java`, the Sphinx .rst file
under `sphinx`, etc.

That's it. You are ready to rock!

## Configuration

jsii configuration is read from the module's `package.json` and includes the following options:

 * `targets` - the list of target languages this module will be packaged for. For each
   target, you would need to specify some naming information such as namespaces, package manager
   coordinates, etc. See [supported targets](#targets) for details.
 * `outdir` - the default output directory (relative to package root) for
   __jsii-pacmak__. This is where target artifacts are emitted during packaging. Each artifact
   will be emitted under `<outdir>/<target>` (e.g. `dist/java`, `dist/js`, etc).

### Targets

The following targets are currently supported:

 * `js` - implicit - every module will always have a "js" target (dah!).
 * `java` - packages the module as in Java/Maven package. Requires the following config:

```json
{
  "java": {
    "package": "com.acme.hello",
    "maven": {
      "groupId": "com.acme.hello",
      "artifactId": "hello-jsii"
    }
  }
}
```

* `dotnet` - packages the module as a .NET/NuGet package. Requires the following config:

```json
{
  "dotnet": {
    "namespace": "Acme.Hello"
  }
}
```

* `sphinx` - produces sphinx documentation for the module. No config is required, but an empty
  entry will be needed in order to package this target:

```json
{
  "sphinx": { }
}
```


## Features

### Language features

 * Classes
 * Inheritance
 * Constructors
 * Methods
 * Properties
 * Abstract Members
 * Virtual Overrides
 * Async Methods
 * Variadic Arguments
 * Static Methods and Properties
 * Static Constants
 * Abstract Classes
 * Interfaces
 * Enums
 * Primitive Types: string, number, boolean, date, json, any
 * Collection Types: arrays, maps
 * Union Types (limited support)
 * Module Dependencies
 * Data Interfaces

### Source Languages

 * TypeScript

### Target Languages

 * __Java__ - generates a ready-to-publish Maven package.
 * __.NET__ - generates a ready-to-publish NuGet package.
 * __Sphinx__ - generates a Sphinx reStructuredText document for the module with README and reference docs.
 * __Python__ (work in progress) - generates a ready-to-publish PyPI package.
 * __Ruby__ (work in progress) - generates a ready-to-publish RubyGem.

## What kind of sorcery is this?

So how does this thing work?

Given a source npm module written in one of the supported _source_ languages
(currently, only [TypeScript] is supported as source), we produce a "header
file" (called the ".jsii spec") which describes the public API for the module.

[TypeScript]: https://www.typescriptlang.org/

Here the .jsii spec for the above example:

```json
{
  "types": {
    "hello-jsii.HelloJsii": {
      "assembly": "hello-jsii",
      "fqn": "hello-jsii.HelloJsii",
      "initializer": {
        "initializer": true
      },
      "kind": "class",
      "methods": [
        {
          "name": "sayHello",
          "parameters": [
            {
              "name": "name",
              "type": {
                "primitive": "string"
              }
            }
          ],
          "returns": {
            "primitive": "string"
          }
        }
      ],
      "name": "HelloJsii",
      "namespace": "hello-jsii"
    }
  }
}
```

Now, we have two artifacts: the compiled module with .js code and the .jsii spec.
This two artifacts are used as input to the next stage we call __pacmak__
(stands for "package maker").

__pacmak__ reads the .jsii spec and module information from `package.json` and
generates a _ready-to-publish_ package artifact for each requested target
language. For example, it will produce a Maven package for Java, a NuGet package
for .NET, a PyPI module for Python, etc.

The generated packages include _proxy classes_ which represent the API of source
module, "translated" to the idioms and conventions of each target language. So
if we had a `HelloJsii` class in the source module with a method `sayHello`, the
.NET generator will emit a `HelloJsii` class with a method `SayHello`.

At runtime, when code interacts with proxy classes - creates instances, invokes
methods, gets or sets properties - the calls are marshaled in and out to a
Node.js VM loaded with the source JavaScript module.

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

* `build` - builds the module (usually runs the TypeScript compiler).
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

# Adding Target Languages

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

## License

__jsii__ is distributed under the
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.