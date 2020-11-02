# ![jsii](./logo/png/128.png)

[![Join the chat at https://cdk.Dev](https://img.shields.io/static/v1?label=Slack&message=cdk.dev&color=brightgreen&logo=slack)](https://cdk.dev)
[![All Contributors](https://img.shields.io/github/all-contributors/aws/jsii/main?label=%E2%9C%A8%20All%20Contributors)](#contributors-)
[![Build Status](https://github.com/aws/jsii/workflows/Main/badge.svg)](https://github.com/aws/jsii/actions?query=workflow%3AMain+branch%3Amain)
[![npm](https://img.shields.io/npm/v/jsii?logo=npm)](https://www.npmjs.com/package/jsii)
[![docker](https://img.shields.io/badge/docker-jsii%2Fsuperchain-brightgreen?logo=docker)](https://hub.docker.com/r/jsii/superchain)

## Overview

`jsii` allows code in any language to naturally interact with JavaScript classes. It is the technology that enables the
[AWS Cloud Development Kit][cdk] to deliver polyglot libraries from a single codebase!

[cdk]: https://github.com/aws/aws-cdk

A class library written in **TypeScript** can be used in projects authored in **TypeScript** or **Javascript** (as
usual), but also in **Python**, **Java**, **C#** (and other languages from the _.NET_ family), ...

> NOTE: Due to performance of the hosted **Javascript** engine and marshaling costs, `jsii` modules are best suited for
> development and build tools, as opposed to performance-sensitive or resource-constrained applications.
>
> See [Runtime Architecture] for more information.
>
> [runtime architecture]: ./docs/runtime-architecture.md

### An example is worth a thousand words

Consider the following **TypeScript** class:

```ts
export class HelloJsii {
  public sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}
```

By compiling our source module using `jsii`, we can now package it as modules in one of the supported target languages.
Each target module has the exact same API as the source. This allows users of that target language to use `HelloJsii`
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

## Toolchain

**jsii** consists of multiple single-purposed programs which can be used to compose various workflows.

> We are considering creating an "umbrella entrypoint" to make it easier to consume.

| Name             | Stability    | Description                                                           |
| ---------------- | ------------ | --------------------------------------------------------------------- |
| [`jsii`]         | Stable       | Compiles TypeScript to jsii module                                    |
| [`jsii-pacmak`]  | Stable       | Creates ready-to-publish language-specific packages from jsii modules |
| [`jsii-reflect`] | Stable       | Strong-typed reflection library for jsii type systems                 |
| [`jsii-diff`]    | Stable       | API backwards compatibility checker                                   |
| [`jsii-rosetta`] | Experimental | Transpile code snippets (in docs) from TypeScript to jsii languages   |
| [`jsii-config`]  | Experimental | Interactive tool for generating jsii configuration                    |
| [`jsii-release`] | Community    | Publishes jsii modules to all supported package managers              |
| [`jsii-srcmak`]  | Community    | Generates relocatable source code in jsii languages from typescript   |
| [`jsii-docgen`]  | Community    | Generates markdown API documentation for jsii modules                 |

[`jsii`]: https://github.com/aws/jsii/tree/main/packages/jsii
[`jsii-pacmak`]: https://github.com/aws/jsii/tree/main/packages/jsii-pacmak
[`jsii-reflect`]: https://github.com/aws/jsii/tree/main/packages/jsii-reflect
[`jsii-config`]: https://github.com/aws/jsii/tree/main/packages/jsii-config
[`jsii-diff`]: https://github.com/aws/jsii/tree/main/packages/jsii-diff
[`jsii-rosetta`]: https://github.com/aws/jsii/tree/main/packages/jsii-rosetta
[`jsii-release`]: https://github.com/eladb/jsii-release
[`jsii-srcmak`]: https://github.com/eladb/jsii-srcmak
[`jsii-docgen`]: https://github.com/eladb/jsii-docgen

> _"Community"_: a community-maintained project, not officially supported by the jsii team.

## Getting Started

Let's create our first jsii TypeScript module (actual outputs may slightly differ):

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

Read more about what those configuration entries do in the [configuration] documentation.

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

If build succeeds, you will see the resulting `lib/index.js` and `lib/index.d.ts` files were produced, as well as the
`.jsii` file (contents may vary):

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

This file includes all the information needed in order to package your module into every `jsii`-supported language. It
contains the module metadata from `package.json` and a full declaration of your module's public API.

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

These files are ready-to-publish artifacts for each target language. You can see the npm tarball under `js`, the
`python` package under `python`, the Maven repo under `java`, etc...

That's it. You are ready to rock!

## Features

### Source Languages

- **TypeScript** with [some restrictions](docs/typescript-restrictions.md)

### Target Languages

- **Javascript** - generates an NPM package implicitly (no configuration required).
- **Python** - generates a ready-to-publish PyPI package.
- **Java** - generates a ready-to-publish Maven package.
- **.NET** - generates a ready-to-publish NuGet package.

See the [configuration](./docs/configuration.md#targets) documentation for more information on configuring the various
targets.

# :book: Blog Posts

Here's a collection of blog posts (in chronological order) related to `jsii`:

- **2020-01-11:** <a id="blog-mbonig" /> [How to Create CDK Constructs][mbonig-2020-01-11], by [Matthew Bonig][@mbonig]
- **2020-05-27:** <a id="blog-floydpink" /> [Generate Python, Java, and .NET software libraries from a TypeScript
  source][floydpink-2020-05-27], by [Hari Pachuveetil][@floydpink]

[mbonig-2020-01-11]: https://www.matthewbonig.com/2020/01/11/creating-constructs/
[floydpink-2020-05-27]:
  https://aws.amazon.com/fr/blogs/opensource/generate-python-java-dotnet-software-libraries-from-typescript-source/
[@mbonig]: http://www.matthewbonig.com/
[@floydpink]: https://harimenon.com/

> :information_source: If you wrote blog posts about `jsii` and would like to have them referenced here, do not hesitate
> to file a pull request to add the links here!

# :gear: Contributing

See [CONTRIBUTING](./CONTRIBUTING.md).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ahodieb"><img src="https://avatars1.githubusercontent.com/u/835502?v=4" width="100px;" alt=""/><br /><sub><b>Abdallah Hodieb</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aahodieb+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/ajnarang"><img src="https://avatars3.githubusercontent.com/u/52025281?v=4" width="100px;" alt=""/><br /><sub><b>ajnarang</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aajnarang+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://softwhat.com/"><img src="https://avatars0.githubusercontent.com/u/4362270?v=4" width="100px;" alt=""/><br /><sub><b>Alex Pulver</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aalexpulver+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.aslezak.com/"><img src="https://avatars2.githubusercontent.com/u/6944605?v=4" width="100px;" alt=""/><br /><sub><b>Andy Slezak</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=amslezak" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/anshulguleria"><img src="https://avatars3.githubusercontent.com/u/993508?v=4" width="100px;" alt=""/><br /><sub><b>Anshul Guleria</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aanshulguleria+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/aripalo/"><img src="https://avatars0.githubusercontent.com/u/679146?v=4" width="100px;" alt=""/><br /><sub><b>Ari Palo</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aaripalo+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/assyadh"><img src="https://avatars0.githubusercontent.com/u/4091730?v=4" width="100px;" alt=""/><br /><sub><b>Hamza Assyad</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aassyadh+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=assyadh" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=assyadh" title=".NET Bindings">🥅</a> <a href="https://github.com/aws/jsii/issues?q=author%3Aassyadh+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Aassyadh" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/aws/aws-cdk"><img src="https://avatars0.githubusercontent.com/u/43080478?v=4" width="100px;" alt=""/><br /><sub><b>AWS CDK Automation</b></sub></a><br /><a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Aaws-cdk-automation" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Aaws-cdk-automation" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/BenWal"><img src="https://avatars0.githubusercontent.com/u/2656067?v=4" width="100px;" alt=""/><br /><sub><b>Ben Walters</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3ABenWal+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/BiDzej"><img src="https://avatars1.githubusercontent.com/u/26255490?v=4" width="100px;" alt=""/><br /><sub><b>Bartłomiej Jurek</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3ABiDzej+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/bmaizels"><img src="https://avatars1.githubusercontent.com/u/36682168?v=4" width="100px;" alt=""/><br /><sub><b>Benjamin Maizels</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=bmaizels" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Abmaizels" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/bverhoeve"><img src="https://avatars1.githubusercontent.com/u/46007524?v=4" width="100px;" alt=""/><br /><sub><b>Brecht Verhoeve</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Abverhoeve+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/CaerusKaru"><img src="https://avatars3.githubusercontent.com/u/416563?v=4" width="100px;" alt=""/><br /><sub><b>CaerusKaru</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=CaerusKaru" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3ACaerusKaru" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/campionfellin"><img src="https://avatars3.githubusercontent.com/u/11984923?v=4" width="100px;" alt=""/><br /><sub><b>Campion Fellin</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=campionfellin" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=campionfellin" title="Java Bindings">☕️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/carterv"><img src="https://avatars2.githubusercontent.com/u/1551538?v=4" width="100px;" alt=""/><br /><sub><b>Carter Van Deuren</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Acarterv+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/christophercurrie"><img src="https://avatars0.githubusercontent.com/u/19510?v=4" width="100px;" alt=""/><br /><sub><b>Christopher Currie</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=christophercurrie" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3Achristophercurrie+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/Console32"><img src="https://avatars1.githubusercontent.com/u/4870099?v=4" width="100px;" alt=""/><br /><sub><b>Raphael</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3AConsole32+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/costleya"><img src="https://avatars2.githubusercontent.com/u/1572163?v=4" width="100px;" alt=""/><br /><sub><b>Aaron Costley</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Acostleya+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=costleya" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=costleya" title=".NET Bindings">🥅</a> <a href="https://github.com/aws/jsii/issues?q=author%3Acostleya+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Acostleya" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/CyrusNajmabadi"><img src="https://avatars3.githubusercontent.com/u/4564579?v=4" width="100px;" alt=""/><br /><sub><b>CyrusNajmabadi</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3ACyrusNajmabadi+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/issues?q=author%3ACyrusNajmabadi+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/dagnir"><img src="https://avatars2.githubusercontent.com/u/261310?v=4" width="100px;" alt=""/><br /><sub><b>Dongie Agnir</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=dagnir" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=dagnir" title="Java Bindings">☕️</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Adagnir" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://danieldinu.com/"><img src="https://avatars1.githubusercontent.com/u/236187?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Dinu</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Addinu+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=ddinu" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/apps/dependabot-preview"><img src="https://avatars3.githubusercontent.com/in/2141?v=4" width="100px;" alt=""/><br /><sub><b>dependabot-preview[bot]</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Adependabot-preview[bot]+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Adependabot-preview[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/dependabot"><img src="https://avatars0.githubusercontent.com/in/29110?v=4" width="100px;" alt=""/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Adependabot[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/dheffx"><img src="https://avatars0.githubusercontent.com/u/22029918?v=4" width="100px;" alt=""/><br /><sub><b>dheffx</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Adheffx+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://digitalsanctum.com/"><img src="https://avatars3.githubusercontent.com/u/30923?v=4" width="100px;" alt=""/><br /><sub><b>Shane Witbeck</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Adigitalsanctum+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://caremad.io/"><img src="https://avatars3.githubusercontent.com/u/145979?v=4" width="100px;" alt=""/><br /><sub><b>Donald Stufft</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Adstufft+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=dstufft" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3Adstufft+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/commits?author=dstufft" title="Python Bindings">🐍</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Adstufft" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/dxunix"><img src="https://avatars3.githubusercontent.com/u/11489831?v=4" width="100px;" alt=""/><br /><sub><b>Junix</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Adxunix+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://eladb.github.com/"><img src="https://avatars3.githubusercontent.com/u/598796?v=4" width="100px;" alt=""/><br /><sub><b>Elad Ben-Israel</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aeladb+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=eladb" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3Aeladb+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/commits?author=eladb" title="Java Bindings">☕️</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Aeladb" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Aeladb" title="Reviewed Pull Requests">👀</a> <a href="#talk-eladb" title="Talks">📢</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://ericzbeard.com/"><img src="https://avatars0.githubusercontent.com/u/663183?v=4" width="100px;" alt=""/><br /><sub><b>Eric Z. Beard</b></sub></a><br /><a href="#projectManagement-ericzbeard" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/FabioGentile"><img src="https://avatars2.githubusercontent.com/u/7030345?v=4" width="100px;" alt=""/><br /><sub><b>Fabio Gentile</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3AFabioGentile+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://jamesmead.org/"><img src="https://avatars2.githubusercontent.com/u/3169?v=4" width="100px;" alt=""/><br /><sub><b>James Mead</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=floehopper" title="Code">💻</a></td>
    <td align="center"><a href="http://aws.amazon.com/"><img src="https://avatars1.githubusercontent.com/u/193449?v=4" width="100px;" alt=""/><br /><sub><b>Jason Fulghum</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Afulghum+label%3Afeature-request" title="Feature requests">🤔</a> <a href="#projectManagement-fulghum" title="Project Management">📆</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Afulghum" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://elastician.com/"><img src="https://avatars3.githubusercontent.com/u/2056?v=4" width="100px;" alt=""/><br /><sub><b>Mitch Garnaat</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Agarnaat+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=garnaat" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3Agarnaat+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/commits?author=garnaat" title="Python Bindings">🐍</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Agarnaat" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://gitter.im/"><img src="https://avatars2.githubusercontent.com/u/8518239?v=4" width="100px;" alt=""/><br /><sub><b>The Gitter Badger</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=gitter-badger" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Agitter-badger" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://www.grahamlea.com/"><img src="https://avatars0.githubusercontent.com/u/754403?v=4" width="100px;" alt=""/><br /><sub><b>Graham Lea</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3AGrahamLea+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3AGrahamLea" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/gregswdl"><img src="https://avatars0.githubusercontent.com/u/47365273?v=4" width="100px;" alt=""/><br /><sub><b>gregswdl</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Agregswdl+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/hoegertn"><img src="https://avatars2.githubusercontent.com/u/1287829?v=4" width="100px;" alt=""/><br /><sub><b>Thorsten Hoeger</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=hoegertn" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/iliapolo"><img src="https://avatars0.githubusercontent.com/u/1428812?v=4" width="100px;" alt=""/><br /><sub><b>Eli Polonsky</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Ailiapolo+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=iliapolo" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3Ailiapolo+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Ailiapolo" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Ailiapolo" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/jamesiri"><img src="https://avatars1.githubusercontent.com/u/22601145?v=4" width="100px;" alt=""/><br /><sub><b>James Siri</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=jamesiri" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Ajamesiri" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/jasdel"><img src="https://avatars3.githubusercontent.com/u/961963?v=4" width="100px;" alt=""/><br /><sub><b>Jason Del Ponte</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=jasdel" title="Go Bindings">🚶‍♀️</a> <a href="https://github.com/aws/jsii/issues?q=author%3Ajasdel+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Ajasdel" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/Jerry-AWS"><img src="https://avatars3.githubusercontent.com/u/52084730?v=4" width="100px;" alt=""/><br /><sub><b>Jerry Kindall</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=Jerry-AWS" title="Documentation">📖</a> <a href="https://github.com/aws/jsii/issues?q=author%3AJerry-AWS+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://joekiller.com/"><img src="https://avatars3.githubusercontent.com/u/1022919?v=4" width="100px;" alt=""/><br /><sub><b>Joseph Lawson</b></sub></a><br /><a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Ajoekiller" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/jpmartin2"><img src="https://avatars2.githubusercontent.com/u/2464249?v=4" width="100px;" alt=""/><br /><sub><b>Joseph Martin</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Ajpmartin2+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/jsdtaylor"><img src="https://avatars0.githubusercontent.com/u/15832750?v=4" width="100px;" alt=""/><br /><sub><b>Justin Taylor</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Ajsdtaylor+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/jsteinich"><img src="https://avatars0.githubusercontent.com/u/3868754?v=4" width="100px;" alt=""/><br /><sub><b>Jon Steinich</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Ajsteinich+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/issues?q=author%3Ajsteinich+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/Kent1"><img src="https://avatars1.githubusercontent.com/u/83018?v=4" width="100px;" alt=""/><br /><sub><b>Quentin Loos</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3AKent1+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/kiiadi"><img src="https://avatars3.githubusercontent.com/u/4661536?v=4" width="100px;" alt=""/><br /><sub><b>Kyle Thomson</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=kiiadi" title="Java Bindings">☕️</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Akiiadi" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/kozlove-aws"><img src="https://avatars1.githubusercontent.com/u/68875428?v=4" width="100px;" alt=""/><br /><sub><b>Eugene Kozlov</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=kozlove-aws" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Lanayx"><img src="https://avatars2.githubusercontent.com/u/3329606?v=4" width="100px;" alt=""/><br /><sub><b>Vladimir Shchur</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3ALanayx+label%3Abug" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://stackoverflow.com/users/2116873/pedreiro"><img src="https://avatars3.githubusercontent.com/u/10764017?v=4" width="100px;" alt=""/><br /><sub><b>Leandro Padua</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aleandropadua+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/marcosdiez"><img src="https://avatars2.githubusercontent.com/u/297498?v=4" width="100px;" alt=""/><br /><sub><b>Marcos Diez</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Amarcosdiez+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.matthewbonig.com/"><img src="https://avatars2.githubusercontent.com/u/1559437?v=4" width="100px;" alt=""/><br /><sub><b>Matthew Bonig</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Ambonig+label%3Abug" title="Bug reports">🐛</a> <a href="#blog-mbonig" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/McDoit"><img src="https://avatars3.githubusercontent.com/u/16723686?v=4" width="100px;" alt=""/><br /><sub><b>Erik Karlsson</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3AMcDoit+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/apps/mergify"><img src="https://avatars1.githubusercontent.com/in/10562?v=4" width="100px;" alt=""/><br /><sub><b>mergify[bot]</b></sub></a><br /><a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Amergify[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/mikelane"><img src="https://avatars0.githubusercontent.com/u/6543713?v=4" width="100px;" alt=""/><br /><sub><b>Mike Lane</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Amikelane+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://bdawg.org/"><img src="https://avatars1.githubusercontent.com/u/92937?v=4" width="100px;" alt=""/><br /><sub><b>Breland Miley</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=mindstorms6" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mpiroc"><img src="https://avatars2.githubusercontent.com/u/1623344?v=4" width="100px;" alt=""/><br /><sub><b>Matthew Pirocchi</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=mpiroc" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=mpiroc" title=".NET Bindings">🥅</a> <a href="https://github.com/aws/jsii/issues?q=author%3Ampiroc+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Ampiroc" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/MrArnoldPalmer"><img src="https://avatars0.githubusercontent.com/u/7221111?v=4" width="100px;" alt=""/><br /><sub><b>Mitchell Valine</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3AMrArnoldPalmer+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=MrArnoldPalmer" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=MrArnoldPalmer" title="Go Bindings">🚶‍♀️</a> <a href="https://github.com/aws/jsii/issues?q=author%3AMrArnoldPalmer+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3AMrArnoldPalmer" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3AMrArnoldPalmer" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/NetaNir"><img src="https://avatars0.githubusercontent.com/u/8578043?v=4" width="100px;" alt=""/><br /><sub><b>Neta Nir</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=NetaNir" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3ANetaNir+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3ANetaNir" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3ANetaNir" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/NGL321"><img src="https://avatars0.githubusercontent.com/u/4944099?v=4" width="100px;" alt=""/><br /><sub><b>Noah Litov</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=NGL321" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3ANGL321" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3ANGL321" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/nija-at"><img src="https://avatars2.githubusercontent.com/u/16217941?v=4" width="100px;" alt=""/><br /><sub><b>Niranjan Jayakar</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Anija-at+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=nija-at" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3Anija-at+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Anija-at" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Anija-at" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/njlynch"><img src="https://avatars3.githubusercontent.com/u/1376292?v=4" width="100px;" alt=""/><br /><sub><b>Nick Lynch</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Anjlynch+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=njlynch" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Anjlynch" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Anjlynch" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://nmussy.github.io/"><img src="https://avatars0.githubusercontent.com/u/2505696?v=4" width="100px;" alt=""/><br /><sub><b>Jimmy Gaussen</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Anmussy+label%3Afeature-request" title="Feature requests">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://petrabarus.net/"><img src="https://avatars3.githubusercontent.com/u/523289?v=4" width="100px;" alt=""/><br /><sub><b>Petra Barus</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=petrabarus" title="Code">💻</a></td>
    <td align="center"><a href="http://philcali.me/"><img src="https://avatars1.githubusercontent.com/u/105208?v=4" width="100px;" alt=""/><br /><sub><b>Philip Cali</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aphilcali+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/Pidz-b"><img src="https://avatars3.githubusercontent.com/u/47750432?v=4" width="100px;" alt=""/><br /><sub><b>PIDZ - Bart </b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3APidz-b+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/richardhboyd"><img src="https://avatars0.githubusercontent.com/u/58230111?v=4" width="100px;" alt=""/><br /><sub><b>Richard H Boyd</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Arichardhboyd+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://rix0r.nl/"><img src="https://avatars2.githubusercontent.com/u/524162?v=4" width="100px;" alt=""/><br /><sub><b>Rico Huijbers</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Arix0rrr+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=rix0rrr" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3Arix0rrr+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Arix0rrr" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/commits?author=rix0rrr" title="Python Bindings">🐍</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Arix0rrr" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://keybase.io/romainmuller"><img src="https://avatars2.githubusercontent.com/u/411689?v=4" width="100px;" alt=""/><br /><sub><b>Romain Marcadier</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3ARomainMuller+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=RomainMuller" title="Code">💻</a> <a href="#design-RomainMuller" title="Design">🎨</a> <a href="https://github.com/aws/jsii/commits?author=RomainMuller" title=".NET Bindings">🥅</a> <a href="https://github.com/aws/jsii/commits?author=RomainMuller" title="Go Bindings">🚶‍♀️</a> <a href="https://github.com/aws/jsii/issues?q=author%3ARomainMuller+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/commits?author=RomainMuller" title="Java Bindings">☕️</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3ARomainMuller" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/commits?author=RomainMuller" title="Python Bindings">🐍</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3ARomainMuller" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/sadikkuzu/"><img src="https://avatars2.githubusercontent.com/u/23168063?v=4" width="100px;" alt=""/><br /><sub><b>SADIK KUZU</b></sub></a><br /><a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Asadikkuzu" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://punch.dev/"><img src="https://avatars1.githubusercontent.com/u/38672686?v=4" width="100px;" alt=""/><br /><sub><b>Sam Goodwin</b></sub></a><br /><a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Asam-goodwin" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/seiyashima"><img src="https://avatars2.githubusercontent.com/u/4947101?v=4" width="100px;" alt=""/><br /><sub><b>seiyashima42</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aseiyashima+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=seiyashima" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=seiyashima" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/serverlessunicorn"><img src="https://avatars1.githubusercontent.com/u/54867311?v=4" width="100px;" alt=""/><br /><sub><b>Tim Wagner</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aserverlessunicorn+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/issues?q=author%3Aserverlessunicorn+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/shivlaks"><img src="https://avatars0.githubusercontent.com/u/32604953?v=4" width="100px;" alt=""/><br /><sub><b>Shiv Lakshminarayan</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=shivlaks" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Ashivlaks" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Ashivlaks" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/skarode96"><img src="https://avatars2.githubusercontent.com/u/24491216?v=4" width="100px;" alt=""/><br /><sub><b>SK</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Askarode96+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="http://endoflineblog.com/"><img src="https://avatars2.githubusercontent.com/u/460937?v=4" width="100px;" alt=""/><br /><sub><b>Adam Ruka</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Askinny85+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=skinny85" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Askinny85" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Askinny85" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://skorfmann.com/"><img src="https://avatars1.githubusercontent.com/u/136789?v=4" width="100px;" alt=""/><br /><sub><b>Sebastian Korfmann</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Askorfmann+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=skorfmann" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3Askorfmann+label%3Afeature-request" title="Feature requests">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/SoManyHs"><img src="https://avatars0.githubusercontent.com/u/29964746?v=4" width="100px;" alt=""/><br /><sub><b>Hsing-Hui Hsu</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=SoManyHs" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=SoManyHs" title="Documentation">📖</a> <a href="https://github.com/aws/jsii/commits?author=SoManyHs" title="Go Bindings">🚶‍♀️</a> <a href="https://github.com/aws/jsii/issues?q=author%3ASoManyHs+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3ASoManyHs" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/SomayaB"><img src="https://avatars3.githubusercontent.com/u/23043132?v=4" width="100px;" alt=""/><br /><sub><b>Somaya</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=SomayaB" title="Code">💻</a> <a href="https://github.com/aws/jsii/issues?q=author%3ASomayaB+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3ASomayaB" title="Maintenance">🚧</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3ASomayaB" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/spfink"><img src="https://avatars1.githubusercontent.com/u/20525381?v=4" width="100px;" alt=""/><br /><sub><b>Sam Fink</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=spfink" title="Code">💻</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+reviewed-by%3Aspfink" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/sullis"><img src="https://avatars3.githubusercontent.com/u/30938?v=4" width="100px;" alt=""/><br /><sub><b>sullis</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=sullis" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@thomaspoignant"><img src="https://avatars2.githubusercontent.com/u/17908063?v=4" width="100px;" alt=""/><br /><sub><b>Thomas Poignant</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Athomaspoignant+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/tobli"><img src="https://avatars3.githubusercontent.com/u/540266?v=4" width="100px;" alt=""/><br /><sub><b>Tobias Lidskog</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=tobli" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tvanhens"><img src="https://avatars1.githubusercontent.com/u/5342795?v=4" width="100px;" alt=""/><br /><sub><b>Tyler van Hensbergen</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Atvanhens+label%3Afeature-request" title="Feature requests">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.udondan.com/"><img src="https://avatars3.githubusercontent.com/u/6443408?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Schroeder</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Audondan+label%3Abug" title="Bug reports">🐛</a> <a href="https://github.com/aws/jsii/commits?author=udondan" title="Code">💻</a> <a href="https://github.com/aws/jsii/commits?author=udondan" title="Documentation">📖</a> <a href="https://github.com/aws/jsii/issues?q=author%3Audondan+label%3Afeature-request" title="Feature requests">🤔</a> <a href="https://github.com/aws/jsii/pulls?q=is%3Apr+author%3Audondan" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/vaneek"><img src="https://avatars1.githubusercontent.com/u/8113305?v=4" width="100px;" alt=""/><br /><sub><b>vaneek</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Avaneek+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://ultidev.com/Products/"><img src="https://avatars1.githubusercontent.com/u/757185?v=4" width="100px;" alt=""/><br /><sub><b>Vlad Hrybok</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Avgribok+label%3Abug" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://wcauchois.github.io/"><img src="https://avatars1.githubusercontent.com/u/300544?v=4" width="100px;" alt=""/><br /><sub><b>Bill Cauchois</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Awcauchois+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="https://github.com/workeitel"><img src="https://avatars1.githubusercontent.com/u/7794947?v=4" width="100px;" alt=""/><br /><sub><b>Florian Eitel</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aworkeitel+label%3Afeature-request" title="Feature requests">🤔</a></td>
    <td align="center"><a href="http://yanex.org/"><img src="https://avatars2.githubusercontent.com/u/95996?v=4" width="100px;" alt=""/><br /><sub><b>Yan Zhulanow</b></sub></a><br /><a href="https://github.com/aws/jsii/commits?author=yanex" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/edsenabr"><img src="https://avatars3.githubusercontent.com/u/15689137?v=4" width="100px;" alt=""/><br /><sub><b>Eduardo Sena S. Rosa</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Aedsenabr+label%3Abug" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://harimenon.com/"><img src="https://avatars2.githubusercontent.com/u/171072?v=4" width="100px;" alt=""/><br /><sub><b>Hari Pachuveetil</b></sub></a><br /><a href="#blog-floydpink" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/deccy-mcc"><img src="https://avatars0.githubusercontent.com/u/45844893?v=4" width="100px;" alt=""/><br /><sub><b>deccy-mcc</b></sub></a><br /><a href="https://github.com/aws/jsii/issues?q=author%3Adeccy-mcc+label%3Abug" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome!

## :balance_scale: License

**jsii** is distributed under the [Apache License, Version 2.0][apache-2.0].

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.

[apache-2.0]: https://www.apache.org/licenses/LICENSE-2.0
