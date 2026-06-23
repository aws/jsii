"""Tests for the memoized type-hint resolution in jsii._type_checking.

Generated code resolves a type-checking stub's hints on every jsii call. These
tests verify that ``cached_type_hints`` resolves each stub at most once per
process (the dominant per-call cost of runtime type checking), while remaining
behavior-identical to ``typing.get_type_hints``.
"""

import typing

import pytest

import jsii._type_checking as tc


def _make_stub():
    def _typecheckingstub__example(
        versioned: typing.Optional[bool] = None,
        name: str = "",
    ) -> None:
        """Type checking stubs"""
        pass

    return _typecheckingstub__example


def setup_function():
    # Each test starts from a clean cache so ordering can't leak state.
    tc._type_hints_cache.clear()


def test_cached_type_hints_matches_get_type_hints():
    """The cached result is identical to typing.get_type_hints."""
    stub = _make_stub()
    assert tc.cached_type_hints(stub) == typing.get_type_hints(stub)


def test_cached_type_hints_resolves_once_per_stub(monkeypatch):
    """get_type_hints is called at most once per stub, regardless of call count."""
    calls = {"count": 0}
    real_get_type_hints = typing.get_type_hints

    def counting_get_type_hints(*args, **kwargs):
        calls["count"] += 1
        return real_get_type_hints(*args, **kwargs)

    monkeypatch.setattr(tc.typing, "get_type_hints", counting_get_type_hints)

    stub = _make_stub()
    first = tc.cached_type_hints(stub)
    for _ in range(50):
        result = tc.cached_type_hints(stub)
        # Same cached object handed back every time.
        assert result is first

    assert calls["count"] == 1


def test_cached_type_hints_distinct_stubs_resolved_separately():
    """Different stubs get their own cache entries."""
    stub_a = _make_stub()
    stub_b = _make_stub()

    hints_a = tc.cached_type_hints(stub_a)
    hints_b = tc.cached_type_hints(stub_b)

    assert stub_a in tc._type_hints_cache
    assert stub_b in tc._type_hints_cache
    # Two distinct stubs -> two entries.
    assert len(tc._type_hints_cache) == 2
    # Equal contents (same annotations) but resolved independently.
    assert hints_a == hints_b


def test_cached_type_hints_resolves_stringized_forward_ref():
    """Mirror real generated code: PEP 563 stringized annotations that reference
    a name resolved lazily through the module globals (as a _LazyImport proxy
    would be), rather than a real type object available at def time.

    The trivial happy-path test uses eager, non-stringized annotations and so
    never exercises the eval-against-globals path that actually runs in
    generated jsii modules.
    """

    # A stand-in for a jsii _LazyImport proxy: attribute access returns the real
    # class, simulating an on-demand submodule import.
    class _LazyModuleProxy:
        class Very:
            pass

        def __getattr__(self, name):
            return getattr(type(self), name)

    lazy_alias = _LazyModuleProxy()

    # Build a stub whose annotations are *strings* (as emitted under
    # ``from __future__ import annotations``) referencing the lazy alias by the
    # name it is bound to in the resolution namespace. No ``None`` default is
    # used, since that would make get_type_hints implicitly wrap the annotation
    # in ``typing.Optional`` and obscure the forward-ref resolution we're testing.
    def _typecheckingstub__forwardref(value):
        """Type checking stubs"""
        pass

    _typecheckingstub__forwardref.__annotations__ = {
        "value": "lazy_alias.Very",
        "return": "None",
    }

    # get_type_hints needs the referenced name in scope; pass it via localns the
    # same way the real module globals provide the lazy alias.
    localns = {"lazy_alias": lazy_alias}

    expected = typing.get_type_hints(_typecheckingstub__forwardref, localns=localns)

    # Sanity: the forward ref actually resolved to the real class, not a string.
    assert expected["value"] is _LazyModuleProxy.Very

    # Patch get_type_hints so cached_type_hints resolves with the same localns,
    # then confirm behavior is identical and memoized.
    real_get_type_hints = typing.get_type_hints

    def get_type_hints_with_localns(stub):
        return real_get_type_hints(stub, localns=localns)

    original = tc.typing.get_type_hints
    tc.typing.get_type_hints = get_type_hints_with_localns
    try:
        first = tc.cached_type_hints(_typecheckingstub__forwardref)
        second = tc.cached_type_hints(_typecheckingstub__forwardref)
    finally:
        tc.typing.get_type_hints = original

    assert first == expected
    assert first["value"] is _LazyModuleProxy.Very
    # Memoized: same object handed back without re-resolving.
    assert second is first


def test_cached_type_hints_does_not_cache_failed_resolution(monkeypatch):
    """A stub whose first resolution raises must NOT be cached.

    This locks in the failure-handling invariant: because the cache write only
    happens after a successful ``get_type_hints`` call, a raising resolution
    (e.g. an unresolvable lazily-loaded submodule, cf. #5179) leaves the cache
    untouched so a later call retries instead of serving a poisoned entry.
    """
    stub = _make_stub()

    calls = {"count": 0}
    real_get_type_hints = typing.get_type_hints

    def flaky_get_type_hints(*args, **kwargs):
        calls["count"] += 1
        if calls["count"] == 1:
            raise KeyError("submodule not yet imported")
        return real_get_type_hints(*args, **kwargs)

    monkeypatch.setattr(tc.typing, "get_type_hints", flaky_get_type_hints)

    # First call: resolution raises and nothing is cached.
    with pytest.raises(KeyError):
        tc.cached_type_hints(stub)
    assert stub not in tc._type_hints_cache

    # Second call: retries, succeeds, and now caches.
    result = tc.cached_type_hints(stub)
    assert result == real_get_type_hints(stub)
    assert stub in tc._type_hints_cache
    assert calls["count"] == 2
