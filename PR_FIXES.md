# PR Review Fixes Tracker

## 1. Nested class `__qualname__` not set correctly

**Reviewer comment:** Classes inside classes (e.g. `CfnBucket.LifecycleRuleProperty`) get wrong `__qualname__` when wrapped in a lazy factory function. Python sets it to `_lazy_build_CfnBucket.<locals>.CfnBucket.LifecycleRuleProperty` instead of `CfnBucket.LifecycleRuleProperty`.

**Fix:** Added `emitNestedQualnames()` to `BasePythonClassType` that recursively emits `__qualname__` fixups for all nested class/interface/struct members after the outer class qualname is set. Called in all three factory wrapper close sites (Class, Interface, Struct).

**Files changed:**
- `packages/jsii-pacmak/lib/targets/python.ts`
- Snapshots updated

**Status:** ✅ Done

## 2. `_get_typechecking_ns()` resolves ALL lazy factories on first type-check call

**Reviewer comment:** Does that mean the first time we call a function and do runtime type checking, we resolve all lazy class factories in that module after all?

**Answer:** Yes, that's correct. On the first runtime type-checked call within a module (inside `if __debug__:` blocks), `_get_typechecking_ns()` iterates all `_LAZY_CLASSES` factories and materializes every class in that module. This is a known tradeoff.

**Why this is acceptable:**
- Import time is still unaffected — no classes are built at `import` time
- Only modules you actually USE get their classes materialized (unused modules stay lazy)
- Materialization happens on first method/constructor call, not on import
- The factories are `@_memoized`, so subsequent calls are instant (dict lookup)
- Running with `python -O` (optimized) skips `if __debug__:` entirely, so type checking never triggers — classes are only materialized individually as accessed via `__getattr__`
- The alternative (a `__missing__`-based dict) doesn't work on Python 3.14 where `ForwardRef.evaluate()` does `globals = dict(globals)`, stripping custom dict behavior

**Why we can't resolve only needed names:** `typing.get_type_hints()` evaluates annotation strings against the namespace dict. We'd need to know at code-gen time which specific type names each stub references and build per-stub namespaces — that's significant complexity for marginal gain since the factories are memoized anyway.

**Net effect:** The lazy loading optimization primarily targets import-time performance (which is the main pain point for large packages like aws-cdk-lib). Runtime type checking in debug mode pays a one-time per-module cost on first use.

**Status:** ℹ️ Documented tradeoff — no code change needed

## 3. Backwards compatibility: new runtime + old generated code

**Reviewer comment:** We can assume new gencode = new runtime, but not the reverse. The new runtime could be interacting with old codegen'd code. What might break?

**Analysis:** The new runtime is **fully backwards compatible** with old generated code. Here's the breakdown:

### Runtime additions (purely additive, never referenced by old code):
- `jsii._memoized` — new export, old code never imports it
- `jsii._LazyImport` — new export, old code never imports it

### `_reference_map._try_import_type_module` changes:
- **Old behavior:** Import module → return `True` immediately
- **New behavior:** Import module → check if type registered → if not, try `getattr()` to trigger lazy factory → return result
- **With old code:** Classes self-register eagerly at import time, so the "already registered" early-return fires immediately. The `getattr()` fallback is never reached. **No change in behavior.**

### `_reference_map.build_interface_proxies_for_ref` changes:
- **Old behavior:** `_interfaces[fqn]` → `KeyError` if missing
- **New behavior:** Check if in `_interfaces`, if not try `_try_import_type_module(fqn)`, then raise `ValueError` if still missing
- **With old code:** Interfaces register eagerly, so they're always in `_interfaces`. The new fallback never triggers. **No change in behavior.**
- **Edge case:** If a bug caused a missing interface, old code raised `KeyError`, new raises `ValueError`. This is an internal error path, not public API.

### `resolve` method — "Object" FQN path:
- Added `_try_import_type_module(fqn)` calls before checking `_data_types`/`_interfaces`
- **With old code:** All types eagerly loaded, these are no-ops. **No change.**

### Python version:
- `str | None` syntax in `_LazyImport` requires Python 3.10+ — confirmed the runtime already requires `>=3.10` in setup.py.

### Conclusion:
All new code paths are additive fallbacks that only activate when types aren't eagerly registered (i.e., only with new generated code). With old generated code, types always self-register at import time, so every new fallback path is unreachable. **No backwards compatibility issues.**

**Status:** ✅ Analyzed — no issues found

## 4. Refactor `_try_import_type_module` into clear phases

**Reviewer comment:** The function would be cleaner split into two phases: (1) find the most specific module, (2) traverse to the type. The root module fallback naturally falls out of the for loop. We should end up with the type object directly from traversal rather than relying on the global registry.

**Fix:** Split into three functions:
- `_find_containing_module(class_fqn)` — Phase 1: finds the Python module (via FQN map or root fallback), imports it, returns `(module_name, type_parts)` or `None`
- `_resolve_type_on_module(python_module, type_parts)` — Phase 2: traverses the module via `getattr()` to trigger lazy factories, returns success bool
- `_try_import_type_module(class_fqn)` — Orchestrator: calls Phase 1, checks registry, calls Phase 2 if needed

**Note on "don't need the registry":** The reviewer suggests we could use the traversal result directly instead of checking the `_types`/`_data_types`/`_enums` registries. This is partially true — for the call sites in `resolve()` and `build_interface_proxies_for_ref()`, they still need to look up the type by FQN in the registry to get the right class. The traversal triggers registration as a side-effect (via JSIIMeta metaclass), but the caller needs the registered class object. So we keep the registry check as the final confirmation.

**Files changed:**
- `packages/@jsii/python-runtime/src/jsii/_reference_map.py`

**Status:** ✅ Done



## 5. Extract `_obtain_interface` to separate lookup concerns

**Reviewer comment:** The `build_interface_proxies_for_ref` code mixes concerns — the inline "check cache, trigger lazy load, check cache again" pattern should be a function. Should be as simple as `ifaces = [_obtain_interface(fqn) for fqn in ref.interfaces or []]`.

**Fix:** Added `_obtain_interface(fqn)` function that encapsulates the "look up or lazy-load" pattern:
```python
def _obtain_interface(fqn: str) -> Any:
    iface = _interfaces.get(fqn)
    if iface is not None:
        return iface
    _try_import_type_module(fqn)
    iface = _interfaces.get(fqn)
    if iface is not None:
        return iface
    raise ValueError(f"Unknown interface: {fqn}")
```

`build_interface_proxies_for_ref` is now a clean one-liner:
```python
ifaces = [_obtain_interface(fqn) for fqn in ref.interfaces or []]
```

Also fixed a duplicate `return False` in `_try_import_type_module`.

**Files changed:**
- `packages/@jsii/python-runtime/src/jsii/_reference_map.py`

**Status:** ✅ Done
