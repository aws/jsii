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
        if self._module is None:
            self._module = importlib.import_module(self._module_name, self._package)
        return getattr(self._module, name)

    def __repr__(self) -> str:
        if self._module is not None:
            return repr(self._module)
        if self._package:
            return f"_LazyImport({self._module_name!r}, {self._package!r})"
        return f"_LazyImport({self._module_name!r})"


class _TypeCheckingNamespace(dict):
    """A dict subclass that lazily resolves deferred class names on first access.

    Used as the ``globalns`` argument to ``typing.get_type_hints()`` in
    jsii-pacmak generated code.

    On CPython 3.12-3.13, ``ForwardRef._evaluate`` calls
    ``eval(code, globalns, localns)`` which triggers ``__missing__`` on dict
    lookups for keys not yet present.

    On CPython 3.14+, ``ForwardRef.evaluate()`` no longer uses ``eval()``.
    Instead it performs explicit ``if arg in locals`` / ``if arg in globals``
    checks followed by direct ``[]`` access. The ``in`` operator calls
    ``__contains__``, so we override it to report ``True`` for any key that
    has a lazy factory — ensuring the subsequent ``[]`` access triggers
    ``__missing__`` which materializes the class.

    The homonymous ForwardRef caching bug (where interned Union objects cause
    cross-module contamination) is avoided by emitting entire type annotations
    as string literals, so each ``get_type_hints()`` call creates a fresh
    ForwardRef that is always re-evaluated in the correct namespace.
    """

    def __init__(
        self, module_globals: "dict[str, Any]", lazy_classes: "dict[str, Any]"
    ) -> None:
        super().__init__(module_globals)
        self._lazy_classes = lazy_classes

    def __missing__(self, key: str) -> Any:
        if key in self._lazy_classes:
            cls = self._lazy_classes[key]()
            self[key] = cls
            return cls
        raise KeyError(key)

    def __contains__(self, key: object) -> bool:
        # Python 3.14's ForwardRef.evaluate() uses `arg in globals` before
        # doing `globals[arg]`. We must report True for lazy class names so
        # the subsequent __getitem__ triggers __missing__.
        if super().__contains__(key):
            return True
        if isinstance(key, str) and key in self._lazy_classes:
            return True
        return False
