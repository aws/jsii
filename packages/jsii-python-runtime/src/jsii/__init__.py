from ._runtime import JSIIAssembly, JSIIMeta, kernel


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
