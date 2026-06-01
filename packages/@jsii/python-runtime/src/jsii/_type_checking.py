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


def check_type(argname: str, value: object, expected_type: typing.Any) -> typing.Any:
    """Validate *value* against *expected_type*, adapting to the installed typeguard version.

    Typeguard and version detection are loaded on first invocation and cached
    for subsequent calls.
    """
    resolved = _resolve()
    # Hot-patch the module-level name so future calls go directly to the resolved function.
    import jsii._type_checking as _self

    _self.check_type = resolved  # type: ignore[attr-defined]
    return resolved(argname=argname, value=value, expected_type=expected_type)


def _resolve() -> typing.Callable[..., typing.Any]:
    """Lazily import typeguard and return the appropriate check_type implementation."""
    import typeguard
    from importlib.metadata import version as _metadata_package_version
    from jsii._reference_map import InterfaceDynamicProxy

    major_version: int = int(_metadata_package_version("typeguard").split(".")[0])

    if major_version <= 2:

        def _check_type(
            argname: str, value: object, expected_type: typing.Any
        ) -> typing.Any:
            return typeguard.check_type(
                argname=argname, value=value, expected_type=expected_type
            )  # type:ignore[call-overload]

    elif major_version == 3:

        def _check_type(
            argname: str, value: object, expected_type: typing.Any
        ) -> typing.Any:
            if isinstance(value, InterfaceDynamicProxy):
                pass
            else:
                typeguard.config.collection_check_strategy = (
                    typeguard.CollectionCheckStrategy.ALL_ITEMS
                )  # type:ignore[attr-defined]
                typeguard.check_type(
                    value=value, expected_type=expected_type
                )  # type:ignore[call-overload]

    else:

        def _check_type(
            argname: str, value: object, expected_type: typing.Any
        ) -> typing.Any:
            if isinstance(value, InterfaceDynamicProxy):
                pass
            else:
                typeguard.check_type(
                    value=value,
                    expected_type=expected_type,
                    collection_check_strategy=typeguard.CollectionCheckStrategy.ALL_ITEMS,  # type:ignore[attr-defined]
                )

    return _check_type
