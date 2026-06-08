"""Debug: confirm that __type_params__ on owner causes dict(globals) conversion."""

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


def _typecheckingstub__test(
    value: "CompositeOperation.CompositionStringStyle",
) -> None:
    """Type checking stubs"""
    pass


print(f"_typecheckingstub__test has __type_params__: {hasattr(_typecheckingstub__test, '__type_params__')}")
print(f"_typecheckingstub__test.__type_params__: {getattr(_typecheckingstub__test, '__type_params__', 'N/A')}")

# The Python 3.14 code does:
# if type_params is None and owner is not None:
#     type_params = getattr(owner, "__type_params__", None)
# if type_params is not None:
#     globals = dict(globals)  # <-- CONVERTS TO PLAIN DICT!

# So if __type_params__ is an empty tuple (which it is for regular functions in 3.14),
# type_params becomes () which is falsy but is NOT None!
# Wait, let's check...

type_params = getattr(_typecheckingstub__test, '__type_params__', None)
print(f"type_params from getattr: {type_params!r}")
print(f"type_params is not None: {type_params is not None}")
print(f"bool(type_params): {bool(type_params) if type_params is not None else 'N/A'}")

# In the ForwardRef.evaluate() code:
# if type_params is None and owner is not None:
#     type_params = getattr(owner, "__type_params__", None)
# --> type_params = ()
#
# if type_params is not None:    <--- () is not None!
#     globals = dict(globals)    <--- This WILL execute!

print()
print("So the issue is: () is not None evaluates to True")
print("This converts our _TypeCheckingNamespace to a plain dict!")

# Verify:
ns = _TypeCheckingNamespace(globals())
ns_plain = dict(ns)
print(f"\nOriginal ns type: {type(ns)}")
print(f"dict(ns) type: {type(ns_plain)}")
print(f"'CompositeOperation' in ns: {'CompositeOperation' in ns}")
print(f"'CompositeOperation' in ns_plain: {'CompositeOperation' in ns_plain}")
