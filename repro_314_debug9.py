"""Debug: isolate the owner parameter effect."""

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
        print(f"  __missing__({key!r})")
        if key in self._LAZY:
            cls = self._LAZY[key]()
            self[key] = cls
            return cls
        raise KeyError(key)

    def __getitem__(self, key):
        print(f"  __getitem__({key!r})")
        return super().__getitem__(key)


def _typecheckingstub__test(
    value: "CompositeOperation.CompositionStringStyle",
) -> None:
    """Type checking stubs"""
    pass


# Test with owner=None (worked earlier)
print("=== Test A: ForwardRef.evaluate() with owner=None ===")
ns_a = _TypeCheckingNamespace(globals())
lns_a = _TypeCheckingNamespace(globals())
fwd_a = annotationlib.ForwardRef("CompositeOperation.CompositionStringStyle")
try:
    result = fwd_a.evaluate(globals=ns_a, locals=lns_a, owner=None)
    print(f"SUCCESS: {result}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")

# Test with owner=_typecheckingstub__test (callable)
print()
print("=== Test B: ForwardRef.evaluate() with owner=function ===")
ns_b = _TypeCheckingNamespace(globals())
lns_b = _TypeCheckingNamespace(globals())
fwd_b = annotationlib.ForwardRef("CompositeOperation.CompositionStringStyle")
try:
    result = fwd_b.evaluate(globals=ns_b, locals=lns_b, owner=_typecheckingstub__test)
    print(f"SUCCESS: {result}")
except Exception as e:
    print(f"FAILED: {type(e).__name__}: {e}")
