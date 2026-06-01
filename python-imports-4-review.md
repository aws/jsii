# Code Review: `python-imports-4` Branch

## Summary

This branch makes cross-module Python imports lazy at runtime to avoid circular import issues and reduce module load time. The approach:

1. Adds `from __future__ import annotations` (PEP 563) so type annotations become strings and aren't evaluated at definition time.
2. Introduces a `_LazyImport` helper class that defers `importlib.import_module()` until first attribute access.
3. Wraps imports in `if typing.TYPE_CHECKING: ... else: ...` — static type checkers see real imports, runtime uses lazy proxies.
4. Changes cross-submodule (same assembly) imports from `from .submodule import Foo as _Foo_hash` to `import full.module.path as _module_hash` with lazy proxy.

---

## Issues

### 1. [Medium] Lazy proxies are resolved eagerly for base classes and decorators

**Status: Legit observation, but not a bug**

In the generated code:

```python
_jsii_calc_e856c20f = _LazyImport("jsii_calc")

@jsii.implements(_jsii_calc_e856c20f.IRandomNumberGenerator)
class UnimportedSubmoduleType(...):
```

And:

```python
_composition_4f38e801 = _LazyImport("jsii_calc.composition")

class Calculator(
    _composition_4f38e801.CompositeOperation,
    ...
):
```

Both decorators and base class expressions are evaluated at class definition time (module load time), which immediately triggers the lazy proxy's `__getattr__`, defeating the purpose of lazy loading for these cases. `from __future__ import annotations` only defers *type annotation* evaluation, not base classes or decorator arguments.

The real benefit is only for modules where cross-module types appear exclusively in type annotations. For modules using cross-module types as base classes or in decorators, the import still happens eagerly.

**However**, the lazy proxy still provides value even in these cases: it breaks circular import chains. Module A can begin loading (define its `_LazyImport` objects) before module B has finished loading. The actual resolution happens at class definition time, by which point the target module's `__init__.py` has typically completed enough to export the needed type. This is strictly better than the old eager `from .submodule import Foo` which required the target module to be fully loaded at import statement time.

**Regarding the `cdk16625/donotimport` concern:** This is a non-issue. The test's intent is that *user application code* never needs to explicitly import the `donotimport` submodule — the runtime resolves types automatically. The generated `donotimport/__init__.py` itself has always referenced `jsii_calc.IRandomNumberGenerator` in its own code. The `donotimport` module is loaded lazily via `__getattr__` on the parent `cdk16625` package, so the overall lazy loading chain still works correctly.

**Action:** Document this limitation in the PR description. No code change needed.

---

### 2. [Medium] `_LazyImport` class is duplicated in every module

**Status: FIXED**

The `_LazyImport` class was previously emitted inline in every single module that has cross-module imports (21 instances in the test snapshot). For a large library like `aws-cdk-lib` with ~300+ submodules, this added ~3000+ lines of duplicated code.

**Fix:** Moved `_LazyImport` to the `jsii` Python runtime package (`jsii._utils._LazyImport`, exported as `jsii._LazyImport`). Generated modules now emit a single-line alias:

```python
_LazyImport = jsii._LazyImport
```

instead of the full 11-line class definition. Since `jsii` is already imported by every generated module, this adds no new dependencies. Both packages are versioned together in the monorepo, so there's no coordination concern.

**Files changed:**
- `packages/@jsii/python-runtime/src/jsii/_utils.py` — Added `_LazyImport` class with docstring and `__repr__`
- `packages/@jsii/python-runtime/src/jsii/__init__.py` — Exported `_LazyImport`
- `packages/jsii-pacmak/lib/targets/python.ts` — Replaced `emitLazyImportClass` with `emitLazyImportAlias`

---

### 3. [Medium] `emitLazyProxyAssignments` silently drops non-empty items at runtime

**Status: FIXED**

The `emitLazyProxyAssignments` method previously filtered with `.filter(([, items]) => items.has(''))`, which would silently skip any import entry with non-empty items — meaning it would appear in the `TYPE_CHECKING` block for type checkers but have no runtime equivalent.

