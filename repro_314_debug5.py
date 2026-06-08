"""Debug: trace ForwardRef.evaluate() step by step."""

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

# Now let's trace evaluate_forward_ref
print("=== Direct ForwardRef.evaluate() with our namespaces ===")
fwd = annotationlib.ForwardRef("CompositeOperation.CompositionStringStyle")
try:
    result = fwd.evaluate(globals=_typechecking_ns, locals=_typechecking_localns)
    print(f"Direct evaluate SUCCESS: {result}")
except Exception as e:
    print(f"Direct evaluate FAILED: {type(e).__name__}: {e}")

print()
print("=== typing.evaluate_forward_ref with our namespaces ===")
fwd2 = annotationlib.ForwardRef("CompositeOperation.CompositionStringStyle")
try:
    result = typing.evaluate_forward_ref(
        fwd2,
        globals=_typechecking_ns,
        locals=_typechecking_localns,
        type_params=(),
        owner=_typecheckingstub__test,
    )
    print(f"evaluate_forward_ref SUCCESS: {result}")
except Exception as e:
    print(f"evaluate_forward_ref FAILED: {type(e).__name__}: {e}")

print()
print("=== typing._make_forward_ref then evaluate_forward_ref ===")
fwd3 = typing._make_forward_ref(
    "CompositeOperation.CompositionStringStyle",
    is_argument=True,
    is_class=False,
)
print(f"fwd3 type: {type(fwd3)}")
print(f"fwd3.__forward_module__: {fwd3.__forward_module__!r}")
print(f"fwd3.__owner__: {fwd3.__owner__!r}")
print(f"fwd3.__globals__: {fwd3.__globals__!r}")
try:
    result = typing.evaluate_forward_ref(
        fwd3,
        globals=_typechecking_ns,
        locals=_typechecking_localns,
        type_params=(),
        owner=_typecheckingstub__test,
    )
    print(f"_make_forward_ref + evaluate SUCCESS: {result}")
except Exception as e:
    print(f"_make_forward_ref + evaluate FAILED: {type(e).__name__}: {e}")

print()
print("=== Full get_type_hints path, but with owner=None ===")
fwd4 = annotationlib.ForwardRef("CompositeOperation.CompositionStringStyle")
try:
    result = typing.evaluate_forward_ref(
        fwd4,
        globals=_typechecking_ns,
        locals=_typechecking_localns,
        type_params=(),
        owner=None,
    )
    print(f"owner=None SUCCESS: {result}")
except Exception as e:
    print(f"owner=None FAILED: {type(e).__name__}: {e}")
