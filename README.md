# ![jsii](./logo/png/128.png)

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=aws/jsii)](https://dependabot.com)
![Build Status](https://img.shields.io/travis/aws/jsii?label=Travis-CI)
![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiOThRRFVsVlRBTEhocVZOckE0bFlFWEtwNU0xUmtNUlRRclY0R2VYTGJaOXRlaVdaVnREV2lhVGtDUzQzUDRMMCtuYWpSTWo4N1FGTEV5Zm9yZ0dEb2dBPSIsIml2UGFyYW1ldGVyU3BlYyI6InFVbktYSlpDem1YN1JCeU8iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![npm](https://img.shields.io/npm/v/jsii)](https://www.npmjs.com/package/jsii)
[![docker](https://img.shields.io/badge/docker-jsii%2Fsuperchain-brightgreen)](https://hub.docker.com/r/jsii/superchain) [![Join the chat at https://gitter.im/aws/jsii](https://badges.gitter.im/aws/jsii.svg)](https://gitter.im/aws/jsii?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Overview

`jsii` allows code in any language to naturally interact with JavaScript
classes. It is the technology that enables the [AWS Cloud Development Kit][cdk]
to deliver polyglot libraries from a single codebase!

[cdk]: https://github.com/aws/aws-cdk

A class library written in **TypeScript** can be used in projects authored in
**TypeScript** or **Javascript** (as usual), but also in **Python**, **Java**,
**C#** (and other languages from the *.NET* family), ...

> NOTE: Due to performance of the hosted **Javascript** engine and marshaling
> costs, `jsii` modules are best suited for development and build tools, as
> opposed to performance-sensitive or resource-constrained applications.
>
> See [Runtime Architecture] for more information.
>
> [Runtime Architecture]: ./docs/runtime-architecture.md

### An example is worth a thousand words

Consider the following **TypeScript** class:

```ts
export class HelloJsii {
  public sayHello(name: string) {
    return `Hello, ${name}!`
  }
}
```

By compiling our source module using `jsii`, we can now package it as modules
in one of the supported target languages. Each target module has the exact same
API as the source. This allows users of that target language to use `HelloJsii`
like any other class:

- In **Python**:
  ```python
  hello = HelloJsii()
  hello.say_hello("World"); # => Hello, World!
  ```
- In **Java**
  ```java
  final HelloJsii hello = new HelloJsii();
  hello.sayHello("World"); // => Hello, World!
  ```
- In **C#**
  ```csharp
  var hello = new HelloJsii();
  hello.SayHello("World"); // => Hello, World!
  ```
- ... and more to come!

## Getting Started

Let's create our first jsii TypeScript module (actual outputs may slightly
differ):

```console
$ mkdir hello-jsii
$ cd hello-jsii
$ npm init -y
Wrote to /tmp/hello-jsii/package.json:

{
  "name": "hello-jsii",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
$ npm i --save-dev jsii jsii-pacmak
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN hello-jsii@1.0.0 No description
npm WARN hello-jsii@1.0.0 No repository field.

+ jsii-pacmak@0.14.3
+ jsii@0.14.3
added 65 packages from 54 contributors and audited 191 packages in 7.922s
found 0 vulnerabilities
```

Edit the `package.json` file:

```js
/// package.json
{
  // ...
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "scripts": {
    "build": "jsii",
    "build:watch": "jsii -w",
    "package": "jsii-pacmak"
  },
  "jsii": {
    "outdir": "dist",
    "targets": {
      "python": {
        "distName": "acme.hello-jsii",
        "module": "acme.hello_jsii"
      },
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
      }
    }
  },
  "author": {
    "name": "John Doe"
  },
  "repository": {
    "url": "https://github.com/acme/hello-jsii.git"
  }
  // ...
}
```

Read more about what those configuration entries do in the [configuration]
documentation.

[configuration]: ./docs/configuration.md

Okay, we are ready to write some code. Create a `lib/index.ts` file:

```ts
/// lib/index.ts
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

If build succeeds, you will see the resulting `lib/index.js` and
`lib/index.d.ts` files were produced, as well as the `.jsii` file (contents may
vary):

```js
/// .jsii
{
  "author": {
    "name": "John Doe",
    "roles": [
      "author"
    ]
  },
  "description": "hello-jsii",
  "homepage": "https://github.com/acme/hello-jsii.git",
  "jsiiVersion": "0.14.3 (build 1b1062d)",
  "license": "ISC",
  "name": "hello-jsii",
  "repository": {
    "type": "git",
    "url": "https://github.com/acme/hello-jsii.git"
  },
  "schema": "jsii/0.10.0",
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
    },
    "python": {
      "distName": "acme.hello-jsii",
      "module": "acme.hello_jsii"
    }
  },
  "types": {
    "hello-jsii.HelloJsii": {
      "assembly": "hello-jsii",
      "fqn": "hello-jsii.HelloJsii",
      "initializer": {},
      "kind": "class",
      "locationInModule": {
        "filename": "lib/index.ts",
        "line": 1
      },
      "methods": [
        {
          "locationInModule": {
            "filename": "lib/index.ts",
            "line": 2
          },
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
            "type": {
              "primitive": "string"
            }
          }
        }
      ],
      "name": "HelloJsii"
    }
  },
  "version": "1.0.0",
  "fingerprint": "XYWYOiOupH4MmIjFj84wTSRfWqSw8hW37vHkVMO7iuY="
}
```

This file includes all the information needed in order to package your module
into every `jsii`-supported language. It contains the module metadata from
`package.json` and a full declaration of your module's public API.

Okay, now the magic happens:

```console
$ npm run package

> hello-jsii@1.0.0 package /Users/rmuller/Development/Demos/hello-jsii
> jsii-pacmak -v

[jsii-pacmak] [INFO] Building hello-jsii (python,java,dotnet,js) into dist
[jsii-pacmak] [INFO] Packaged. java (4.3s) | dotnet (2.0s) | python (0.9s) | npm pack (0.5s) | js (0.0s)
```

Now, if you check out the contents of `dist`, you'll find:

```
dist
├── dotnet
│   ├── Acme.HelloPackage.1.0.0.nupkg
│   └── Acme.HelloPackage.1.0.0.symbols.nupkg
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
└── python
    ├── acme.hello-jsii-1.0.0.tar.gz
    └── acme.hello_jsii-1.0.0-py3-none-any.whl
```

These files are ready-to-publish artifacts for each target language. You can see
the npm tarball under `js`, the `python` package under `python`, the Maven repo
under `java`, etc...

That's it. You are ready to rock!

## Features

### Source Languages

* __TypeScript__ with [some restrictions](docs/typescript-restrictions.md)

### Target Languages

* __Javascript__ - generates an NPM package implicitly (no configuration
  required).
* __Python__ - generates a ready-to-publish PyPI package.
* __Java__ - generates a ready-to-publish Maven package.
* __.NET__ - generates a ready-to-publish NuGet package.

See the [configuration](./docs/configuration.md#targets) documentation for more
information on configuring the various targets.

# Contributing

See [CONTRIBUTING](./CONTRIBUTING.md).

## License

__jsii__ is distributed under the [Apache License, Version 2.0][Apache-2.0].

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.

[Apache-2.0]: https://www.apache.org/licenses/LICENSE-2.0
