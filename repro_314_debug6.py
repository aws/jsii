"""Debug: check if Python 3.14's lazy annotations mechanism is bypassing our namespaces."""

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

# Check if 3.14 uses __annotate__ on the function
print(f"Has __annotate__: {hasattr(_typecheckingstub__test, '__annotate__')}")
print(f"Has __annotations__: {hasattr(_typecheckingstub__test, '__annotations__')}")

if hasattr(_typecheckingstub__test, '__annotate__'):
    print(f"__annotate__ function: {_typecheckingstub__test.__annotate__}")
    # Call it directly
    try:
        ann = _typecheckingstub__test.__annotate__(annotationlib.Format.VALUE)
        print(f"__annotate__(VALUE): {ann}")
    except Exception as e:
        print(f"__annotate__(VALUE) FAILED: {type(e).__name__}: {e}")

    try:
        ann = _typecheckingstub__test.__annotate__(annotationlib.Format.FORWARDREF)
        print(f"__annotate__(FORWARDREF): {ann}")
    except Exception as e:
        print(f"__annotate__(FORWARDREF) FAILED: {type(e).__name__}: {e}")

# Check get_annotations behavior
print()
print("=== annotationlib.get_annotations ===")
try:
    ann = annotationlib.get_annotations(_typecheckingstub__test, format=annotationlib.Format.VALUE)
    print(f"get_annotations(VALUE): {ann}")
except Exception as e:
    print(f"get_annotations(VALUE) FAILED: {type(e).__name__}: {e}")

try:
    ann = annotationlib.get_annotations(_typecheckingstub__test, format=annotationlib.Format.FORWARDREF)
    print(f"get_annotations(FORWARDREF): {ann}")
    for name, value in ann.items():
        print(f"  {name}: type={type(value).__name__}, repr={value!r}")
        if isinstance(value, annotationlib.ForwardRef):
            print(f"    __forward_module__={value.__forward_module__!r}")
            print(f"    __globals__={'set' if value.__globals__ is not None else 'None'}")
            print(f"    __owner__={value.__owner__!r}")
except Exception as e:
    print(f"get_annotations(FORWARDREF) FAILED: {type(e).__name__}: {e}")
