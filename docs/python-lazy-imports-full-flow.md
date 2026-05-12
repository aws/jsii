# Python Lazy Imports: Complete Onboarding Guide

Everything you need to understand the problem, the system, and the fix.

---

## Part 1: What is AWS CDK?

AWS CDK (Cloud Development Kit) is a framework that lets developers define cloud infrastructure using programming languages instead of writing YAML/JSON templates. You write code like:

```python
bucket = aws_s3.Bucket(self, "MyBucket", versioned=True)
```

And CDK turns that into a CloudFormation template that AWS uses to create the actual S3 bucket. The process of turning your code into a template is called **synthesis** (`cdk synth`).

---

## Part 2: What is jsii?

CDK is written in **TypeScript**. But AWS wants customers to use CDK in Python, Java, C#, and Go too. Rather than maintaining 5 separate codebases, they built **jsii** — a system that:

1. Takes the TypeScript CDK library
2. Generates wrapper libraries in each target language
3. At runtime, the Python/Java/C#/Go code talks to the actual TypeScript code running in a Node.js process behind the scenes

So when a Python user writes `aws_s3.Bucket(self, "MyBucket")`, under the hood:
- The Python `Bucket` class is a thin wrapper
- It sends a message to a Node.js child process: "create a Bucket object with these args"
- Node.js runs the real TypeScript `Bucket` constructor
- The result is sent back to Python

---

## Part 3: What is jsii-pacmak?

**pacmak** = "package maker." It's the tool that generates the Python/Java/C#/Go wrapper libraries from the TypeScript source. It reads a `.jsii` file (a JSON manifest describing every class, method, property, and enum in the TypeScript library) and outputs source code in each target language.

For Python specifically, it generates a directory full of `__init__.py` files — one per module — containing Python class definitions that delegate to the jsii runtime.

---

## Part 4: The Two Repos

| Repo | What it contains | Your role |
|---|---|---|
| `aws-cdk` (GitHub) | The CDK library in TypeScript + the `.jsii` assembly | You don't modify this |
| `jsii` (this workspace) | jsii-pacmak, the code generator | **You modify this** |

You change the generator here, and the next CDK release automatically picks up the new pacmak, regenerates the Python package with lazy imports, publishes to PyPI, and users get faster imports without changing their code.

---

## Part 5: Your Lead's Onboarding Instructions (Explained)

Your lead gave you three phases:

### Phase 1: SEE THE USER POV

**What your lead said:**
> Start a new Python CDK project:
> `$ npx cdk@latest init --language=python`
> Run it and see how slow it is. Specifically the import aws_cdk line. Familiarize yourself with virtual envs.

**What this means:**

The goal is to feel the problem firsthand. It's one thing to be told "imports are slow" — it's another to sit there watching your terminal hang for 6 seconds on a single `import` statement.

**The commands (full sequence):**

```bash
$ mkdir my-project
$ cd my-project
$ npx cdk@latest init app --language=python
$ source .venv/bin/activate
$ python -m pip install -r requirements.txt
$ time python -c "import aws_cdk"    # ← feel the pain
```

Note: `npx cdk@latest init --language=python` and the official docs' `cdk init app --language python` do the same thing. `npx cdk@latest` runs the CDK CLI without installing it globally. `app` is the default template so omitting it is fine.

**What `cdk init` creates:**

```
my-project/
├── app.py                          ← entry point, has "import aws_cdk"
├── cdk.json                        ← CDK config
├── requirements.txt                ← says "install aws-cdk-lib"
├── requirements-dev.txt
├── .venv/                          ← Python virtual environment
├── .gitignore
├── README.md
├── source.bat
├── tests/
│   └── unit/
│       └── test_my_project_stack.py
└── my_project/                     ← your app's Python package
    ├── __init__.py
    └── my_project_stack.py         ← your stack definition
```

The subdirectory (`my_project/`) uses your project folder's name with hyphens converted to underscores (Python identifiers can't have hyphens).

**What is a virtual environment?**

A Python virtual environment (`.venv/`) is an isolated directory where pip installs packages. It keeps your project's dependencies separate from your system Python. You activate it with `source .venv/bin/activate`. After that, `pip install` puts packages into `.venv/lib/python3.x/site-packages/` instead of your global Python.

**What you observed:**

```
$ time python -c "import aws_cdk"
python -c "import aws_cdk"  4.35s user 1.65s system 98% cpu 6.111 total
```

