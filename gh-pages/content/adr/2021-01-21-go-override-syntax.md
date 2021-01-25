# Go Overrides Syntax

* Status: proposed
* Deciders: @RomainMuller, @MrArnoldPalmer, @eladb, @iliapolo
* Date: 2021-01-21

Technical Story: #2048

## Context and Problem Statement

**Go** is not an object-oriented programming language in the classical sense. It
does not have classes, and consequently does not support inheritance. This poses
an interesting challenge with respects to handling [callbacks and overrides].

Generated bindings for **go** must allow developers to leverage classical object
oriented inheritance semantics (including anonymously implementing interfaces),
and have the overridden and implemented members correctly registered with the
*jsii kernel*.

!!! note
    In the context of @aws/aws-cdk usage (more so in the `v2` release line),
    abstract base classes are not exposed, and users are generally not expected
    to sub-class types and override members.

    Constructor overriding is not necessary in **go**, as the embedding model
    naturally provides the same functionality.

    This means that, while this document describes the dynamic dispatch approach
    in detail, this is expected to be a marginal use-case for our most prominent
    dependent at the moment. Creating anonymous objects that implement one or
    more interfaces is going the be the vast majority of the usage.

For example, we are looking to support the following **TypeScript** structure in
the **go** bindings:

```ts
export abstract class GreeterBase {
  public greet(): string {
    return `Hello, ${this.greetee}!`;
  }

  protected abstract get greetee(): string;
}

/**
 * The `DefaultGreeter` provides an implementation for the `greetee` property.
 */
export class DefaultGreeter extends GreeterBase {
  readonly #greetee: string;

  public constructor(greetee: string) {
    super();
    this.#greetee = greetee;
  }

  protected get greetee() {
    return this.#greetee;
  }
}

/**
 * The `ExcitedGreeter` is very excited.
 */
export class ExcitedGreeter extends DefaultGreeter {
  /** Add sparkles to the greetee, because WE'RE SO EXCITED! */
  protected get greetee(): string {
    return `✨${super.greetee}✨`
  }

  /** OMG such excitement! */
  public greet(): string {
    return `OMG ${super.greet()}!!!11!1!!!`;
  }
}
```

[callbacks and overrides]: ../user-guides/language-support/callbacks.md

## Decision Drivers

* Overridden methods must be able to delegate to the original implementation
  (what traditional object-oriented languages refer as `super`)
* Boilerplate code should be avoided as much as possible
* Existing idioms should be leveraged where possible (developers need to feel
  "at home")
* Performance overhead of the dynamic dispatch should be minimal

## Considered Options

* [Dynamic dispatch using embdedded interfaces][option-1]

[option-1]: #dynamic-dispatch-using-embdedded-interfaces

## Decision Outcome

Chosen option: ["Dynamic dispatch using embdedded interfaces"][option-1],
because it is the only option.

## Pros and Cons of the Options

### Dynamic dispatch using embdedded interfaces

#### Userland mechanism

Any **go** `struct` generated for a *jsii class* is paired with a generated
**go** `interface`. If the root `struct` anonymously embeds the `interface`
value, then descendents need to embed their parent type, and replace the
embedded `interface` value with themselves, allowing calls to always be routed
to the dynamic type of the object.

This implies the using code (all method implementations, including overrides)
must expressedly allow the dynamic dispatch to happen by prefixing method names
with the interface name (`greeter.GetGreetee()` becomes
`greeter.IGreeterBase.GetGreetee()`).

In order to delegate to `super` implementations can simply direct the call
directly to the embedded parent type, and the dispatch will happen as necessary.

