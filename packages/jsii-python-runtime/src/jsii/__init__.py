import json

from typing import Union

from jsii._compat import importlib_resources
from ._runtime import (
    JSIIAssembly,
    JSIIMeta,
    JSIIAbstractClass,
    data_type,
    member,
    kernel,
)


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

# Load our version number and other metadata.
_meta = json.loads(importlib_resources.read_text("jsii", "_metadata.json"))

__version__ = _meta["version"]
__jsii_runtime_version__ = _meta["jsii-runtime"]["version"]


__all__ = [
    "JSIIAssembly",
    "JSIIMeta",
    "JSIIAbstractClass",
    "Number",
    "data_type",
    "member",
    "kernel",
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
