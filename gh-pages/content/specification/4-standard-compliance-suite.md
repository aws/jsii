# Standard Compliance Suite

The standard compliance suite is the normative description of how a _jsii_ language binding behaves. It is written for
the authors of language bindings: the _host_ runtime library together with its code generator. Every binding implements
the suite in its own language, and the results show where bindings agree and where they don't.

_jsii_ exposes a single object-oriented API to many languages, so a given piece of user code should cause the same
behavior in every one of them. In practice, that means the messages exchanged between the _host_ and the _kernel_
should be the same for the same use case. The suite describes that behavior once, independent of any language.

## Requirements

Every test case is a requirement. A language binding is compliant when it passes all of them, and the
[compliance report](6-compliance-report.md) shows where each binding stands.

Test cases state their requirements with the key words "MUST", "MUST NOT" and "MAY", as described in [RFC 2119].
"MUST" and "MUST NOT" are what a binding has to do; "MAY" marks the freedom it has in doing so, for example in how it
names a member that clashes with a reserved word. There are no recommendations: if a behavior is worth describing in
the suite, every binding has to implement it.

**A test case describes a behavior of the _jsii_ API, not an idiom of one host language.** The question to ask is what a
user of _any_ binding can rely on. That a struct received from the kernel compares equal to one built by the host is
such a behavior. That the comparison is done by a method called `equals`, or that structs are constructed with a
builder, is not. Most requirements can be observed in the messages exchanged with the _kernel_, but not all: rejecting
an incomplete struct shows up as the _absence_ of a message, and rejecting the mutation of a returned collection
happens entirely on the host. Both are requirements all the same, because both are behaviors users depend on.

Behaviors that only make sense for one language belong in that binding's own tests, not in the suite. When a binding
can't implement a requirement, the requirement stays, and the binding reports the test as failing or not applicable,
with the reason.

[RFC 2119]: https://www.rfc-editor.org/rfc/rfc2119

## Test Cases

Test cases live in [`tools/jsii-compliance/suite`][suite], one markdown file per test case, grouped in one directory per
category. The categories are listed in the navigation of this site.

- The directory name of a category determines the order of categories, for example `03-statics`. Each category directory
  has a `README.md` with the category title as its H1 heading, followed by a description of the category.
- The file name of a test case is the name of the test case, for example `staticPropertyAssignmentUpdatesJavaScript.md`. Language bindings
  report results using this name. Matching ignores case, underscores and leading `test`s, so each language binding can
  follow its own naming conventions. A Python binding can call the test `test_static_property_assignment_updates_java_script`.
- Test case names are unique across all categories.

**Test cases contain nothing that is specific to a language binding.** They describe the behavior, never how one binding
implements it or why one binding doesn't. Known deviations of a binding belong in its
[compliance report](#compliance-reports), next to the result they explain.

[suite]: https://github.com/aws/jsii/tree/main/tools/jsii-compliance/suite

### Format

A test case file has the following structure:

1. An H1 title that states the behavior, ideally within 75 characters.
1. A description of the behavior, using the [RFC 2119](#requirements) key words. The description is
   self-sufficient: a reader can implement the test without searching for additional information. A long, unambiguous
   description is better than a short one that is open to interpretation.
1. A **Reference Implementation** section, with a **TypeScript** code block that is the canonical form of the test. It
   declares all types the test uses, so the example is self-contained, and states its assertions as [`jest`]
   expectations.
1. Optionally, a **Kernel Trace** section with the messages exchanged between the _host_ and the `node` process during
   the test.

The type declarations in the reference implementation are excerpts of the `jsii-calc` test fixture, which the language
bindings use to implement the test. The reference implementation is not executed today.

The kernel trace is the sequence of JSON messages, from the perspective of the _host_ app, in the following notation:

- Messages the _host_ runtime sends to the `node` process: `> { "api": "foo" }`
- Messages the _host_ runtime receives from the `node` process: `< { "result": "bar" }`
- Comments, until the end of the line: `# Comment`
- Blank lines, to group related messages

The initial `hello` and `load` messages, and the `$jsii.stacktrace` of each message, are omitted. A `load` message that
is sent after the first message that is neither `hello` nor `load` is part of the trace.

[`jest`]: https://jestjs.io/docs/en/getting-started

??? example "Show Template"
    ````md
    # Behavior the test verifies

    A description of the behavior, for example: the host MUST pass `Foo` to the kernel by reference, and MUST NOT copy
    it. The description includes enough detail for a reader to understand the test without searching for additional
    information.

    ## Reference Implementation

    ```ts
    // GIVEN
    export class Foo {
      /* ... */
    }

    // WHEN
    const bar = new Foo().bar();

    // THEN
    expect(bar.baz).toBeUndefined();
    ```

    ## Kernel Trace

    ```
    > {"api":"create","fqn":"jsii-calc.Foo","args":[],"overrides":[],"interfaces":[]}
    < {"ok":{"$jsii.byref":"jsii-calc.Foo@10000"}}
    ```
    ````

## Compliance Reports

Each language binding has a test harness that writes a compliance report during its `test` phase. The report is a JSON
document:

```ts
interface Report {
  /** For each test case, using the test case name according to the conventions of the language */
  [testName: string]: {
    /** The result of the test: passing, failing, or not applicable to this language binding */
    status: 'success' | 'failure' | 'n/a';
    /** Why the test fails or doesn't apply */
    reason?: string;
    /** A link to more information, such as the issue tracking a failure */
    url?: string;
  };
}
```

The [`jsii-compliance`][jsii-compliance] tool collects the reports of all language bindings. It fails when a report
contains a test that has no test case definition, which keeps tests that only exist in one language out of the suite.
It then generates the test case pages of this site and the [compliance report](6-compliance-report.md).

[jsii-compliance]: https://github.com/aws/jsii/tree/main/tools/jsii-compliance
