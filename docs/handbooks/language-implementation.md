# Language Implementation Handbook

This handbook provides an overview of the process that should be followed when
looking to implement support for a new programming language in *jsii*. It
attempts to provide a step-by-step procedure, while drawing the reader's
attention on points that have been found to cause problems in the past.

__Table of Contents__
1. [Foreword](#foreword)
1. [Scoping & Planning](#scoping-&-planning)
   1. [Language Proposition RFC](#language-proposition-rfc)
1. [Code Generation](#code-generation)
1. [Host Library](#host-library)
1. [Building & Packaging](#building-&-packaging)
1. [Documentation](#documentation)
1. [Developer Preview](#developer-preview)
1. [General Availability](#general-availability)

--------------------------------------------------------------------------------

## Foreword

Implementing a new language in *jsii* is not just a matter of implementing code
generation. Mapping the *[jsii type system]* to a new programming language means
finding how to represent an API originally designed in TypeScript to a form that
is as idiomatic as possible in the new language. This is a craft that often
requires trial and error, and the best (if not only) way to validate a proposal
is to put it in front of users and seek feedback. As a consequence, this
endeavor should be expected to span months, not weeks.


## Scoping & Planning

The first step of most successful projects is to start by scoping work out and
establishing a baseline plan to execute on. For contributors not yet familiar
with *jsii*, the [specification] document is a great place to start. In
particular, the [New Language Intake] document provides a high-level view of the
recommended process for implementing new language support.

The work of implementing support for a new language involves many different
components:
- The [`jsii`] compiler emits warnings when a language's reserved words are used
  to name types, methods or properties; as this will later require slugification
  or escaping in the generated code - usually resulting in a degraded developer
  experience.
- The [`jsii-pacmak`] tool includes code generators for all supported languages,
  and a new implementation must be provided for the new language.
- Code generation usually requires specific configuration to be provided in
  order to be able to generate valid packages (for example, the **Java** code
  generator requires a base java package to generate into, as well as a Maven
  group and artifact ID for the package). The [`jsii-config`] tool needs to be
  updated with support generating a configuration block with the required
  entries for the new code generator.
- [`jsii-rosetta`] tool translates **TypeScript** example code found in the
  original documentation into the new target language. A new translation
  implementation needs to be added for the new language.
- Building and publishing infrastructure elements are provided by
  [`aws-delivlib`] to make it easier for *jsii* users to publish their libraries
  to all supported package registries.

### Language Proposition RFC

The recommended way to formalize the initial plan is to write it into an RFC
hosted in the [CDK RFC repository]. Enough time has to be spent considering the
requirements in order to get the work scoped and planned well, ensuring smooth
execution.

An additional benefit of following the RFC process is that it makes it easier
to track learnings accumulated through the implementation process, as those will
be tracked as comments or iterations on the RFC document.

It is possible (and sometimes desirable) to start prototyping code-generation
for the new language, as this can hlighlight implementation challenges that need
to be discussed in the RFC document. In any case, examples of the API signatures
that are expected to be rendered allow early feedback to be provided by possible
future users, and still helps identify challenges.

The following questions should be answered as early as possible in the process,
to avoid surprises later on that result in significant re-engineering effort:

* What do the generated APIs look like, for the typical API idioms?
  - *Classes* (constructors, properties, methods, inheritance strategy, abstract
    members, ...)
    + The [AWS CDK] (one of the main consumers of *jsii*) uses specific patterns
      to offer a better experience in many programming languages. For example,
      constructor signatures where the last argument is a *jsii struct* allows
      for keyword argument lifting in **Python**, and convenient `Builder` APIs
      in **Java**.
  - *Enums*
  - *Interfaces* and *Structs* (properties, methods, inheritance strategy,
    implementation, ...). In particular, how are new optional properties handled
    (those are not considered breaking change within the [jsii type system]).
  - *Structs* (properties, inheritance strategy, implementation, ...)
* What information is needed in order for the code-generator to produce
  artifacts? What should the configuration block look like?
* What is the standard way to publish packages for the new language?
  - Are there any requirements (code signature, special metadata, ...) that need
    to be implemented in order to publish valid packages?
  - How are dependencies modeled? If [semantic versioning]  is not the norm,
    what is the strategy to correctly represent semantic version ranges?
* What are the toolchain and platform requirements?
  - For example, **Java** requires an OpenJDK 8 distribution and `maven`,
    **Python** requires `python` 3.6 or above, etc...

## Code Generation

First, implement a first version of the code generation for the new language
before getting to far into the *[host library](#host-library)* implementation.
This top-down approach ensures the requirements for the lower level parts of
the implementation are well defined before they're implemented (reducing the
chances significant re-work has to be done), and enables using the [Standard
Compliance Suite] to ensure the overall implementation is *correct* according
to the [specification] (since the code necessary to implement the test cases
will be available right from the start).

This work happens within the [`jsii-pacmak`] package.

Focus initially on the API signatures before getting into their implementation.
The first version may even thrw a *not implemented* exception when called.

The [`jsii-calc`] package, can be used as a sample consuming library which uses
*jsii* to generate code in all traget languages. Start by making sure a decent
API is generated from this package and its dependencies, and use those to
implement the tests from the [Standard Compliance Suite]. You'll also get a
feeling for whether the generated code achieves a good developer experience or
not.

## Host Library

Now that we are generating "empty shell" APIs that represent the necessary
entities to back the [Standard Compliance Suite] tests, start implementing the
*host library* and update the code generator until all the tests pass. It's
possible to publish artifacts even when tests in the suite are failing. As soon
as basic features are working, work on [Building and
Packaging](#building-and-packaging) can start, so early feedback can be
gathered.

> :construction: A standard architecture for the *host library* has not been
> documented yet. Upcoming language implementations should contribute to this
> process by documenting a general architecture that should be implementable
> in any programming languages (and thus, asbtracting away language
> specificities).

## Building & Packaging

The necessary toolchains should be added to he [`jsii/superchain`] Docker image,
so that the [`jsii-pacmak`] generation can be changed to support building ready
to publish artifacts instead of just code.

Before publishing any artifacts, ensure all packages (the *host library* as well
as generated artifacts) are designated as *experimental* (e.g: **Python**
packages were annotated with the `Development Status :: 4 - Beta` trove
classifier on PyPI, and **NuGet** packages were published with a pre-release
version such as `1.2.3-pre`).

Additionally, [`aws-delivlib`] needs to be augmented to support publishing
artifacts to the language's package repository.

> :construction: The package publishing is being extracted from [`aws-delivlib`]
> into a standalone library, currently hosted at
> [`eladb/jsii-release`](https://github.com/eladb/jsii-release).

## Documentation

Before releasing the new language support to *Developer Preview*, basic
documentation needs to be produced to explain how to configure a *jsii* project
to support the new language, and any peculiarities in working with libraries
generated by [`jsii-pacmak`] for this language.

Support for example code translation should also be built into [`jsii-rosetta`].

## Developer Preview

Once the full [Standard Compliance Suite] passes (possibly with the exception of
certain fringy features), and the documentation covering all aspects of using
the language bindings have been produced, the new language can be released to
*Developer Preview*.

It is recommended that new languages stay in *Developer Preview* for a minimum
of 4 weeks, ideally until they have received sufficient usage to have built
confidence that there are no major usability concerns: once out of *Developer
Preview*, it will no longer be possible to introduce breaking changes to the
generated code in order to address usability issues or bugs.

In order to improve the chances of catching usability issues, focused user
experience studies will be conducted with an audience composed of developers
with varied degrees of experience with the new language.

> :construction: A user experience template will be provided to ensure coverage
> of critical aspects of the experience. Any critical user experience issue
> (for example, issues that required breaking changes to the generated code)
> discovered but not covered in the template should be added to the template so
> that subsequent language implementations do not fall to the same problem.

## General Availability

Once the new language has been in *Developer Preview* wihout any significant
usability issue or bug for long enough, and is used in real-world use-cases such
as for [AWS CDK] applications, it becomes candidate to be declared *Generally
Available*. At this point, breaking changes are no longer possible on the
generated code.

<!-- ######################### External References ######################### -->
[jsii type system]: ../specifications/2-type-system.md
[specification]: ../specifications/1-introduction.md
[New Language Intake]: ../specification/5-new-language-intake.md
[CDK RFC repository]: https://github.com/awslabs/aws-cdk-rfcs#readme
[`jsii`]: ../../packages/jsii
[`jsii-calc`]: ../../packages/jsii-calc
[`jsii-config`]: ../../packages/jsii-config
[`jsii-pacmak`]: ../../packgages/jsii-pacmak
[`jsii-rosetta`]: ../../packages/jsii-rosetta
[Standard Compliance Suite]: ../specifications/4-standard-compliance-suite.md
[`jsii/superchain`]: ../../superchain
[`aws-delivlib`]: https://github.com/awslabs/aws-delivlib
[AWS CDK]: https://github.com/aws/aws-cdk
[semantic versioning]: https://semver.org
