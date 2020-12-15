# Standard Compliance Suite

## Goal

The goal of the standard compliance suite is to be a normative description of the behaviors that all language runtime
implementations (_host runtime library_ in combination with _code generation_) must implement. This description takes
the form of a collection of test cases that must be re-implemented in each _host_ language, so that compliance can be
asserted.

Since the goal of _jsii_ is to expose a single Object-Oriented API to multiple programming languages, it is important to
ensure the behavior is consistent across all of them. This can be achieved by making sure that the interactions between
the _host_ and _kernel_ processes are the same for a given use-case.

## Format

In order to assert whether a new runtime implementation is correct, a formal compliance test suite is defined, that all
language runtimes must fully implement before they can be deemed eligible for General Availability.

This document describes these tests, as well as a general approach for ensuring conformance requirements are met in a
systematic manner.

### Categories

Test cases in the standard compliance suite are grouped by categories, which help implementors direct their effort in
the early stages of the implementation of new language bindings. Each category is declared in an `H3` title (a line that
starts with `### `) within the [`## Test Suite`] title. A description of the category immediately follows the opening
title. The category ends with the end of the document, or whenever another `H2` title is reached.

[`## test suite`]: #test-suite

### Test Case

Within a category title, test cases are delimited by `H4` (`#### `) titles, which correspond to the test case name. The
test case name should be kept concise (ideally within 75 characters) and try to be as descriptive as possible.

Immediately after the `H4` title is an English language description of the test case that explains the property the test
is designed to validate in as much detail as possible. As much as possible, test case descriptions should be
self-sufficient.

After the attributes table, a **TypeScript** block of code describes the canonical form of the test. It includes any
type declaration that is used by the test (so the code example is self-contained). Assertions performed by the test
should be written in the form of [`jest`] expectations.

!!! question
    The assertion code is intended as a formal representation of the tests' normative procedure. It is not currently
    executed against the _kernel_, but this could be achieved in the future. Additionally, we might be able to
    automatically transliterate the tests to other languages using [`jsii-rosetta`].

[`jest`]: https://jestjs.io/docs/en/getting-started
[`jsii-rosetta`]: https://github.com/aws/jsii/tree/main/packages/jsii-rosetta

Finally, another code block details the sequence of messages that should be exchanged between the _host_ and `node`
processes during the execution of the test case, such that implementations can assert coherent behavior.

Initial messages corresponding to the `hello` and `load` calls can be omitted at the beginning of the kernel trace.
Those messages are typically identical across tests and there is little value in asserting around those. However, any
`load` call happening after the first call that is neither the `hello` message or another `load` call **must** be
included.

The dialogue is the sequence of JSON formatted messages, from the perspective of the _host_ app, using the following
notation:

- Messages sent by the _host_ runtime to the `node` process:
  ```
  > { "api": "foo" }
  ```
- Messages received by the _host_ runtime from the `node` process:
  ```
  < { "result": "bar" }
  ```
- Comments to improve readability of the trace:
  ```
  # Comment continues until the end of the line
  ```
- Blank lines can be added to logically group trace elements

!!! question
    Is there a need to support some form of a capture mechanism to provision for non-deterministic results, or
    non-normative elements such as the exact Object IDs issued for created instances?

??? example "Show Template"
    Below is the template markdown to copy-paste when introducing a new test case in the compliance suite. New tests should
    always be added at the very end of the category they belong to, right after the last test in said category.

    ````md
    ### Test Category

    #### Test Case Name

    A short english language description of what property this test verifies. The description should include enough detail
    for a reader to be able to understand the test without having to search for any additional information. Prefer a long,
    unambiguous description to a terse one that could be subject to interpretation.

    <details><summary>Show test</summary>

    ##### Reference Implementation

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

    ##### Reference Kernel Messaging

    ```
    ## You can omit the initial hello/load messages
    # < { "hello": "@jsii/runtime@1.2.3" }
    # > { "load": { "name": "test-case-001", "version": "1.2.3", "tarball": "/tmp/jsii-kernel-test/lib.tgz" } }
    # < { "assembly": "test-case-001", "types": 3 }
    ```

    </details>
    ````

## Compliance

In order to be able to assert compliance of language binding libraries to the standard test suite, implementations are
responsible for providing a test harness (typically as part of the runtime library) that can produce a standardized test
report in the form of a JSON document that follows the following schema:

```ts
interface TestReport {
  /** The report is broken down by test category, using the name as-is */
  [category: string]: {
    /** For each test in the category, using its name as-is */
    [test: string]: {
      /** Whether the test passed or failed */
      status: 'PASS' | 'FAIL';
      /** The kernel messages captured during the test */
      kernelTrace: Array<KernelMessage>;
    };
  };
}

interface KernelMessage {
  /** The direction the message was sent (Host -> Kernel / Kernel -> Host) */
  direction: 'FromKernel' | 'ToKernel';
  /** The message, as a JSON object */
  message: { [key: string]: unknown };
}
```

The `@jsii/compliance` package provides the necessary tools to consume such a test report, together with the Markdown
document describing the compliance suite, and procuces a report describing compliance test coverage as well as
information about any non-conformant test result.

!!! bug "Unimplemented"
    The `@jsii/compliance` tool does not exist yet.

!!! question
    Should a "somewhat standard" format such as XUnit test report be used instead of rolling our own JSON document?

## Test Suite

### Legacy

This section is due to contain all compliance tests that were implemented before the _jsii specification_ was initially
written. They are going to be gradually replaced by more focused tests with better descriptions.

#### Type Unions are correctly disambiguated by the Kernel

In certain cases, two or more types in a _Type Union_ can overlap in such a way that they are all valid structural types
for the value. Statically typed languages however will not be satisfied with structural typing only, and require the
correct declared type to be preserved.

??? example "Show test"
    ##### Reference Implementation

    ```ts
    // GIVEN
    export interface BluePill {
      readonly offeredTo: string;
      readonly makesYouForgetTheMatrix?: boolean;
    }
    export interface RedPill {
      readonly offeredTo: string;
      readonly makesYouExitTheMatrix?: boolean;
    }
    export class Morpheus {
      public static isBlue(pill: BluePill | RedPill): pill is BluePill {
        const keys = new Set(Object.keys(pill));
        switch (keys.size) {
          case 1:
            return keys.has('offeredTo');
          case 2:
            return keys.has('offeredTo') && keys.has('makesYouForgetTheMatrix');
          default:
            return false;
        }
      }
      public static isRed(pill: BluePill | RedPill): pill is RedPill {
        const keys = new Set(Object.keys(pill));
        switch (keys.size) {
          case 1:
            return keys.has('offeredTo');
          case 2:
            return keys.has('offeredTo') && keys.has('makesYouExitTheMatrix');
          default:
            return false;
        }
      }
      private constructor() {}
    }
    export class Neo {
      public readonly tookBlue: boolean;
      public readonly tookRed: boolean;

      public constructor(public readonly pill: BluePill | RedPill) {
        this.tookBlue = pill.offeredTo == 'Neo' && Morpheus.isBlue(pill);
        this.tookRed = pill.offeredTo == 'Neo' && Morpheus.isRed(pill);
      }
    }

    // WHEN
    const bluePillA = new Neo({ offeredTo: 'not Neo' });
    const bluePillB = new Neo({ offeredTo: 'Neo', makesYouForgetTheMatrix: true });
    const redPillA = new Neo({ offeredTo: 'not Neo' });
    const redPillB = new Neo({ offeredTo: 'Neo', makesYouExitTheMatrix: true });

    // THEN
    expect(bluePillA.pill instanceof BluePill).toBeTruthy();
    expect(bluePillA.tookBlue).toBeFalsy();
    expect(bluePillA.tookRed).toBeFalsy();

    expect(bluePillB.pill instanceof BluePill).toBeTruthy();
    expect(bluePillA.tookBlue).toBeTruthy();
    expect(bluePillA.tookRed).toBeFalsy();

    expect(redPillA.pill instanceof RedPill).toBeTruthy();
    expect(bluePillA.tookBlue).toBeFalsy();
    expect(bluePillA.tookRed).toBeFalsy();

    expect(redPillB.pill instanceof RedPill).toBeTruthy();
    expect(bluePillA.tookBlue).toBeFalsy();
    expect(bluePillA.tookRed).toBeTruthy();
    ```

    ##### Kernel Trace

    ```

    ```

#### Partially initialized object consumption

When a constructor passes `this` out from **JavaScript** to the _host_ app, the reference must be correctly identified
and passed across.

!!! bug "Unimplemented"
    The .NET Runtime does not currently honor object identity, meaning that despite the same object reference is
    returned twice, two distinct proxies exist for it in the _host_ .NET app.

    Generally speaking, using pure object identity on _jsii_ language front-ends is dangerous, as certain statically
    typed language will require the runtime to have different instances for different static types a given object
    reference is surfaced as. It may be necessary to introduce a helper akin to `Jsii.isSameObject(a, b)` to enable
    identity predicates to be used. Other helper functions may be necessary, too, such as one to obtain a "consistent"
    object hash for instances in Java (so they can be safely used with `HashMap`, ...).

