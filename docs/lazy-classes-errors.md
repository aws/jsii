# Lazy Class Factories — Remaining Issues

## Background

After refactoring to defer **all** classes (not just cross-module ones) into `@_memoized` factory functions, the jsii-pacmak snapshot tests pass but the python-runtime compliance tests fail with 38 errors. These fall into four categories.

---

## Problem 1: NameError — Same-module class references inside method bodies

**Count:** 21 failures

**What happens:**

Generated code inside a class's method body references another same-module class by bare name. Since both classes are now inside separate factory functions, neither name exists at module scope or in the other factory's local scope.

**Example:**

```python
@_memoized
def _lazy_build_Calculator() -> type:
    class Calculator(...):
        def __init__(self, *, initial_value=None, maximum_value=None):
            props = CalculatorProps(...)  # ← NameError: 'CalculatorProps' not defined
            jsii.create(self.__class__, self, [props])
    return Calculator

@_memoized
def _lazy_build_CalculatorProps() -> type:
    class CalculatorProps(...): ...
    return CalculatorProps
```

When `Calculator.__init__` executes, Python looks up `CalculatorProps` in:
1. Local scope (the `__init__` function) — not there
2. Enclosing scope (the `_lazy_build_Calculator` function) — not there
3. Module globals — not there (it's inside a different factory)

Result: `NameError`.

**Affected names:** `CalculatorProps`, `Greetee`, `StructWithSelf`, `AcceptsPathProps`, `ConsumerProps`, `RootStruct`, `NullShouldBeTreatedAsUndefinedData`, `ParamShadowsBuiltinsProps`, `ImplementMeOpts`

**Why this wasn't an issue before:** With cross-module-only deferral, these classes (which have no cross-module deps) were defined eagerly at module scope. They were always available for other classes to reference.

**Potential fix:** The code generator needs to emit `_lazy_build_CalculatorProps()` instead of bare `CalculatorProps` wherever a same-module class is referenced inside a method body. This is the same pattern used for base class references, but applied to a different emission site (the struct-kwargs expansion in constructors and methods).

---

## Problem 2: KeyError — `_interfaces` registry not resolved lazily

**Count:** 8 failures

**What happens:**

When the kernel returns an object reference with interface annotations (e.g., `ref.interfaces = ['jsii-calc.IReturnJsii976']`), the runtime looks up each interface FQN in the `_interfaces` dict:

```python
def build_interface_proxies_for_ref(self, ref):
    ifaces = [_interfaces[fqn] for fqn in ref.interfaces or []]  # ← KeyError
```

Interfaces register themselves in `_interfaces` via the `@jsii.interface(jsii_type=...)` decorator, which runs at class definition time. If the interface is inside a factory that hasn't been called yet, it's not registered.

**Affected FQNs:** `jsii-calc.IReturnJsii976`, `jsii-calc.IPrivatelyImplemented`, `jsii-calc.IAnonymouslyImplementMe`, `jsii-calc.IObjectWithProperty`, `jsii-calc.ChildStruct982`, `jsii-calc.ConfusingToJacksonStruct`, `@scope/jsii-calc-lib.deprecationRemoval.IInterface`, `jsii-calc.anonymous.IOptionA`

**Why this wasn't an issue before:** Same reason — these interfaces had no cross-module deps and were defined eagerly.

**Potential fix:** `build_interface_proxies_for_ref` needs the same fallback as `resolve()` for `_types`: if the FQN isn't in `_interfaces`, call `_try_import_type_module(fqn)` to trigger the factory, then retry. The existing `_try_import_type_module` already does `getattr` which triggers the factory and registers the interface.

---

## Problem 3: Regex mismatch — Class `__qualname__` changed

**Count:** 2 failures

**What happens:**

Classes defined inside factory functions have a different `__qualname__`:
- Before: `jsii_calc.TopLevelStruct`
- After: `jsii_calc._lazy_build_TopLevelStruct.<locals>.TopLevelStruct`

Error messages from `typeguard` include the qualified name, so test assertions that match on the class name fail:

```
Expected: 'type of argument inputs[0] must be jsii_calc.TopLevelStruct; got int instead'
Actual:   'type of argument inputs[0] must be jsii_calc._lazy_build_TopLevelStruct.<locals>.TopLevelStruct; got int instead'
```

**Potential fix:** Either:
- Update the test assertions to use a regex that matches the `_lazy_build_*.<locals>.` prefix
- Or set `__qualname__` on the class after creation inside the factory to strip the prefix:
  ```python
  ClassName.__qualname__ = ClassName.__name__
  ```

---

## Problem 4: mypy errors in test files

**Count:** 3 failures (mypy checks on test_compliance.py, test_python.py, test_runtime_type_checking.py)

**What happens:**

The test files themselves subclass jsii-calc classes or use them as type annotations:

```python
class MyOverride(jsii_calc.AsyncVirtualMethods):  # mypy: Invalid base class
    ...

obj: jsii_calc.IFriendly  # mypy: not valid as a type
```

Since jsii-calc classes are now accessed via `__getattr__` (returning `object` from mypy's perspective), mypy can't verify them as valid types or base classes.

**Potential fix:** These are the same mypy limitations as in the pacmak test harness. The python-runtime test suite needs equivalent `--disable-error-code` flags added to its mypy configuration.

---

## Summary

| Problem | Category | Count | Root Cause | Fix Complexity |
|---------|----------|-------|-----------|----------------|
| 1 | NameError | 21 | Method bodies reference sibling deferred classes by bare name | High — code generator change |
| 2 | KeyError | 8 | `_interfaces` registry not lazily resolved | Low — add fallback in `build_interface_proxies_for_ref` |
| 3 | Regex | 2 | `__qualname__` includes factory function name | Low — fix qualname or update test assertions |
| 4 | mypy | 3 | Test files subclass/reference lazy classes | Low — add mypy suppressions |
