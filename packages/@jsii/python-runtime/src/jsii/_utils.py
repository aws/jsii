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


class _LazyBuiltins(dict):
    """A builtins dict that lazily materializes deferred classes on lookup.

    CPython's ``eval()`` checks builtins as a fallback after globals and locals.
    Unlike globals/locals lookups (which use C-level ``PyDict_GetItemWithError``
    and bypass ``__missing__``), the builtins lookup uses ``PyObject_GetItem``
    which triggers Python-level ``__missing__`` on dict subclasses.

    This is used as the ``__builtins__`` value inside the namespace passed to
    ``typing.get_type_hints()``, providing lazy class resolution that works
    across all Python versions (3.12+).
    """

    def __init__(self, base: "dict[str, Any]", lazy_classes: "dict[str, Any]") -> None:
        super().__init__(base)
        self._lazy_classes = lazy_classes

    def __missing__(self, key: str) -> Any:
        if key in self._lazy_classes:
            cls = self._lazy_classes[key]()
            self[key] = cls
            return cls
        raise KeyError(key)


class _TypeCheckingNamespace(dict):
    """A namespace dict for ``typing.get_type_hints()`` that lazily resolves
    deferred class names.

    Combines two mechanisms for cross-version compatibility:

    1. ``__missing__`` + ``__contains__`` on this dict — works on Python 3.12-3.13
       where ``eval()`` triggers ``__missing__`` on the globals dict, and on 3.14
       for simple identifier annotations (ForwardRef fast path).

    2. A ``__builtins__`` entry containing a ``_LazyBuiltins`` dict — works on
       Python 3.14+ for complex annotations (e.g. ``typing.Union[Struct, ...]``)
       where ``ForwardRef.evaluate()`` copies locals into a plain dict and
       ``eval()`` no longer triggers ``__missing__`` on globals. The builtins
       fallback uses ``PyObject_GetItem`` which does trigger ``__missing__``.

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
        # Install lazy builtins so eval() can resolve deferred classes
        # via the builtins fallback (works on all Python versions).
        import builtins as _builtins

        self["__builtins__"] = _LazyBuiltins(vars(_builtins), lazy_classes)

    def __missing__(self, key: str) -> Any:
        if key in self._lazy_classes:
            cls = self._lazy_classes[key]()
            self[key] = cls
            return cls
        raise KeyError(key)

    def __contains__(self, key: object) -> bool:
        # Python 3.14's ForwardRef.evaluate() uses `arg in globals` before
        # doing `globals[arg]` for simple identifiers. We must report True
        # for lazy class names so the subsequent __getitem__ triggers __missing__.
        if super().__contains__(key):
            return True
        if isinstance(key, str) and key in self._lazy_classes:
            return True
        return False