6.1 seconds for a single import. For comparison, `import json` takes ~0.02s and `import boto3` takes ~0.3s. CDK is 20x slower than boto3 and 300x slower than a standard library module.

Every `cdk synth`, `cdk deploy`, `cdk diff` pays this tax before doing anything useful.

---

### Phase 2: SEE THE BUILD POV

**What your lead said:**
> Check out the CDK repository and build at least up to aws-cdk-lib:
> `$ yarn`
> `$ npx nx run aws-cdk-lib:build`
> Run pacmak to generate the Python code:
> `$ npx jsii-pacmak --targets python --code-only`
> Then have a look at what it generated in dist/python.

**What this means:**

You're looking at the **producer** side. The question is: where did that installed package come from? How was it built?

**Step by step:**

1. **`yarn`** — The CDK repo is a monorepo (one git repo, hundreds of packages). `yarn` installs all Node.js dependencies. Like `pip install` but for the whole project.

2. **`npx nx run aws-cdk-lib:build`** — Compiles `aws-cdk-lib` from TypeScript. This produces:
   - Compiled JavaScript (`.js` files)
   - A **`.jsii` assembly file** — a massive JSON file (~50MB) describing every public type in the library

3. **`npx jsii-pacmak --targets python --code-only`** — Reads the `.jsii` assembly and generates a complete Python package. `--targets python` means "only Python." `--code-only` means "just generate `.py` files, don't package into a wheel."

**What it generates in `dist/python/`:**

```
dist/python/src/aws_cdk/
├── __init__.py              ← the root module (the slow one)
├── _jsii/
│   └── __init__.py          ← assembly loader
├── aws_s3/
│   └── __init__.py          ← S3 constructs
├── aws_lambda/
│   └── __init__.py          ← Lambda constructs
├── aws_ec2/
│   └── __init__.py          ← EC2 constructs
└── ... (~300 more directories)
```

This is the **exact same code** that ends up on PyPI and gets installed into users' virtual environments. The package published to PyPI is just this generated code, packaged up.

**The key insight:** The Python code users install was NOT written by a human. It was generated by jsii-pacmak. To fix the slowness, you don't edit the Python files — you edit the TypeScript program that generates them.

**Shortcut:** You can skip cloning the CDK repo for now. The generated output is already in your Phase 1 project at `.venv/lib/python3.x/site-packages/aws_cdk/`. It's the same code.

---

### Phase 3: TRACE THIS BACK TO SOURCE

**What your lead said:**
> Go and find the source for jsii-pacmak's Python generation and go peruse it. See how it maps to the code you saw in dist/python (and potentially in .venv/site-packages/python3.13/aws_cdk of your example project if you care to look)

**What this means:**

Connect the dots: which line of TypeScript code in jsii-pacmak produced which line of Python output?

**The generator file:**

```
packages/jsii-pacmak/lib/targets/python.ts
```

This is ~3500 lines of TypeScript. The key class is `PythonModule`, which represents one Python module (one `__init__.py` file).

**How the generator works:**

It uses a `CodeMaker` object (called `code`) that's a string builder with indentation tracking:

```typescript
code.line('import abc');           // writes: import abc
code.line('import builtins');      // writes: import builtins
code.openBlock('class Foo');       // writes: class Foo:  (and increases indent)
code.line('pass');                 // writes:     pass
code.closeBlock();                 // decreases indent
```

**The specific code that causes the problem (line ~1929 in python.ts):**

```typescript
// Finally, we'll load all registered python modules
if (this.modules.length > 0) {
  code.line(
    '# Loading modules to ensure their types are registered with the jsii runtime library',
  );
  for (const module of this.modules.sort((l, r) =>
    l.pythonName.localeCompare(r.pythonName),
  )) {
    const submodule = module.pythonName.substring(
      this.pythonName.length + 1,
    );
    code.line(`from . import ${submodule}`);
  }
}
```

This loop iterates over every child module (~300 for aws-cdk-lib) and writes `from . import <name>` for each one. That's what produces the 300+ eager import lines at the bottom of `aws_cdk/__init__.py`.

**The mapping:**

| TypeScript generator code | Generated Python output |
|---|---|
| `code.line('import abc')` | `import abc` |
| `code.line('import jsii')` | `import jsii` |
| `code.line('publication.publish()')` | `publication.publish()` |
| `code.line(\`from . import ${submodule}\`)` in a loop | `from . import aws_s3`<br>`from . import aws_lambda`<br>`from . import aws_ec2`<br>... |

