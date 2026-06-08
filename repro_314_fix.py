"""Verify the fix: use a plain dict that eagerly materializes all lazy classes."""

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


# The fixed approach: build a plain dict with all deferred classes pre-resolved
def _build_typechecking_ns() -> dict:
    ns = dict(globals())
    for name, factory in _LAZY_CLASSES.items():
        ns[name] = factory()
    return ns

_typechecking_ns = _build_typechecking_ns()
_typechecking_localns = _build_typechecking_ns()


def _typecheckingstub__test(
    value: "CompositeOperation.CompositionStringStyle",
) -> None:
    """Type checking stubs"""
    pass


# Now try to resolve type hints
try:
    hints = typing.get_type_hints(
        _typecheckingstub__test,
        globalns=_typechecking_ns,
        localns=_typechecking_localns,
    )
    print(f"SUCCESS: {hints}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")
