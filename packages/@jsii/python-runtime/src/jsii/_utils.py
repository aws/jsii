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


class _LazyImport:
    """Defers ``importlib.import_module()`` until first attribute access.

    This is used by jsii-pacmak generated code to lazily import cross-module
    dependencies, breaking circular import chains and reducing module load time.

    The imported module is cached after first successful resolution. Failed
    imports are NOT cached, allowing retry on subsequent access.
    """

    def __init__(self, module_name: str) -> None:
        self._module_name = module_name
        self._module: Any = None

    def __getattr__(self, name: str) -> Any:
        if self._module is None:
            self._module = importlib.import_module(self._module_name)
        return getattr(self._module, name)

    def __repr__(self) -> str:
        if self._module is not None:
            return repr(self._module)
        return f"_LazyImport({self._module_name!r})"
