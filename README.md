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

Let's create our first jsii TypeScript module!

```console
$ npm init -y
$ npm i --save-dev jsii jsii-pacmak
```

Edit your `package.json`:

```js
{
  // ...

  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "scripts": {
    "build": "jsii",
    "watch": "jsii -w",
    "package": "jsii-pacmak -v"
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
        "namespace": "Acme.HelloNamespace",
        "packageId": "Acme.HelloPackage"
      },
      "sphinx": { }
    }
  }
}
```

So, what's going on here?

* The `jsii` section in your `package.json` is the [jsii configuration](#configuration) for your module.
  It tells jsii which target languages to package, and includes additional required information for the
  jsii packager.
* `npm run build` uses `jsii` to compile your code. It invokes the TypeScript compiler (`tsc`) and will compile
  your .ts files into .js files.
* `npm run watch` will invoke `tsc -w` which will monitor your filesystem for changes and recompile
   your .ts files to .js (note that jsii errors will not be reported in this mode)
* `npm run package` invokes `jsii-pacmak`, which is the __jsii packager__. It will generate _and compile_ your
   package to all target languages. The output packages will be emitted to `outdir` (in the above case `dist`).
* Other required `package.json` fields: `license`, `main`, `types`.

Okay, we are ready to write some code. Create a `lib/index.ts` file:

```ts
export class HelloJsii {
  public sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}
```

Build your module:

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
      "namespace": "Acme.HelloNamespace",
      "packageId": "Acme.HelloPackage"
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

Okay, now the magic happens:

```console
$ npm run package
[jsii-pacmak] [INFO] Building hello-jsii (java,dotnet,sphinx,npm) into dist
```

Now, if you check out the contents of `dist`, you'll find:

```
├── dotnet
│   └── Acme.Hello.nupkg
├── java
│   └── com
│       └── acme
│           └── hello
│               └── hello-jsii
│                   ├── 1.0.0
│                   │   ├── hello-jsii-1.0.0-javadoc.jar
│                   │   ├── hello-jsii-1.0.0-javadoc.jar.md5
│                   │   ├── hello-jsii-1.0.0-javadoc.jar.sha1
│                   │   ├── hello-jsii-1.0.0-sources.jar
│                   │   ├── hello-jsii-1.0.0-sources.jar.md5
│                   │   ├── hello-jsii-1.0.0-sources.jar.sha1
│                   │   ├── hello-jsii-1.0.0.jar
│                   │   ├── hello-jsii-1.0.0.jar.md5
│                   │   ├── hello-jsii-1.0.0.jar.sha1
│                   │   ├── hello-jsii-1.0.0.pom
│                   │   ├── hello-jsii-1.0.0.pom.md5
│                   │   └── hello-jsii-1.0.0.pom.sha1
│                   ├── maven-metadata.xml
│                   ├── maven-metadata.xml.md5
│                   └── maven-metadata.xml.sha1
├── js
│   └── hello-jsii@1.0.0.jsii.tgz
└── sphinx
    └── hello-jsii.rst
```

These files are ready-to-publish artifacts for each target language. You can
see the npm tarball under `js`, the Maven repo under `java`, the Sphinx .rst file
under `sphinx`, etc.

That's it. You are ready to rock!

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


## Targets

jsii configuration is read from the `jsii` section in the module's
`package.json` and includes the following options:

 * `targets` - the list of target languages this module will be packaged for. For each
   target, you would need to specify some naming information such as namespaces, package manager
   coordinates, etc. See [supported targets](#targets) for details.
 * `outdir` - the default output directory (relative to package root) for
   __jsii-pacmak__. This is where target artifacts are emitted during packaging.
   Each artifact will be emitted under `<outdir>/<target>` (e.g. `dist/java`,
   `dist/js`, etc). Conventionally we use `"dist"` for outdir.

### Java

The `java` target will produce a ready-to-deploy Maven package for your jsii module.

The `$outdir/java` directory will include the contents of a staged offline Maven
repository. javadocs and sources are included automatically in the Maven package

This repository can be published to [Maven Central](https://search.maven.org/)
via the `deploy-staged-repository` command of the
[nexus-staging-maven-plugin](https://mvnrepository.com/artifact/org.sonatype.plugins/nexus-staging-maven-plugin).
See [Sonatype
documentation](https://mvnrepository.com/artifact/org.sonatype.plugins/nexus-staging-maven-plugin)
and [this gist](https://gist.github.com/eladb/9caa04253b268e8a8f3d658184202806)
as a reference.

To package your jsii module for Java, add the following configuration to the `jsii`
section in `package.json`:

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

### .NET

The `dotnet` target will produce a ready-to-publish NuGet package for your module.

The `$outdir/dotnet` directory will include `.nupkg` files, which can
be [published to NuGet](https://docs.microsoft.com/en-us/nuget/create-packages/publish-a-package).

To package your jsii module as for .NET, add this configuration to the `jsii`
section in `package.json`:

```js
{
  "dotnet": {
    "namespace": "Acme.HelloNamespace", // required
    "packageId": "Acme.HelloPackage",   // required
    "title": "ACME Hello",              // optional (default: packageId)
    "iconUrl": "path/to/icon.svg",      // optional (default: no icon)

    // strong-name signing
    "signAssembly": true,                          // optional (default: false)
    "assemblyOriginatorKeyFile": "path/to/key.snk" // optional
  }
}
```

### Sphinx

The sphinx target emits a [Sphinx](http://www.sphinx-doc.org/en/master/)
documentation topic for the module, that can be used to build a Sphinx
documentation website. It's not a complete website.


The `$outdir/sphinx` directory will include two files:

 * `<module-name>.rst` - the Sphinx topic entry point
 * `<module-name>.README.md` (optional) - the module's README.md file (if exists)

The `.rst` file will use [m2r](https://github.com/miyakogi/m2r) to
[`mdinclude`](https://miyakogi.github.io/m2r/example.html#include-markdown-file)
the README.md file into the topic.

NOTE: if the first line of your `README.md` file starts with `# ` (an H1
header), the contents of this line will be used as the first header of the
topic. Otherwise, the module's name will be used.

You will need to build a Sphinx documentation website with this `.rst` included.

To package your jsii module as a Sphinx topic, add an empty object to the
`jsii` section in `package.json` under the `sphinx` key:

```json
{
  "sphinx": { }
}
```

### JavaScript

An implicit JavaScript target will always be created. No configuration is needed.

The `$outdir/js` directory will include that npm tarball of the module (created
with [`npm pack`](https://docs.npmjs.com/cli/pack)).

Tarballs can be published to npmjs.org using [`npm publish`](https://docs.npmjs.com/cli/publish)

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

# Contributing

See [CONTRIBUTING](./CONTRIBUTING.md).

## License

__jsii__ is distributed under the
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