**Fix:** Replaced the silent filter with an explicit assertion that throws an error if any non-empty items are encountered. This ensures that if a new import pattern is ever introduced in `type-name.ts`, the code generator will fail loudly at build time rather than producing subtly broken runtime code.

**Verified:** All current code paths produce `item: ''` (two locations in `type-name.ts`), so the assertion never fires today — it's purely a safety net for future changes.

---

### 4. [Low] Hash computation change causes unnecessary churn in downstream packages

**Status: Legit, inherent to the approach**

The hash for same-assembly cross-submodule imports changed from:

```typescript
// Old: hash of submodule name + '.' + type name (unique per type)
.update(typeSubmodulePythonName).update('.').update(toImport)
// Result: _SubmoduleType_72dbc9ef
```

to:

```typescript
// New: hash of submodule name + '.*' (shared per module)
.update(typeSubmodulePythonName).update('.*')
// Result: _submodule_b81e7cf1
```

All types from the same submodule now share the same alias. This is correct for the new approach (importing the whole module rather than individual types) but means every existing generated package will see import line changes when regenerated.

This is an unavoidable consequence of the architectural change from per-type imports to per-module imports.

**Action:** Note in the PR description so downstream package reviewers understand the churn is expected.

---

### 5. [Low] `from __future__ import annotations` emitted even when not strictly needed

**Status: Technically correct, harmless — no action needed**

The condition is `hasImports(this.requiredImports(context))` — any module with cross-module imports gets PEP 563. But PEP 563 is only needed to prevent evaluation of type annotations that reference the lazy proxies.

In practice this is fine:
- `from __future__ import annotations` has zero runtime cost.
- Most modules with cross-module imports use those types in BOTH base classes/decorators AND type annotations (method signatures, property types). PEP 563 is needed for the annotation cases.
- It's a reasonable "always-on" safety net rather than trying to distinguish pure-decorator modules from annotation-using modules.

**Action:** None needed.

---

### 6. [Low] Absolute imports in TYPE_CHECKING instead of relative imports

**Status: Not a real concern**

The old code used relative imports (`from .composition import CompositeOperation as _CompositeOperation_1c4d123b`). The new code uses absolute imports (`import jsii_calc.composition as _composition_4f38e801`).

The review suggests relative imports would work without installation, but:
- Type checkers (pyright/mypy) already need the package installed to resolve types — you can't type-check code that references uninstalled packages regardless of import style.
- The `TYPE_CHECKING` block is never executed at runtime, so it doesn't affect runtime behavior.
- Absolute imports are actually MORE reliable for type checkers in namespace packages (which jsii uses via `pkgutil.extend_path`) where relative imports can be ambiguous across multiple physical locations.

**Action:** None needed. Absolute imports are arguably better here.

---

### 7. [Low] `_LazyImport` doesn't implement `__repr__`

**Status: FIXED (as part of issue #2 fix)**

The `_LazyImport` class now lives in the jsii runtime and includes a `__repr__` method:
- Before resolution: `_LazyImport('some_module')`
- After resolution: delegates to the real module's `repr()`

This was added for free when moving the class to the runtime package.

---

## Overall Assessment

The implementation is sound and none of these issues are blocking. The approach correctly addresses circular imports and import-time side effects in large Python packages.

| Issue | Verdict | Blocking? | Action |
|-------|---------|-----------|--------|
| 1. Eager resolution for base classes/decorators | Legit observation, not a bug | No | Document limitation in PR |
| 2. `_LazyImport` duplication | ~~Legit concern~~ FIXED | No | Moved to jsii runtime package |
| 3. Silent drop of non-empty items | ~~Not a real concern~~ FIXED | No | Added defensive assertion |
| 4. Hash change causes churn | Legit, inherent to approach | No | Document in PR description |
| 5. `__future__` emitted unnecessarily | Technically correct, harmless | No | None |
| 6. Absolute vs relative imports | Not a real concern | No | None |
| 7. Missing `__repr__` | ~~Legit~~ FIXED (with #2) | No | Added to runtime class |

---

## Branch Status

Snapshot tests are now passing after the issue #2 fix. The `target-python` and `type-name` test suites both pass (78 tests, 126 snapshots).
