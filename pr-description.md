# perf(python): defer class definitions and cross-module imports for lazy loading

This PR defers all Python classes & interfaces into factory functions and replaces cross-module imports with lazy proxy objects. This enables us to actually make submodule contents lazy and reduces the time taken to import Python submodules by ~62%.

## The Problem

Before, if a user wrote `import aws_cdk.aws_s3`, Python had to:

1. Execute its cross-module imports at the top of the init file (for example, `aws_iam`)
2. Build its classes, interfaces, and objects
3. Register all types with the jsii runtime

This lead to a cascading init which would scale as the size of the library grows. To solve this, we introduce lazy factories.

## Part 1 — Making base classes lazy

All classes, interfaces, and structs are wrapped in `@_memoized` factory functions, for example:

```python
# Before (eager)
class Bucket(metaclass=jsii.JSIIMeta, jsii_type="aws-cdk-lib.aws_s3.Bucket"):
    ...

# After (lazy)
@_memoized
def _lazy_build_Bucket() -> type:
    class Bucket(metaclass=jsii.JSIIMeta, jsii_type="aws-cdk-lib.aws_s3.Bucket"):
        ...
    return Bucket
```

`__getattr__` on the module triggers the factory on first access, which then subsequently caches the class on the module so future access is a direct attribute lookup with no overhead.

Furthermore, type checkers like mypy and pyright see the full class shapes via stubs in an `if typing.TYPE_CHECKING:` block. These stubs have empty bodies and are never executed at runtime. The reason for this is that type checkers evaluate code statically and need to see class definitions with their full signatures (inheritance, methods, properties) to provide autocomplete, type errors, and hover info. Since the factory functions hide the class inside a closure, type checkers can't introspect them — the stubs give them the shape they need without any runtime cost.

## Part 2 — Making annotation-only imports lazy

Cross-module imports exist mainly to support type annotations. Since all type annotations are rendered as string literals, they never actually trigger module loading at definition. Therefore, these imports are annotation-only and are only needed at runtime when code actively uses the imported type.

We exploit this by placing the real import under `if typing.TYPE_CHECKING:` (for static analysis) and using a `_LazyImport` proxy in the `else` branch that defers `importlib.import_module()` until first attribute access:

```python
# Before (eager — triggers cascading module loads at import time)
import scope.jsii_calc_base_of_base as _mod

# After (lazy — module only loads when _mod.SomeType is actually accessed)
if typing.TYPE_CHECKING:
    import scope.jsii_calc_base_of_base as _mod
else:
    _mod = _LazyImport("scope.jsii_calc_base_of_base")
```

## Benchmark

**Script importing ~310 aws-cdk-lib submodules** (Python 3.12, macOS ARM64)

| Metric | Baseline | This branch | Improvement |
|--------|----------|-------------|-------------|
| Time (mean ± σ) | 5632ms ± 877ms | 2160ms ± 24ms | **61.7%** |

Methodology: `hyperfine --warmup 2 --runs 10`, fresh Python process per run.

## Quirks & Edge Cases

Several non-obvious problems arise when class definitions are deferred. This section documents them and how this PR addresses each.

### `__qualname__` corruption

Classes defined inside a factory function get `_lazy_build_Bucket.<locals>.Bucket` as their `__qualname__` instead of just `Bucket`. This breaks error messages, pickling, and any code that inspects `__qualname__`. We explicitly reset it after class creation:

```python
Bucket.__qualname__ = "Bucket"
```

### Same-module base class references

When class `B(A)` and `A` are both in the same module, `A` doesn't exist yet when `B`'s factory runs (both are deferred). The generated code replaces bare base class names with factory calls:

```python
class B(_lazy_build_A(), metaclass=jsii.JSIIMeta, ...):
    ...
```

This applies to inheritance, `jsii.proxy_for()`, `@jsii.implements()`, and struct dict-coercion (`isinstance(x, dict)` → `x = SomeStruct(**x)`).

### `publication.publish()` and `__getattr__` caching

The `publication` library replaces the module object in `sys.modules`. After that, `globals()` writes to the *original* module's `__dict__`, not the publication wrapper's. Since PEP 562 `__getattr__` is only called when the attribute is missing from the module's `__dict__`, caching via `globals()` alone would mean `__getattr__` gets called on every access. We use `setattr(_sys.modules[__name__], name, cls)` to write to the correct module, plus `globals()[name] = cls` so that `typing.get_type_hints()` can still find the name in the function's `__globals__`.

### `typing.get_type_hints()` needs all deferred classes resolved

Runtime type-checking stubs (inside `if __debug__:` blocks) call `typing.get_type_hints()` to resolve string annotations. This requires the referenced classes to actually exist in a namespace. We build a `_get_typechecking_ns()` dict that materializes all factories on first use and pass it as `globalns`:

```python
typing.get_type_hints(stub_fn, globalns=_get_typechecking_ns(), localns=_get_typechecking_localns())
```

### Two separate namespace dicts (`globalns` ≠ `localns`)

Python's `ForwardRef._evaluate` caches resolutions keyed on `(globalns, localns)` object identity. If `globalns is localns`, a cached forward reference from *another* module with the same type name can return the wrong class. We create two distinct dict objects with identical content to force re-resolution per module.

### Python 3.14 `ForwardRef.evaluate()` strips `__missing__`

The initial approach used a `dict` subclass with `__missing__` to lazily resolve class names one-at-a-time. However, Python 3.14's `ForwardRef.evaluate()` calls `dict(globals)` when the owner has `__type_params__`, which strips any custom subclass behavior. The solution is to pre-resolve all factories into a plain `dict` (only when first needed).

### `__protocol_attrs__` stripping for deferred interfaces

Interfaces use `typing_extensions.Protocol` and accumulate internal attributes (`__jsii_proxy_class__`, `__jsii_type__`) in `__protocol_attrs__`. Normally these are stripped at module scope after all interfaces are defined. For deferred interfaces, the stripping happens inside the factory function since the interface doesn't exist at module scope.

## Note

With lazy class factories, classes don't register themselves with the jsii runtime until their factory runs. This is a problem when the kernel returns object references with type FQNs which aren't registered. As an example, if the user never directly accessed `aws_cdk.aws_s3.Bucket` in their Python code (so the factory never ran), the runtime does not know which class to deserialize that reference into.

The `_reference_map.py` in the Python runtime now handles lazy types. For instance, when the kernel returns a type reference that isn't yet registered, it triggers `getattr` on the appropriate module to materialize the factory, which registers the type as a side effect of class construction via `JSIIMeta`.

---

*By submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].*

[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0
