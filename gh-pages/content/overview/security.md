# Security

jsii lets an application written in Python, Java, C#, or Go use a library written in TypeScript. This page describes
what jsii protects against and what it relies on you for, so you can decide how to use it safely. It applies to
`jsii-pacmak` and the jsii runtime libraries, which include the jsii kernel.

## Reporting a vulnerability

If you think you have found a security issue in jsii, report it through the
[AWS vulnerability reporting page](https://aws.amazon.com/security/vulnerability-reporting/) or by emailing
[aws-security@amazon.com](mailto:aws-security@amazon.com). Do **not** create a public GitHub issue.

The security model below describes what jsii treats as trusted. Including in your report which of these
assumptions the issue affects helps us assess it quickly.

## How jsii runs

The package for each language bundles the library's JavaScript code. When your application first uses the library, the
jsii runtime library for your language starts a child `node` process that runs the jsii kernel. The two exchange JSON
messages through the child process's standard input and output. The kernel loads the bundled JavaScript and runs it on
behalf of your application. See [Runtime Architecture] for details.

[runtime architecture]: ./runtime-architecture.md

## Shared responsibility

jsii is a library integration, not a service. It runs inside your application, as your application's user, and does
nothing your application could not do itself. Its security therefore depends on the environment you run it in.

### Values are passed as data

*(jsii's responsibility)* jsii passes the values your application gives a library through as data. It never runs them
as code, and never uses them to decide which code to run or which object to use. Each value reaches the library as the
type it was declared as. For example, a string your application passes to a method that accepts a `string` arrives as
that string, whatever its content, and cannot change how jsii behaves.

jsii does not check whether a value is safe to use. That depends on what the library does with it.

### Validating untrusted input

*(Your responsibility)* jsii runs the library's JavaScript code as it is, with the values it is given. If your
application passes input that comes from outside your application, such as configuration files, environment
variables, user input or responses from remote APIs, validate that input before you pass it on, as you would for any
other library.

### Files are private to the current user

*(jsii's responsibility)* jsii writes the bundled JavaScript of each library to disk before loading it. The jsii kernel
extracts libraries into a directory only the current user can access, and keeps the [package cache] in a per-user
directory by default. Other users on the same machine, for example on a shared build host, cannot change the code your
application loads.

Settings that weaken this, such as pointing the package cache at a shared directory, are documented as such.

[package cache]: ../user-guides/lib-user/package-cache.md

### No network exposure

*(jsii's responsibility)* jsii does not listen on a network port, socket or named pipe. The channel between your
application and the jsii kernel is a private pipe between two processes that run as the same user.

### Execution in a trusted environment

*(Your responsibility)* jsii is designed to run in a *trusted environment* with *trusted libraries*.

- **The libraries you use are trusted code.** jsii runs whatever JavaScript code is bundled in a jsii library, with the
  same access as your application. It does not sandbox or check that code. A jsii library is a dependency like any other
  package you install with pip, Maven, NuGet or Go, so only use libraries from sources you trust.
- **Your application's environment is trusted.** Several environment variables change which programs jsii starts and
  how, see [Configuration] and [Package Cache][package cache]. Anyone who can set your application's environment
  already controls your application. Only set these variables from sources you trust.
- **Your application's code is trusted.** All parts of jsii run as one user, in one process tree. jsii does not protect
  one part of your application from another, and does not isolate libraries from each other.

Do not use jsii where someone you do not trust provides the libraries your application loads, or controls its
environment.

[configuration]: ../user-guides/lib-user/configuration.md

### Generating packages

*(Your responsibility)* `jsii-pacmak` generates source code and build files from a jsii module, then builds them with the
compilers and package managers of each language, such as `pip`, `mvn`, `dotnet` and `go`. These tools download the
module's dependencies and may run their build steps. Only run `jsii-pacmak` on modules you trust, as you would only
build code you trust.

### Libraries handle their inputs

*(Library authors' responsibility)* If you author a jsii library, the values your library receives from an application
may come from anywhere. jsii makes sure they arrive with the declared type, but not that they are safe to use. Validate
them as you would in any other library, for example before building a shell command or a file path from them.

## Not in scope

jsii does not provide the following protections.

- **Sandboxing library code.** jsii does not restrict what the JavaScript of a loaded library can do.
- **Isolating libraries from each other.** All loaded libraries share one jsii kernel and one JavaScript environment.
- **Handling invalid kernel messages.** The kernel only receives messages from the jsii runtime library that started
  it, and trusts them. Invalid messages are rejected where possible, but if one makes the kernel crash or hang, that is
  a bug and not a vulnerability.
- **Exposing the kernel to other programs.** Never connect the kernel's message channel to a network, or to any program
  other than the jsii runtime library that started it. Whoever can send messages to the kernel can make it load and run
  any code.
