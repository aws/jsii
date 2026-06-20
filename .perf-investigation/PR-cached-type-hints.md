perf(python): memoize get_type_hints in runtime type checking

## Problem

Generated Python bindings run runtime type checking on every constructor /
method / struct call. Each generated body contains:

```python
if __debug__:
    type_hints = typing.get_type_hints(_typecheckingstub__<hash>)
    check_type(argname="argument versioned", value=versioned, expected_type=type_hints["versioned"])
```

`typing.get_type_hints(...)` evaluates the (PEP 563 stringized) annotations,
resolves forward refs, and builds `typing` objects **on every invocation** — it
is not memoized. The type-checking stub is a module-level function whose
annotations never change for the life of the process, so this is the same work
redone on every call.

The dominant cost of runtime type checking is this `get_type_hints` typing
machinery (`_type_check`, `_eval_type`, `_strip_annotations`, `Union.__init__`,
`_collect_type_parameters`, …), **not** `typeguard.check_type` itself. It is a
purely per-call cost that scales linearly with the number of jsii calls, so it
grows with app size. In a cProfile of a ~2,200-resource synth (Python 3.13,
aws-cdk-lib 2.258.1) the typing machinery reached via `get_type_hints` is one of
the largest pure-Python contributors; running the same synth under `python -O`
(which skips the `__debug__` blocks) reduced end-to-end wall time by ~13%.

This is a long-standing characteristic, introduced with dynamic type checking
in #3660 (Jul 2022) — not a recent regression. It is surfaced here because the
recent kernel/codegen performance work made it the next-largest per-call cost.

## Solution

Memoize the hint resolution per stub. A new `cached_type_hints` helper in
`jsii._type_checking` caches `typing.get_type_hints(stub)` results keyed by the
stub function, and generated code calls it instead of `typing.get_type_hints`:

```python
if __debug__:
    type_hints = cached_type_hints(_typecheckingstub__<hash>)
    check_type(...)
```

This turns O(total jsii calls) hint resolutions into O(distinct methods used).
First call to a given method resolves and caches; every subsequent call is a
dict lookup.

Key properties:

- **Behavior-identical.** `get_type_hints(stub)` is deterministic for a fixed
  stub, so a cached result produces exactly the same `check_type` behavior and
  error messages.
- **Stays lazy.** Resolution still happens on first *call*, not at import. We do
  not pre-resolve at module load, because that would dereference the
  `_LazyImport` cross-module proxies and re-trigger the eager import cascade that
  the recent lazy-loading work removed.
- **No per-module boilerplate.** The helper lives once in the runtime, mirroring
  how `check_type` was centralized in #5137 — generated modules just import it.
- **Single-threaded.** The runtime is single-threaded by design, so the cache is
  a plain dict with no locking.

### Generated code change

```diff
-from jsii._type_checking import check_type
+from jsii._type_checking import cached_type_hints, check_type
 ...
-        type_hints = typing.get_type_hints(_typecheckingstub__<hash>)
+        type_hints = cached_type_hints(_typecheckingstub__<hash>)
```

## Compatibility

- **Additive runtime change.** Old generated code (which imports only
  `check_type`) keeps working against the new runtime.
- **Release ordering.** New generated code imports `cached_type_hints`, so the
  `@jsii/python-runtime` change must ship with or before the codegen change. This
  is the same generator↔runtime version pin that already governs `check_type`.
- **Removable later.** The symbol is private (`jsii._type_checking`) and has no
  external consumers, so it can be revised or removed in lockstep with codegen —
  e.g. it would be deleted alongside the `check_type` blocks if runtime type
  checking is ever removed.
- **No wire/spec impact.** `@jsii/spec`, the kernel API, and the `$jsii.*`
  serialization format are untouched. Other host runtimes (Java/.NET/Go) and
  rosetta/docgen are unaffected (Python-only code path).

## Changes

- `packages/@jsii/python-runtime/src/jsii/_type_checking.py` — add
  `cached_type_hints` (per-stub memo of `typing.get_type_hints`).
- `packages/jsii-pacmak/lib/targets/python.ts` — emit `cached_type_hints(stub)`
  instead of `typing.get_type_hints(stub)`, and import it alongside `check_type`.
- `packages/@jsii/python-runtime/tests/test_type_checking_cache.py` — new
  regression tests.
- `packages/jsii-pacmak/test/targets/__snapshots__/target-python.test.js.snap` —
  85 snapshots updated (the `get_type_hints` → `cached_type_hints` swap and the
  import line).

## Testing

- New unit tests assert: cached result equals `typing.get_type_hints`;
  `get_type_hints` is invoked at most once per stub across many calls (verified
  with a monkeypatched counter) and the same object is returned each time;
  distinct stubs are cached separately.
- Regenerated `jsii-calc` bindings confirm the new codegen emits
  `cached_type_hints(...)`.
- `test_runtime_type_checking.py` (typeguard 2.x): 23 passed / 41 skipped
  (skips are uninstalled typeguard 3.x/4.x variants).
- `test_compliance.py`: 111 passed / 1 skipped.
- jsii-pacmak python target snapshot suite: green after `-u`.

> Note: the full typeguard 3.x and 4.x matrices were not run locally (they
> require installing alternate typeguard versions). CI covers all three majors.

---

By submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].

[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0
