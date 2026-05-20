# jsii Architecture Reference (Mind Map Source)

> This document is a comprehensive reference for how jsii works, sourced directly from the
> [aws/jsii](https://github.com/aws/jsii) repository's specification, documentation, and source code.

---

## 1. What is jsii?

jsii enables code written in **TypeScript** to be consumed naturally in other programming languages. It is the
technology that powers the AWS CDK's polyglot library delivery from a single TypeScript codebase.

**Supported target languages (GA):** TypeScript/JavaScript, Python, Java, C# (.NET), Go

**Key constraint:** Due to JSON marshaling costs and the absence of a distributed garbage collector, jsii modules are
best suited for **development and build tools** (like CDK), not performance-sensitive or resource-constrained
applications.

---

## 2. Design Tenets

1. APIs feel **idiomatic** in all supported languages
2. Applications behave **identically** regardless of language — correctness over performance
3. Does **not** attempt to support all TypeScript idioms (unsupported idioms produce compile-time errors)
4. Does **not** force API design opinions — reserved names are minimal
5. Produces artifacts compatible with **idiomatic tools** (standard package managers, no special config)

---

## 3. Core Concepts

### 3.1 The jsii Assembly (`.jsii` file)

The assembly is a JSON document containing the **API signatures** of a TypeScript module — analogous to a C++ header
file. It contains:

- Type names (classes, interfaces, enums)
- Method and property signatures
- Documentation elements
- Submodule structure
- Dependency information
- Target language configuration (naming, packaging)

The assembly does **not** contain implementation — the npm package's JavaScript remains the source of truth for that.

**Key interfaces in the assembly schema** (`@jsii/spec`):

| Interface | Purpose |
|-----------|---------|
| `Assembly` | Top-level: name, version, types, submodules, dependencies, targets |
| `ClassType` | Class definition: base, interfaces, methods, properties, abstract, initializer |
| `InterfaceType` | Behavioral interface or struct definition |
| `EnumType` | Enum with members |
| `Method` | Method signature: parameters, returns, static, async, abstract |
| `Property` | Property: type, optional, immutable, static, abstract |
| `Parameter` | Method parameter: name, type, optional, variadic |

**Schema version:** Tracked via `SchemaVersion` enum in `@jsii/spec`

### 3.2 Host & Kernel (Two-Process Architecture)

jsii operates with **two processes**:

1. **Host process** — runs user code in the native runtime (JVM, .NET CLR, CPython, Go runtime)
2. **Kernel process** — a child `node` process running the actual JavaScript implementation

Communication is via **JSON-encoded messages** over STDIN/STDOUT pipes.

### 3.3 The jsii Type System

Maps TypeScript types to a cross-language type model:

| jsii Type | TypeScript Source | Notes |
|-----------|------------------|-------|
| Boolean | `boolean` | Primitive |
| Number | `number` | All floating point |
| String | `string` | UTF-8 |
| List | `Array<T>`, `T[]` | Passed by-value (copied across boundary) |
| Map | `{ [key: string]: T }` | Passed by-value |
| Enum | `enum` | Cannot be downcast to value type |
| Any | `any`, `unknown` | Opaque, implicitly nullable |
| Void | `void` | No return value |
| Date | `Date` | Special JSON serialization |
| Class | `class` | Passed by-reference |
| Interface (behavioral) | `interface IFoo` | Prefixed with `I` |
| Struct | `interface Foo` | No `I` prefix, all readonly, no methods |
| Promise | `Promise<T>` | Only as method return type |

**Unsupported types:** Tuples, `never`, `bigint`, `symbol`

---

## 4. Toolchain Components

### 4.1 Repositories

The jsii toolchain is split across multiple repos:

| Repository | Contains |
|------------|----------|
| [aws/jsii-compiler](https://github.com/aws/jsii-compiler) | `jsii` compiler (5.x, GA) |
| [aws/jsii-rosetta](https://github.com/aws/jsii-rosetta) | `jsii-rosetta` code transliteration (5.x, GA) |
| [aws/jsii](https://github.com/aws/jsii) | Runtime libraries, `@jsii/spec`, `jsii-pacmak`, `jsii-reflect`, `jsii-diff`, `jsii-config` |

### 4.2 Tools

| Tool | Version | Purpose |
|------|---------|---------|
| `jsii` (compiler) | 5.x | Compiles TypeScript → JavaScript + `.jsii` assembly |
| `jsii-pacmak` | 1.x | Generates language-specific packages from `.jsii` assemblies |
| `jsii-reflect` | 1.x | Strongly-typed reflection library for jsii type systems |
| `jsii-diff` | 1.x | API backwards compatibility checker |
| `jsii-rosetta` | 5.x | Transpiles code snippets in docs from TS to target languages |
| `jsii-config` | 1.x | Interactive configuration generator (experimental) |
| `jsii-srcmak` | 1.x | Generates relocatable source from TS (community) |
| `jsii-docgen` | any | Generates markdown API docs (community) |

### 4.3 Packages in this Monorepo

| Package | Language | Role |
|---------|----------|------|
| `@jsii/spec` | TypeScript | Assembly schema definition + validation |
| `@jsii/kernel` | TypeScript | The kernel that manages JS objects and executes code |
| `@jsii/runtime` | TypeScript | Thin wrapper managing STDIN/STDOUT/STDERR IPC |
| `@jsii/check-node` | TypeScript | Node.js version compatibility checks |
| `@jsii/python-runtime` | Python | Host runtime library for Python |
| `@jsii/java-runtime` | Java | Host runtime library for Java |
| `@jsii/dotnet-runtime` | C# | Host runtime library for .NET |
| `@jsii/go-runtime` | Go | Host runtime library for Go |
| `jsii-pacmak` | TypeScript | Code generator (targets: python, java, dotnet, go, js) |
| `jsii-reflect` | TypeScript | High-level assembly introspection |
| `jsii-diff` | TypeScript | API compatibility diffing |
| `jsii-config` | TypeScript | Interactive jsii configuration |
| `codemaker` | TypeScript | Code generation utility library |
| `jsii-calc` | TypeScript | Test fixture library |

---

## 5. Runtime Architecture (Deep Dive)

### 5.1 Process Layout

```
┌─────────────────────────┐               ┌────────────┬────┬────┬────┐
│                         │               │            │    │    │    │
│    Host Application     │               │@jsii/kernel│LibA│LibB│... │
│                         │               │            │    │    │    │
│      ┌──────────────────┤               ├────────────┴────┴────┴────┤
│      │                  │               │                           │
│      │Generated Bindings│               │       @jsii/runtime       │
│      │                  │               │                           │
│      ├──────────────────┤   Requests    ├──────┬────────────────────┤
│      │                  ├───────────────▶STDIN │                    │
│      │Host jsii Runtime │   Responses   ├──────┤                    │
│      │     Library      ◀───────────────┤STDOUT│                    │
│      │                  │    Console    ├──────┤    node            │
│      │                  ◀───────────────┤STDERR│                    │
├──────┴──────────────────┤               ├──────┘                    │
│      Host Runtime       │               │      (Child Process)      │
│  (JVM, .NET Core, ...)  │               │                           │
└─────────────────────────┴───────────────┴───────────────────────────┘
```

### 5.2 Dual-Node Process (Console Interception)

The `@jsii/runtime` actually spawns **two** node processes:

1. **Wrapper process** — manages IPC with the host via STDIN/STDOUT
2. **Core process** — runs the actual kernel + loaded libraries

Communication between Wrapper and Core uses **FD#3** (an additional file descriptor) for the JSON protocol, leaving
STDOUT/STDERR free for console output interception.

This exists because Java and C# cannot spawn child processes with additional open file descriptors.

### 5.3 Console Output Encoding (STDERR)

Console output from the kernel is encoded on the Wrapper's STDERR as:
- `{"stderr": "<base64-encoded data>"}` → write to host's STDERR
- `{"stdout": "<base64-encoded data>"}` → write to host's STDOUT
- Non-JSON data → write as-is to host's STDERR

### 5.4 Initialization Sequence

1. Host app starts on its native runtime
2. First encounter with a jsii entity triggers spawning the `node` child process
3. `@jsii/runtime` sends `hello` message: `{"hello": "@jsii/runtime@X.Y.Z"}`
4. Host runtime library loads JavaScript modules (bundled in generated bindings) via `load` calls
5. All subsequent interactions are request/response JSON messages
6. On exit, host closes communication channels → node process terminates

---

## 6. Kernel API (IPC Protocol)

### 6.1 Message Types

All requests have an `api` discriminator field:

| API | Purpose |
|-----|---------|
| `load` | Load a jsii assembly (npm tarball) into the kernel |
| `naming` | Get language-specific naming configuration |
| `stats` | Get kernel statistics (object count) |
| `create` | Instantiate an object |
| `del` | Destroy an object reference (free memory) |
| `invoke` | Call an instance method |
| `sinvoke` | Call a static method |
| `get` | Read an instance property |
| `sget` | Read a static property |
| `set` | Write an instance property |
| `sset` | Write a static property |
| `begin` | Start an async method invocation |
| `end` | Await an async method's result |
| `callbacks` | List outstanding callback requests |
| `complete` | Fulfill a callback request |

### 6.2 Object References

Objects are identified by opaque reference strings:

```
@aws-cdk/core.Stack@10003
└────────┬────────┘ └─┬─┘
         │            └─ Numeric identifier
         └─ Base class FQN (or "Object" for interface-only)
```

### 6.3 Callbacks (Host ← Kernel)

When JavaScript code calls a method/property that was **overridden in the host**, the kernel sends a callback request
instead of a response. The host must:

1. Execute the overridden method/property
2. Send a `complete` response with the result (or error)
3. Receive the original call's actual response

Callback types: `InvokeCallback`, `GetCallback`, `SetCallback`

### 6.4 Overrides

When creating objects, the host declares which methods/properties are overridden:

```json
{
  "api": "create",
  "fqn": "aws-cdk-lib.Stack",
  "args": [],
  "overrides": [
    {"method": "synthesize"},
    {"property": "stackName"}
  ],
  "interfaces": ["aws-cdk-lib.ITaggable"]
}
```

An optional `cookie` string can be attached to overrides for performance optimization in the host.

---

## 7. Serialization Protocol

### 7.1 Pass-by-Value vs Pass-by-Reference

| Type | Passing Semantics |
|------|-------------------|
| Primitives (bool, number, string) | By value (JSON identity) |
| Enums | By value (wrapped: `{"$jsii.enum": "fqn/ENTRY"}`) |
| Dates | By value (wrapped: `{"$jsii.date": "ISO-8601"}`) |
| Lists | By value (JSON array, elements serialized recursively) |
| Maps | By value (wrapped: `{"$jsii.map": {...}}`) |
| Structs | By value (wrapped: `{"$jsii.struct": {"fqn": "...", "data": {...}}}`) |
| Class instances | By reference (`{"$jsii.byref": "FQN@ID", "$jsii.interfaces": [...]}`) |
| Interface instances | By reference |

### 7.2 Special Wrappers

```json
// Date
{"$jsii.date": "2020-01-20T14:04:00.000Z"}

// Enum
{"$jsii.enum": "@scope/module.EnumType/ENTRY_NAME"}

// Map
{"$jsii.map": {"key": "value"}}

// Struct
{"$jsii.struct": {"fqn": "@scope/module.MyStruct", "data": {"prop": "val"}}}

// Object reference
{"$jsii.byref": "@scope/module.MyClass@10003", "$jsii.interfaces": ["@scope/module.IFoo"]}
```

---

## 8. The Compiler (`jsii`)

### 8.1 What It Does

- Wraps the TypeScript compiler API
- Produces standard JavaScript output + TypeScript declaration files
- **Additionally** extracts the `.jsii` assembly document
- Enforces jsii-specific restrictions on exported APIs

### 8.2 TypeScript Restrictions (Exported APIs Only)

These restrictions only apply to declarations exported from the module's main entry point:

- No method overloads
- Overridden methods must retain exact same type signature (Liskov substitution)
- No tuples, `never`, `bigint`, `symbol`
- Interfaces prefixed with `I` = behavioral; without = struct
- Structs: all properties `readonly`, no methods
- Structs cannot extend behavioral interfaces (and vice versa)
- No circular submodule dependencies
- Type unions are discouraged (result in `Object`/`any` in static languages)
- `Promise<T>` only as method return type

### 8.3 Submodules

TypeScript namespaces map to jsii submodules:
- `export * as ns from './module'` — namespaced export
- `export namespace ns { ... }` — explicit namespace

Submodules are hierarchical (e.g., `assm.foo.bar` is nested under `assm.foo`).

---

## 9. Code Generation (`jsii-pacmak`)

### 9.1 What It Does

- Reads `.jsii` assembly + bundled JavaScript
- Generates idiomatic source code for each target language
- Compiles and packages the generated code into publishable artifacts
- Bundles the original JavaScript inside the generated package

### 9.2 Target Generators

Located in `packages/jsii-pacmak/lib/targets/`:

| Target | Output |
|--------|--------|
| `python.ts` | Python packages (PyPI wheels) |
| `java.ts` | Java packages (Maven JARs) |
| `dotnet.ts` + `dotnet/` | .NET packages (NuGet) |
| `go.ts` + `go/` | Go modules |
| `js.ts` | JavaScript/TypeScript (passthrough) |

### 9.3 Generated Package Structure

Each generated package contains:
1. **Native source code** — idiomatic classes/interfaces in the target language
2. **Bundled JavaScript** — the original npm package tarball
3. **Runtime library dependency** — reference to the language's `@jsii/*-runtime`
4. **Assembly metadata** — the `.jsii` file

### 9.4 Configuration (`package.json` → `jsii` key)

```json
{
  "jsii": {
    "outdir": "dist",
    "targets": {
      "python": {
        "distName": "my-package",
        "module": "my_package"
      },
      "java": {
        "package": "com.example.mypackage",
        "maven": {
          "groupId": "com.example",
          "artifactId": "my-package"
        }
      },
      "dotnet": {
        "namespace": "Example.MyPackage",
        "packageId": "Example.MyPackage"
      },
      "go": {
        "moduleName": "github.com/example/my-package-go"
      }
    }
  }
}
```

---

## 10. Host Runtime Libraries

Each target language has a runtime library that:
1. Manages the child `node` process lifecycle
2. Handles JSON serialization/deserialization
3. Provides base classes for generated bindings
4. Implements the callback mechanism
5. Manages object reference tracking

### 10.1 Python Runtime (`@jsii/python-runtime`)

- Package: `jsii` (on PyPI)
- Key modules:
  - `jsii/_kernel/` — kernel client implementation
  - `jsii/_runtime.py` — base classes and decorators
  - `jsii/_reference_map.py` — object reference tracking
  - `jsii/errors.py` — error types
  - `jsii/python.py` — Python-specific utilities

### 10.2 Java Runtime (`@jsii/java-runtime`)

- Package: `software.amazon.jsii:jsii-runtime` (Maven Central)
- Provides `JsiiObject` base class
- Manages JNI-like bridge to node process

### 10.3 .NET Runtime (`@jsii/dotnet-runtime`)

- Package: `Amazon.JSII.Runtime` (NuGet)
- Provides `DeputyBase` base class
- Uses .NET's process management for node child

### 10.4 Go Runtime (`@jsii/go-runtime`)

- Module: `github.com/aws/jsii-runtime-go`
- Key files:
  - `jsii.go` — main entry points
  - `cast.go` — type casting utilities
  - `helpers.go` — helper functions
  - `runtime/` — internal runtime implementation
  - `internal/` — internal kernel client

---

## 11. Data Flow (End-to-End Example)

### Creating a CDK Stack in Python:

```
Python App                    Python jsii Runtime           node (@jsii/kernel)
    │                               │                            │
    │  stack = Stack(app, "MyStack")│                            │
    │──────────────────────────────▶│                            │
    │                               │  {"api":"create",          │
    │                               │   "fqn":"aws-cdk-lib.Stack",
    │                               │   "args":[ref, "MyStack"]} │
    │                               │───────────────────────────▶│
    │                               │                            │ new Stack(app, "MyStack")
    │                               │  {"$jsii.byref":           │
    │                               │   "aws-cdk-lib.Stack@42"}  │
    │                               │◀───────────────────────────│
    │  <Stack proxy object>         │                            │
    │◀──────────────────────────────│                            │
    │                               │                            │
    │  stack.stack_name             │                            │
    │──────────────────────────────▶│                            │
    │                               │  {"api":"get",             │
    │                               │   "objref":{"$jsii.byref": │
    │                               │    "...Stack@42"},          │
    │                               │   "property":"stackName"}  │
    │                               │───────────────────────────▶│
    │                               │  {"result":"MyStack"}      │
    │                               │◀───────────────────────────│
    │  "MyStack"                    │                            │
    │◀──────────────────────────────│                            │
```

---

## 12. jsii-rosetta (Code Transliteration)

Translates TypeScript code examples in documentation to target languages. Used to ensure README examples and API doc
snippets are available in all supported languages.

- Operates on code snippets extracted from markdown/TSDoc
- Uses the TypeScript compiler to understand types
- Applies language-specific translation rules
- Integrated into `jsii-pacmak` for generated package docs

---

## 13. jsii-reflect (Type System Reflection)

A higher-level API for working with `.jsii` assemblies:

- Load and traverse type systems
- Query classes, interfaces, methods, properties
- Resolve type references across assemblies
- Used internally by `jsii-pacmak` and `jsii-diff`

---

## 14. jsii-diff (API Compatibility)

Compares two versions of a `.jsii` assembly to detect breaking changes:

- Removed types, methods, properties
- Changed method signatures
- Weakened type constraints
- Stability changes

---

## 15. Compliance & Testing

### 15.1 Standard Compliance Suite

A normative set of test cases that all language runtime implementations must pass. Tests verify that host-kernel
interactions produce identical behavior across languages.

Each test specifies:
- English description of the property being tested
- TypeScript reference implementation
- Expected kernel message trace (the exact JSON messages exchanged)

### 15.2 Compliance Status (from repo)

| Language | Compliance |
|----------|-----------|
| Java | ~97.56% |
| Go | ~78.86% |
| .NET | Not yet measured in new format |
| Python | Not yet measured in new format |

### 15.3 Test Categories

- Async overrides
- Sync overrides
- Collections (List, Map)
- Structs (serialization, equality, builders)
- Interfaces (pure implementations, polymorphism)
- Property overrides
- Type unions
- Primitives
- Reserved keywords (slugification)
- Object identity

---

## 16. Async Support

- Methods returning `Promise<T>` are async
- Uses `begin`/`end` kernel API calls
- **Largely experimental** — support varies by language
- Known issue: outstanding Promises may not progress due to event loop blocking in `@jsii/runtime`
- Cannot mix sync and async operations (no `invoke` during pending `begin`)

---

## 17. Threading

- Runtime libraries are **not thread-safe**
- Multi-threaded usage is **unsupported**
- Single kernel process per host application

---

## 18. Memory Management

- Objects passed by-reference accumulate in the kernel
- `del` API should be called when host references are garbage collected
- **Known issue:** Most host runtimes do NOT implement `del` → memory leaks in long-running processes
- No mechanism for kernel to notify host about dropped references

---

## 19. New Language Intake Process

Adding a new target language takes approximately **4-6 months**:

1. **Planning** (2 weeks) — Study spec, write RFC, propose API representations
2. **Code Generation** (4-6 weeks) — Add target to `jsii-pacmak`
3. **Runtime Library** (4-6 weeks) — Write host runtime in the new language
4. **Building & Packaging** (2 weeks) — Compile/package generated code, add to superchain Docker image
5. **Compliance Tests** (6 weeks) — Implement full compliance suite
6. **Documentation** (1 week) — User guides, config support
7. **Developer Preview** (4-8 weeks) — Community validation, UX studies
8. **General Availability** — After stability is confirmed

---

## 20. Key Environment Variables

| Variable | Purpose |
|----------|---------|
| `JSII_RUNTIME` | Override the path to the jsii-runtime library |
| `JSII_AGENT` | Identifies the host runtime (e.g., `Python/3.9.0`) |
| `JSII_DEBUG` | Enable debug logging |

---

## 21. Docker: jsii/superchain

The `public.ecr.aws/jsii/superchain` Docker image contains all toolchains needed to build jsii packages for all
supported languages. Used in CI/CD pipelines.

---

## 22. Relationship to AWS CDK

```
┌─────────────────────────────────────────────────────┐
│                    AWS CDK                           │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │         aws-cdk-lib (TypeScript)            │    │
│  │  Written once, compiled with jsii compiler  │    │
│  └──────────────────┬──────────────────────────┘    │
│                     │                               │
│          jsii-pacmak generates:                     │
│                     │                               │
│  ┌──────┬──────┬────┴───┬────────┐                  │
│  │Python│ Java │  .NET  │   Go   │                  │
│  │(PyPI)│(Maven)│(NuGet)│(GitHub)│                  │
│  └──────┴──────┴────────┴────────┘                  │
└─────────────────────────────────────────────────────┘
```

The CDK team authors constructs in TypeScript. jsii compiles them and pacmak generates idiomatic packages for each
language. Users in any supported language get a native-feeling API that delegates to the same JavaScript implementation
under the hood.

---

## 23. Known Limitations & Gotchas

1. **Performance** — Every cross-language call involves JSON serialization + IPC. Not suitable for hot paths.
2. **No distributed GC** — Object references leak if `del` isn't called (and most runtimes don't call it).
3. **Single-threaded** — No thread safety in runtime libraries.
4. **Async is experimental** — Event loop blocking can cause deadlocks.
5. **Type unions** — Result in `Object`/`any` in statically typed languages. Avoid when possible.
6. **No STDIN** — jsii libraries cannot read from STDIN (nothing connected to kernel's FD#0).
7. **Struct vs Interface naming** — The `I` prefix convention is mandatory and semantic.
8. **No method overloads** — TypeScript overloads are not supported in the jsii type system.
9. **Liskov substitution** — Overridden methods must have identical signatures (no covariant returns).
10. **Collections are copied** — Arrays and maps are passed by-value across the boundary every time.

---

## 24. File/Artifact Map

| Artifact | Location | Format |
|----------|----------|--------|
| jsii Assembly | `.jsii` in npm package root | JSON |
| Assembly Schema | `@jsii/spec` package | TypeScript interfaces |
| Generated Python | `dist/python/` | wheel (.whl) |
| Generated Java | `dist/java/` | JAR + POM |
| Generated .NET | `dist/dotnet/` | NuGet (.nupkg) |
| Generated Go | `dist/go/` | Go module source |
| Bundled JS | Inside each generated package | npm tarball |

---

## 25. Quick Reference: Message Flow Cheat Sheet

```
HOST → KERNEL (Requests)
  load      → Load assembly tarball
  create    → new Object(args)
  invoke    → obj.method(args)
  sinvoke   → Class.staticMethod(args)
  get       → obj.property
  sget      → Class.staticProperty
  set       → obj.property = value
  sset      → Class.staticProperty = value
  del       → Release object reference
  begin     → Start async call
  end       → Await async result
  complete  → Fulfill callback
  callbacks → List pending callbacks
  naming    → Get language config
  stats     → Get kernel stats

KERNEL → HOST (Responses)
  {ok: ...}           → Success
  {error: ...}        → Failure
  {callback: ...}     → Callback request (interrupts normal response)
  {hello: "..."}      → Initial handshake
```
