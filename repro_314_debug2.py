"""Debug: trace exactly what happens in ForwardRef.evaluate() on 3.14."""

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
        result = super().__contains__(key) or (isinstance(key, str) and key in self._LAZY)
        print(f"  _TCN.__contains__({key!r}) -> {result}")
        return result

    def __missing__(self, key: str) -> object:
        print(f"  _TCN.__missing__({key!r})")
        if key in self._LAZY:
            cls = self._LAZY[key]()
            self[key] = cls
            return cls
        raise KeyError(key)

    def __getitem__(self, key):
        print(f"  _TCN.__getitem__({key!r})")
        return super().__getitem__(key)

_typechecking_ns = _TypeCheckingNamespace(globals())
_typechecking_localns = _TypeCheckingNamespace(globals())


# Simulate the type-checking stub
def _typecheckingstub__test(
    value: "CompositeOperation.CompositionStringStyle",
) -> None:
    """Type checking stubs"""
    pass


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

print()
print("=== Now try with ForwardRef directly ===")
if sys.version_info >= (3, 14):
    import annotationlib
    fwd = annotationlib.ForwardRef("CompositeOperation.CompositionStringStyle")
    print(f"ForwardRef arg: {fwd.__forward_arg__!r}")
    print(f"Is identifier: {'CompositeOperation.CompositionStringStyle'.isidentifier()}")
    try:
        result = fwd.evaluate(globals=_typechecking_ns, locals=_typechecking_localns)
        print(f"ForwardRef.evaluate() SUCCESS: {result}")
    except Exception as e:
        print(f"ForwardRef.evaluate() FAILED: {type(e).__name__}: {e}")
