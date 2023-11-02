# Language Implementation

This handbook provides an overview of the process that should be followed when looking to implement support for a new
programming language in _jsii_. It attempts to provide a step-by-step procedure, while drawing the reader's attention on
points that have been found to cause problems in the past.

## Foreword

Implementing a new language in _jsii_ is not just a matter of implementing code generation. Mapping the _[jsii type
system]_ to a new programming language means finding how to represent an API originally designed in TypeScript to a form
that is as idiomatic as possible in the new language. This is a craft that often requires trial and error, and the best
(if not only) way to validate a proposal is to put it in front of users and seek feedback. As a consequence, this
endeavor should be expected to span months, not weeks.

## Scoping & Planning

The first step of most successful projects is to start by scoping work out and establishing a baseline plan to execute
on. For contributors not yet familiar with _jsii_, the [specification] document is a great place to start. In
particular, the [New Language Intake] document provides a high-level view of the recommended process for implementing
new language support.

The work of implementing support for a new language involves many different components:

- The [`jsii`] compiler emits warnings when a language's reserved words are used to name types, methods or properties;
  as this will later require slugification or escaping in the generated code - usually resulting in a degraded developer
  experience.
- The [`jsii-pacmak`] tool includes code generators for all supported languages, and a new implementation must be
  provided for the new language.
- Code generation usually requires specific configuration to be provided in order to be able to generate valid packages
  (for example, the **Java** code generator requires a base java package to generate into, as well as a Maven group and
  artifact ID for the package). The [`jsii-config`] tool needs to be updated with support generating a configuration
  block with the required entries for the new code generator.
- [`jsii-rosetta`] tool translates **TypeScript** example code found in the original documentation into the new target
  language. A new translation implementation needs to be added for the new language.
- Building and publishing infrastructure elements are provided by [`aws-delivlib`] to make it easier for _jsii_ users to
  publish their libraries to all supported package registries.

### Language Proposition RFC

The recommended way to formalize the initial plan is to write it into an RFC hosted in the [CDK RFC repository]. Enough
time has to be spent considering the requirements in order to get the work scoped and planned well, ensuring smooth
execution.

An additional benefit of following the RFC process is that it makes it easier to track learnings accumulated through the
implementation process, as those will be tracked as comments or iterations on the RFC document.

It is possible (and sometimes desirable) to start prototyping code-generation for the new language, as this can
highlight implementation challenges that need to be discussed in the RFC document. In any case, examples of the API
signatures that are expected to be rendered allow early feedback to be provided by possible future users, and still
helps identify challenges.

The following questions should be answered as early as possible in the process, to avoid surprises later on that result
in significant re-engineering effort:

- What do the generated APIs look like, for the typical API idioms?
  - _Classes_ (constructors, properties, methods, inheritance strategy, abstract members, ...)
    - The [AWS CDK] (one of the main consumers of _jsii_) uses specific patterns to offer a better experience in many
      programming languages. For example, constructor signatures where the last argument is a _jsii struct_ allows for
      keyword argument lifting in **Python**, and convenient `Builder` APIs in **Java**.
  - _Enums_
  - _Interfaces_ and _Structs_ (properties, methods, inheritance strategy, implementation, ...). In particular, how are
    new optional properties handled (those are not considered breaking change within the [jsii type system]).
  - _Structs_ (properties, inheritance strategy, implementation, ...)
- What information is needed in order for the code-generator to produce artifacts? What should the configuration block
  look like?
- What is the standard way to publish packages for the new language?
  - Are there any requirements (code signature, special metadata, ...) that need to be implemented in order to publish
    valid packages?
  - How are dependencies modeled? If [semantic versioning] is not the norm, what is the strategy to correctly represent
    semantic version ranges?
- What are the toolchain and platform requirements?
  - For example, **Java** requires an OpenJDK 8 distribution and `maven`, **Python** requires `python` 3.8 or above,
    etc...

## Code Generation

