# Pyright Compatibility Fix for PEP 562 Lazy Imports

## Context

The Python code generator (`jsii-pacmak`) was updated to replace eager submodule
imports with PEP 562 lazy loading. This change broke the `python-pyright.test.js`
test, which runs pyright against the generated code. The single test failure
cascaded to fail all 19 CI matrix jobs.

## Issues

### Issue 1: `reportIndexIssue` — `list[str]` in `__dir__` return type

**Generated code:**

```python
def __dir__() -> list[str]:
    return [*__all__, *_SUBMODULES]
```

**Problem:** The pyright test configures `pythonVersion = "3.8"` in its
`pyproject.toml` (separate from the per-package config which uses `"3.10"`).
With `pythonVersion = "3.8"`, pyright considers `list[str]` invalid as a runtime
annotation because `list` was not subscriptable until Python 3.9.

**Fix:** Quote the return type annotation so it becomes a string (forward
reference) that is not evaluated at runtime:

```python
def __dir__() -> "list[str]":
    return [*__all__, *_SUBMODULES]
```

### Issue 2: `reportUnsupportedDunderAll` — submodule names invisible to pyright

**Before (eager imports):**

```python
from . import anonymous
from . import cdk16625

__all__ = [
    "SomeClass",
    "anonymous",      # pyright sees this — it's an imported name
    "cdk16625",
]
```

**After (lazy imports):**

```python
_SUBMODULES = {"anonymous", "cdk16625"}

def __getattr__(name: str) -> object:
    if name in _SUBMODULES:
        mod = _importlib.import_module(f".{name}", __name__)
        globals()[name] = mod
        return mod
    raise AttributeError(...)

__all__ = [
    "SomeClass",
    "anonymous",      # pyright error: name doesn't exist statically
    "cdk16625",
]
```

**Problem:** Pyright performs static analysis. It cannot see that `__getattr__`
will resolve those names at runtime, so it flags every submodule name in
`__all__` as "specified but not present in module."

**Fix:** Emit a `typing.TYPE_CHECKING` guard with explicit imports. This is the
standard pattern used by numpy, pandas, and other libraries that implement
PEP 562 lazy loading:

```python
if typing.TYPE_CHECKING:
    from . import anonymous as anonymous
    from . import cdk16625 as cdk16625
```

This works because:

- `typing.TYPE_CHECKING` is `True` for static analyzers (pyright, mypy) but
  `False` at runtime.
- Pyright sees the explicit imports and knows the names exist as modules.
- No runtime cost — the imports never execute, preserving lazy loading.
- The `as x` syntax marks the import as an explicit re-export, which pyright
  treats as a public name binding.
- `__all__` stays unchanged, so `publication.publish()` and
  `from pkg import *` continue to work.

## Cascade Effect

The pyright test failure causes `jsii-pacmak:test` to exit non-zero. Lerna then
skips all downstream packages (`dotnet-runtime-test`, `go-runtime-test`,
`java-runtime-test`, `python-runtime`, `jsii-config`, `jsii-diff`). The root
`yarn test` fails, so every CI matrix variant reports the same failure. The
`test-ok` gate job ("Unit Tests") then fails in 5 seconds because it checks
`needs.test.result != 'success'`.

## Files Modified

- `packages/jsii-pacmak/lib/targets/python.ts` — code generator changes
- `packages/@jsii/python-runtime/src/jsii/_reference_map.py` — on-demand type import
- `packages/@jsii/python-runtime/src/jsii/_runtime.py` — assembly-to-module registration
- `packages/jsii-pacmak/test/generated-code/__snapshots__/*.snap` — regenerated

## Issue 3: `publication.publish()` breaks `__getattr__` on the public module

**Problem:** `publication.publish()` replaces the module in `sys.modules` with a
new `ModuleType` object that only copies names from `__all__` plus specific
dunder names. It does NOT copy `__getattr__` or `__dir__`. Since the lazy
loading code is defined after `publication.publish()`, it lives on the original
(now private) module, not the public one. Attribute access like `jsii_calc.anonymous`
fails with `AttributeError`.

**Fix:** After defining `__getattr__` and `__dir__`, explicitly install them on
the public module via `setattr()` on `sys.modules[__name__]`:

```python
import sys as _sys
setattr(_sys.modules[__name__], "__getattr__", __getattr__)
setattr(_sys.modules[__name__], "__dir__", __dir__)
```

Note: Direct assignment (`_sys.modules[__name__].__getattr__ = __getattr__`)
does not work because mypy treats `__getattr__` and `__dir__` as special
methods on `ModuleType` and raises `Cannot assign to a method [method-assign]`.
Using `setattr()` achieves the same runtime effect while bypassing mypy's check.

## Issue 4: jsii runtime cannot resolve types from unloaded submodules

**Problem:** With eager imports, all submodules were loaded at import time,
registering their types with the jsii runtime. With lazy loading, submodules
are only loaded on first access. If the jsii kernel returns a type from an
unloaded submodule (e.g., during a callback), the runtime raises
`Unknown type: jsii-calc.cdk16625.donotimport.UnimportedSubmoduleType`.

**Fix:** Added on-demand type resolution in `_reference_map.py`. When a type
FQN is not found in the type registries, the runtime now:

1. Extracts the assembly name from the FQN
2. Looks up the Python root module for that assembly (registered during
   `JSIIAssembly.load()`)
3. Attempts to import the containing submodule (trying progressively shorter
   paths)
4. Retries the type lookup after the import triggers type registration

## Issue 5: mypy `Cannot assign to a method [method-assign]`

**Generated code (initial attempt):**

```python
import sys as _sys
_sys.modules[__name__].__getattr__ = __getattr__
_sys.modules[__name__].__dir__ = __dir__
```

**Problem:** mypy treats `__getattr__` and `__dir__` as special methods defined
on `types.ModuleType`. Direct assignment to these attributes triggers
`Cannot assign to a method [method-assign]` under `--strict` mode. The test
harness runs mypy with `--strict` on all generated code.

**Fix:** Use `setattr()` instead of direct attribute assignment:

```python
import sys as _sys
setattr(_sys.modules[__name__], "__getattr__", __getattr__)
setattr(_sys.modules[__name__], "__dir__", __dir__)
```

`setattr()` achieves the same runtime effect but mypy does not perform the
same method-assignment check on it.
