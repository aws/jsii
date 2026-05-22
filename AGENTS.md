# AGENTS.md

AI agent contributor guide for the aws/jsii repository.

## Overview

- **jsii** enables TypeScript libraries to be consumed naturally in Python, Java, C#/.NET, and Go — users write idiomatic code in their language while jsii handles cross-language interop.
- **Key packages in this monorepo:**
  - `packages/@jsii/kernel` — Node.js process managing JS objects on behalf of host runtimes
  - `packages/@jsii/runtime` — Webpack-bundled runtime bootstrap
  - `packages/@jsii/spec` — Assembly schema definition (`.jsii` format)
  - `packages/@jsii/python-runtime` — Python host runtime
  - `packages/@jsii/java-runtime` — Java host runtime
  - `packages/@jsii/dotnet-runtime` — .NET host runtime
  - `packages/@jsii/go-runtime` — Go host runtime
  - `packages/jsii-pacmak` — Code generator producing language-specific packages from `.jsii` assemblies
  - `packages/jsii-reflect` — TypeScript reflection library for `.jsii` assemblies
  - `packages/jsii-diff` — API compatibility checker
  - `packages/codemaker` — Code generation utilities (indentation, file management)
  - `packages/jsii-calc`, `packages/@scope/*` — Test fixtures exercising the full type system
  - `tools/jsii-compliance` — Compliance suite and reporting tooling
  - `tools/jsii-build-tools` — Internal build utilities
- **Compiler and rosetta live in separate repositories:**
  - jsii compiler → https://github.com/aws/jsii-compiler
  - jsii-rosetta (transliteration) → https://github.com/aws/jsii-rosetta
- **Monorepo tooling:** Yarn 4 workspaces (`packageManager: yarn@4.13.0`) + Lerna for build orchestration
- **Design tenets:**
  - APIs must feel idiomatic in all target languages
  - Applications behave identically regardless of language (correctness over performance)
  - jsii does not attempt to support all TypeScript idioms — only those representable across all targets
  - Produced artifacts are compatible with each language's idiomatic package management tools

## Contributor Principles

1. Backwards compatibility of the jsii assembly format and kernel API is critical — never break existing consumers.
2. Cross-language correctness must be verified — a change affecting one language target must be validated against all targets.
3. Generated code must be idiomatic in each target language — follow each language's conventions and patterns.
4. The jsii type system restrictions exist to ensure cross-language representability — do not relax them without careful consideration and validation across all targets.
5. Snapshot tests must be updated when generated code changes — run `yarn test:update` to refresh snapshots.

## Quick Reference Commands

| Command | Description | Scope |
|---------|-------------|-------|
| `yarn install && yarn build` | Full bootstrap and build | Repo root |
| `cd packages/X && yarn build` | Build single package | Package dir |
| `yarn test` | Full test suite (includes compliance) | Repo root |
| `cd packages/X && yarn test` | Test single package | Package dir |
| `yarn test:update` | Update all snapshots | Repo root |
| `cd packages/X && yarn test:update` | Update package snapshots | Package dir |
| `yarn lint` | Lint all packages | Repo root |
| `yarn lint:fix` | Auto-fix lint issues | Repo root |
| `yarn compliance` | Generate compliance report | Repo root |
| `yarn upgrade:jsii` | Upgrade jsii/rosetta versions | Repo root |

**Notes:**

- Builds use `--concurrency=1` due to inter-package dependencies.
- Monorepo uses Yarn 4 workspaces + Lerna orchestration.
- For individual packages, use `cd packages/X && yarn <script>` (e.g., `cd packages/@jsii/kernel && yarn test`).

## Codebase Layout

### Packages

| Path | Purpose |
|------|---------|
| `packages/@jsii/kernel` | The JavaScript kernel — manages objects and executes code |
| `packages/@jsii/runtime` | IPC wrapper around kernel (webpack-bundled for distribution) |
| `packages/@jsii/spec` | Assembly schema definition and validation |
| `packages/@jsii/check-node` | Node.js version compatibility checks |
| `packages/@jsii/python-runtime` | Python host runtime library |
| `packages/@jsii/java-runtime` | Java host runtime library |
| `packages/@jsii/dotnet-runtime` | .NET host runtime library |
| `packages/@jsii/go-runtime` | Go host runtime library |
| `packages/jsii-pacmak` | Code generator (targets: Python, Java, .NET, Go, JS) |
| `packages/jsii-reflect` | Strongly-typed reflection library for `.jsii` assemblies |
| `packages/jsii-diff` | API backwards compatibility checker |
| `packages/jsii-config` | Interactive jsii configuration tool (experimental) |
| `packages/codemaker` | Code generation utilities (indentation, file management) |
| `packages/jsii-calc` | Test fixture library exercising the full type system |
| `packages/@scope/*` | Additional test fixture packages (base, lib, base-of-base) |
| `tools/jsii-compliance` | Compliance suite definition and report generation |
| `tools/jsii-build-tools` | Internal build utilities |

