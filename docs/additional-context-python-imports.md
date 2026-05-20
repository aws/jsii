# Additional Context: Python Import Concepts

This section provides background on the Python import mechanisms referenced in this design document. It is intended for readers who primarily work in TypeScript/JavaScript and may not be familiar with Python's module system.

---

## The Problem Statement (Expanded)

When a Python user runs any CDK CLI command (`cdk synth`, `cdk deploy`, `cdk diff`), the CLI spawns `python3 app.py`. The first line of that file is typically:

```python
from aws_cdk import App, Stack, aws_s3
```

This single line takes **~6 seconds** to execute because of how the generated `aws_cdk/__init__.py` is structured. The file eagerly imports all ~300 submodules at the bottom via `from . import aws_s3`, `from . import aws_lambda`, etc. — even though the user only needs one or two of them. Every CDK command pays this 6-second tax before doing any useful work.

The fix changes the code generator (jsii-pacmak) to emit a **lazy loading pattern** instead, so submodules are only imported when actually accessed. The user's code doesn't change at all — they just get faster imports after upgrading.

---

## What is `__init__.py`?

In Python, a directory becomes an importable **package** when it contains a file named `__init__.py`. When you write `import aws_cdk`, Python finds the `aws_cdk/` directory and executes `aws_cdk/__init__.py` top-to-bottom. Whatever names (classes, functions, variables) are defined in that file become attributes of the `aws_cdk` module.

This is roughly analogous to a TypeScript barrel file (`index.ts`) that re-exports from submodules — except Python actually **executes** the file at import time rather than just resolving static declarations.