---

## Part 6: The User's Flow (What Happens When They Run `cdk synth`)

### The user has this file:

```python
# app.py
from aws_cdk import App, Stack, aws_s3

class MyStack(Stack):
    def __init__(self, scope, id):
        super().__init__(scope, id)
        aws_s3.Bucket(self, "MyBucket")

app = App()
MyStack(app, "MyStack")
app.synth()
```

### They run:

```bash
$ cdk synth
```

### Step 1: CDK CLI starts

`cdk` is a Node.js program. It reads `cdk.json` which says:

```json
{ "app": "python3 app.py" }
```

So the CDK CLI spawns a child process: `python3 app.py`

### Step 2: Python starts executing `app.py`

Python reads the first line:

```python
from aws_cdk import App, Stack, aws_s3
```

To execute this, Python needs to find and load the `aws_cdk` module.

### Step 3: Python finds `aws_cdk`

Python looks in `.venv/lib/python3.x/site-packages/` and finds the `aws_cdk/` directory. It opens `aws_cdk/__init__.py` and starts executing it **top to bottom**.

### Step 4: Python executes `aws_cdk/__init__.py`

This file is ~50,000 lines long. Here's what's in it (simplified):

```python
# Line 1-10: standard imports
import abc
import builtins
import typing
import jsii
import publication

# Line 11-45000: class definitions for root-level types
class App:
    def __init__(self, ...): jsii.create(...)

class Stack:
    def __init__(self, ...): jsii.create(...)

class CfnOutput:
    ...

# ... thousands more classes ...

# Line 45001: export list
__all__ = ["App", "Stack", "CfnOutput", "aws_s3", "aws_lambda", ...]

# Line 45002: hide non-public names
publication.publish()

# Line 45003-45300: THE PROBLEM
from . import aws_accessanalyzer    # ← Python goes and loads this entire module
from . import aws_acmpca            # ← and this one
from . import aws_amplify           # ← and this one
from . import aws_apigateway        # ← and this one
# ... 300+ more lines like this
from . import aws_s3                # ← the user actually needs this one
# ... more ...
from . import aws_xray              # ← and this one too
```

### Step 5: What happens at each `from . import` line

When Python hits `from . import aws_s3`, it:

1. Opens `aws_cdk/aws_s3/__init__.py`
2. Executes it top to bottom
3. That file defines ~200 classes (Bucket, BucketPolicy, CfnBucket, CfnBucketPolicy, etc.)
4. Each class definition triggers jsii registration (telling the jsii runtime "this Python class maps to this TypeScript type")
5. Returns back to `aws_cdk/__init__.py` and moves to the next line

This happens **for every single `from . import` line**. 300+ times. Each submodule has dozens to hundreds of classes. Total: thousands of class definitions, thousands of jsii registrations.

**The user only needed `App`, `Stack`, and `aws_s3`. But Python loaded all 300+ submodules because the `__init__.py` told it to.**

### Step 6: Python finally finishes loading `aws_cdk`

After 6 seconds, Python has executed all 300+ imports. Now it returns to `app.py` and resolves the names the user asked for: `App`, `Stack`, `aws_s3`. These are now available.

### Step 7: User code runs

```python
app = App()                              # sends "create App" to Node.js
MyStack(app, "MyStack")                  # sends "create Stack" to Node.js
aws_s3.Bucket(self, "MyBucket")          # sends "create Bucket" to Node.js
app.synth()                              # tells Node.js to produce CloudFormation
```

Each of these calls goes through the jsii runtime to Node.js, which runs the real TypeScript code and produces a CloudFormation template.

### Step 8: Output

The CDK CLI receives the CloudFormation template from the Python process and prints it (or deploys it).

### Where the 6 seconds went

| Time | What's happening |
|---|---|
| 0.0s - 0.1s | Python starts, finds `aws_cdk` |
| 0.1s - 0.5s | Executes root-level class definitions (App, Stack, etc.) |
| 0.5s - 6.0s | **Loads 300+ submodules the user never asked for** |
| 6.0s - 6.1s | User code actually runs |

---

## Part 7: The Build Pipeline (Producer Side)

This is how the Python package gets created and published:

```
TypeScript source code (hand-written by CDK team)
        │
        ▼
   tsc + jsii compiler
        │
        ▼
   .jsii assembly (JSON manifest of the entire API — ~50MB)
        │
        ▼
   jsii-pacmak (code generator — THIS IS WHAT YOU'RE MODIFYING)
        │
        ▼
   Python source code (generated, not hand-written)
        │
        ▼
   wheel/sdist (packaged for PyPI)
        │
        ▼
   pip install (what users get)
```

### What the .jsii assembly contains

A machine-readable catalog of every public type:

```json
{
  "fqn": "aws-cdk-lib.aws_s3.Bucket",
  "kind": "class",
  "name": "Bucket",
  "initializer": {
    "parameters": [
      { "name": "scope", "type": { "fqn": "constructs.Construct" } },
      { "name": "id", "type": { "primitive": "string" } }
    ]
  },
  "properties": [
    { "name": "bucketArn", "type": { "primitive": "string" }, "immutable": true }
  ]
}
```

### What pacmak generates from it

```python
class Bucket(Resource):
    def __init__(self, scope: Construct, id: str) -> None:
        jsii.create(self.__class__, self, [scope, id])

    @property
    def bucket_arn(self) -> str:
        return jsii.get(self, "bucketArn")
```

The generated Python class is a **puppet**. It doesn't contain business logic. When you call `Bucket(scope, id)`, the Python code sends a message to Node.js saying "create a Bucket with these args." Node.js runs the real TypeScript implementation and sends back a reference.

---

## Part 8: What We're Changing

We're modifying the TypeScript loop in `packages/jsii-pacmak/lib/targets/python.ts` so that instead of generating:

```python
from . import aws_s3
from . import aws_lambda
from . import aws_ec2
# ... 300+ more
```

It generates:

```python
import importlib as _importlib

_SUBMODULES = {"aws_s3", "aws_lambda", "aws_ec2", ...}

def __getattr__(name):
    if name in _SUBMODULES:
        mod = _importlib.import_module(f".{name}", __name__)
        globals()[name] = mod
        return mod
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

def __dir__():
    return [*__all__, *_SUBMODULES]
```

### How this changes the user's experience

With lazy loading, the user's `cdk synth` flow becomes:

1. Python executes `from aws_cdk import App, Stack, aws_s3`
2. Python opens `aws_cdk/__init__.py` and starts executing it
3. It defines root-level classes (`App`, `Stack`, etc.)
4. It defines `_SUBMODULES = {"aws_s3", "aws_lambda", ...}` and `__getattr__` — **no actual imports happen**
5. Python sees the user wants `aws_s3` → calls `__getattr__("aws_s3")` → imports just that one module
6. Done. **~0.2 seconds instead of 6.**

| Time | What's happening (after fix) |
|---|---|
| 0.0s - 0.1s | Python starts, finds `aws_cdk` |
| 0.1s - 0.2s | Executes root-level class definitions + defines `__getattr__` |
| 0.2s - 0.3s | Loads `aws_s3` only (because user asked for it) |
| 0.3s - 0.4s | User code runs |

6 seconds → 0.4 seconds. The user's code doesn't change at all.

---

## Part 9: Why the Eager Imports Existed in the First Place

The comment in the generated code says:

```python
# Loading modules to ensure their types are registered with the jsii runtime library
```

When the jsii runtime receives an object from Node.js (e.g., a method returns an `iam.Role`), it needs to know which Python class corresponds to `aws-cdk-lib.aws_iam.Role`. This mapping is built when each Python class is defined — the `@jsii.implements` decorator registers it.

The original thinking was: "load everything upfront so the runtime always knows about every type." This is correct but wasteful.

**Why lazy loading is safe:** By the time the jsii runtime needs to deserialize a type from `aws_s3`, the user must have already accessed `aws_s3` (otherwise how would they have gotten an `aws_s3.Bucket` in the first place?). So the module will already be imported and its types registered.

---

## Part 10: Summary

- **The problem:** `import aws_cdk` takes 6 seconds because it eagerly loads 300+ submodules
- **The root cause:** jsii-pacmak generates `from . import <submodule>` for every submodule
- **The fix:** Change pacmak to generate lazy loading (`__getattr__`) instead of eager imports
- **Where to fix it:** `packages/jsii-pacmak/lib/targets/python.ts`, the `PythonModule.emit()` method, lines ~1929-1946
- **Impact:** 6 seconds → ~0.4 seconds on every `cdk synth`/`deploy`/`diff`
- **User impact:** Zero. Their code doesn't change. They just get faster imports after upgrading.