### Code Generation Targets

- Targets live in `packages/jsii-pacmak/lib/targets/`
- One file per language: `python.ts`, `java.ts`, `dotnet.ts`, `go.ts`, `js.ts`
- Complex targets have subdirectories: `dotnet/`, `go/`, `python/`

### Specifications & Docs

- Specification documents: `gh-pages/content/specification/`
- Architecture reference: `docs/jsii-architecture-reference.md`
- Test fixtures (`jsii-calc`, `@scope/*`) are shared with the separate `aws/jsii-compiler` repository (which has its own copy under `fixtures/`)

## Architecture

### Two-Process Model

The host process (JVM, .NET CLR, CPython, Go runtime) communicates with a kernel process (Node.js) via JSON-encoded messages over STDIN/STDOUT pipes. The host never executes JavaScript directly — all JS execution happens in the kernel.

```
Host Process (Python/Java/.NET/Go)  ←→  Kernel Process (Node.js)
         STDIN/STDOUT JSON IPC
```

### Kernel API

All requests carry an `api` discriminator field. The kernel supports 15 message types:

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

### Callback Mechanism

When JavaScript code calls a method or property that was overridden in the host language, the kernel sends a callback request instead of a normal response. The host must: (1) execute the overridden method, (2) send a `complete` response with the result, (3) receive the original call's actual response. Callback types include `InvokeCallback`, `GetCallback`, and `SetCallback`.

### Serialization

| Type | Passing | Wire Format |
|------|---------|-------------|
| Primitives (bool, number, string) | By value | JSON identity |
| Enums | By value | `{"$jsii.enum": "fqn/ENTRY"}` |
| Dates | By value | `{"$jsii.date": "ISO-8601"}` |
| Lists | By value | JSON array |
| Maps | By value | `{"$jsii.map": {...}}` |
| Structs | By value | `{"$jsii.struct": {"fqn": "...", "data": {...}}}` |
| Class instances | By reference | `{"$jsii.byref": "FQN@ID"}` |

### Dual-Node Process

The `@jsii/runtime` spawns two node processes: a wrapper process manages IPC with the host via STDIN/STDOUT, while a core process runs the actual kernel communicating with the wrapper via FD#3. This separation exists because Java and C# cannot spawn child processes with additional open file descriptors.

### Debugging

| Variable | Purpose |
|----------|---------|
| `JSII_DEBUG=1` | Verbose IPC tracing to STDERR |
| `JSII_DEBUG_TIMING=1` | Kernel API timing information |
| `JSII_RUNTIME` | Override path to jsii-runtime (use local non-bundled version) |
| `NODE_OPTIONS` | Configure node runtime (e.g., `--inspect-brk` for debugger) |

## Type System

### Type Mappings

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

### Restrictions

- **Unsupported types:** tuples, `never`, `bigint`, `symbol`
- **Struct vs Interface:** interfaces prefixed with `I` are behavioral; without prefix they are structs (all properties `readonly`, no methods). Structs cannot extend behavioral interfaces and vice versa.
- **No method overloads** — TypeScript overloads are not supported in the jsii type system
- **Liskov substitution** — overridden methods must retain the exact same type signature (no covariant returns, no contravariant parameters)
- **Type unions** — result in `Object`/`any` in statically typed languages; avoid when possible
- **Scope** — restrictions only apply to declarations exported from the module's main entry point; internal code is unrestricted

## Code Generation

### Pipeline

1. Read `.jsii` assembly from the compiled npm package
2. Generate idiomatic source code for the target language
3. Compile the generated source (language-specific toolchain)
4. Package into publishable artifacts (wheel, JAR, NuGet, Go module)

### Targets

| File | Language | Output |
|------|----------|--------|
| `python.ts` | Python | PyPI wheels (`.whl`) |
| `java.ts` | Java | Maven JARs |
| `dotnet.ts` + `dotnet/` | C# (.NET) | NuGet packages (`.nupkg`) |
| `go.ts` + `go/` | Go | Go module source |
| `js.ts` | JavaScript | npm package (passthrough) |