**Source:** [Python docs — Packages](https://docs.python.org/3/tutorial/modules.html#packages)

---

## How `from ... import ...` Works (The `from` Form)

The `from` form of import is the most relevant to this design because it's what triggers `__getattr__`. It uses a different (more complex) process than plain `import`.

### The Algorithm

The Python docs define the `from` form as a two-phase process:

> 1. Find the module specified in the `from` clause, loading and initializing it if necessary
> 2. For each of the identifiers specified in the `import` clauses:
>    - Check if the imported module has an **attribute** by that name
>    - If not, attempt to **import a submodule** with that name and then check the imported module again for that attribute
>    - If the attribute is not found, `ImportError` is raised
>    - Otherwise, a reference to that value is stored in the current namespace

**Source:** [Python docs — The import statement](https://docs.python.org/3/reference/simple_stmts.html#the-import-statement)

### Step-by-Step: `from aws_cdk import App, Stack, aws_s3`

Let's trace what happens:

**Phase 1 — Load the `from` module:**
1. Python loads `aws_cdk` (finds `aws_cdk/`, executes `aws_cdk/__init__.py`)
2. The `aws_cdk` module object is now available (but NOT bound in the caller's namespace yet)

**Phase 2 — Resolve each name:**

For `App`:
1. Check: does `aws_cdk` have an attribute `App`? → Yes (it's a class defined in `__init__.py`)
2. Bind `App` in the caller's namespace

For `Stack`:
1. Check: does `aws_cdk` have an attribute `Stack`? → Yes
2. Bind `Stack` in the caller's namespace

For `aws_s3`:
1. Check: does `aws_cdk` have an attribute `aws_s3`?
   - **With eager imports:** Yes — it was loaded by `from . import aws_s3` at the bottom of `__init__.py`
   - **With lazy imports:** No — it's not in `__dict__` yet, so Python calls `__getattr__("aws_s3")`, which imports it on demand
2. Bind `aws_s3` in the caller's namespace

### The Attribute Check is Key

The critical detail is step 2's "check if the imported module has an **attribute** by that name." This is a `getattr()` call on the module object. For modules that define `__getattr__` (PEP 562), this triggers the custom `__getattr__` function when the name isn't found in `__dict__`.

This is exactly why our lazy loading works with `from aws_cdk import aws_s3` — Python's `from` import machinery does an attribute lookup, which triggers our `__getattr__`, which does the lazy import.

### The Fallback: Submodule Import Attempt

If the attribute check fails (and there's no `__getattr__`, or `__getattr__` raises `AttributeError`), Python has a **fallback**: it attempts to import a submodule with that name. This is implemented in CPython's `_handle_fromlist()` function, which is called when `__import__()` receives a non-empty `fromlist`.

The pseudocode is roughly:

```python
# CPython's _handle_fromlist (simplified)
def _handle_fromlist(module, fromlist, import_func):
    for name in fromlist:
        if not hasattr(module, name):       # ← triggers __getattr__ if defined
            # Fallback: try importing as a submodule
            try:
                import_func(f"{module.__name__}.{name}")
            except ImportError:
                raise ImportError(f"cannot import name '{name}' from '{module.__name__}'")
    return module
```

**Source:** [CPython internals — `PyImport_ImportModuleLevelObject`](https://pythondev.readthedocs.io/import.html)

### The `hasattr` → `__getattr__` Connection

The `hasattr(module, name)` call in `_handle_fromlist` is what connects the `from` import to PEP 562. In Python, `hasattr(obj, name)` is equivalent to:

```python
try:
    getattr(obj, name)
    return True
except AttributeError:
    return False
```

So `hasattr(aws_cdk, "aws_s3")` calls `getattr(aws_cdk, "aws_s3")`, which:
1. Checks `aws_cdk.__dict__` — not found (lazy loading, not imported yet)
2. Calls `aws_cdk.__getattr__("aws_s3")` — our lazy loader imports it and returns the module
3. `hasattr` returns `True` — the fallback submodule import is never reached

This means with our `__getattr__` in place, the fallback path is never taken. The attribute check succeeds on the first try because `__getattr__` handles it.

### What `from . import aws_s3` Does (Relative Form)

The statement `from . import aws_s3` inside `aws_cdk/__init__.py` is a **relative import**. The dot (`.`) means "from the current package." The process is the same as above, but the `from` clause resolves relative to the current package:

1. The `.` resolves to the current package (`aws_cdk`)
2. Python checks if `aws_cdk` has an attribute `aws_s3`
3. If not, it attempts to import `aws_cdk.aws_s3` as a submodule
4. The submodule is loaded (its `__init__.py` is executed) and bound as an attribute on the parent

This is the mechanism that causes the current slowness: the generated `__init__.py` has ~300 of these `from . import <submodule>` statements, and Python executes each one sequentially, loading thousands of class definitions.

**Source:** [Python docs — The import system, §5.7 Package Relative Imports](https://docs.python.org/3/reference/import.html#package-relative-imports)

### The `from ... import *` Case

When the identifier list is replaced by `*`:

```python
from aws_cdk import *
```

Python checks the module's `__all__` variable. If defined, it imports each name listed in `__all__`. Each name goes through the same attribute-check-then-fallback process described above. Since our `__all__` includes submodule names, and our `__getattr__` handles them, `from aws_cdk import *` lazily loads all submodules (which is the same end result as eager loading, just triggered differently).

**Source:** [Python docs — The import statement](https://docs.python.org/3/reference/simple_stmts.html#the-import-statement)

### Bytecode-Level: What the Compiler Generates

At the bytecode level, `from aws_cdk import aws_s3` compiles to two instructions:

```
IMPORT_NAME  aws_cdk    (with fromlist=('aws_s3',))
IMPORT_FROM  aws_s3     (getattr on the module)
```

The `IMPORT_NAME` instruction calls `__import__("aws_cdk", fromlist=("aws_s3",))`. The non-empty `fromlist` tells CPython to call `_handle_fromlist()` after loading the module, which does the attribute lookup. The `IMPORT_FROM` instruction then does a final `getattr()` on the loaded module to get the specific name.

**Source:** [CPython internals — IMPORT_NAME bytecode](https://pythondev.readthedocs.io/import.html)

### Summary Table: `from` Import Variants

| Statement | What Python does | Triggers `__getattr__`? |
|---|---|---|
| `from aws_cdk import App` | Load `aws_cdk`, get attribute `App` | Only if `App` not in `__dict__` |
| `from aws_cdk import aws_s3` | Load `aws_cdk`, get attribute `aws_s3` | Yes (with lazy loading) |
| `from . import aws_s3` (inside `__init__.py`) | Resolve `.` to current package, get attribute `aws_s3` | Yes (with lazy loading) |
| `from aws_cdk import *` | Load `aws_cdk`, get each name in `__all__` | Yes, for submodule names |
| `from aws_cdk.aws_s3 import Bucket` | Load `aws_cdk`, load `aws_cdk.aws_s3`, get attribute `Bucket` | No — dotted `from` clause uses import system directly |

---

## What is `__getattr__` on a Module? (PEP 562)

Since Python 3.7, you can define a function called `__getattr__` at the **module level** (not inside a class). Python calls this function when someone accesses an attribute on the module that doesn't already exist in the module's namespace.

The lookup order is:
1. Check the module's `__dict__` (its global namespace — all variables, functions, classes defined in the file)
2. If not found, call `__getattr__(name)` if it exists
3. If `__getattr__` raises `AttributeError`, Python raises `AttributeError` to the caller

This is the hook that enables lazy loading: instead of importing all submodules upfront, we define `__getattr__` to import them on-demand when first accessed.

**TypeScript analogy:** Think of it like a JavaScript `Proxy` with a `get` trap on the module object — it intercepts property access for names that don't exist yet.

**Source:** [Python docs — Customizing module attribute access](https://docs.python.org/3/reference/datamodel.html#customizing-module-attribute-access)  
**Source:** [PEP 562 – Module `__getattr__` and `__dir__`](https://peps.python.org/pep-0562/)

---

## What is `importlib.import_module()`?

`importlib.import_module(name, package=None)` is the programmatic way to import a module in Python. It accepts the module name as a string and returns the module object.

- **Absolute import:** `importlib.import_module("aws_cdk.aws_s3")` — imports by full path
- **Relative import:** `importlib.import_module(".aws_s3", "aws_cdk")` — imports `.aws_s3` relative to the `aws_cdk` package

We use the relative form because it mirrors the semantics of `from . import aws_s3` and works correctly regardless of how the package is installed (pip, editable install, bazel, etc.).

The key difference from a regular `import` statement is that the module name can be a **variable** — which is what makes dynamic/lazy importing possible.

**Source:** [Python docs — `importlib.import_module()`](https://docs.python.org/3/library/importlib.html#importlib.import_module)

---

## What is `globals()`?

`globals()` returns a dictionary representing the current module's global namespace. It is a **live reference** — modifying it actually modifies the module's namespace.

When we write `globals()[name] = mod` inside `__getattr__`, we are adding the imported module to the module's namespace. On the next access, Python finds it in step 1 of the lookup order (checking `__dict__`) and never calls `__getattr__` again for that name. This is the caching mechanism.

**TypeScript analogy:** It's like assigning to `module.exports[name]` at runtime — the name becomes a permanent property of the module.

**Source:** [Python docs — `globals()`](https://docs.python.org/3/library/functions.html#globals)

---

## What is `__dir__` on a Module?

When someone calls `dir(module)` in Python (used by IDEs for tab-completion and introspection), Python calls the module's `__dir__()` function if defined. Without it, `dir()` only shows names currently in the module's `__dict__` — which would exclude lazily-loaded submodules that haven't been accessed yet.

By defining `__dir__` to return `[*__all__, *_SUBMODULES]`, we ensure that IDE autocomplete and interactive exploration still show all available submodules even before they're loaded.

**Source:** [Python docs — Customizing module attribute access](https://docs.python.org/3/reference/datamodel.html#customizing-module-attribute-access)

---

## What is `__all__`?

`__all__` is a module-level list of strings that defines which names are exported when someone writes `from module import *`. It serves as the module's public API declaration.

In the generated code, `__all__` includes both the classes defined in the module (like `App`, `Stack`) and the submodule names (like `aws_s3`, `aws_lambda`). When Python processes `from aws_cdk import *`, it accesses each name in `__all__`, which triggers `__getattr__` for any submodule names not yet loaded.

**Source:** [Python docs — The import system, §5.4.2 Importing * from a package](https://docs.python.org/3/reference/import.html#importing-from-a-package)

---

## What is `publication.publish()`?

[`publication`](https://pypi.org/project/publication/) is a third-party Python package used in jsii-generated code. Calling `publication.publish()` replaces the current module object in `sys.modules` with a new one that only exposes names listed in `__all__`. This hides internal/private names (those with underscore prefixes like `_importlib`, `_SUBMODULES`) from `dir()` and tab-completion.

**Important for this design:** Because `publication.publish()` replaces the module object, any `__getattr__` or `__dir__` defined on the original module won't be visible on the replacement. That's why the generated code uses `setattr(sys.modules[__name__], "__getattr__", __getattr__)` to explicitly install these functions on the public module after defining them.

**Source:** [PyPI — publication](https://pypi.org/project/publication/)

---

## What is `typing.TYPE_CHECKING`?

`typing.TYPE_CHECKING` is a special constant in Python's `typing` module. It is `False` at runtime but assumed to be `True` by static type checkers (pyright, mypy). This allows you to write imports that only exist for the benefit of type checkers without incurring any runtime cost:

```python
import typing

if typing.TYPE_CHECKING:
    from . import aws_s3 as aws_s3  # only visible to type checkers
```

We use this pattern so that pyright/mypy can "see" the submodule names statically (for autocomplete and type checking) while preserving lazy loading at runtime.

**Source:** [Python docs — `typing.TYPE_CHECKING`](https://docs.python.org/3/library/typing.html#typing.TYPE_CHECKING)  
**Source:** [PEP 781 – Make TYPE_CHECKING a built-in constant](https://peps.python.org/pep-0781/) (background on its purpose)

---

## What is `sys.modules`?

`sys.modules` is a dictionary that Python uses as a **cache** for all imported modules. The keys are module names (strings) and the values are module objects. When you import a module, Python first checks `sys.modules` — if the module is already there, it returns the cached version without re-executing the file.

This is relevant because:
1. `publication.publish()` replaces the module object in `sys.modules` (see above)
2. `importlib.import_module()` respects `sys.modules` caching — calling it twice for the same module doesn't re-execute the file

**Source:** [Python docs — The import system, §5.3.1 The module cache](https://docs.python.org/3/reference/import.html#the-module-cache)

---

## How `import aws_cdk.aws_s3` (Dotted Import) Works

When you write a dotted import like `import foo.bar.baz`, Python performs a **chain of imports** — it imports each component left-to-right:

1. Import `foo` (find `foo/`, execute `foo/__init__.py`)
2. Import `foo.bar` (find `foo/bar/`, execute `foo/bar/__init__.py`)
3. Import `foo.bar.baz` (find `foo/bar/baz/`, execute `foo/bar/baz/__init__.py`)

After all components are loaded, Python binds only the **top-level name** (`foo`) in the local namespace. You access the rest via attribute access on that name:

```python
import foo.bar.baz         # foo, foo.bar, and foo.bar.baz are all imported
                           # only 'foo' is bound in local namespace
foo.bar.baz.something()    # access via the chain
```

The Python docs describe this explicitly:

> *"If the module being imported is not a top level module, then the name of the top level package that contains the module is bound in the local namespace as a reference to the top level package. The imported module must be accessed using its full qualified name rather than directly."*

**Source:** [Python docs — The import statement](https://docs.python.org/3/reference/simple_stmts.html#the-import-statement)

### The Submodule Binding Rule

A critical invariant of Python's import system: **when a submodule is loaded, a binding is placed in the parent module's namespace pointing to the submodule object.** The docs state:

> *"When a submodule is loaded using any mechanism (e.g. importlib APIs, the import or import-from statements, or built-in `__import__()`), a binding is placed in the parent module's namespace to the submodule object."*

So after `import aws_cdk.aws_s3`:
- `sys.modules['aws_cdk']` exists (the parent)
- `sys.modules['aws_cdk.aws_s3']` exists (the submodule)
- `aws_cdk.aws_s3` is set as an attribute on the `aws_cdk` module object

**Source:** [Python docs — The import system, §5.4.2 Submodules](https://docs.python.org/3/reference/import.html#submodules)

### Why Dotted Imports Bypass `__getattr__`

The dotted import (`import aws_cdk.aws_s3`) does **not** go through `__getattr__`. Python's import machinery resolves the subpackage directly — it looks for the `aws_s3/` directory on disk, executes its `__init__.py`, and places the binding on the parent module. This is handled by the import system itself, not by attribute access on the module object.

`__getattr__` only fires for **attribute access** on an already-imported module:
- `aws_cdk.aws_s3` (attribute access after `import aws_cdk`) → triggers `__getattr__("aws_s3")`
- `from aws_cdk import aws_s3` → Python checks the module for the attribute `aws_s3`, which triggers `__getattr__("aws_s3")`

It does **not** fire for:
- `import aws_cdk.aws_s3` → Python's import system resolves this directly via filesystem lookup

### How `from aws_cdk import aws_s3` Works

The `from ... import` form uses a different process than plain `import`. The Python docs describe it as:

1. Find the module specified in the `from` clause, loading and initializing it if necessary
2. For each identifier in the `import` clause:
   - Check if the imported module has an attribute by that name
   - If not, attempt to import a submodule with that name, then check again
   - If still not found, raise `ImportError`

So `from aws_cdk import aws_s3` first loads `aws_cdk`, then looks for `aws_s3` as an attribute. With lazy loading, `aws_s3` isn't in the namespace yet, so Python calls `__getattr__("aws_s3")`, which triggers the lazy import.

**Source:** [Python docs — The import statement](https://docs.python.org/3/reference/simple_stmts.html#the-import-statement)

### Why This Matters for Our Design

Because dotted imports bypass `__getattr__` entirely, our lazy loading code doesn't need to handle them — they "just work" via Python's built-in import machinery. The three common import patterns all work correctly:

| Pattern | Mechanism | Goes through `__getattr__`? |
|---|---|---|
| `import aws_cdk.aws_s3` | Python import system resolves directly | No |
| `from aws_cdk import aws_s3` | Attribute lookup on `aws_cdk` module | Yes |
| `import aws_cdk; aws_cdk.aws_s3` | Attribute access on module object | Yes |

**Source:** [Python docs — The import system, §5.4.2 Submodules](https://docs.python.org/3/reference/import.html#submodules)

---

## Summary: TypeScript ↔ Python Analogy Table

| Python Concept | TypeScript/JS Equivalent |
|---|---|
| `__init__.py` | `index.ts` barrel file |
| `from . import aws_s3` | `export * from './aws_s3'` (but executes at runtime) |
| `__getattr__` on module | `Proxy` with `get` trap on module exports |
| `importlib.import_module()` | Dynamic `import()` / `require()` |
| `globals()[name] = mod` | `module.exports[name] = mod` |
| `__all__` | Explicit `export` declarations |
| `sys.modules` | Node.js `require.cache` |
| `typing.TYPE_CHECKING` | TypeScript's type-only imports (`import type`) |
| `publication.publish()` | No direct equivalent — imagine a post-processing step that strips non-exported names from the module |
