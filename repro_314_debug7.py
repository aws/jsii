"""Debug: test with owner as callable - does ForwardRef.evaluate() use owner's globals?"""

import typing
import sys
import annotationlib

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

# Patch evaluate_forward_ref to see what parameters reach ForwardRef.evaluate
original_evaluate = annotationlib.ForwardRef.evaluate

def patched_evaluate(self, *, globals=None, locals=None, type_params=None, owner=None, format=annotationlib.Format.VALUE):
    print(f"  ForwardRef.evaluate() called:")
    print(f"    arg: {self.__forward_arg__!r}")
    print(f"    globals type: {type(globals).__name__ if globals else None}")
    print(f"    globals is _typechecking_ns: {globals is _typechecking_ns}")
    print(f"    locals type: {type(locals).__name__ if locals else None}")
    print(f"    locals is _typechecking_localns: {locals is _typechecking_localns}")
    print(f"    owner: {owner!r}")
    print(f"    self.__forward_module__: {self.__forward_module__!r}")
    print(f"    self.__globals__: {'set' if self.__globals__ is not None else 'None'}")
    return original_evaluate(self, globals=globals, locals=locals, type_params=type_params, owner=owner, format=format)

annotationlib.ForwardRef.evaluate = patched_evaluate

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
