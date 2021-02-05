# Go Optional Values

* Status: proposed
* Deciders: @MrArnoldPalmer, @RomainMuller, @eladb, @iliapolo
* Date: 2021-02-01

Technical Story: [#2442](https://github.com/aws/jsii/issues/2442)

## Context and Problem Statement

**Go** doesn't have 'nullable' types. This presents an issue when transpiling various typescript types to Go. Particularly, this is an issue for methods with optional arguments.

For example:

```typescript
// A JSII struct with two optional readonly properties.

export interface OptionalPropertyProps {
  readonly optionalString?: string;
}

export class MyClass implements OptionalProperty {
  public readonly optionalString?: string;
  
  // constructor function has an optional argument
  public constructor(props: OptionalPropertyProps) {
    this.optionalString = props.optionalString;
  }
}
```

This allows construction like so:
```typescript
const hasString = new MyClass({ optionalString: "I have a string!" });
const notSoMuch = new MyClass({});

console.log(hasString); // =>"I have a string"!
console.log(notSoMuch); // =>undefined
```

Currently, the equivalent code generated Go looks like this:
```go
type OptionlPropertyProps struct {
  OptionalString string
}

type OptionalProperty interface {
  OptionalString() string
}

// A constructor function that mirrors the TS class constructor
func NewOptionalProperty(s OptionalPropertyProps) IOptionalProperty {
  // pass args to jsii runtime and return implementation of IOptionalProperty
}
```

This obviously doesn't indicate that the `OptionalString` property is optional, either on the struct or as the return value of the `OptionalValue()` interface method. Go allows the user to not specify struct field values on construction, but this doesn't result in those values being undefined, but `zero value` instead. For example:

```go
myProps := OptionalPropertyProps{} // leaving out the "optional" value
fmt.Println(myProps.OptionalString) // => ""

// The value of the `OptionalPropertyProps` when serialized and passed to the
// runtime as json is {"optionalString": ""}.
myClass := NewOptionalProperty(myProps)

fmt.Println(MyClass.OptionalString()); // => ""
```

This issue occurs on all nullable types. The notable places this occurs are, class/interface/struct fields and methods with optional arguments.
