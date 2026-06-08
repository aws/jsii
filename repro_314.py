"""Minimal reproduction of the Python 3.14 NameError with typing.get_type_hints
and a _TypeCheckingNamespace dict subclass."""

import typing

# Simulate _LAZY_CLASSES: a dict mapping class names to factory functions
_LAZY_CLASSES = {}

def _memoized(func):
    sentinel = object()
    result = sentinel
    def wrapper():
        nonlocal result
        if result is sentinel:
            result = func()
        return result
    wrapper.__name__ = func.__name__
    return wrapper

@_memoized
def _lazy_build_CompositeOperation() -> type:
    import enum
    class CompositeOperation:
        class CompositionStringStyle(enum.Enum):
            NORMAL = "NORMAL"
            DECORATED = "DECORATED"
    CompositeOperation.__qualname__ = "CompositeOperation"
    return CompositeOperation

_LAZY_CLASSES["CompositeOperation"] = _lazy_build_CompositeOperation


class _TypeCheckingNamespace(typing.Dict[str, object]):
    _LAZY = _LAZY_CLASSES

    def __contains__(self, key: object) -> bool:
        return super().__contains__(key) or (isinstance(key, str) and key in self._LAZY)

    def __missing__(self, key: str) -> object:
        if key in self._LAZY:
            cls = self._LAZY[key]()
            self[key] = cls
            return cls
        raise KeyError(key)

_typechecking_ns = _TypeCheckingNamespace(globals())
_typechecking_localns = _TypeCheckingNamespace(globals())


# Simulate the type-checking stub that gets generated
def _typecheckingstub__test(
    value: "CompositeOperation.CompositionStringStyle",
) -> None:
    """Type checking stubs"""
    pass


# Now try to resolve type hints - this is what fails on 3.14
try:
    hints = typing.get_type_hints(
        _typecheckingstub__test,
        globalns=_typechecking_ns,
        localns=_typechecking_localns,
    )
    print(f"SUCCESS: {hints}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")
