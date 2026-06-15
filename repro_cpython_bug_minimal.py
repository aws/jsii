"""
Minimal reproduction of CPython ForwardRef caching bug with typing.Union.

When two functions in different namespaces have identical
`typing.Union["Name", typing.Dict[str, typing.Any]]` annotations,
Python interns the typing.Union object (and thus shares the ForwardRef
inside it). After the shared ForwardRef is evaluated once,
`typing.get_type_hints()` returns the stale cached result for the
second namespace — even though a different class with the same name
exists there.

Tested on: CPython 3.12.11

Root cause: Python interns `typing.Union[ForwardRef("X"), Dict[str, Any]]`
objects. Two functions with identical Union annotations share the same
ForwardRef("X") object. After the first `get_type_hints()` call evaluates it,
the ForwardRef caches the result (`__forward_evaluated__ = True`,
`__forward_value__ = <resolved class>`). Subsequent calls skip re-evaluation
because `localns is globalns` (both default to None or same object), hitting
the fast path that returns the cached value.

Workaround: either
  (a) pass `localns` as a different-identity dict than `globalns`, or
  (b) make the whole annotation a string (creates a fresh ForwardRef per call)
"""
import typing


class Foo:
    """Lives in namespace A."""
    pass


class Bar:
    """Lives in namespace B — different class, same local name 'Cls'."""
    pass


ns_a = {"Cls": Foo, "typing": typing}
ns_b = {"Cls": Bar, "typing": typing}


def stub_a(x: typing.Union["Cls", typing.Dict[str, typing.Any]]):
    ...


def stub_b(x: typing.Union["Cls", typing.Dict[str, typing.Any]]):
    ...


# Resolve in namespace A first
hints_a = typing.get_type_hints(stub_a, globalns=ns_a)
# Then resolve in namespace B
hints_b = typing.get_type_hints(stub_b, globalns=ns_b)

resolved_a = typing.get_args(hints_a["x"])[0]
resolved_b = typing.get_args(hints_b["x"])[0]

print(f"stub_a resolved 'Cls' to: {resolved_a}")  # Expected: Foo
print(f"stub_b resolved 'Cls' to: {resolved_b}")  # Expected: Bar, actual: Foo (BUG)

assert resolved_a is Foo, f"Expected Foo, got {resolved_a}"
assert resolved_b is Bar, f"BUG: Expected Bar, got {resolved_b}"
