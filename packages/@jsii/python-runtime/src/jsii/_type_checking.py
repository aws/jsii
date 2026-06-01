"""Centralized runtime type-checking helper for jsii generated code.

This module is imported by every generated jsii package at module level, but
``typeguard`` is loaded lazily on first call to :func:`check_type`. This means:

- The cost of importing typeguard is paid at most once across all generated
  modules (not once per module as before).
- When running with ``python -O`` (optimized mode, ``__debug__`` is False),
  ``check_type`` is never called and typeguard is never imported at all.
"""

import typing


def check_type(argname: str, value: object, expected_type: typing.Any) -> typing.Any:
    """Validate *value* against *expected_type* using typeguard.

    Typeguard is loaded on first invocation and cached for subsequent calls.
    """
    import typeguard

    return typeguard.check_type(argname=argname, value=value, expected_type=expected_type)  # type:ignore[call-overload]
