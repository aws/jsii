import functools
import importlib

from typing import Any, MutableMapping, Type


class Singleton(type):
    _instances: MutableMapping[Type[Any], Any] = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)

        return cls._instances[cls]


def memoized_property(fgetter):
    stored = []

    @functools.wraps(fgetter)
    def wrapped(self):
        nonlocal stored
        if not stored:
            stored.append(fgetter(self))
        return stored[0]

    return property(wrapped)


def _memoized(func):
    """Cache the return value of a no-arg factory function."""
    sentinel = object()
    result = sentinel

    def wrapper():
        nonlocal result
        if result is sentinel:
            result = func()
        return result

    wrapper.__name__ = func.__name__
    wrapper.__wrapped__ = func  # type: ignore[attr-defined]
    return wrapper


class _LazyImport:
    """Defers ``importlib.import_module()`` until first attribute access.

    This is used by jsii-pacmak generated code to lazily import cross-module
    dependencies, breaking circular import chains and reducing module load time.

    The imported module is cached after first successful resolution. Failed
    imports are NOT cached, allowing retry on subsequent access.
    """

    def __init__(self, module_name: str, package: str | None = None) -> None:
        self._module_name = module_name
        self._package = package
        self._module: Any = None

    def __getattr__(self, name: str) -> Any:
        # Guard against infinite recursion and premature imports.
        #
        # 1. This object's own instance attributes ("_module" etc.) may be
        #    missing from __dict__ when the object is created without __init__
        #    running (e.g. copy.copy/deepcopy/pickle use __new__). Looking up
        #    ``self._module`` would then re-enter __getattr__ forever.
        #
        # 2. Dunder probing by the interpreter and stdlib (copy, pickle,
        #    inspect) — e.g. __deepcopy__, __reduce_ex__, __getstate__ — must
        #    NOT trigger the underlying import. Doing so both defeats laziness
        #    and can break those protocols (an imported module object is not
        #    picklable). A module proxy has no business resolving dunders.
        #
        # In both cases raising AttributeError lets the caller fall back to its
        # default behavior.
        if name.startswith("_") and (
            name in ("_module", "_module_name", "_package")
            or (name.startswith("__") and name.endswith("__"))
        ):
            raise AttributeError(name)
        if self._module is None:
            self._module = importlib.import_module(self._module_name, self._package)
        return getattr(self._module, name)

    def __repr__(self) -> str:
        if self._module is not None:
            return repr(self._module)
        if self._package:
            return f"_LazyImport({self._module_name!r}, {self._package!r})"
        return f"_LazyImport({self._module_name!r})"