??? example
    ```go
    package main

    import "fmt"

    ////////////////////
    // GreeterBase    //
    ////////////////////

    type GreeterBase struct {
      IGreeterBase
    }

    type IGreeterBase interface {
      GetGreetee() string
      Greet() string // Has default implementation
    }

    func NewGreeterBase() *GreeterBase {
      return &GreeterBase{}
    }

    func (g *GreeterBase) Greet() string {
      // IMPORTANT: Proxy through `IGreeterBase` for dynamic dispatch
      return fmt.Sprintf("Hello, %s!", g.IGreeterBase.GetGreetee())
    }

    // Optional (could help provide better error messaging)
    func (g *GreeterBase) GetGreetee() string {
      panic("(*GreeterBase).GetGreetee is abstract and was not implemented!")
    }

    ////////////////////
    // DefaultGreeter //
    ////////////////////

    type DefaultGreeter struct {
      *GreeterBase
      greetee string
    }

    func NewDefaultGreeter(greetee string) *DefaultGreeter {
      result := DefaultGreeter{
        GreeterBase: NewGreeterBase(),
        greetee:     greetee,
      }
      result.IGreeterBase = &result
      return &result
    }

    func (g *DefaultGreeter) GetGreetee() string {
      return g.greetee
    }

    ////////////////////
    // ExcitedGreeter //
    ////////////////////

    type ExcitedGreeter struct {
      *DefaultGreeter
    }

    func NewExcitedGreeter(greetee string) *ExcitedGreeter {
      result := ExcitedGreeter{NewDefaultGreeter(greetee)}
      result.IGreeterBase = &result
      return &result
    }

    func (g *ExcitedGreeter) GetGreetee() string {
      return fmt.Sprintf("✨%s✨", g.DefaultGreeter.GetGreetee())
    }

    func (g *ExcitedGreeter) Greet() string {
      return fmt.Sprintf("OMG %s!!!11!1!!!", g.DefaultGreeter.Greet())
    }

    ////////////////////
    // main           //
    ////////////////////
    func main() {
      boring := NewDefaultGreeter("Sarah Connors")
      excited := NewExcitedGreeter("Sarah Connors")

      fmt.Println(boring.Greet())  // #=> Hello, Sarah Connors!
      fmt.Println(excited.Greet()) // #=> OMG Hello, ✨Sarah Connors✨!!!!11!1!!!
    }
    ```

#### Kernel integration

The *jsii runtime for go* must correctly register those overrides when creating
the instance in the *jsii kernel*, and subsequently be able to invoke the
correct *go* functions upon receiving a `callback` request.

In order to allow subclasses to invoke their parent type's constructor without
causing the `create` call to be prematurely sent over to the *jsii kernel*, a
separate constructor function will need to be provided. This constructor will
be similar to the "usual" one, except it will add the necessary `overrides`
declarations to the `create` request parameters. It could also be responsible
for setting the embedded interface value that enables dynamic dispatch.

!!! example
    ```go
    // Pretend for a moment this is NOT an abstract class, and hence it can be
    // constructed without being overridden... Then we would have a constructor
    // somewhat like:
    func NewGreeterBase() *GreeterBase {
      o := &GreeterBase{}
      jsii.Create(
        "test.GreeterBase",
        []interface{}, // None
        []FQN{},       // None
        []Override{},  // None
        o,
      )
      return o
    }

    // NewGreeterBase_Override initializes the embedded value for `GreeterBase`
    // and registers all overrides declared by the dynamic type of `i`. The
    // resulting instance should be assigned to an anonymously embedded pointer
    // of `GreeterBase`.
    func NewGreeterBase_Override(i IGreeterBase) *GreeterBase {
      o := &GreeterBase{}
      o.IGreeterBase = i
      jsii.Create(
        "test.GreeterBase",
        []interface{}, // None
        []FQN{},       // None
        determineOverrides(i),
        i,
      )
      return o
    }
    ```

As the **go** `reflect` library offers no facility to determine whether a method
was promoted from an embedded type, or declared on the current type, the
override detection cannot happen implicitly - the user is responsible to tag the
embedded super-type with overrides.

The proposed mechanism is to tag the embedded field with the `overrides` key,
and a comma-delimited list of overridden methods as the value.

??? example
    ```go
    type DefaultGreeter struct {
      *GreeterBase `overrides:"GetGreetee"`
      greetee      string
    }

    type ExcitedGreeter struct {
      *DefaultGreeter `overrides:"GetGreetee,Greet"`
    }
    ```

#### Anonymouns Interface Implementations

When the *jsii runtime library* attempts to pass an instance from **go** to the
*jsii kernel*, it will leverage the `reflection` library to determine if the
underlying `struct` transitively embeds (anonymously) a *jsii type*. If it does
not, then an anonymous object instance will instead be created, configured with
the proper interface implementation declaration (as dictated by the static type
of the parameter or return type the value was obtained through).

A table of function pointers will be externally maintained to allow *callback
requests* to be routed to the correct implementation.

This mechanism does not differ from those found in other languages' *runtime
libraries*. Consequently, the implementation of it should be rather straight
forward.

#### Summary

* Good, because it allows dynamic dispatch and overrides to delegate to `super`.
* Good, because it gives the developers control over when dynamic dispatch is
  performed, which can be a desirable feature (although this is a fairly
  uncommon use-case).
* Bad, because it is easy to forget allowing dynamic dispatch on a call (by
  "qualifying" the call with the base `interface` name).
* Bad, because it introduces some new boilerplate.
* Bad, because it couples child classes to the root interface name (i.e: if a
  new abstract base class is inserted as the parent of the root abstract base
  class, all descendant code must be updated).

## Links

* [Golang Interfaces: Optional Functions](https://etapau.medium.com/golang-interface-optional-functions-e35fb7ff7433)
* @github:maverickwoo/go-vtable-demo
