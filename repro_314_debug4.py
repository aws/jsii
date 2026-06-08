"""Debug: trace _eval_type behavior with prefer_fwd_module."""

import typing
import sys

print(f"Python version: {sys.version}")

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


def _typecheckingstub__test(
    value: "CompositeOperation.CompositionStringStyle",
) -> None:
    """Type checking stubs"""
    pass

# Monkey-patch _eval_type to trace what's happening
original_eval_type = typing._eval_type

def traced_eval_type(t, globalns, localns, type_params=typing._sentinel, **kwargs):
    if hasattr(t, '__forward_arg__'):
        print(f"  _eval_type called:")
        print(f"    ForwardRef arg: {t.__forward_arg__!r}")
        print(f"    __forward_module__: {t.__forward_module__!r}")
        print(f"    prefer_fwd_module: {kwargs.get('prefer_fwd_module')}")
        print(f"    globalns type: {type(globalns).__name__}")
        print(f"    localns type: {type(localns).__name__}")
        print(f"    globalns is _typechecking_ns: {globalns is _typechecking_ns}")
        print(f"    localns is _typechecking_localns: {localns is _typechecking_localns}")
    return original_eval_type(t, globalns, localns, type_params, **kwargs)

typing._eval_type = traced_eval_type

print("=== Calling typing.get_type_hints ===")
try:
    hints = typing.get_type_hints(
        _typecheckingstub__test,
        globalns=_typechecking_ns,
        localns=_typechecking_localns,
    )
    print(f"SUCCESS: {hints}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")
