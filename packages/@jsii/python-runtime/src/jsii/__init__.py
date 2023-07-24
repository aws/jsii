import sys
from typing import Union

from .__meta__ import __version__, __jsii_runtime_version__
from ._runtime import (
    JSIIAssembly,
    JSIIMeta,
    JSIIAbstractClass,
    enum,
    data_type,
    implements,
    interface,
    member,
    kernel,
    proxy_for,
)
from . import python


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
ainvoke = kernel.ainvoke
sinvoke = kernel.sinvoke
stats = kernel.stats


if sys.version_info < (3, 8):
    from platform import python_version
    import warnings

    warnings.warn(
        f"WARNING: You are using python release {python_version()}, which has reached end-of-life! Support for EOL Python releases may be dropped in the future. Please consider upgrading to Python >= 3.8 as soon as possible.",
    )


__all__ = [
    "__version__",
    "__jsii_runtime_version__",
    "JSIIAssembly",
    "JSIIMeta",
    "JSIIAbstractClass",
    "Number",
    "enum",
    "data_type",
    "implements",
    "interface",
    "member",
    "kernel",
    "proxy_for",
    "load",
    "create",
    "delete",
    "get",
    "set",
    "sget",
    "sset",
    "invoke",
    "ainvoke",
    "sinvoke",
    "stats",
    "python",
]
