"""Tests for the memoized type-hint resolution in jsii._type_checking.

Generated code resolves a type-checking stub's hints on every jsii call. These
tests verify that ``cached_type_hints`` resolves each stub at most once per
process (the dominant per-call cost of runtime type checking), while remaining
behavior-identical to ``typing.get_type_hints``.
"""

import typing

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
