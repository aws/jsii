# Introduction

`jsii` allows code in any language to naturally interact with **JavaScript** classes. It is the technology that enables
the [AWS Cloud Development Kit][cdk] to deliver polyglot libraries from a single codebase!

[cdk]: https://github.com/aws/aws-cdk

A class library written in **TypeScript** can be used in projects authored in **TypeScript** or **Javascript** (as
usual), but also in **Python**, **Java**, **C#** (and other languages from the _.NET_ family), ...

!!! warning
    Due to *JSON* marshaling costs and the absence of a distributed garbage collector feature, `jsii` modules are best
    suited for development and build tools, as opposed to performance-sensitive or resource-constrained applications.

    See [Runtime Architecture] for more information.

    [runtime architecture]: runtime-architecture.md

## An example is worth a thousand words

Consider the following **TypeScript** class:

```ts
/**
 * A siple greeter, hello world style.
 */
export class Greeter {
  /**
   * Greets the designated person.
   *
   * @param name the person to greet.
   *
   * @returns a greeting.
   */
  public greet(name: string) {
    return `Hello, ${name}!`;
  }
}
```

By compiling our source module using `jsii`, we can now package it as modules in one of the supported target languages.
Each target module has the exact same API as the source. This allows users of that target language to use `HelloJsii`
like any other class:

=== "C#"

    ```csharp
    var greeter = new Greeter();
    greeter.Greet("World"); // => Hello, World!
    ```

=== "Go"

    ```go
    greeter := NewGreeter()
    greeter.Greet("World") // => Hello, World!
    ```

=== "Java"

    ```java
    final Greeter greeter = new Greeter();
    greeter.greet("World"); // => Hello, World!
    ```

=== "JavaScript"

    ```java
    const greeter = new Greeter();
    greeter.greet("World"); // => Hello, World!
    ```

=== "Python"

    ```python
    greeter = Greeter()
    greeter.greet("World"); # => Hello, World!
    ```
