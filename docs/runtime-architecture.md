# Runtime Architecture
## Generated Libraries

When using `jsii-pacmak` to generate libraries in different programming
languages, the **Javascript** code is bundled within the generated library, so
that it can be used during at runtime. This is the reason why a `node` runtime
needs to be available in order to execute code that depends on *jsii* libraries.

The generated libraries have a dependency on a *Runtime* library for the
language, which contains the necessary logic to start a sidekick `node` process,
load the `jsii-kernel` and then interact with it.

## Architecture Overview

A simplified representation of the execution environment of an application using
*jsii* libraries from a different language follows:

```
┌────────────────────────┐             ┌───────────┬────┬────┬───┐
│                        │             │           │    │    │   │
│   User's Application   │             │jsii-kernel│LibA│LibB│...│
│                        │             │           │    │    │   │
│     ┌──────────────────┤             ├───────────┴────┴────┴───┤
│     │                  │             │                         │
│     │Generated Bindings│             │      jsii-runtime       │
│     │                  │             │                         │
│     ├──────────────────┤             ├───────┬─────────────────┤
│     │                  ├────────────▶│ SDTIN │                 │
│     │Host jsii Runtime │    JSON     ├───────┤                 │
│     │                  │◀────────────┤STDOUT │  node           │
├─────┴──────────────────┤             ├───────┘                 │
│                        │             │     (Child Process)     │
│    JVM / .NET / ...    │             │                         │
│                        │             │                         │
├────────────────────────┴─────────────┴─────────────────────────┤
│                                                                │
│                        Operating System                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

The initialization workflow can be described as:
1. The *host* (**Java**, **.NET**, ...) application starts on its own runtime
    (JVM, .NET Runtime, ...)
2. When the *host* code encounters a *jsii* entity for the first time (creating
    an instance of a *jsii* type, loading a static constant, ...), the *host
    Runtime library* creates a child `node` process, and loads the
    `jsii-runtime` library (specified by the `JSII_RUNTIME` environment
    variable, or the version that is bundled in the *host Runtime library*)
3. The *host Runtime library*  interacts with the child `node` process by
    exchanging JSON-encoded messages through the `node` process' *STDIN* and
    *STDOUT*
4. Calls into the *Generated bindings* are encoded into JSON requests and sent
    to the child `node` process, which will execute the corresponding
    **Javascript** code, then responds back.
5. Upon exiting, the *host* process closes the communication channels with the
    child `node` process, causing it to exit.
