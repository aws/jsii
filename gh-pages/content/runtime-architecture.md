# Runtime Architecture
## Generated Libraries

When using `jsii-pacmak` to generate libraries in different programming
languages, the **Javascript** code is bundled within the generated library, so
that it can be used during at runtime. This is the reason why a `node` runtime
needs to be available in order to execute code that depends on *jsii* libraries.

The generated libraries have a dependency on a *Runtime client* library for the
language, which contains the necessary logic to start a child `node` process
with the `jsii-runtime`. The `jsii-runtime` manages JSON-based inter-process
communication over its `STDIN` and `STDOUT`, and manages a `@jsii/kernel`
instance that acts as a container for the **Javascript** code that backs the
*jsii* libraries.

## Architecture Overview

A simplified representation of the execution environment of an application using
*jsii* libraries from a different language follows:

```
┌────────────────────────┐             ┌────────────┬────┬────┬───┐
│                        │             │            │    │    │   │
│   User's Application   │             │@jsii/kernel│LibA│LibB│...│
│                        │             │            │    │    │   │
│     ┌──────────────────┤             ├────────────┴────┴────┴───┤
│     │                  │             │                          │
│     │Generated Bindings│             │      @jsii/runtime       │
│     │                  │             │                          │
│     ├──────────────────┤             ├────────┬─────────────────┤
│     │                  ├────────────▶│ STDIN  │                 │
│     │Host jsii Runtime │    JSON     ├────────┤                 │
│     │                  │◀────────────┤ STDOUT │   node          │
├─────┴──────────────────┤             ├────────┘                 │
│                        │             │     (Child Process)      │
│    JVM / .NET / ...    │             │                          │
│                        │             │                          │
├────────────────────────┴─────────────┴──────────────────────────┤
│                                                                 │
│                        Operating System                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The initialization workflow can be described as:

1. The *host* (**Java**, **.NET**, ...) application starts on its own runtime
    (JVM, .NET Runtime, ...)
2. When the *host* code encounters a *jsii* entity for the first time (creating
    an instance of a *jsii* type, loading a static constant, ...), the *runtime
    client library* creates a child `node` process, and loads the `jsii-runtime`
    library (specified by the `JSII_RUNTIME` environment variable, or the
    version that is bundled in the *runtime client library*)
3. The *runtime client library*  interacts with the child `node` process by
    exchanging JSON-encoded messages through the `node` process' *STDIN* and
    *STDOUT*
4. The *runtime client library* automatically loads the **Javascript** modules
    bundled within the *generated bindings* (and their depedencies, bundled in
    other *generated bindings*) into the `node` process when needed.
5. Calls into the *Generated bindings* are encoded into JSON requests and sent
    to the child `node` process, which will execute the corresponding
    **Javascript** code, then responds back.
6. Upon exiting, the *host* process closes the communication channels with the
    child `node` process, causing it to exit.
