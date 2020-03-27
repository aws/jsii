# Language Implementation Handbook

## Foreword

Implementing a new language in *jsii* is not just a matter of implementing code
generation: mapping the *[jsii type system]* to a new programming language takes
some amounts of API design, finding ways to represent APIs in the most idiomatic
possible way. This is a craft that often requires trial and error, and the best
(if not only) way to validate a proposal is to put it in front of users and
seek feedback. As a consequence, this endeavor should be expected to span
months, not weeks.


## Scoping & Planning

The first step of most successful projects is to start by scoping work out and
establishing a baseline plan to execute on. For contributors not yet familiar
with *jsii*, the [specification] document is a great place to start. In
particular, the [New Language Intake] document provides a high-level view of the
recommended process for implementing new language support.

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

* What does the generated APIs look like, for the typical API idioms?
  - *Classes* (constructors, properties, methods, inheritance strategy, abstract
    members, ...)
    + Construction experience when last argument of constructor is a struct
  - *Enums*
  - *Interfaces* and *Structs* (properties, methods, inheritance strategy,
    implementation, ...). In particular, how are new optional properties handled
    (those are not considered breaking change within the [jsii type system]).
  - *Structs* (properties, inheritance strategy, implementation, ...)
* What information is needed in order for the code-generator to produce
  artifacts? What should the configuration block look like?
* What is the standard way to publish packages for the new language?
  - Is there any requirements (code signature, special metadata, ...) that need
    to be implemented in order to publish valid packages?
  - How are dependencies modeled? If semantic versioning  is not the norm, what
    is the strategy to correctly represent semantic version ranges?
* What are the toolchain and platform requirements?

## Code Generation

Before investing too much work towards the *host library* implementation, it is
recommended to write a first version of the code generation for the new language.
This work happens within the [`jsii-pacmak`] package.

Initially, focus on the API signatures: for example, generate code that throws
a *not implemented* exception when called. Start by making sure a decent API is
generated from the [`jsii-calc`] package and its dependencies, and use those to
implement the tests form the [Standard Compliance Suite].

## Host library

Now that we are generating "empty shell" APIs that represent the necessary
entities to back the [Standard Compliance Suite] tests, start implementing the
*host library* and update the code generator to make the tests pass until all
of them pass. It's possible to start publishing artifacts before all the tests
pass. As soon as some basic features are working, work on [Building and
Packaging](#building-and-packaging) can start, so early feedback can be
gathered.

> :construction: A standard architecture for the *host library* has not been
> documented yet. Upcoming language implementations should contribute to this
> process by documenting a general architecture that should be implementable
> in any programming languages (and thus, asbtracting away language
> specificities).

## Building and Packaging

The necessary toolchains should be added to he [`jsii/superchain`] Docker image,
so that the [`jsii-pacmak`] generation can be changed to support building ready
to publish artifacts instead of just code.

Additionally, new constructs have to be added to [`aws-delivlib`] in order to
support building and publishing of those new artifacts.

## Documentation

Before releasing the new language support to *Developer Preview*, basic
documentation needs to be produced to explain how to configure a *jsii* project
to support the new language, and any peculiarities in working with libraries
generated by [`jsii-pacmak`] for this language.

## Developer Preview

Once the full [Standard Compliance Suite] passes (possibly with the exception of
certain fringy features), and the documentation covering all aspects of using
the language bindings have been produced, the new language can be released to
*Developer Preview*.

It is recommended that new languages stay in *Developer Preview* for a minimum
of 4 weeks, or until they have received sufficient usage to have built
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
[`jsii-pacmak`]: ../../packgages/jsii-pacmak
[`jsii-calc`]: ../../packages/jsii-calc
[Standard Compliance Suite]: ../specifications/4-standard-compliance-suite.md
[`jsii/superchain`]: ../../superchain
[`aws-delivlib`]: https://github.com/awslabs/aws-delivlib
[AWS CDK]: https://github.com/aws/aws-cdk