First, implement a first version of the code generation for the new language before getting too far into the
_[host library](#host-library)_ implementation. This top-down approach ensures the requirements for the lower level
parts of the implementation are well-defined before they are implemented (reducing the chances that significant re-work
has to be done), and enables using the [Standard Compliance Suite] to ensure the overall implementation is _correct_
according to the [specification] (since the code necessary to implement the test cases will be available right from the
start).

This work happens within the [`jsii-pacmak`] package.

Focus initially on the API signatures before getting into their implementation. The first version may even throw a _not
implemented_ exception when called.

The [`jsii-calc`] package, can be used as a sample consuming library which uses _jsii_ to generate code in all target
languages. Start by making sure a decent API is generated from this package and its dependencies, and use those to
implement the tests from the [Standard Compliance Suite]. You'll also get a feeling for whether the generated code
achieves a good developer experience or not.

## Host Library

Now that we are generating "empty shell" APIs that represent the necessary entities to back the [Standard Compliance
Suite] tests, start implementing the _host library_ and update the code generator until all the tests pass. It is
possible to publish artifacts even when tests in the suite are failing. As soon as basic features are working, work on
[Building and Packaging](#building-and-packaging) can start, so early feedback can be gathered.

!!! bug "Unimplemented"
    A standard architecture for the _host library_ has not been documented yet. Upcoming language implementations should
    contribute to this process by documenting a general architecture that should be implementable in any programming
    languages (and thus, abstracting away language specificities).

## Building & Packaging

The necessary toolchains should be added to he [`public.ecr.aws/jsii/superchain`] Docker image, so that the
[`jsii-pacmak`] generation can be changed to support building ready to publish artifacts instead of just code.

Before publishing any artifacts, ensure all packages (the _host library_ as well as generated artifacts) are designated
as _experimental_ (e.g: **Python** packages were annotated with the `Development Status :: 4 - Beta` trove classifier on
PyPI, and **NuGet** packages were published with a pre-release version such as `1.2.3-pre`).

Additionally, [`aws-delivlib`] needs to be augmented to support publishing artifacts to the language's package
repository.

!!! bug "Unimplemented"
    The package publishing is being extracted from [`aws-delivlib`] into a standalone library, currently hosted at
    [`eladb/jsii-release`](https://github.com/eladb/jsii-release).

## Documentation

Before releasing the new language support to _Developer Preview_, basic documentation needs to be produced to explain
how to configure a _jsii_ project to support the new language, and any peculiarities in working with libraries generated
by [`jsii-pacmak`] for this language.

Support for example code translation should also be built into [`jsii-rosetta`].

## Developer Preview

Once the full [Standard Compliance Suite] passes (possibly with the exception of certain fringy features), and the
documentation covering all aspects of using the language bindings have been produced, the new language can be released
to _Developer Preview_.

It is recommended that new languages stay in _Developer Preview_ for a minimum of 4 weeks, ideally until they have
received sufficient usage to have built confidence that there are no major usability concerns: once out of _Developer
Preview_, it will no longer be possible to introduce breaking changes to the generated code in order to address
usability issues or bugs.

In order to improve the chances of catching usability issues, focused user experience studies will be conducted with an
audience composed of developers with varied degrees of experience with the new language.

!!! bug "Unimplemented"
    A user experience template will be provided to ensure coverage of critical aspects of the experience. Any critical
    user experience issue (for example, issues that required breaking changes to the generated code) discovered but not
    covered in the template should be added to the template so that subsequent language implementations do not fall to
    the same problem.

## General Availability

Once the new language has been in _Developer Preview_ without any significant usability issues or bugs for a sufficient
amount of time and is used in real-world use-cases such as for [AWS CDK] applications, it becomes a candidate to be
declared _Generally Available_. At this point, breaking changes are no longer possible on the generated code.

<!-- ######################### External References ######################### -->

[jsii type system]: ../../specification/2-type-system.md
[specification]: ../../specification/1-introduction.md
[new language intake]: ../../specification/5-new-language-intake.md
[cdk rfc repository]: https://github.com/awslabs/aws-cdk-rfcs#readme
[`jsii`]: ../../packages/jsii
[`jsii-calc`]: ../../packages/jsii-calc
[`jsii-config`]: ../../packages/jsii-config
[`jsii-pacmak`]: ../../packages/jsii-pacmak
[`jsii-rosetta`]: ../../packages/jsii-rosetta
[standard compliance suite]: ../../specification/4-standard-compliance-suite.md
[`public.ecr.aws/jsii/superchain`]: ../../superchain
[`aws-delivlib`]: https://github.com/awslabs/aws-delivlib
[aws cdk]: https://github.com/aws/aws-cdk
[semantic versioning]: https://semver.org
