import json

from ._compat import importlib_resources

# Load our version number and other metadata.
_meta = json.loads(
    importlib_resources.files("jsii").joinpath("_metadata.json").read_text()
)

__version__ = _meta["version"]
__jsii_runtime_version__ = _meta["jsii-runtime"]["version"]


__all__ = ["__version__", "__jsii_runtime_version__"]
