from typing import Union

from ._runtime import JSIIAssembly, JSIIMeta, kernel


# JS doesn't have distinct float or integer types, but we do. So we'll define our own
# type alias that will allow either.
Number = Union[int, float]


# Alias our Kernel methods here, so that jsii.<method> works. This will hide the fact
# that there is a kernel at all from our callers.
load = kernel.load
create = kernel.create
delete = kernel.delete
get = kernel.get
set = kernel.set
sget = kernel.sget
sset = kernel.sset
invoke = kernel.invoke
sinvoke = kernel.sinvoke
stats = kernel.stats


__all__ = [
    "JSIIAssembly",
    "JSIIMeta",
    "Number",
    "load",
    "create",
    "delete",
    "get",
    "set",
    "sget",
    "sset",
    "invoke",
    "sinvoke",
    "stats",
]
