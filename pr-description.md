# feat(python): replace eager cross-module imports with lazy loading

## Problem

Importing a jsii-generated Python package is slow. When a user writes
`import aws_cdk`, Python eagerly loads every submodule and every cross-package
dependency transitively — hundreds of modules, most of which the user doesn't need
for their particular script. This makes CLI tools, Lambda cold starts, and IDE
startup noticeably slower than they need to be.

### Why it's slow today

Every generated `__init__.py` has top-level import statements for cross-module
dependencies:

```python
# aws_cdk/aws_s3/__init__.py
from .aws_iam import IGrantable as _IGrantable_ef567890
from .aws_kms import IKey as _IKey_abc12345
...
```

Each of these executes immediately at module load time. Importing `aws_s3` forces
`aws_iam` to load, which forces its own dependencies to load, and so on — creating a
cascade that pulls in the entire dependency graph before the first line of user code
runs.

The vast majority of these imports only exist to support **type annotations** and
**runtime type-checking stubs**. They aren't needed to define the classes or call
methods — the actual interop happens via the jsii kernel, not Python-level calls.

### Secondary benefit: circular import resilience

As a side effect, lazy loading also eliminates circular import failures that occur when
two modules reference each other's types bidirectionally. This was previously attempted
with `from __future__ import annotations` (PEP 563) and `TYPE_CHECKING` guards, but
PEP 563 has been deprecated in Python 3.14 (replaced by PEP 649/749). Since we control
codegen and already render annotations as string literals, we don't need PEP 563 at all.

## Solution

Replace eager top-level cross-module imports with a `TYPE_CHECKING` / lazy-proxy pattern
that defers `importlib.import_module()` until first attribute access.

### 1. `_LazyImport` proxy class (new, in `jsii._utils`)

A minimal class in the Python runtime that wraps a module name and defers loading:

```python
class _LazyImport:
    def __init__(self, module_name: str) -> None:
        self._module_name = module_name
        self._module = None

    def __getattr__(self, name: str):
        if self._module is None:
            self._module = importlib.import_module(self._module_name)
        return getattr(self._module, name)
```

The resolved module is cached after first access. Failed imports are NOT cached
(allows retry). This is the standard lazy-module pattern used by large Python projects
(CPython stdlib, Django, etc.) to manage import time.

### 2. Generated import structure

Cross-module imports are now emitted as:

```python
_LazyImport = jsii._LazyImport

if typing.TYPE_CHECKING:
    import aws_cdk.aws_iam as _aws_iam_ef567890
else:
    _aws_iam_ef567890 = _LazyImport("aws_cdk.aws_iam")
```

- **Static type checkers** (mypy, pyright) see the real import inside `TYPE_CHECKING`
  and get full type resolution, go-to-definition, autocomplete, etc.
- **At runtime**, the proxy is assigned instead. The actual `import_module()` call only
  fires when an attribute is first accessed on the proxy — which may never happen if
  the user's code doesn't touch that particular type.

### 3. Type annotations are string literals

Since we control codegen, all type annotations are already rendered as quoted strings:

```python
def grant(self, grantee: "_aws_iam_ef567890.IGrantable") -> None:
    ...
```

String annotations are never evaluated at definition time. They only resolve when
`typing.get_type_hints()` is called (by the runtime type-checking stubs), at which
point the lazy proxy resolves on demand.

This means we do NOT need `from __future__ import annotations` (PEP 563). Since our
annotations are already literal strings, we get deferred evaluation without relying on
any `__future__` import or language-level annotation semantics.

### 4. Absolute per-module imports instead of relative per-type imports

**Old (relative, per-type):**
```python
from .submodule import MyType as _MyType_72dbc9ef
```

**New (absolute, per-module):**
```python
_submodule_b81e7cf1 = _LazyImport("my_package.submodule")
# Type accessed as: _submodule_b81e7cf1.MyType
```

This change is a **prerequisite** of lazy loading — it cannot be separated into a
different PR. The reasons:

1. `_LazyImport` wraps `importlib.import_module(name)`, which requires an absolute
   module path. Relative imports (`from .foo import bar`) cannot be expressed as a
   single `import_module()` call without a `package` argument, and the semantics are
   different — relative imports eagerly access attribute `bar` on module `foo`,
   defeating lazy loading.

2. Per-type imports (`from X import Y`) force immediate attribute resolution on module
   X at import time (Python must look up `Y` in `X.__dict__`). Per-module imports
   defer all attribute access until usage.

3. The per-module granularity means fewer proxy objects — one lazy proxy covers all
   types from that module — and simpler generated code.

Name collision avoidance is preserved: the module alias uses a `_prefix_hash` pattern
(`_submodule_b81e7cf1`) that cannot collide with user-facing parameter names.

### 5. Why all imports need lazy proxies (not just base classes)

At first glance, only imports used in "value position" (base classes, decorators) seem
to need runtime availability — annotations are strings and shouldn't need the import.
However, the runtime type-checking stubs at the bottom of each generated module strip
quotes and declare types unquoted:

```python
def _typecheckingstub__abc123(
    foo: _other_module_hash.SomeType,  # unquoted — needs runtime resolution
) -> None:
    """Type checking stubs"""
    pass
```

When `typing.get_type_hints()` is called on these stubs, it resolves names from the
module's `__globals__`. So all cross-module names must be present at runtime — but as
lazy proxies they only trigger actual module loading when type checking actually runs.

## Import time improvement

The performance gain comes from breaking the transitive import cascade:

- **Before:** `import aws_cdk.aws_s3` → eagerly loads `aws_iam`, `aws_kms`, `aws_logs`,
  `aws_events`, ... → each loads their own deps → hundreds of modules loaded.
- **After:** `import aws_cdk.aws_s3` → assigns proxy objects for `aws_iam`, `aws_kms`,
  etc. → only loads them when user code actually accesses a type from those modules.

For a typical CDK app that uses 5-10 construct modules, the vast majority of the
dependency graph is never loaded at all during import. Modules only load on demand
when user code (or the jsii kernel) first touches them.

## Summary of changes

| File | Change |
|------|--------|
| `packages/@jsii/python-runtime/src/jsii/_utils.py` | New `_LazyImport` class |
| `packages/@jsii/python-runtime/src/jsii/__init__.py` | Export `_LazyImport` |
| `packages/@jsii/python-runtime/tests/test_python.py` | Unit tests for `_LazyImport` |
| `packages/jsii-pacmak/lib/targets/python.ts` | Emit `TYPE_CHECKING`/`else` pattern with lazy proxies, remove `from __future__ import annotations` |
| `packages/jsii-pacmak/lib/targets/python/type-name.ts` | Absolute per-module imports, remove `relativeImportPath()` |
| `packages/jsii-pacmak/test/.../target-python.test.js.snap` | Updated snapshots |
| `packages/jsii-pacmak/test/targets/python/type-name.test.ts` | Updated expected import format |

## What this does NOT solve

- **Eager submodule loading within the same package** — child submodules (e.g.,
  `aws_cdk.aws_s3.notifications`) are still loaded eagerly via `from . import X`.
  Lazy-loading those would require changes to the submodule registration mechanism.
- **Base class resolution** — when module A has `class Foo(other_module.Bar)`, the
  lazy proxy resolves immediately at class definition time. This is inherent to Python's
  class machinery and cannot be deferred without invasive metaclass tricks that would
  break `isinstance`, MRO, and IDE tooling.

---

By submitting this pull request, I confirm that my contribution is made under the terms
of the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).
