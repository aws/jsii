# Internal Compatability Shims
import sys


if sys.version_info < (3, 11):
    import importlib_resources
else:
    import importlib.resources as importlib_resources


__all__ = ["importlib_resources"]
