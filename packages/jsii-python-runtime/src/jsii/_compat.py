# Internal Compatability Shims
import sys


if sys.version_info >= (3, 7):
    import importlib.resources as importlib_resources
else:
    import importlib_resources


__all__ = ["importlib_resources"]
