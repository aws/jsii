# New Language Intake

This document outlines the process to be followed when introducing a new _jsii_ target language, including an estimated
timeline (the exact timeline may vary significantly depending on the specifics of the language being added).

The estimated total duration for the process is 4 to 6 months.

## Planning

**:alarm_clock: Estimated Duration:** 2 weeks

The first step is to study the _jsii_ specification, as well as existing language implementations, in order to have the
knowledge necessary to write a new language support proposal [RFC]. The [RFC] document produced will evolve and be
polished as development of the new language support progresses, but the following elements must be present before any
implementation begins:

- Identification of the language's standard package repository
- Proposal for the binding's configuration block
- Sample API representations in the proposed language
  - In particular, any element from the _jsii_ type model that does not naturally map into the proposed new language
    needs to be represented
  - Where several options exist, links to prior art are instrumental to validate the direction chosen
- Toolchain and platform requirements

[rfc]: https://github.com/awslabs/aws-cdk-rfcs#readme

## Code Generation (`jsii-pacmak`)

**:alarm_clock: Estimated Duration:** 4 to 6 weeks

The necessary code must be added to [`jsii-pacmak`] in order to map the _jsii_ assembly's declared types into the
proposed language. While this code ought to leverage the new language's _host_ runtime library, we begin with writing
the code generator in order to ensure the appropriate developer experience is achieved in the new language before
writing the back-end components.

Code generators are authored in **TypeScript**.

The necessary reserved words need to be registered in the `jsii` compiler, so that warnings are produced when
identifiers are used in **TypeScript** code that require slugification or escaping in the target language (and will
hence cause a degraded developer experience).

[`jsii-pacmak`]: https://github.com/aws/jsii/tree/main/packages/jsii-pacmak

## Runtime Library

**:alarm_clock: Estimated Duration:** 4 to 6 weeks

Now that the appropriate developer experience has been identified, the _host_ runtime library supporting the generated
code can be written. This component must be written in the new language.

!!! bug "Unimplemented"
    A reference architecture for _host_ runtime libraries is to be developed, in order to ensure consistent naming and
    behavior across all the runtimes, reducing the cost of maintaining many of those.

## Building & Packaging

**:alarm_clock: Estimated Duration:** 2 weeks

Once code is generated and it has a _host_ runtime library to rely on, [`jsii-pacmak`] needs to receive the additional
logic required to compile and package the generated libraries as required, producing ready-to-publish artifacts.

The necessary toolchain needs to be added to the [`public.ecr.aws/jsii/superchain`] _Docker_ image, so that `jsii` customers can rely
on this to build artifacts for any of the supported languages.

In addition to this, standardized _Amazon CodePipeline_ actions need to be developed in order to support publishing to
the relevant idiomatic package managers.

[`public.ecr.aws/jsii/superchain`]: https://github.com/aws/jsii-superchain

## Compliance Tests

**:alarm_clock: Estimated Duration:** 6 weeks

The full standard compliance suite must be implemented for the new language. Leveraging the new code generator, _host_
runtime library and compilation logic, the tests demonstrate that the new library behaves consistently with all other
language bindings.

While it is possible to declare _developer preview_ on a new language before all the tests pass, full compliance is a
pre-requisite to declaring _general availability_ of the new language.

## Documentation

**:alarm_clock: Estimated Duration:** 1 week

The necessary documentation needs to be provided to support customers who want to onboard the new language. This also
includes updating [`jsii-config`] with support for the new languages' configuration block.

[`jsii-config`]: https://github.com/aws/jsii/tree/main/packages/jsii-config

## Developer Preview

**:alarm_clock: Recommended Duration:** 4 to 8 weeks

It is possible to declare _Developer Preview_ for a new language support as soon as the code generation and _host_
runtime library are mature enough to be useful, and cover the majority of use-cases. While certain edge-cases may still
be uncovered at the beginning of _Developer Preview_, a clear plan should exist that ensures a path exists to address
any known gaps. It is required to have implemented most of the standard compliance suite prior to declaring _Developer
Preview_.

During the _Developer Preview_ phase, user experience studies should be conducted to validate assumptions made during
the code generator's design. If any significant change is dictated by the results of the user experience studies,
fluback studies should be performed in order to confirm that the desired impact has been achieved.

!!! bug "Unimplemented"
    A standard set of user experience study tasks will be developed, ensuring the learnings from previous experiences is
    factored into subsequent studies conducted.

Finally, it is essential to give time to the community to use and vet the new language support prior to considering
_General Availability_. A minimum of a full month without a major bug reported is advised. During this period,
intentional hands-on usage of the product msut be performed by engineers familiar with the new language as well as
engineers unfamilar with it. This ensures the new experience is considered holistically, in a manner unbiased by
knowledge of the implementation.

## General Availability

Once the new language support has been _Developer Preview_ for long enough and the engineers involved have gained
confidence that the API is stable, covers all known use-cases reliably, and behaves consistently with other _Generally
Available_ languages, the new support can be considered for _General Availability_.
