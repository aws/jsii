"""Debug: understand what get_type_hints does with globalns/localns on 3.14."""

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


# The stub function - the key detail is its __globals__
def _typecheckingstub__test(
    value: "CompositeOperation.CompositionStringStyle",
) -> None:
    """Type checking stubs"""
    pass

print(f"Stub __globals__ is module globals: {_typecheckingstub__test.__globals__ is globals()}")
print(f"Stub __module__: {_typecheckingstub__test.__module__}")
print(f"'CompositeOperation' in stub __globals__: {'CompositeOperation' in _typecheckingstub__test.__globals__}")

# Check if get_type_hints uses __globals__ from the function and ignores our globalns
# Look at the Python 3.14 source: get_type_hints has prefer_fwd_module=True
# which means if __forward_module__ is set on the ForwardRef, it uses the module's
# globals instead of the passed globalns!

# Check: does _make_forward_ref set __forward_module__?
print()
print("=== Checking ForwardRef created by get_type_hints internals ===")

# In Python 3.14, get_type_hints creates ForwardRefs with _make_forward_ref.
# Let's check if _make_forward_ref sets __forward_module__
if sys.version_info >= (3, 14):
    import annotationlib
    
    # Check what get_annotations returns for our stub
    ann = annotationlib.get_annotations(_typecheckingstub__test)
    print(f"Annotations from annotationlib: {ann}")
    
    # In 3.14, annotations may already be ForwardRef objects due to lazy annotations!
    for name, value in ann.items():
        print(f"  {name}: type={type(value).__name__}, value={value!r}")
        if isinstance(value, annotationlib.ForwardRef):
            print(f"    __forward_module__ = {value.__forward_module__!r}")
            print(f"    __owner__ = {value.__owner__!r}")
            print(f"    __globals__ = {'set' if value.__globals__ is not None else 'None'}")
