"""Centralized runtime type-checking helper for jsii generated code.

This module is imported by every generated jsii package at module level, but
the expensive dependencies (``typeguard``, ``importlib.metadata``) are loaded
lazily on first call to :func:`check_type`. This means:

- The cost of importing typeguard and probing its version is paid at most once
  across all generated modules (not once per module as before).
- When running with ``python -O`` (optimized mode, ``__debug__`` is False),
  ``check_type`` is never called and typeguard is never imported at all.
"""

import os
import typing

# Whether jsii runtime type checking is enabled. Defaults to off (opt-in): the
# kernel enforces the same constraints on the wire, so the generated Python-side
# checks are an ergonomic aid (a native ``TypeError`` raised at the call site, in
# Python vocabulary) rather than an additional safety mechanism. The value is
# seeded once from the environment at import time -- matching the static-field
# semantics of the Java/.NET ``Configuration`` toggles -- and can be changed at
# runtime via :func:`set_runtime_type_checking`. Because generated code imports
# the ``runtime_type_checking_enabled`` *function* (not its return value), a
# later call to :func:`set_runtime_type_checking` is observed on subsequent
# checks.
_ENABLED: bool = os.environ.get("JSII_RUNTIME_TYPE_CHECKING", "").lower() in (
    "1",
    "true",
    "on",
)


def runtime_type_checking_enabled() -> bool:
    """Return whether jsii runtime type checking is currently enabled.

    Defaults to ``False``. Enable it by setting the ``JSII_RUNTIME_TYPE_CHECKING``
    environment variable (to ``1``, ``true``, or ``on``) before import, or by
    calling :func:`set_runtime_type_checking` at runtime.
    """
    return _ENABLED


def set_runtime_type_checking(enabled: bool) -> None:
    """Enable or disable jsii runtime type checking for the current process.

    Takes effect for all subsequent jsii method/constructor/property calls.
    """
    global _ENABLED
    _ENABLED = bool(enabled)


# Resolved typeguard-backed implementation, populated on first call to
# ``check_type`` and reused thereafter. Caching here (rather than hot-patching
# the module attribute) ensures the expensive resolution in
# ``_load_typeguard_check`` runs at most once per process, even though generated
# code imports ``check_type`` by value (``from jsii._type_checking import
# check_type``) and therefore never re-reads the module attribute.
_resolved_check: typing.Optional[typing.Callable[..., typing.Any]] = None

# Memoized ``typing.get_type_hints`` results, keyed by the type-checking stub
# function. Generated type-checking stubs are module-level functions whose
# annotations never change, yet generated code resolves their hints on *every*
# jsii method/constructor/struct invocation. Resolving the (PEP 563 stringized)
# annotations -- evaluating forward refs, walking generics, building ``typing``
# objects -- is the dominant per-call cost of runtime type checking and scales
# with the number of jsii calls. Caching turns that into one resolution per
# distinct stub actually used. The runtime is single-threaded by design, so a
# plain dict needs no locking.
_type_hints_cache: "typing.Dict[typing.Any, typing.Dict[str, typing.Any]]" = {}


def cached_type_hints(
    stub: typing.Callable[..., typing.Any],
) -> typing.Dict[str, typing.Any]:
    """Return ``typing.get_type_hints(stub)``, memoized per stub function.

    Behaves identically to :func:`typing.get_type_hints` for the stub functions
    emitted by jsii-pacmak (whose annotations are fixed for the life of the
    process), but resolves each stub's hints at most once instead of on every
    call. Callers must treat the returned mapping as read-only, since it is
    shared across all invocations that reference the same stub.
    """
    hints = _type_hints_cache.get(stub)
    if hints is None:
        hints = typing.get_type_hints(stub)
        _type_hints_cache[stub] = hints
    return hints


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
