# Optimization: Move Annotation-Only Imports Behind `TYPE_CHECKING`

## Problem

With lazy submodule loading merged, `import aws_cdk` no longer eagerly loads all 300 submodules. However, when a user accesses *any* submodule (e.g., `from aws_cdk import aws_s3`), that submodule's `__init__.py` still triggers cascading imports of other submodules via cross-module type annotation imports.

### Example (generated `aws_s3/__init__.py`)

```python
import aws_cdk.aws_kms as _aws_kms_abc123       # ← runs immediately, loads aws_kms
import aws_cdk.aws_iam as _aws_iam_def456       # ← runs immediately, loads aws_iam
import aws_cdk.aws_events as _aws_events_ghi789 # ← runs immediately, loads aws_events

class Bucket:
    def __init__(self, encryption_key: "_aws_kms_abc123.IKey") -> None:
        jsii.create(self.__class__, self, [encryption_key])
```

The imports exist so that:
1. Static type checkers (pyright/mypy) can resolve the quoted annotations
2. Runtime type checking (typeguard) can evaluate them via `typing.get_type_hints()`

But the annotations are **quoted strings** — Python never evaluates them at runtime unless something explicitly calls `typing.get_type_hints()`.

### Impact

Loading one submodule cascades into loading many others. In CDK, `from aws_cdk import aws_s3` can trigger loading dozens of other service modules transitively, negating much of the lazy loading benefit.

## Proposed Solution

Move cross-module imports that are **only used in type annotations** behind `if typing.TYPE_CHECKING:`:

```python
import aws_cdk.aws_iam as _aws_iam_def456       # ← stays (used as base class or decorator)

if typing.TYPE_CHECKING:
    import aws_cdk.aws_kms as _aws_kms_abc123   # ← moved (only in quoted annotations)

class Bucket(_aws_iam_def456.SomeBase):
    def __init__(self, encryption_key: "_aws_kms_abc123.IKey") -> None:
        jsii.create(self.__class__, self, [encryption_key])
```

`typing.TYPE_CHECKING` is `False` at runtime → import doesn't execute → no cascade.
`typing.TYPE_CHECKING` is `True` for pyright/mypy → import executes → type resolution works.

## Constraints

### 1. Base class / decorator imports CANNOT be moved

If an import is used as a base class or in a decorator, it must execute at runtime:

```python
import scope.jsii_calc_lib as _lib  # MUST stay — used as base class below

@jsii.implements(_lib.IFriendly)        # ← runtime usage
class Foo(_lib.Operation):              # ← runtime usage
    def bar(self, x: "_lib.Number"):    # ← annotation only (quoted)
        ...
```

### 2. Runtime type checking (`typeguard`) needs the imports

When `runtimeTypeChecking = true` (the default), jsii-pacmak generates:

```python
def _typecheckingstub__HASH(
    very: _scope_jsii_calc_base_of_base_49fa37fe.Very,  # ← UNQUOTED
) -> None:
    """Type checking stubs"""
    pass
```

The stub uses **unquoted** type annotations. When Python executes this function definition, it evaluates the annotation, which requires the import to exist. Additionally, `typing.get_type_hints()` is called at runtime to extract these types.

**Therefore: when `runtimeTypeChecking = true`, annotation-only imports CANNOT be moved behind `TYPE_CHECKING`.**

### 3. When `runtimeTypeChecking = false`, it IS safe

With `--no-runtime-type-checking`:
- No type checking stubs are emitted
- No `if __debug__:` blocks call `typing.get_type_hints()`
- The only usage of the import is in quoted annotations (strings)
- Moving behind `TYPE_CHECKING` is safe

**Verified:** Generated `module2647/__init__.py` with `--no-runtime-type-checking` shows the import is only referenced in a quoted annotation string.

## Implementation Approach

### Where to change

The code generator in `packages/jsii-pacmak/lib/targets/python.ts`:

1. **`BasePythonClassType.requiredImports()`** (line 431) — currently merges base class imports and member imports into one set. Needs to separate them.

2. **`PythonModule.emitRequiredImports()`** (line 2184) — currently emits all imports at the top level. Needs to split into:
   - Top-level: imports used in base classes, decorators, `@jsii.implements()`
   - `TYPE_CHECKING` block: imports used only in annotations

3. **`UserType.requiredImports()`** in `type-name.ts` (line 325) — returns import metadata. Could be extended to indicate whether the import is for a "runtime" or "type-only" position.

### Key distinction to make

An import is **runtime-required** if it's used in any of:
- Base class: `class Foo(imported_module.Bar)`
- Decorator: `@jsii.implements(imported_module.IFoo)`
- `@jsii.data_type(jsii_struct_bases=[imported_module.Bar])`

An import is **annotation-only** if it's ONLY used in:
- Quoted type annotations: `def foo(x: "imported_module.Bar")`
- Return type annotations: `def foo() -> "imported_module.Bar"`

### Interaction with `runtimeTypeChecking`

| `runtimeTypeChecking` | Annotation-only imports | Reason |
|---|---|---|
| `true` (default) | Must stay at top level | Type stubs use unquoted annotations; `get_type_hints()` evaluates them |
| `false` | Can move behind `TYPE_CHECKING` | No stubs, no runtime evaluation of annotations |

### Option: Make it work with `runtimeTypeChecking = true`

To support `TYPE_CHECKING` imports even with runtime type checking enabled, the type checking stubs would need to be changed to also use **quoted** annotations:

```python
# Current (needs import at runtime):
def _typecheckingstub__HASH(very: _scope.Very) -> None: pass

# Changed (import not needed at runtime):
def _typecheckingstub__HASH(very: "_scope.Very") -> None: pass
```

But then `typing.get_type_hints()` would fail because the name isn't in scope. This could be solved by passing a custom namespace to `get_type_hints()` that lazily imports modules on demand — but that's a more complex change.

## Summary

| Scenario | Can move imports behind `TYPE_CHECKING`? |
|---|---|
| Import used as base class | No |
| Import used in decorator | No |
| Import used only in annotations, `runtimeTypeChecking = false` | **Yes** |
| Import used only in annotations, `runtimeTypeChecking = true` | No (unless stubs are also changed) |

The simplest first step: when `runtimeTypeChecking = false`, move annotation-only imports behind `TYPE_CHECKING`. This is the CDK default configuration and would eliminate cascading imports for CDK users.
