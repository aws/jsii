# Go

!!! danger
    The **go** target is currently unstable and not suitable for production use.

**Go** is not a common object-oriented language: the language currently only
supports composition, not extension. On the other hand, the
[*jsii type system*][type-system] includes *classes* and *interfaces*, which are
typically associated with extension-based programming models.

In rare circumstances, **Go** developers may find themselves in a situation
where they must implement an *abstract base class*, extend some *class* in order
to *override* a method or property, or implement a *jsii interface*.

[type-system]: ../../../specification/2-type-system.md

## Implementing *jsii interfaces*

Implementing *jsii interfaces* leverages the idiomatic **go** way to implement
interfaces: define all the necessary methods on the implementing **go** struct,
and the value can be used naturally.

There is a single restriction: all such implementation methods must be defined
using a *pointer receiver*, or a runtime error may occur:

Assuming you are consuming a *jsii* module that defines the following:

```go
package jsiimodule

import (
  "fmt"
)

type IGreeter interface {
  Greet(greetee string)
}

// ...
func NewMajestyGreeter(greeter IGreeter) MajestyGreeter {
  // Omitted for brevity
}

// Does something with the IGreeter that was provided at construction time
func (m MajestyGreeter) Announce(who string) {
  m.greeter.Greet(fmt.Sprintf("Your Royal Highness %s", who))
}
```

You can implement this interface natively in go as:

```go
package main

import (
  "fmt"

  "example/jsiimodule"
)

type greeter struct {
  _ byte // padding
}

// IMPORTANT - this function has a pointer receiver!
func (g *greeter) Greet(greetee string) {
  fmt.Printf("Hello, %s!\n", greetee)
}

func main() {
  g := &greeter{}

  // Simply pass the instance though, it "just works".
  mg := jsiimodule.NewMajestyGreeter(g)

  mg.Announce("Elizabeth II")
}
```

## Extending and overriding *classes*

!!! important
    Leveraging extension and override goes against the design principles of the
    **go** programming language. We advise you avoid using this mechanism unless
    you have determined that there is no way to achieve the desired result with
    composition.

    In particular, if the only element you need to override on a *class* is it's
    *constructor*, you should simply *decorate* this constructor instead of
    using the extension and overrides mechanism. For example you can declare an
    AWS CDK construct (that does not declare new properties or methods) in the
    following way:

    ```go
    package cdkapp

    import (
      "github.com/aws/aws-cdk-go"
      "github.com/aws/aws-cdk-go/aws-s3"
    )

    // Optional: alias the type for clarity
    type CustomBucket s3.Bucket

    // Imagine this builds an S3 bucket with "special" defaults. It does not
    // accept s3.BucketProps, instead those are hard-coded in the constructor
    // itself. It could also accept a different properties object, to allow for
    // user settings?
    func NewCustomBucket(scope core.Construct, id string) CustomBucket {
      return s3.NewBucket(scope, id, s3.BucketProps{
        // ... customized properties
      })
    }
    ```

*Classes* that are open for *extension* (including *abstract base classes*) have
a special *overriding* constructor that can be used when building sub-classes.
This *override* constructor is expected to be called from within the child
*class* constructor that you are writing. This constructor is named using the
following convention: `New<ClassName>_Override`, and receives the *overriding*
struct instance as the first parameter.

The **go** `struct` that *extends* the base *jsii class* must anonymously embed
the *jsii class*' **go** interface. All overridden method *must* be defined
using a pointer receiver.

Assuming the following abstract base class:

```go
package jsiimodule

type AbstractBaseClass interface {
  // Those members have implementations provided, you *may* override them
  ConcreteMethod() bool
  ConcreteProperty() string
  SetConcreteProperty(v string)


  // Those members do not have implementations, you *must* implement them
  AbstractMethod() string
  AbstractReadonlyProperty() float64
}

// NewAbstractBaseClass_Override initializes an overridden AbstractBaseClass
// instance. The inst parameter receives the go struct that declares the
// overrides, while the someString and someNumber are parameters to the abstract
// base class' constructor.
func NewAbstractBaseClass_Override(inst AbstractBaseClass, someString string, someNumber float64) {
  // Omitted for brevity
}
```

You can implement that abstract base class in go in the following way:

```go
package main

import (
  "fmt"
  "strings"

  "example/jsiimodule"
)

type childClass struct {
  // Anonymous embed of the "base class".
  jsiimodule.AbstractBaseClass

  // Our own storage
  stringValue string
}

// Provide your own constructor, which delegates to the base class' overriding
// constructor.
func NewChildClass(stringValue string, someString string, someNumber float64) jsiimodule.AbstractBaseClass {
  c := &childClass{stringValue: stringValue}

  // This will take care of setting childClass.AbstractBaseClass!
  jsiimodule.NewAbstractBaseClass_Override(c, someString, someNumber)

  return c
}

// Then implement the necessary members
func (c *childClass) AbstractMethod() string {
  fmt.Println("childClass.AbstractMethod invoked!")
  return c.stringValue
}

func (c *childClass) AbstractReadonlyProperty() float64 {
  fmt.Println("childClass.ConcreteProperty read!")
  return 1337
}

// And overrides those we decided to replace
func (c *childClass) SetConcreteProperty(v string) {
  // We'll just up-case before delegating to the "super" implementation.
  c.AbstractBaseClass.SetConcreteProperty(strings.ToUpper(v))
}
```

## Unchecked conversions using `UnsafeCast`

Developers may occasionally need to down-cast a value in order to leverage some
other interface it implements. This happens in cases where the runtime is unable
to determine the complete dynamic type of a value returned by a function, which
happens for example when the TypeScript version of that function returns `any`,
`unknown`, or a union of several types (which cannot be represented in go).

In such cases, traditional go type assertions may not always produce the
expected result. Instead, the library that exposes these functions should also
expose type-checking utilities (e.g: `Stack.isStack(thing: any): boolean`) that
developers can use to guard an unchecked conversion, which in Go is performed
using `UnsafeCast`.

The `UnsafeCast` function expects two arguments the original value, and a
pointer to a variable of the desired interface type.

!!! warning
    The `UnsafeCast` function may **panic** if:

    - the provided original value was not obtained through a function exported
      from a jsii package.
    - the provided pointer is not to a value typed as an interface exported from
      a jsii package.

    If the original value does, in fact, not implement the target interface
    type, undefined behavior will occur as a result of using functions of that
    interface.

An example use of the `UnsafeCast` feature is when using [AWS CDK escape hatches]:

```go hl_lines="15-20"
package main

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awssns"
	"github.com/aws/jsii-runtime-go"
)

func main() {
	app := awscdk.NewApp(nil)
	stack := awscdk.NewStack(app, jsii.String("TestStack"), nil)

	topic := awssns.NewTopic(stack, jsii.String("MyTopic"), nil)

	// We know that topic.Node().DefaultChild() is a awssns.CfnTopic
	var cfn_topic awssns.CfnTopic
	// We perform the conversion into cfn_topic
	jsii.UnsafeCast(topic.Node().DefaultChild(), &cfn_topic)
	// Then we use the conversion result
	cfn_topic.SetDisplayName(jsii.String("Overridden Display Name"))

	app.Synth(nil)
}
```

[AWS CDK escape hatches]: https://docs.aws.amazon.com/cdk/v2/guide/cfn_layer.html