??? example "Show test"
    ##### Reference Implementation

    ```ts
    // GIVEN
    export abstract class PartiallyInitializedThisConsumer {
      public abstract consumePartiallyInitializedThis(obj: ConstructorPassesThisOut): void;
    }
    export class ConstructorPassesThisOut {
      public constructor(consumer: PartiallyInitializedThisConsumer) {
        consumer.consumePartiallyInitializedThis(this);
      }
    }

    // WHEN
    class MyConsumer extends PartiallyInitializedThisConsumer {
      public obj?: ConstructorPassesThisOut = null;

      public consumePartiallyInitializedThis(obj: ConstructorPassesThisOut) {
        this.obj = obj;
      }
    }
    const consumer = new MyConsumer();
    const object = new ConstructorPassesThisOut(consumer);

    // THEN
    expect(consumer.obj).toBe(object);
    ```

    ##### Kernel Trace

    ```
    # < {"hello":"@jsii/runtime@..."}
    # > {"api":"load","name":"...","version":"...","tarball":"..."}
    # < {"ok":{"assembly":"...","types":2}}

    > {"api":"create","fqn":"test.PartiallyInitializedThisConsumer","args":[],"overrides":[{"method":"consumePartiallyInitializedThis"}],"interfaces":[]}
    < {"ok":{"$jsii.byref":"test.PartiallyInitializedThisConsumer@10000"}}
    > {"api":"create","fqn":"test.ConstructorPassesThisOut","args":[{"$jsii.byref":"test.PartiallyInitializedThisConsumer@10000","$jsii.interfaces":[]}],"overrides":[],"interfaces":[]}
    < {"callback":{"cbid":"jsii::callback::20000","invoke":{"objref":{"$jsii.byref":"test.PartiallyInitializedThisConsumer@10000"},"method":"consumePartiallyInitializedThis","args":[{"$jsii.byref":"test.ConstructorPassesThisOut@10001"}]}}}
    > {"complete":{"api":"complete","cbid":"jsii::callback::20000"}}
    < {"ok":{"$jsii.byref":"test.ConstructorPassesThisOut@10001"}}
    ```

### Interfaces

Tests in this section ensure correct behavior of _behavioral interfaces_.

#### Host app can implement an interface "from scratch"

It is possible for a "pure" host interface implementation to be passed across the language boundary, it's methods and
properties can be used by **JavaScript** code within the Kernel process.

!!! bug
    The .NET Runtime currently requires that pure interfaces implementations extend from
    `Amazon.JSII.Rutime.Deputy.DepytyBase`.

!!! bug
    The Python Runtime currently expects a somewhat un-pythonic way to implement interfaces, which requires decorating
    the implementing class with `@jsii.implements("implemented-type.JsiiInterfaceFQN")`.

??? example "Show test"
    ##### Reference Implementation

    ```ts
    // GIVEN
    export interface IBehavioralInterface {
      methodCall(): string;
      readonly property: number;
    }
    export class InterfaceConsumer {
      constructor(private readonly iface: IBehavioralInterface) {}

      public composeResult() {
        return `${this.iface.methodCall()} / ${this.iface.property}`;
      }
    }

    // WHEN
    class Implementation implements IBehavioralInterface {
      public readonly property = 1337;
      public methodCall() {
        return 'Hello!';
      }
    }
    const impl = new Implementation();
    const consumer = new InterfaceConsumer(impl);

    // THEN
    expect(consumer.composeResult()).toBe('Hello! / 1337');
    ```

    ##### Kernel Trace

    ```
    # < {"hello":"@jsii/runtime@..."}
    # > {"api":"load","name":"...","version":"...","tarball":"..."}
    # < {"ok":{"assembly":"...","types":2}}

    > {"api":"create","fqn":"Object","args":[],"overrides":[{"method":"methodCall"},{"property":"property"}],"interfaces":["test.IBehavioralInterface"]}
    < {"ok":{"$jsii.byref":"Object@10000","$jsii.interfaces":["test.IBehavioralInterface"]}}
    > {"api":"create","fqn":"test.InterfaceConsumer","args":[{"$jsii.byref":"Object@10000","$jsii.interfaces":[]}],"overrides":[],"interfaces":[]}
    < {"ok":{"$jsii.byref":"test.InterfaceConsumer@10001"}}
    > {"api":"invoke","objref":{"$jsii.byref":"test.InterfaceConsumer@10001"},"method":"composeResult","args":[]}
    < {"callback":{"cbid":"jsii::callback::20000","invoke":{"objref":{"$jsii.byref":"Object@10000","$jsii.interfaces":["test.IBehavioralInterface"]},"method":"methodCall","args":[]}}}
    > {"complete":{"api":"complete","cbid":"jsii::callback::20000","result":"Hello!"}}
    < {"callback":{"cbid":"jsii::callback::20001","get":{"objref":{"$jsii.byref":"Object@10000","$jsii.interfaces":["test.IBehavioralInterface"]},"property":"property"}}}
    > {"complete":{"api":"complete","cbid":"jsii::callback::20001","result":1337.0}}
    < {"ok":{"result":"Hello! / 1337"}}
    ```

