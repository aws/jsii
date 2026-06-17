"""Centralized runtime type-checking helper for jsii generated code.

This module is imported by every generated jsii package at module level, but
the expensive dependencies (``typeguard``, ``importlib.metadata``) are loaded
lazily on first call to :func:`check_type`. This means:

- The cost of importing typeguard and probing its version is paid at most once
  across all generated modules (not once per module as before).
- When running with ``python -O`` (optimized mode, ``__debug__`` is False),
  ``check_type`` is never called and typeguard is never imported at all.
"""

import typing

# Resolved typeguard-backed implementation, populated on first call to
# ``check_type`` and reused thereafter. Caching here (rather than hot-patching
# the module attribute) ensures the expensive resolution in
# ``_load_typeguard_check`` runs at most once per process, even though generated
# code imports ``check_type`` by value (``from jsii._type_checking import
# check_type``) and therefore never re-reads the module attribute.
_resolved_check: typing.Optional[typing.Callable[..., typing.Any]] = None


def check_type(argname: str, value: object, expected_type: typing.Any) -> typing.Any:
    """Validate *value* against *expected_type*, adapting to the installed typeguard version.

    Typeguard and version detection are loaded on first invocation and cached
    for subsequent calls.
    """
    impl = _resolved_check
    if impl is None:
        impl = _resolve_check()
    return impl(argname=argname, value=value, expected_type=expected_type)


def _resolve_check() -> typing.Callable[..., typing.Any]:
    """Resolve and memoize the typeguard-backed check implementation (runs once)."""
    global _resolved_check
    if _resolved_check is None:
        _resolved_check = _load_typeguard_check()
    return _resolved_check


def _load_typeguard_check() -> typing.Callable[..., typing.Any]:
    """Lazily import typeguard and return a version-appropriate check_type implementation."""
    import typeguard  # type: ignore
    from importlib.metadata import version as _metadata_package_version
    from jsii._reference_map import InterfaceDynamicProxy

    major_version: int = int(_metadata_package_version("typeguard").split(".")[0])

    if major_version <= 2:

        def _check_type(
            argname: str, value: object, expected_type: typing.Any
        ) -> typing.Any:
            return typeguard.check_type(argname=argname, value=value, expected_type=expected_type)  # type: ignore

    elif major_version == 3:

        def _check_type(
            argname: str, value: object, expected_type: typing.Any
        ) -> typing.Any:
            if isinstance(value, InterfaceDynamicProxy):
                pass
            else:
                typeguard.config.collection_check_strategy = typeguard.CollectionCheckStrategy.ALL_ITEMS  # type: ignore
                typeguard.check_type(value=value, expected_type=expected_type)  # type: ignore

    else:

        def _check_type(
            argname: str, value: object, expected_type: typing.Any
        ) -> typing.Any:
            if isinstance(value, InterfaceDynamicProxy):
                pass
            else:
                typeguard.check_type(value=value, expected_type=expected_type, collection_check_strategy=typeguard.CollectionCheckStrategy.ALL_ITEMS)  # type: ignore

    return _check_type
