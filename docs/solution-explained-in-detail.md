# The Lazy Import Solution: Every Line Explained

This document explains every single line of the lazy loading solution in exhaustive detail, from basic Python concepts to the specific design choices made.

---

## The Complete Solution Code

```python
import importlib as _importlib

_SUBMODULES = {
    "aws_s3",
    "aws_lambda",
    "aws_ec2",
}

def __getattr__(name: str) -> object:
    if name in _SUBMODULES:
        mod = _importlib.import_module(f".{name}", __name__)
        globals()[name] = mod
        return mod
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

def __dir__() -> list[str]:
    return [*__all__, *_SUBMODULES]
```

---

## Line 1: `import importlib as _importlib`

### What `importlib` is

`importlib` is a Python standard library module that provides the programmatic interface to Python's import system. It lets you import modules using code (dynamically) rather than using the `import` statement.

Source: [Python docs — importlib](https://docs.python.org/3/library/importlib.html)

### Why `as _importlib` (the underscore prefix)

The `as _importlib` renames it with an underscore prefix. In Python, underscore-prefixed names are a convention meaning "private / internal." The `publication.publish()` call later in the file hides all names NOT in `__all__` from `dir()` and tab-completion. Since `_importlib` starts with an underscore and isn't in `__all__`, it becomes invisible to users.

Without the underscore, users doing `dir(aws_cdk)` would see `importlib` listed as if it were part of the CDK API. That would be confusing.

### Why we need it at all

We need `importlib.import_module()` to do the actual lazy import inside `__getattr__`. We can't use a regular `import` statement inside `__getattr__` because we need to do a **relative** import with a **dynamic** name (the name comes from the function parameter). The `import` statement requires the module name to be hardcoded at write time.

### Comparison to the old approach

In the old code, there was no `import importlib` because the imports were done with regular `from . import aws_s3` statements — no dynamic importing needed.

---

## Lines 3-7: `_SUBMODULES = {"aws_s3", "aws_lambda", "aws_ec2"}`

### What this is

A Python **set literal** containing strings. A set is an unordered collection of unique items. Looking up whether something is in a set is O(1) — instant, regardless of how many items are in the set.

### Why a set and not a list

With 300+ submodule names, we need fast lookup. `if name in _SUBMODULES` is called every time someone accesses an attribute that doesn't exist yet. With a set, this check is instant. With a list, Python would scan through all 300 items one by one.

### Why underscore prefix

Same reason as `_importlib` — it's an internal implementation detail, not part of the public API. Hidden by `publication.publish()`.

### What this replaces

Previously, there was no `_SUBMODULES` set. The submodule names only existed as part of the `from . import aws_s3` statements. Those statements both declared the names AND loaded the modules. Now we separate the two concerns: `_SUBMODULES` declares the names, and `__getattr__` loads them on demand.

### Why this is fast

Creating a set of 300 strings takes microseconds. No files are opened, no modules are loaded, no classes are defined. It's just storing text in memory.

---

## Line 9: `def __getattr__(name: str) -> object:`

### What `__getattr__` is (on a class)

You might know `__getattr__` from classes. On a class, it's a special method that Python calls when you access an attribute that doesn't exist:

```python
class Foo:
    def __getattr__(self, name):
        return f"you asked for {name}"

f = Foo()
print(f.xyz)  # prints "you asked for xyz"
```

### What `__getattr__` is (on a module) — PEP 562

Since Python 3.7, you can define `__getattr__` at the **module level** (not inside a class). Python calls it when someone accesses an attribute on the module that doesn't exist in the module's namespace.

Source: [PEP 562 – Module `__getattr__` and `__dir__`](https://www.python.org/dev/peps/pep-0562/)

### When does Python call it?

Python has a lookup order for module attributes:

1. First, check the module's `__dict__` (its global namespace — all variables, functions, classes defined in the file)
2. If not found there, call `__getattr__(name)` if it exists
3. If `__getattr__` raises `AttributeError`, Python raises `AttributeError` to the caller

### Why this is the key to lazy loading

When the file first executes, `aws_s3` is NOT in the module's namespace (because we didn't import it). So when someone writes `aws_cdk.aws_s3`, Python doesn't find `aws_s3` in step 1, and calls `__getattr__("aws_s3")` in step 2. That's our hook to load it on demand.

### Comparison to the old approach

In the old code, there was no `__getattr__`. There didn't need to be — all submodules were already loaded into the namespace by the `from . import` statements. `aws_s3` was always found in step 1.

---

## Line 10: `if name in _SUBMODULES:`

### What this does

Checks if the requested attribute name is one of our known submodules. This is a set membership test — O(1), instant.

### Why we need this check

`__getattr__` is called for ANY missing attribute, not just submodules. If someone writes `aws_cdk.nonexistent_thing`, we don't want to try importing it. We only want to lazily import names we know are valid submodules.

---

## Line 11: `mod = _importlib.import_module(f".{name}", __name__)`

### What `importlib.import_module` does

It imports a module by name and returns the module object. It's the programmatic equivalent of the `import` statement.

Source: [Python docs — importlib.import_module](https://docs.python.org/3/library/importlib.html#importlib.import_module)

### What `f".{name}"` means

This is an f-string (formatted string). If `name` is `"aws_s3"`, then `f".{name}"` becomes `".aws_s3"`.

The leading dot (`.`) means "relative import" — import from the current package. This is equivalent to `from . import aws_s3`.

### What `__name__` means

`__name__` is a built-in variable that every Python module has. It contains the module's fully qualified name. For `aws_cdk/__init__.py`, `__name__` is `"aws_cdk"`.

`importlib.import_module` needs this as the second argument to know what package the relative import is relative TO. It's saying: "import `.aws_s3` relative to the `aws_cdk` package."

### What this is equivalent to

```python
mod = _importlib.import_module(".aws_s3", "aws_cdk")
```

Which is equivalent to:

```python
from . import aws_s3
mod = aws_s3
```

### How Python caches imports (sys.modules)

When Python imports a module, it stores it in `sys.modules` (a global dictionary). If you import the same module again, Python returns the cached version from `sys.modules` without re-executing the file. This is Python's built-in import caching.

Source: [Python docs — The import system](https://docs.python.org/3/reference/import.html)

So `importlib.import_module` is safe to call multiple times — the second call just returns the cached module. But we add our own caching too (next line) to avoid even calling `__getattr__` a second time.

---

## Line 12: `globals()[name] = mod`

### What `globals()` is

`globals()` returns a dictionary representing the current module's global namespace. It's a live reference — modifying it actually modifies the module's namespace.

Source: [Python docs — globals()](https://docs.python.org/3/library/functions.html#globals)

For a module, `globals()` is the same as the module's `__dict__`. It contains every variable, function, and class defined at the module level.

### What this line does

It adds the imported module to the module's namespace. After `globals()["aws_s3"] = mod`, the module now has `aws_s3` as a regular attribute.

### Why this is "caching"

Remember Python's lookup order:
1. Check `__dict__` (globals)
2. If not found, call `__getattr__`

After we do `globals()[name] = mod`, the next time someone accesses `aws_cdk.aws_s3`, Python finds it in step 1 and **never calls `__getattr__` again** for that name. The lazy loading only happens once per submodule.

### How caching worked before (in the old approach)

In the old code with `from . import aws_s3`, Python automatically put `aws_s3` into the module's globals when the import statement executed. So it was "cached" from the start — but at the cost of loading everything upfront.

Our approach achieves the same end state (module in globals), but defers it until first access.

### Why not just rely on `sys.modules` caching?

`sys.modules` caching means `importlib.import_module` won't re-execute the file. But without `globals()[name] = mod`, Python would still call `__getattr__` every single time someone accesses `aws_cdk.aws_s3` (because it's not in the module's `__dict__`). That would add overhead on every access. By putting it in globals, we make subsequent accesses as fast as if we'd done the eager import.

---

## Line 13: `return mod`

### What this does

Returns the imported module to whoever asked for it. If the user wrote `aws_cdk.aws_s3.Bucket(...)`, Python called `__getattr__("aws_s3")`, we imported the module, cached it, and now return it. Python then continues with `.Bucket(...)` on the returned module.

---

## Line 14: `raise AttributeError(f"module {__name__!r} has no attribute {name!r}")`

### Why we raise an error

If someone accesses `aws_cdk.totally_fake_thing`, the name won't be in `_SUBMODULES`. We need to tell Python "this attribute doesn't exist." The way to do that is by raising `AttributeError`.

### Why specifically `AttributeError`

This is a Python protocol requirement. `__getattr__` MUST raise `AttributeError` for names it can't handle. Python relies on this:

- `hasattr(aws_cdk, "fake")` works by calling `__getattr__("fake")` and checking if it raises `AttributeError`. If it does, `hasattr` returns `False`. If we raised a different exception (like `ValueError`), `hasattr` would crash instead of returning `False`.
- `getattr(aws_cdk, "fake", default_value)` works the same way — it catches `AttributeError` and returns the default.

### Did the old code raise this error?

Not explicitly — but the behavior was the same. In the old code, if you accessed `aws_cdk.totally_fake_thing`, Python would look in the module's `__dict__`, not find it, and raise `AttributeError` automatically (since there was no `__getattr__` to call). Now we have `__getattr__`, so we need to raise the error ourselves for unknown names.

### What `{__name__!r}` means

The `!r` is a format specifier that adds quotes around the value. `__name__` is `"aws_cdk"`, so `{__name__!r}` produces `'aws_cdk'` (with quotes). The error message looks like:

```
AttributeError: module 'aws_cdk' has no attribute 'totally_fake_thing'
```

This matches Python's standard error message format for missing module attributes.

---

## Lines 16-17: `def __dir__() -> list[str]: return [*__all__, *_SUBMODULES]`

### What `__dir__` does on a module

When someone calls `dir(aws_cdk)`, Python calls the module's `__dir__()` function (if defined) to get the list of names to display.

Source: [PEP 562 – Module `__getattr__` and `__dir__`](https://www.python.org/dev/peps/pep-0562/)

### Why we need it

Without `__dir__`, `dir(aws_cdk)` would only show names that are currently in the module's `__dict__`. Since submodules aren't loaded yet, they wouldn't appear. Tab-completion in IPython/Jupyter and IDE autocomplete rely on `dir()`, so submodules would be invisible to developers exploring the API.

### What `[*__all__, *_SUBMODULES]` means

The `*` operator unpacks a collection into a list. This creates a new list containing all items from `__all__` plus all items from `_SUBMODULES`.

- `__all__` contains the public names (classes like `App`, `Stack`, plus submodule names)
- `_SUBMODULES` contains the submodule names

There's overlap (submodule names are in both), but that's fine — it's just a display list.

### Did the old code have `__dir__`?

No. It didn't need one because all submodules were already loaded into globals, so `dir()` naturally included them.

---

## Summary: Old vs New

| Aspect | Old (eager) | New (lazy) |
|---|---|---|
| How submodules are declared | `from . import aws_s3` (loads immediately) | `_SUBMODULES = {"aws_s3"}` (just a string) |
| When submodules are loaded | All at once, during `import aws_cdk` | One at a time, when first accessed |
| How loading is triggered | Python's `import` statement | `__getattr__` + `importlib.import_module` |
| How results are cached | Automatically in globals by `import` | Manually via `globals()[name] = mod` |
| How missing attrs are handled | Python raises `AttributeError` automatically | We raise `AttributeError` in `__getattr__` |
| How `dir()` works | Shows all names (already in globals) | Custom `__dir__` returns `__all__` + `_SUBMODULES` |
| Import time for `aws_cdk` | ~6 seconds (loads 300 modules) | ~0.2 seconds (loads nothing) |

---

## Sources

- [PEP 562 – Module `__getattr__` and `__dir__`](https://www.python.org/dev/peps/pep-0562/) — The Python Enhancement Proposal that made module-level `__getattr__` possible (Python 3.7+)
- [Python docs — importlib.import_module](https://docs.python.org/3/library/importlib.html#importlib.import_module) — The function we use for dynamic imports
- [Python docs — globals()](https://docs.python.org/3/library/functions.html#globals) — Returns the module's global namespace dictionary
- [Python docs — The import system](https://docs.python.org/3/reference/import.html) — How Python's import system works, including `sys.modules` caching
- [Python docs — Customizing Module Attribute Access](https://docs.python.org/3/reference/datamodel.html#customizing-module-attribute-access) — The canonical documentation for module `__getattr__` and `__dir__`