### Structs & Keyword Arguments

#### Ambiguous arguments are handled correctly

When a method accepts both a positional parameter named `foo` and a struct parameter with a property named `foo`, the
respective values are passed in the correct parameter location when calling into the **JavaScript** code.

??? example "Show test"
    ##### Reference Implementation

    ```ts
    // GIVEN
    export interface StructType {
      readonly foo: string;
    }
    export class ClassType {
      public constructor(public readonly foo: number, public readonly opts: StructType) {}
    }

    // WHEN
    var result = new ClassType('Bazinga!', { foo: 1337 });

    // THEN
    expect(typeof result.foo).toBe(1337);
    expect(typeof result.opts.foo).toBe('Bazinga!');
    ```

    ##### Kernel Trace

    ```
    # < {"hello":"@jsii/runtime@..."}
    # > {"api":"load","name":"...","version":"...","tarball":"..."}
    # < {"ok":{"assembly":"...","types":2}}

    > {"api":"create","fqn":"test.ClassType","args":[1337.0,{"$jsii.struct":{"fqn":"test.StructType","data":{"foo":"Bazinga!"}}}],"overrides":[],"interfaces":[]}
    < {"ok":{"$jsii.byref":"test.ClassType@10000"}}
    > {"api":"get","objref":{"$jsii.byref":"test.ClassType@10000"},"property":"foo"}
    < {"ok":{"value":1337}}
    > {"api":"get","objref":{"$jsii.byref":"test.ClassType@10000"},"property":"opts"}
    < {"ok":{"value":{"$jsii.byref":"Object@10001","$jsii.interfaces":["test.StructType"]}}}
    > {"api":"get","objref":{"$jsii.byref":"Object@10001"},"property":"foo"}
    < {"ok":{"value":"Bazinga!"}}
    ```

### Collections

Tests in this section ensure correct behavior of collections (`List` and `Map`).

#### Struct elements of `List` are deserialized to the correct apparent type

When the declared element type of a `List` is a _struct_, the resulting list must contain elements of the correct static
type. This is a requirement for statically typed languages such as Java where type parameters are reified.

??? example "Show test"
    ##### Reference Implementation

    ```ts
    // GIVEN
    export interface StructType {
      readonly property: string;
    }
    export class StructProvider {
      public static provide(): StructType[] {
        return [{ property: 'value' }];
      }
    }

    // WHEN
    const items = StructProvider.provide();

    // THEN
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item instanceof StructType).toBeTruthy();
    }
    ```

    ##### Kernel Trace

    ```
    # < {"hello":"@jsii/runtime@..."}
    # > {"api":"load","name":"...","version":"...","tarball":"..."}
    # < {"ok":{"assembly":"...","types":2}}

    > {"api":"sinvoke","fqn":"test.StructProvider","method":"provide","args":[]}
    < {"ok":{"result":[{"$jsii.byref":"Object@10000","$jsii.interfaces":["test.StructType"]}]}}
    ```

#### Struct elements of `Map` are deserialized to the correct apparent type

When the declared element type of a `Map` is a _struct_, the resulting list must contain elements of the correct static
type. This is a requirement for statically typed languages such as Java where type parameters are reified.

??? example "Show test"
    ##### Reference Implementation

    ```ts
    // GIVEN
    export interface StructType {
      readonly property: string;
    }
    export class StructProvider {
      public static provide(): { [key: string]: StructType } {
        return { foo: { property: 'value' } };
      }
    }

    // WHEN
    const items = StructProvider.provide();

    // THEN
    expect(items.length).toBeGreaterThan(0);
    for (const item of Object.values(items)) {
      expect(item instanceof StructType).toBeTruthy();
    }
    ```

    ##### Kernel Trace

    ```
    # < {"hello":"@jsii/runtime@..."}
    # > {"api":"load","name":"...","version":"...","tarball":"..."}
    # < {"ok":{"assembly":"...","types":2}}

    > {"api":"sinvoke","fqn":"test.StructProvider","method":"provide","args":[]}
    < {"ok":{"result":{"$jsii.map":{"foo":{"$jsii.byref":"Object@10000","$jsii.interfaces":["test.StructType"]}}}}}
    ```
