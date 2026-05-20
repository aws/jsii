# Prerequisites for Understanding jsii In Depth

> A guide for new engineers joining the CDK/jsii team. This covers everything you should understand
> before (or while) diving into the jsii codebase. Organized from foundational → advanced.

---

## 1. TypeScript & JavaScript Fundamentals

jsii is built on TypeScript and compiles to JavaScript. You need solid understanding of both.

### TypeScript You Must Know

- **The type system** — interfaces, classes, generics, union types, intersection types, type guards
- **Declaration files** (`.d.ts`) — what they are, how they're generated, how they describe APIs
- **The `tsconfig.json`** — compiler options, `strict` mode, module resolution
- **The TypeScript Compiler API** — jsii wraps the TS compiler programmatically. Understand:
  - `ts.Program`, `ts.SourceFile`, `ts.TypeChecker`
  - How the compiler resolves types, symbols, and declarations
  - AST (Abstract Syntax Tree) traversal
- **Module systems** — CommonJS (`require`/`module.exports`) vs ESM (`import`/`export`)
- **Decorators** — used in some runtime libraries (Python's `@jsii.implements`)
- **`readonly` vs mutable** — critical for struct vs interface distinction in jsii

### JavaScript You Must Know

- **Prototypal inheritance** — how classes actually work at runtime
- **`this` binding** — how `this` behaves in different contexts (arrow functions, methods, constructors)
- **JSON serialization** — `JSON.stringify`/`JSON.parse`, what's serializable, what's not
- **Node.js streams** — STDIN, STDOUT, STDERR, piping, buffering
- **Node.js child processes** — `child_process.spawn`, IPC, file descriptors
- **npm packages** — `package.json` structure, `main`/`types` fields, tarballs, publishing
- **The event loop** — microtasks, macrotasks, how `async`/`await` interacts with the loop

### Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Compiler API docs](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [Node.js Child Processes](https://nodejs.org/api/child_process.html)
- [Node.js Streams](https://nodejs.org/api/stream.html)

---

## 2. Object-Oriented Programming Concepts

jsii maps TypeScript's OOP model to other languages. You need to understand OOP across paradigms.

### Core Concepts

- **Classes** — constructors, methods, properties, static members, abstract classes
- **Interfaces** — behavioral contracts vs data shapes (jsii distinguishes these)
- **Inheritance** — single inheritance (classes), multiple inheritance (interfaces)
- **Polymorphism** — method overriding, virtual dispatch, Liskov Substitution Principle
- **Encapsulation** — public/protected/private visibility
- **Composition vs inheritance** — why jsii structs exist (composition pattern)

### Cross-Language OOP Differences You Should Know

| Concept | TypeScript | Python | Java | C# | Go |
|---------|-----------|--------|------|----|----|
| Multiple inheritance | Interfaces only | Full (classes + mixins) | Interfaces only | Interfaces only | Embedding (no inheritance) |
| Method overloading | Not in jsii | Duck typing | Supported | Supported | Not supported |
| Properties | First-class | `@property` decorator | Getters/setters | First-class | Exported fields |
| Enums | String/number values | `enum.Enum` | Full classes | Value types | `iota` constants |
| Null safety | `undefined`/`null` | `None` | `null` | `null`/nullable | `nil`/zero values |
| Generics | Full | Type hints (PEP 484) | Type erasure | Reified | Since 1.18 |
| Structs (data classes) | Interfaces (no `I` prefix) | `@dataclass` or plain | Records/POJOs | Records/structs | Structs |

### The Liskov Substitution Principle (LSP)

jsii strictly enforces LSP: if you override a method, the signature must be **identical** to the parent's. No covariant
returns, no contravariant parameters. This is because not all target languages support these features.

### Resources

- [Liskov Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

---

## 3. Inter-Process Communication (IPC)

jsii's runtime is fundamentally an IPC system. The host process talks to a node child process.

### What You Need to Know

- **Process spawning** — how one process creates another (`fork`, `spawn`, `exec`)
- **Pipes** — STDIN (fd 0), STDOUT (fd 1), STDERR (fd 2), and custom file descriptors (fd 3+)
- **JSON-RPC-like protocols** — request/response over streams (jsii uses a custom protocol, not JSON-RPC, but the concept is similar)
- **Buffering and framing** — how to delimit messages in a byte stream (jsii uses newline-delimited JSON)
- **Blocking vs non-blocking I/O** — why the kernel can deadlock if async isn't handled carefully
- **Process lifecycle** — startup, communication, graceful shutdown

### jsii-Specific IPC Details

- Host sends JSON requests to kernel's STDIN
- Kernel sends JSON responses on STDOUT
- Console output is encoded on STDERR (base64-wrapped JSON)
- The kernel uses a **dual-process** setup (Wrapper + Core) because Java/C# can't open extra file descriptors on child processes
- FD#3 is used for the actual protocol between Wrapper and Core

### Resources

- [Unix File Descriptors](https://en.wikipedia.org/wiki/File_descriptor)
- [Node.js child_process.spawn](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options)
- [Newline-delimited JSON](http://ndjson.org/)

---

## 4. JSON & Serialization

Everything crossing the jsii boundary is serialized as JSON. You need to understand serialization deeply.

### What You Need to Know

- **JSON data types** — string, number, boolean, null, array, object (and what's NOT representable: Date, undefined, functions, circular refs)
- **Custom serialization** — how jsii wraps non-JSON types with sentinel keys (`$jsii.date`, `$jsii.enum`, `$jsii.byref`, `$jsii.struct`, `$jsii.map`)
- **By-value vs by-reference** — primitives and structs are copied; class instances are referenced
- **Type discrimination** — how the kernel knows what type a value is when the declared type is `any`
- **Schema validation** — how `@jsii/spec` validates assembly documents (JSON Schema)

### The jsii Serialization Wrappers

```json
{"$jsii.date": "2020-01-20T14:04:00.000Z"}       // Date
{"$jsii.enum": "module.MyEnum/VALUE"}              // Enum entry
{"$jsii.map": {"key": "value"}}                    // Map/dictionary
{"$jsii.struct": {"fqn": "module.Opts", "data": {}}} // Struct (by-value)
{"$jsii.byref": "module.MyClass@42"}               // Object reference
```

### Resources

- [JSON specification](https://www.json.org/json-en.html)
- [ISO 8601 Date format](https://en.wikipedia.org/wiki/ISO_8601)

---

## 5. Package Managers & Publishing

jsii generates packages for multiple ecosystems. You should understand how each works.

### npm (JavaScript/TypeScript)

- `package.json` — name, version, main, types, dependencies, peerDependencies
- Tarballs (`.tgz`) — what `npm pack` produces
- Scoped packages (`@scope/name`)
- Semantic versioning (`^`, `~`, exact)

### PyPI (Python)

- `setup.py` / `pyproject.toml` — package metadata
- Wheels (`.whl`) — the distribution format
- Module naming conventions (underscores, lowercase)
- `pip install` resolution

### Maven Central (Java)

- `pom.xml` — groupId, artifactId, version, dependencies
- JAR files — compiled bytecode + resources
- Maven coordinates (`groupId:artifactId:version`)
- Repository publishing (Sonatype OSSRH)

### NuGet (.NET)

- `.csproj` — project file with package metadata
- `.nupkg` — the NuGet package format
- Namespace conventions (PascalCase)
- `dotnet pack` / `dotnet publish`

### Go Modules

- `go.mod` — module path, Go version, dependencies
- No central registry (Git-based, typically GitHub)
- Module versioning (`v0`, `v1`, `v2+` with path suffix)
- `GOPROXY` for module resolution

### Resources

- [npm docs](https://docs.npmjs.com/)
- [PyPI packaging guide](https://packaging.python.org/)
- [Maven Central publishing](https://central.sonatype.org/publish/publish-guide/)
- [NuGet docs](https://learn.microsoft.com/en-us/nuget/)
- [Go Modules Reference](https://go.dev/ref/mod)

---

## 6. Code Generation Concepts

`jsii-pacmak` is a code generator. Understanding code generation patterns helps.

### What You Need to Know

- **AST-driven generation** — reading a structured representation (the `.jsii` assembly) and emitting source code
- **Template-based vs programmatic** — jsii-pacmak uses programmatic generation (the `codemaker` library)
- **Naming conventions** — how to translate `camelCase` (TypeScript) to `snake_case` (Python), `PascalCase` (.NET), etc.
- **Reserved words** — every language has keywords that can't be used as identifiers; jsii "slugifies" them
- **Indentation and formatting** — `codemaker` handles this
- **Dependency graphs** — topological sorting of types for correct declaration order

### Language-Specific Generation Challenges

| Language | Challenge |
|----------|-----------|
| Python | No static typing at runtime; needs `@jsii.implements` decorator for interfaces |
| Java | Type erasure means generics aren't reified; verbose builders for structs |
| C# | Properties are first-class; nullable reference types; async/await mapping |
| Go | No classes/inheritance; uses struct embedding + interfaces; no exceptions (errors) |

### Resources

- [The `codemaker` package](https://github.com/aws/jsii/tree/main/packages/codemaker) in this repo

---

## 7. The AWS CDK Mental Model

Since jsii exists to serve the CDK, understanding CDK's architecture helps contextualize everything.

### What You Need to Know

- **Constructs** — the building blocks (L1, L2, L3)
- **The construct tree** — a hierarchy of constructs representing cloud resources
- **Synthesis** — traversing the tree to produce CloudFormation templates
- **Apps, Stacks, Constructs** — the three levels of the CDK hierarchy
- **Props/Options pattern** — why structs (keyword arguments) are so important in jsii
- **Tokens and lazy evaluation** — values that resolve at synthesis time

### Why CDK Needs jsii

- CDK is authored once in TypeScript
- Customers use CDK in Python, Java, C#, Go
- All languages must produce identical CloudFormation output
- The jsii runtime ensures behavioral equivalence

### Resources

- [AWS CDK Developer Guide](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [CDK Constructs](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html)
- [aws/aws-cdk repository](https://github.com/aws/aws-cdk)

---

## 8. Monorepo Tooling

The jsii repo is a Lerna monorepo. You need to know how to navigate and build it.

### What You Need to Know

- **Lerna** — monorepo management (versioning, dependency linking, task running)
- **Yarn workspaces** — how packages reference each other locally (`"version": "0.0.0"`)
- **TypeScript project references** — `tsconfig.json` with `references` for incremental builds
- **Jest** — the test framework used across all TypeScript packages
- **ESLint** — linting configuration

### Repo Structure

```
aws/jsii/
├── packages/
│   ├── @jsii/
│   │   ├── spec/              # Assembly schema
│   │   ├── kernel/            # The JS kernel
│   │   ├── runtime/           # IPC wrapper around kernel
│   │   ├── check-node/        # Node version checks
│   │   ├── python-runtime/    # Python host runtime
│   │   ├── java-runtime/      # Java host runtime
│   │   ├── dotnet-runtime/    # .NET host runtime
│   │   └── go-runtime/        # Go host runtime
│   ├── jsii-pacmak/           # Code generator
│   ├── jsii-reflect/          # Type system reflection
│   ├── jsii-diff/             # API compatibility checker
│   ├── jsii-config/           # Configuration tool
│   ├── codemaker/             # Code generation utilities
│   └── jsii-calc/             # Test fixture library
├── tools/                     # Build tools
├── gh-pages/                  # Documentation site
└── lerna.json                 # Monorepo config
```

### Building

```bash
# Install dependencies
yarn install

# Build everything
yarn build

# Build a single package
cd packages/@jsii/kernel && yarn build

# Run tests for a package
cd packages/@jsii/kernel && yarn test
```

### Resources

- [Lerna docs](https://lerna.js.org/)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

---

## 9. Language-Specific Knowledge

You don't need to be an expert in all target languages, but you should understand the basics of each
to reason about code generation decisions.

### Python (for understanding `jsii-pacmak` Python target + Python runtime)

- Classes, `__init__`, `@property`, `@staticmethod`, `@classmethod`
- `abc.ABC` and `@abstractmethod`
- Type hints (PEP 484) and `typing` module
- `importlib` and dynamic imports
- Package structure (`__init__.py`, submodules)
- `setuptools`, `wheel`, `pip`

### Java (for understanding `jsii-pacmak` Java target + Java runtime)

- Classes, interfaces, abstract classes, `final`
- Generics and type erasure
- Annotations (`@Override`, `@Nullable`, custom)
- Maven build lifecycle
- JAR structure and classloading
- Builder pattern (used heavily for structs)

### C# (for understanding `jsii-pacmak` .NET target + .NET runtime)

- Classes, interfaces, properties, `virtual`/`override`
- Nullable reference types
- `async`/`await` and `Task<T>`
- NuGet packaging and `.csproj`
- Namespaces vs assemblies

### Go (for understanding `jsii-pacmak` Go target + Go runtime)

- Structs, interfaces (implicit satisfaction), embedding
- No inheritance — composition only
- Error handling (no exceptions)
- Exported vs unexported (capitalization)
- Go modules and `go.mod`
- `jsii.String()`, `jsii.Number()` — pointer helpers (Go uses pointers for optional values)

---

## 10. Compiler Theory (Helpful, Not Required)

Understanding compiler basics helps when working on the jsii compiler or `jsii-pacmak`.

### Useful Concepts

- **Lexing/Parsing** — turning source text into an AST (TypeScript compiler handles this for jsii)
- **Type checking** — resolving types, checking assignability (TypeScript's `TypeChecker`)
- **Symbol tables** — mapping names to declarations
- **Semantic analysis** — understanding meaning beyond syntax
- **Code emission** — generating output from an intermediate representation
- **Visitors/Walkers** — patterns for traversing tree structures (used in pacmak)

### Resources

- [Crafting Interpreters](https://craftinginterpreters.com/) (free online book)
- [TypeScript Compiler Internals](https://basarat.gitbook.io/typescript/overview)

---

## 11. Testing Concepts

### What You Need to Know

- **Unit testing** — Jest (TypeScript), pytest (Python), JUnit (Java), xUnit (.NET), `go test` (Go)
- **Integration testing** — the compliance suite tests end-to-end behavior
- **Snapshot testing** — `jsii-pacmak` uses snapshot tests to verify generated code
- **Compliance testing** — verifying kernel message traces match expected sequences
- **Test fixtures** — `jsii-calc` is a purpose-built library that exercises all jsii features

### The Compliance Suite

The compliance suite defines tests as:
1. A TypeScript reference implementation
2. Expected kernel message traces
3. Each language must re-implement and produce matching traces

---

## 12. Docker & CI/CD (For Build Infrastructure)

### What You Need to Know

- **Docker basics** — images, containers, Dockerfiles, multi-stage builds
- **`jsii/superchain`** — the Docker image containing ALL language toolchains for building jsii packages
- **GitHub Actions** — the CI system used by the jsii repo
- **CodePipeline/CodeBuild** — used for CDK's release pipeline

---

## 13. Suggested Learning Path

### Week 1-2: Foundations
1. Read the [jsii specification](https://aws.github.io/jsii/specification/1-introduction) (all 6 sections)
2. Read `docs/jsii-architecture-reference.md` in this repo
3. Build the repo locally (`yarn install && yarn build`)
4. Run the kernel tests (`cd packages/@jsii/kernel && yarn test`)

### Week 3-4: The Compiler & Assembly
1. Look at a `.jsii` file from `jsii-calc` — understand every field
2. Read `packages/@jsii/spec/src/assembly.ts` — the schema definition
3. Trace how the compiler (in `aws/jsii-compiler` repo) produces the assembly
4. Modify a type in `jsii-calc` and see how the assembly changes

### Week 5-6: The Runtime
1. Add `console.log` statements to `@jsii/kernel` and watch the IPC
2. Write a simple TypeScript class, compile with jsii, generate Python bindings
3. Run the Python code and trace the kernel messages
4. Read one host runtime library (Python is most readable)

### Week 7-8: Code Generation
1. Pick one target in `jsii-pacmak` (start with Python — it's the most straightforward)
2. Trace how a class in `jsii-calc` becomes Python code
3. Understand the `codemaker` utility
4. Try adding a small feature or fixing a bug in one generator

### Ongoing
- Run the compliance tests for different languages
- Read RFCs in `awslabs/aws-cdk-rfcs` for design context
- Review PRs to understand common change patterns

---

## 14. Key Documentation Links

| Resource | URL |
|----------|-----|
| jsii Documentation Site | https://aws.github.io/jsii |
| jsii Specification | https://aws.github.io/jsii/specification/1-introduction |
| jsii Compiler Repo | https://github.com/aws/jsii-compiler |
| jsii Rosetta Repo | https://github.com/aws/jsii-rosetta |
| CDK RFCs | https://github.com/aws/aws-cdk-rfcs |
| TypeScript Handbook | https://www.typescriptlang.org/docs/handbook/intro.html |
| TypeScript Compiler API | https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API |
| Node.js API Docs | https://nodejs.org/api/ |
| CONTRIBUTING.md | In this repo's root |

---

## 15. Glossary

| Term | Definition |
|------|-----------|
| **Assembly** | The `.jsii` JSON file describing a module's API |
| **FQN** | Fully Qualified Name — e.g., `aws-cdk-lib.Stack` |
| **Host** | The process running user code (JVM, .NET, Python, Go) |
| **Kernel** | The node.js process running the actual JavaScript |
| **Struct** | A data-only interface (no `I` prefix, all `readonly`, no methods) |
| **Behavioral Interface** | A traditional OOP interface (prefixed with `I`) |
| **pacmak** | Package Maker — the code generator |
| **Rosetta** | The code snippet transliterator |
| **Superchain** | Docker image with all language toolchains |
| **Callback** | When the kernel needs the host to execute overridden code |
| **Override** | A method/property implemented in the host language instead of JS |
| **Slugification** | Renaming reserved keywords to avoid conflicts (e.g., `import_` in Python) |
| **By-ref** | Object passed as a reference handle (class instances) |
| **By-value** | Object copied across the boundary (structs, primitives, collections) |
| **Compliance Suite** | Normative test cases all language runtimes must pass |
| **Target** | A language that jsii generates code for |
