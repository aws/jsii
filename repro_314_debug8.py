"""Debug: difference between ForwardRef created directly vs via _make_forward_ref."""

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


# Test 1: ForwardRef created directly
print("=== Test 1: ForwardRef created directly ===")
fwd1 = annotationlib.ForwardRef("CompositeOperation.CompositionStringStyle")
try:
    result = fwd1.evaluate(globals=_typechecking_ns, locals=_typechecking_localns, owner=_typecheckingstub__test)
    print(f"SUCCESS: {result}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")

# Test 2: ForwardRef via _make_forward_ref (same as get_type_hints uses)
print()
print("=== Test 2: _make_forward_ref ===")
fwd2 = typing._make_forward_ref("CompositeOperation.CompositionStringStyle", is_argument=True, is_class=False)
try:
    result = fwd2.evaluate(globals=_typechecking_ns, locals=_typechecking_localns, owner=_typecheckingstub__test)
    print(f"SUCCESS: {result}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")

# Test 3: evaluate_forward_ref (what _eval_type calls)
print()
print("=== Test 3: evaluate_forward_ref with owner ===")
fwd3 = typing._make_forward_ref("CompositeOperation.CompositionStringStyle", is_argument=True, is_class=False)
try:
    result = typing.evaluate_forward_ref(
        fwd3,
        globals=_typechecking_ns,
        locals=_typechecking_localns,
        type_params=(),
        owner=_typecheckingstub__test,
    )
    print(f"SUCCESS: {result}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")

# Test 4: The FULL path - call _eval_type directly like get_type_hints does
print()
print("=== Test 4: _eval_type with prefer_fwd_module=True ===")
fwd4 = typing._make_forward_ref("CompositeOperation.CompositionStringStyle", is_argument=True, is_class=False)
try:
    result = typing._eval_type(
        fwd4,
        _typechecking_ns,
        _typechecking_localns,
        (),
        format=None,
        owner=_typecheckingstub__test,
        prefer_fwd_module=True,
    )
    print(f"SUCCESS: {result}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")

# Test 5: Same but without prefer_fwd_module
print()
print("=== Test 5: _eval_type with prefer_fwd_module=False ===")
fwd5 = typing._make_forward_ref("CompositeOperation.CompositionStringStyle", is_argument=True, is_class=False)
try:
    result = typing._eval_type(
        fwd5,
        _typechecking_ns,
        _typechecking_localns,
        (),
        format=None,
        owner=_typecheckingstub__test,
        prefer_fwd_module=False,
    )
    print(f"SUCCESS: {result}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")
