# Introduction

This document provides a high level overview of _jsii_, starting with its design tenets. It introduces the concepts and
components that compose _jsii_.

## Updating the Specification

### Introduction

The _jsii_ specification follows the guiding principles of an RFC. It is a living document that describes the current
understanding of how the various [components](#components) of _jsii_ are operating, as well as the approaches used to
ensure consistent behavior across the various supported languages.

The document is hosted with the _jsii_ codebase, making it easy to determine what specification was in place at the time
of a give _jsii_ release (by ways of referring to the `vX.Y.Z` git tag). A single version of the specification is
considered **active** at any given time: the version of the specification that is represented on the `HEAD` commit of
the `main` branch of the [`aws/jsii`][aws/jsii] repository. The **active** specification must be the base version for
any update proposal.

[aws/jsii]: https://github.com/aws/jsii

The process to update the specification is intended to be as lightweight as possible, while ensuring sufficient
conversation takes place before implementing significant (and breaking) changes. Since the process to update the
specification is part of the specification itself, it is amenable to be changed following the process described in the
currently **active** specification.

### Process

While the general process for updating the specification is to create a GitHub pull request against the
[`aws/jsii`][aws/jsii] repository, the exact requirements for what should be included in the pull request vary depending
on the type of update that is proposed:

- [:warning: Changing Behavior](#new-behavior) describes the process to be followed when introducing changes to the
  behavior of any component of _jsii_: new features, breaking changes to existing features, ...
- [:mag: Addressing Gaps](#addressing-gaps) is the process used for adding specification around existing but unspecified
  behavior.
- [:thumbsup: Trivial Changes](#trivial) explains how to propose changes that improve the specification without changing
  its meaning.

#### <a id="new-behavior"></a> :warning: Changing Behavior

If the change is **not backwards compatible** (it is a breaking change to an existing feature, or it is a new feature
that requires all runtime libraries implement support immediately), a new RFC should be created in the
[`awslabs/aws-cdk-rfcs`][awslabs/aws-cdk-rfcs] repository, following the [RFC Process]. This ensures enough time is
spent considering alternatives to breaking changes, and to create consensus that the change is desirable before time is
spent implementing it.

[awslabs/aws-cdk-rfcs]: https://github.com/awslabs/aws-cdk-rfcs
[rfc process]: https://github.com/aws/aws-cdk-rfcs#what-the-process-is

!!! note
    While going through the RFC process upfront is **strongly recommended**, contributors may choose not to file an RFC
    for a behavior change. In this case however, any core maintainer may decide that an RFC is required and block the
    contribution until the RFC process has been followed.

    It is worth noting that a draft pull request with proposed modifications to the specification (and possibly a
    proof-of-concept implementation), can be extremely useful.

When the RFC is **ready**, a GitHub pull request is created that must contain:

- Relevant additions or modifications to the specification documents
- Relevant additions or modifications to the compliance suite
- Implementation of the new behavior, including new or updated tests in all the language bindings

The pull request's body must reference the RFC if there has been one, and otherwise must include all discussion
necessary to explain the reasoning behind the proposal (including alternatives considered, risks, ...).

#### <a id="addressing-gaps"></a> :mag: Addressing Gaps

Proposals that increase the specification's coverage (desribing behavior that already exists) are handled as GitHub pull
requests that must contain the following elements:

- Relevant additions to the specification documents
- New compliance test(s) that enshrine the described behavior
- Implementation of the new compliance test(s) for all _Generally Available_ language bindings

The pull request body should provide pointers to any and all elements that can be used to verify that the behavior that
is described is indeed what is currently implemented.

#### <a id="trivial"></a> :thumbsup: Trivial Changes

Proposal of trivial changes, such as correcting typos in the document, or re-phrasing elements of the specification
without altering the meaning (typically to improve clarity) are handled in a simple GitHub pull request.

## Design Tenets (unless you know better ones)

- _jsii_ APIs strive to feel idiomatic in all supported languages.
- _jsii_ applications behave identically regardless of the language they are written in. It favors correctness over
  performance.
- _jsii_ **does not** attempt to support all TypeScript idioms (many features of TypeScript cannot be expressed in some
  target languages).
  - Unsupported idioms will cause a compile-time error to be emitted.
  - When prohibiting an idiom, _jsii_ strives to provide an error message that gives the user insight into why the
    pattern cannot be supported.
- _jsii_ does not force API design opinions on the developer:
  - Reserved names are limited to a minimum.
  - TypeScript API design patterns that are known to result in poor developer experience when represented in other
    languages will cause warnings to be issued, but the developer is ultimately entitled to decide whether they want to
    take or leave the advice.
- _jsii_ produces artifacts compatible with idiomatic tools whenever possible:
  - Generated libraries can be easily published to the "standard" package repository for the language.
  - Standard tools can be used to work with the generated libraries, and do not require any special configuration.

## Annotations

Annotations are present in the _jsii_ specification to provide additional information to the reader that is
non-normative. Those take the form of block-quotes that use the following chart:

!!! bug "Unimplemented"
    Is used to annotate parts of the specification that are known to be partially or incorrectly implemented in the
    current releases. Those are known issues in the current implementation that will be addressed in the future.

!!! question
    Is used to annotate open questions. They are typically in parts of the specification that is likely to change in
    future releases, and that may be good candidates for introducing RFCs.

!!! danger
    Is used to draw the reader's attention on specific points. They are used primarily to help the reader identify areas
    of the specification that, when incorrectly implemented, may result in hard-to-troubleshoot bugs; or to identify
    behavior that is intentionally undefined.

!!! info
    Is used to provide additional context which may not be obvious to the reader. They typically contain trivia that can
    help the reader understand the motivation for certain behaviors that are not always intuitive.

## Concepts

_jsii_ allows developers to author code once in **TypeScript**, while allowing use in a variety of other programming
languages (including **C#**, **Java** and **Python**).

### Assemblies

The _jsii Assembly_ document contains a specific representation of the API exported by the **TypeScript** module.
Similar to a header file in the **C++** world, it contains only information about the signatures of APIs (type names
with method and property signatures, associated documentation elements, ...) and no implementation.

The _npm_ package produced as a result of compiling the **TypeScript** source remains the source of truth with respects
to implementation of the API.

### Host & Kernel

The [_jsii_ runtime architecture][runtime-architecture] defines two processes:

1. The _host_ process runs the users' code native environment (a Java virtual machine, the .NET Runtime, ...).
2. The _kernel_ process hosts the **JavaScript** code from the standard _npm_ package defined by the user (and their
   dependencies), which is loaded and managed by a standardized `@jsii/kernel` package.

The _host_ process is responsible for starting the _kernel_ process as needed. A designated _host runtime library_
provides helper functions that will perform the necessary initialization when needed, so the _host_ app does not need to
include any special boilerplate code.

The two processes exchange messages over a designated communication channel (for example, using pipes), using a _kernel
API_ that is standardized in the _jsii specification_.

[runtime-architecture]: ../home/runtime-architecture.md

## Components

Several tools are involved in making this possible:

- [`jsii`][jsii] is a modified **TypeScript** compiler. In addition to generating **JavaScript** code from the source, it
  produces a _jsii Assembly_ document.
- [`jsii-pacmak`][jsii-pacmak] generates language bindings from a package compiled using `jsii`. It generates code in _host_
  languages that expose the API declared in the _jsii Assembly_ document.
- _Host runtime libraries_ centralize features used by code generated by [`jsii-pacmak`][jsii-pacmak], such as primitives to interact
  with the _kernel_ process, so that this code does not need to be duplicated in every generated module.
- [`@jsii/kernel`][@jsii/kernel] (and [`@jsii/runtime`][@jsii/runtime]) provide the functionality exposed by the _kernel_ process, and allow the
  _host_ code to seamlessly interact with the **JavaScript** implementation.

[jsii]: https://github.com/aws/jsii/tree/main/packages/jsii
[jsii-pacmak]: https://github.com/aws/jsii/tree/main/packages/jsii-pacmak
[@jsii/kernel]: https://github.com/aws/jsii/tree/main/packages/@jsii/kernel
[@jsii/runtime]: https://github.com/aws/jsii/tree/main/packages/@jsii/runtime
