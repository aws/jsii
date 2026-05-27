# Remove `publication.publish()` from Generated Python Packages

**Date:** 2025-01-01

## Motivation

The `publication` library was used in every jsii-generated Python package to replace `sys.modules[__name__]` with a restricted module object that hides names not listed in `__all__`. This change removes `publication` entirely for three reasons:

1. **Performance**: `publication.publish()` creates a new module object and copies all attributes on every module import. For large packages with many submodules (like `aws-cdk-lib`), this overhead accumulates significantly.

2. **Simplification**: PEP 562 introduced `__getattr__` and `__dir__` as module-level hooks that work directly on the original module object. The `setattr` workaround to reinstall these functions after publication replaced the module is no longer necessary.

3. **Dependency reduction**: Removing `publication` eliminates a transitive dependency from every jsii-generated Python package, reducing install size and potential supply chain surface.

## What `publication.publish()` Previously Did

When called at the end of a module's `__init__.py`, `publication.publish()` performed the following:

1. Created a new restricted module object (a subclass of `types.ModuleType`)
2. Copied only the names listed in `__all__` as publicly accessible attributes
3. Replaced `sys.modules[__name__]` with this new restricted module
4. Stored the original module as `._private` on the replacement

The effect was that any name not in `__all__` would raise `AttributeError` when accessed from outside the module. This hid internal imports like `jsii`, `typing_extensions`, and `publication` itself from the module's public API.

## Why It's No Longer Needed

- **PEP 562 `__getattr__`/`__dir__`**: These module-level functions handle lazy submodule loading directly on the original module object. No module replacement is needed.
- **Underscore-prefix convention**: Renaming `import jsii` to `import jsii as _jsii` and `import typing_extensions` to `import typing_extensions as _typing_extensions` signals that these are implementation details. Python's convention of underscore-prefixed names is universally understood by developers and tools.
- **`__all__` still controls `from package import *`**: The `__all__` list continues to define what names are exported by wildcard imports, which is the primary mechanism IDEs and linters use for autocompletion filtering.

## User-Visible Behavioral Changes

### 1. `from package import jsii` will now succeed

Previously, `publication.publish()` hid the `jsii` import, so `from my_package import jsii` would raise `ImportError`. Now, because the import is renamed to `_jsii`, the bare name `jsii` no longer exists on the module at all. However, `from my_package import _jsii` would technically succeed (though it is an implementation detail and not part of the public API).

### 2. `typing_extensions` is now imported as `_typing_extensions`

The import is underscore-prefixed to signal it is internal. Code that previously accessed `my_package.typing_extensions` (which was hidden by publication) will not find it under the old name.

### 3. `publication` is no longer a dependency

Generated packages no longer declare `publication>=0.0.3` in their `install_requires`. The `publication` package will not be installed as a transitive dependency.

### 4. Module `._private` attribute no longer exists on new packages

Packages generated with the new code generator will not have a `._private` attribute on their modules. This attribute was an implementation detail of `publication.publish()`.

## Migration Guidance

### If you accessed `module._private`

The `._private` attribute was an undocumented implementation detail of the `publication` library. If you were accessing it to reach internal module state, access the module directly instead:

```python
# Before (accessing publication's _private)
import my_package._jsii
private = my_package._jsii._private
fqn_map = private._SUBMODULE_FQN_MAP

# After (direct access)
import my_package._jsii
fqn_map = my_package._jsii._SUBMODULE_FQN_MAP
```

### If you imported internal names from a generated package

Names like `jsii`, `typing_extensions`, or `publication` that were previously importable (but hidden by publication) are now either renamed with underscore prefixes or removed entirely. These were always implementation details and should not be relied upon:

```python
# Before (would fail at runtime due to publication hiding it)
from my_package import jsii  # ImportError

# After (name simply doesn't exist)
from my_package import jsii  # ImportError (jsii is now _jsii)

# If you need jsii, import it directly
import jsii
```

## Before/After Examples

### Before (with `publication.publish()`)

```python
import abc
import builtins
import datetime
import enum
import typing

import jsii
import publication
import typing_extensions

from typeguard import check_type

from ._jsii import *

__all__ = [
    "MyClass",
    "MyEnum",
]

# ... class definitions using jsii.* and typing_extensions.* ...

@jsii.data_type(jsii_type="my_package.MyStruct", ...)
class MyStruct:
    @builtins.property
    def name(self) -> builtins.str:
        ...

publication.publish()

_SUBMODULES = {"sub1", "sub2"}

def __getattr__(name):
    if name in _SUBMODULES:
        import importlib as _importlib
        return _importlib.import_module(f".{name}", __name__)
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

def __dir__():
    return __all__ + list(_SUBMODULES)

import sys as _sys
setattr(_sys.modules[__name__], "__getattr__", __getattr__)
setattr(_sys.modules[__name__], "__dir__", __dir__)
```

### After (without `publication.publish()`)

```python
import abc
import builtins
import datetime
import enum
import typing

import jsii as _jsii
import typing_extensions as _typing_extensions

from typeguard import check_type

from ._jsii import *

__all__ = [
    "MyClass",
    "MyEnum",
]

# ... class definitions using _jsii.* and _typing_extensions.* ...

@_jsii.data_type(jsii_type="my_package.MyStruct", ...)
class MyStruct:
    @builtins.property
    def name(self) -> builtins.str:
        ...

_SUBMODULES = {"sub1", "sub2"}

def __getattr__(name):
    if name in _SUBMODULES:
        import importlib as _importlib
        return _importlib.import_module(f".{name}", __name__)
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

def __dir__():
    return __all__ + list(_SUBMODULES)
```

Key differences:
- No `import publication` or `publication.publish()` call
- `import jsii` → `import jsii as _jsii`
- `import typing_extensions` → `import typing_extensions as _typing_extensions`
- All `jsii.*` references → `_jsii.*`
- All `typing_extensions.*` references → `_typing_extensions.*`
- No `import sys as _sys` or `setattr(...)` reinstallation
- `__getattr__` and `__dir__` work directly as PEP 562 module-level functions

## Benchmark Results

*To be filled after running the benchmark script.*

Run the benchmark with:

```bash
cd packages/@jsii/python-runtime
python benchmarks/import_time_benchmark.py jsii_calc --iterations 50 --save treatment.json
# Compare against a baseline captured before the change:
python benchmarks/import_time_benchmark.py jsii_calc --compare treatment.json baseline.json
```

Expected improvement: >5% reduction in cold-start import time due to elimination of module object creation and attribute copying in `publication.publish()`.

## Design Note: Why `import jsii` Was Not Renamed to `import jsii as _jsii`... Wait, It Was

The import *is* renamed to `import jsii as _jsii` in generated `__init__.py` modules. However, it is important to note that `import jsii` was **NOT** renamed to `import jsii as _jsii` in the `_jsii/__init__.py` subpackage itself or in bin scripts.

Specifically, the alternative of renaming the *runtime import* inside `_jsii/__init__.py` to `import jsii as _jsii` was rejected because `_jsii` collides with the local `_jsii/` subpackage directory present in every generated package. When pyright encounters `import jsii as _jsii` inside a package that has a `_jsii/` subdirectory, it resolves `_jsii` to the local submodule rather than the alias, causing type errors. The underscore-prefixed alias is only safe in the top-level `__init__.py` where no such collision exists.

Bin scripts (standalone entry points generated by `emitBinScripts`) continue to use bare `import jsii` because they are not library modules — they are executable scripts where hiding the import name provides no benefit.