**Notes:**

- Generated packages bundle the original JavaScript (npm tarball) inside the language-specific package.
- Each generated package depends on the language's host runtime library (`@jsii/*-runtime`).
- The `.jsii` assembly is included in the generated package for downstream consumers.
- The `codemaker` package (`packages/codemaker`) provides code generation utilities (indentation management, file creation, code blocks) used by all targets.

### Modifying a Target

- The Python target (`packages/jsii-pacmak/lib/targets/python.ts`) is the recommended reference implementation to study when modifying or adding a code generation target.
- Each target extends a base class and implements visitor methods that traverse the assembly's type system.
- After modifying a target, run `cd packages/jsii-pacmak && yarn test:update` to update generated code snapshots.

## Testing

### Testing Layers

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit tests | Jest | Package-level logic verification |
| Snapshot tests | Jest snapshots | Generated code regression detection |
| Compliance suite | Custom framework | Cross-language behavioral consistency |

### Test Fixtures

- `jsii-calc` and `@scope/*` packages serve as test fixtures exercising the full jsii type system (classes, interfaces, structs, enums, collections, async, overrides, etc.).
- These fixtures are compiled with the jsii compiler and used by `jsii-pacmak`, `jsii-reflect`, and the runtime test suites.
- After modifying test fixtures, run `yarn test:update` in at least `jsii-pacmak` and `jsii-reflect` to update snapshots.
- The `aws/jsii-compiler` repository maintains its own copy of these fixtures under `fixtures/`.

### Compliance Suite

- Abstract test cases defined in `tools/jsii-compliance/suite.ts`.
- Each language binding must implement the test cases individually.
- Report generated via `yarn compliance` (or `cd tools/jsii-compliance && yarn report`).
- Adding a compliance test to a language binding without adding it to the suite definition will cause the build to fail.
- If you add a test and don't regenerate the report, the build will also fail.
- Report file: `gh-pages/content/specification/6-compliance-report.md` (checked into source control).
- Report statuses:
  - 🟢 — Test passes for this language
  - ⚪ — Test is not applicable for this language
  - ⭕ — Test is not implemented (yet) for this language
  - 🔴 — Test is failing for this language

## PR Conventions

1. PR titles follow conventional commit format: `type[(scope)]: description`
   - Allowed types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `revert`
2. Scope is optional — use the package name when the change is scoped to a single package (e.g., `fix(jsii-pacmak): ...`).
3. PR body must confirm contribution under the Apache 2.0 license (by submitting, you agree to the Developer Certificate of Origin).
4. If compliance tests change, regenerate the compliance report (`yarn compliance`) and commit the updated `gh-pages/content/specification/6-compliance-report.md`.

## Anti-Patterns

1. **MUST NOT** relax jsii type system restrictions without cross-language validation across all targets
2. **MUST NOT** modify the kernel API protocol without updating all host runtime libraries (Python, Java, .NET, Go)
3. **MUST NOT** change generated code patterns without updating snapshots (`yarn test:update`)
4. **MUST NOT** add compliance tests to a language binding without adding them to the suite definition in `tools/jsii-compliance/suite.ts`
5. **MUST NOT** introduce method overloads in test fixtures — they are not representable in the jsii type system
6. **MUST NOT** use type unions when avoidable — they degrade to `Object`/`any` in static languages
7. **MUST NOT** assume thread safety in runtime libraries — they are single-threaded by design
8. **MUST NOT** modify `@jsii/runtime` bundled code directly — it is webpack-bundled; edit the source and rebuild
9. **MUST NOT** break the `$jsii.*` serialization wire format without coordinating changes across all host runtimes simultaneously
10. **MUST NOT** add circular dependencies between submodules — Lerna rejects cycles (`rejectCycles: true`)

## Key References

| Resource | Location |
|----------|----------|
| Type system specification | `gh-pages/content/specification/2-type-system.md` |
| Kernel API specification | `gh-pages/content/specification/3-kernel-api.md` |
| Compliance suite specification | `gh-pages/content/specification/4-standard-compliance-suite.md` |
| Architecture reference | `docs/jsii-architecture-reference.md` |
| jsii compiler repository | https://github.com/aws/jsii-compiler |
| jsii-rosetta repository | https://github.com/aws/jsii-rosetta |
| jsii-superchain repository | https://github.com/aws/jsii-superchain |
| Published documentation | https://aws.github.io/jsii/ |
| Contributing guide | `CONTRIBUTING.md` |
