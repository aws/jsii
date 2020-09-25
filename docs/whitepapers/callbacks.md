---
last_revision: 2020-10-14T10:25:00Z
---

# Callbacks and Overrides

This document provides a high-level overview of the mechanisms used by _jsii_ to allow _foreign_ code to override
**JavaScript** methods. It details the responsibilities of the _jsii kernel_ and of the _foreign library_, and provides
implementation guidelines.

## Identifying Overrides

The _jsii kernel_ allows _foreign_ code to register overrides for the following use-cases:

- Overriding a class' non-static member
- Implementing an abstract member (including interface members)

> :bulb: It is possible for _foreign_ code to override a class' constructor, but those cannot be registered in the _jsii
> kernel_ as it cannot trigger instantiation of a _foreign_ class directly. _Foreign_ constructors always delegate to
> the **JavaScript** constructor, which is happens via the [`create`][kernel.create] operation, during which overrides
> are registered.

All cases where _foreign_ code should be executed in lieu of **JavaScript** code must be identified and declared
properly, as the _jsii kernel_ otherwise has no way to determine a _foreign_ implementation exists.

Where possible, the _jsii runtime library_ for the _foreign_ language will use reflection APIs to transparently discover
which API elements are overridden or implemented. In cases where reflection is expensive, the _jsii runtime library_
will try to cache findings as appropriate in order to avoid duplication of this effort.

In case the _foreign_ language does not have direct support for overriding (e.g: **Go**), or lacks the necessary
reflection tools to allow automatic identification of overrides, the _jsii runtime library_ may expose APIs allowing
users to register implementation overrides manually.

## Declaring Overrides

The foreign library is responsible for declaring overrides to the _jsii kernel_. Those are declared for every object
instance using the [`overrides`][kernel.create.overrides] property of the [`kernel.create` request][kernel.create]. Each
entry in the [`overrides`][kernel.create.overrides] list declares an overriden property or method.

Each override declaration may optionally include a `cookie`: this string will not be interpreted by the _jsii kernel_ in
any way, and will simply be passed back passed back with any request to invoke the overridden member's foreign
implementation.

> :bulb: It is possible to register overrides to members that do not formally exist on a type. Since the _jsii kernel_
> has no type information available for those, it will handle them as follows:
>
> - Method overrides are assumed to have the following signature:
>   ```ts
>   overridden(...args: any[]): any
>   ```
> - Property overrides are assumed to be `any`-valued and mutable
>
> :warning: This should generally be avoided as it can result in incoherent data serialization happening when the _jsii
> kernel_ receives and returns values.

[kernel.create]: ../specifications/3-kernel-api.md#creating-objects
[kernel.create.overrides]: ../specifications/3-kernel-api.md#overrides

## Invoking Overrides

Once object instances have been created in the _jsii kernel_ with overrides, execution of **JavaScript** code may
require executing _foreign_ code. The _jsii kernel_ signals this to the _jsii runtime library_ by responding with a
[`callback` request][kernel.callback] instead of the typical response type for the original request (i.e:
`InvokeResponse`, `GetResponse` or `SetResponse`). Several such [callbacks][kernel.callback] may be necessary in order
to complete the original request. When the original request is finally able to complete, its response is returned.

The _jsii runtime library_ must respond to each [`callback` request][kernel.callback] with a `complete` response,
allowing the _jsii kernel_ to resume fulfilling the original request. In order to do this, the _jsii runtime library_
obtains the _foreign_ object corresponding to the [`callback` request][kernel.callback]'s receiver, then invokes the
corresponding implementation (for example, using reflection).

When needed, the _original_ **JavaScript** implementation can be delegated to (many languages refer to this as
`super(...)` or some similar idiom).

[kernel.callback]: ../specifications/3-kernel-api.md#a-note-about-callbacks

### Example

Assuming we have the following **TypeScript** types defined:

```ts
export abstract class FooClass {
  protected abstract baz: string;

  public bar(): string {
    return this.reverse() ? Array.from(this.baz).reverse().join('') : this.baz;
  }

  protected reverse(): boolean {
    return false;
  }
}
```

And we have the following _Foreign_ application (assuming **Java**):

```java
public final class Main extends FooClass {
  public static final void main(final String[] args) {
    final FooClass self = new Main();
    System.out.println(self.bar());
  }

  @Override
  public String getBaz() {
    return "baz";
  }

  @Override
  public boolean reverse() {
    return true;
  }
}
```

The schematized exchange between the _jsii runtime library_ and the _jsii kernem_ is the following:

<!-- Original in `callbacks.monopic`, authored using Monodraw  (https://monodraw.helftone.com) -->

```
┏━━━━━━━━━━━┓                                                  ┏━━━━━━━━━━━━━━━┓
┃  Kernel   ┃                                                  ┃Runtime Library┃
┗━━━━━┳━━━━━┛                                                  ┗━━━━━━━┳━━━━━━━┛
      ┃  ┌──────────────────────────────────────────────────────────┐  ┃
      ┃◀─┤  Create(FQN: "FooClass", Overrides=["baz", "reverse"])   ├──┃
      ┃  └──────────────────────────────────────────────────────────┘  ┃
      ┃  ┌──────────────────────────────────────────────────────────┐  ┃
      ┃──┤                     OK(ObjID: "Foo")                     ├─▶┃
      ┃  └──────────────────────────────────────────────────────────┘  ┃
      ┃  ┌──────────────────────────────────────────────────────────┐  ┃
      ┃◀─┤        InvokeRequest(ObjID: "Foo", Method: "bar")        ├──┃
      ┃  └──────────────────────────────────────────────────────────┘  ┃
      ┃  ┌──────────────────────────────────────────────────────────┐  ┃
      ┃──┤ CallbackRequest(ID: 1, ObjID: "Foo", Invoke: "reverse")  ├─▶┃────┐
      ┃  └──────────────────────────────────────────────────────────┘  ┃    │call
      ┃  ┌──────────────────────────────────────────────────────────┐  ┃    │obj("Foo").reverse()
      ┃◀─┤            Complete(CallbackID: 1, OK: true)             ├──┃◀───┘
      ┃  └──────────────────────────────────────────────────────────┘  ┃
      ┃  ┌──────────────────────────────────────────────────────────┐  ┃
      ┃──┤     CallbackRequest(ID: 2, ObjID: "Foo", Get: "baz")     ├─▶┃────┐
      ┃  └──────────────────────────────────────────────────────────┘  ┃    │get
      ┃  ┌──────────────────────────────────────────────────────────┐  ┃    │obj("Foo").baz
      ┃◀─┤            Complete(CallbackID: 2, OK: "baz")            ├──┃◀───┘
      ┃  └──────────────────────────────────────────────────────────┘  ┃
      ┃  ┌──────────────────────────────────────────────────────────┐  ┃
      ┃──┤                InvokeResponse(OK: "zab")                 ├─▶┃
      ┃  └──────────────────────────────────────────────────────────┘  ┃
      ┃                                                                ┃
```

## See Also

- [The _jsii_ runtime architecture](../runtime-architecture.md)
- [The _jsii_ kernel API](../specifications/3-kernel-api.md)
