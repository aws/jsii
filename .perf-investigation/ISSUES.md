# Lazy Imports & Python Synth Performance — Issue Tracker

> Tracking doc for issues, risks, and test gaps found while reviewing the lazy-import
> and synth-performance work. Companion to `FINDINGS.md` (perf attribution) and
> `measurements.md` (raw data).
>
> Status legend: 🔴 open · 🟡 in progress · 🟢 resolved · ⚪ won't fix / accepted

## Commits under review

| Commit | PR | Summary |
|--------|----|---------|
| `2ad88388e` | #5110 | feat: replace eager submodule imports with lazy loading (PEP 562) |
| `f768c2f30` | #5137 | fix: centralize and lazy-load typeguard |
| `d9b804b5c` | #5169 | fix(python): typeguard check runs every call instead of once per process |
| `6088919e8` | #5172 | fix: sibling module deps eagerly loaded even if only for type annotations |
| `8b893d785` | #5164 | perf(kernel): ~67% faster assembly loading via a runtime index |
| `69f2c2b9b` | #5162 | perf(kernel): defer error-context & cache serialization values |
| `993c8a51b` | #5055 | perf(kernel): cache type resolution by FQN |
| `9df2e30a1` | #5056 | perf(kernel): replace linear method/property search with Map lookup |
| `8ac4c88a7` | #5057 | perf(runtime): enable webpack compress and mangle |

---

## Bugs / correctness concerns

### ISSUE-1 🔴 (High) Lazy resolution retry does not cover behavioral interfaces or anonymous structs

**Where:** `packages/@jsii/python-runtime/src/jsii/_reference_map.py`, `_ReferenceMap.resolve()` and `build_interface_proxies_for_ref()`.

**Problem:** The on-demand import retry only fires in the final `else` branch and only
re-checks `_types` / `_data_types` / `_enums`:

```python
else:
    if _try_import_type_module(class_fqn):
        if class_fqn in _types:        ...
        elif class_fqn in _data_types: ...
        elif class_fqn in _enums:      ...
    raise ValueError(f"Unknown type: {class_fqn}")
```

But `build_interface_proxies_for_ref` dereferences `_interfaces` directly:

```python
ifaces = [_interfaces[fqn] for fqn in ref.interfaces or []]
```

If the kernel returns an object whose `ref.interfaces` names a **behavioral interface
(`IFoo`) from a submodule that was never imported**, this raises `KeyError` instead of
triggering a lazy import + retry. The `"Object"` (anonymous struct/interface) branch reads
`_data_types` / `_interfaces` with the same assumption.

**Impact:** Runtime crash (`KeyError`) on a previously-working code path, only under lazy
loading, only when a host-bound object's dynamic interface type lives in an unimported
submodule.

**Proposed fix:** Before dereferencing `_interfaces` (in both the `Object` branch and
`build_interface_proxies_for_ref`), attempt `_try_import_type_module(fqn)` for each
interface FQN that isn't registered yet, then retry. Consolidate the "resolve or lazily
import" logic into one helper used by all branches.

**Status:** Open. Needs a reproducing test (see TEST-1).

---

### ISSUE-2 🟡 (Medium) Cross-module proxies still resolve eagerly at class-definition time

**Where:** Generated Python (`emitLazyProxyAssignments` / `emitLazyImportClass` in
`packages/jsii-pacmak/lib/targets/python.ts`).

**Observation:** `_LazyImport` + `from __future__ import annotations` (PEP 563) only defers
**annotation-only** dependencies. References that execute at class-definition time still
force the proxy to import immediately:

- base classes — `class BinaryOperation(_scope_..._c61f082f.Operation, ...)`
- decorators — `@jsii.implements(_scope_..._c61f082f.IFriendly)`
- struct bases — `@jsii.data_type(jsii_struct_bases=[_scope_..._c61f082f.MyFirstStruct])`
- struct construction in method bodies

**Impact:** Not a bug — this is unavoidable (you cannot lazily load a base class). But it
caps the import savings and explains why the measured import saving is ~flat (~0.85s, see
`measurements.md` §4). Documenting so it isn't mistaken for a regression.

**Status:** Accepted behavior; documented. No action unless we want to quantify how much of
the eager cascade remains for aws-cdk-lib.

---

### ISSUE-3 🟡 (Low) `get_type_hints` moves *import* cost to first runtime type-check

**Where:** Generated `if __debug__:` blocks calling `typing.get_type_hints(stub)`.

**Observation:** With PEP 563, annotations are stringized, so `get_type_hints` forces
resolution of the cross-module names → triggers `_LazyImport.__getattr__` →
`importlib.import_module`. The import cost for an annotation-only dependency is therefore
paid at **first runtime type-check** of a method touching that type, rather than at module
load.

**Impact:** Net win (cost is deferred and may never be paid), but it shifts cost onto the
first call.

**Relationship to ISSUE-6:** This is *only* about the one-time import-resolution cost
shifting to first call. The much larger, recurring problem — `get_type_hints` being
recomputed on **every** call and never memoized — is tracked separately as **ISSUE-6**,
which is the dominant per-call cost and the more important finding. Treat ISSUE-3 as a
footnote to ISSUE-6.

**Status:** Subsumed by ISSUE-6; keep only as a note about the lazy-import interaction.

---

### ISSUE-6 🟡 (High) `get_type_hints(stub)` is recomputed on every jsii call (not memoized)

**Where:** Every generated method/constructor/struct body:

```python
if __debug__:
    type_hints = typing.get_type_hints(_typecheckingstub__<hash>)
    check_type(argname="argument versioned", value=versioned, expected_type=type_hints["versioned"])
    ...
```

**Problem:** `typing.get_type_hints(...)` evaluates annotations, resolves forward refs, and
constructs `typing` objects **on every invocation** — it is not memoized. The dominant
runtime-type-checking cost is this typing machinery (`_type_check`, `_eval_type`,
`_strip_annotations`, `Union.__init__`, `_collect_type_parameters`, …), **not**
`typeguard.check_type` itself. The cost is purely per-call and scales linearly with the
number of jsii calls, so it grows with app size.

**Evidence:** cProfile of a ~2,200-resource synth (Python 3.13, aws-cdk-lib 2.258.1),
sorted by `tottime`: the `get_type_hints` typing machinery + `typeguard.check_type` are
among the largest pure-Python contributors; `json` / `cattrs` are not in the top 20.
Running the same synth under `python -O` (skips the `__debug__` blocks) cut end-to-end wall
time by ~13% (best-of-3; noisy because much Python time is blocked on the synchronous
runtime round-trip).

**Are the checks still worth the cost?** The kernel's `SerializationError` now pinpoints the
offending field (including nested structs/arrays), shows the failing value, and renders it
as a tree. The Python-side check provides only *ergonomic* extras over the kernel error,
not additional safety:
- a native `TypeError` instead of a `RuntimeError` chained to a `JavaScriptError`,
- failure at the exact Python call site, before the wire round-trip,
- expected types in Python vocabulary (`bool`, `NoneType`) vs wire vocabulary
  (`boolean | undefined`).

The kernel enforces the same constraints on the wire regardless of whether the Python-side
checks run.

**Proposals (not mutually exclusive):**
1. **Memoize `get_type_hints` per stub** (module-level memo keyed by the stub function).
   Behavior-identical; turns O(total calls) hint resolutions into O(distinct methods used).
   Low risk, pure win, benefits everyone — do this regardless.
2. **Make runtime type checking opt-in / expose a discoverable toggle.** `python -O` works
   today but is blunt (disables *all* asserts/`__debug__` blocks across the app and deps,
   and is undiscoverable). Given how detailed kernel errors now are, defaulting off (kernel
   as safety net) is defensible.

**Maintainer direction (rix0rrr, from the issue thread):** improve the error messages, make
the Python runtime throw a `TypeError`, then **remove** runtime type checking,
`get_type_hints`, and `typeguard` entirely — saves time and a dependency, with a good UX
either way. Proposed simplified message style:

```
TypeError: new aws-cdk-lib.aws_s3.Bucket: 'props' is not aws-cdk-lib.aws_s3.BucketProps?
╰── 'versioned': is not boolean? (got: string 'yes')
```

**Impact:** Largest known per-call Python cost in synth; scales with app size. Interacts
with the typeguard centralization (#5137) and the once-per-process fix (#5169) — but those
addressed `check_type`/typeguard resolution, **not** the `get_type_hints` recomputation,
which remains.

**Origin (NOT introduced by the recent work):** The per-call, non-memoized
`get_type_hints(stub)` pattern dates back to `6c4b77301` — "feat(python): add dynamic type
checking (#3660)", Romain Marcadier, Jul 2022. It has been emitted this way since dynamic
type checking was first added (~4 years). The recent lazy-import / perf commits did **not**
introduce this cost; they (a) optimized the adjacent `check_type`/typeguard path (#5137,
#5169) without touching the `get_type_hints` recompute, and (b) made it more worth fixing,
since the kernel's now-detailed `SerializationError` makes the Python-side check largely
ergonomic. ISSUE-3 is the only *recent* interaction (first `get_type_hints` call also
triggers the deferred sibling-module import).

**Status:** Proposal (1) **IMPLEMENTED** — `jsii._type_checking.cached_type_hints` memoizes
hint resolution per stub; codegen emits `cached_type_hints(stub)` instead of
`typing.get_type_hints(stub)`. Regression test in `tests/test_type_checking_cache.py`
(covers TEST-6). Proposal (2)/removal is a larger design decision still tracked with the
maintainers.

**Repro:** ~2,200-resource CDK Python app (aws-cdk-lib 2.258.1), Python 3.13.
`python -m cProfile -o out.prof app.py`, sort by `tottime`; compare `python app.py` vs
`python -O app.py`.

---

## Behavioral / compatibility changes (not bugs, but call out for release notes)

### ISSUE-4 🟡 (Medium) PEP 562 changes module-namespace introspection semantics

**Where:** Generated root `__init__.py` (`__getattr__` / `__dir__` / `_SUBMODULES`).

**Change:** `import pkg` no longer eagerly binds all submodules into `pkg.__dict__`.
Access via attribute (`pkg.aws_s3`) and `dir(pkg)` work, but tools that iterate
`vars(pkg)` / `pkg.__dict__` expecting every submodule present will see only those accessed
so far.

**Impact:** Deep-introspection tooling (some doc generators, IDE indexers, custom Sphinx
extensions) may behave differently. Standard `autodoc`/`automodule` (walks `__all__`/`dir()`)
is fine.

**Status:** Document in release notes / migration guide. Validate against a real aws-cdk-lib
Sphinx build (see TEST-5).

---

### ISSUE-5 🟡 (Low) `python -O` now skips typeguard entirely

**Where:** `_type_checking.py` + generated `if __debug__:` blocks.

**Change:** In optimized mode (`__debug__ == False`), `check_type` is never called and
typeguard is never imported, so runtime type validation is fully disabled. Previously
typeguard was imported eagerly regardless of mode.

**Impact:** Intended optimization, but a behavior change. Users relying on runtime type
checks under `-O` (unusual) lose them.

**Status:** Document in release notes.

---

## Test gaps

### TEST-1 🔴 (High) No test for interface-typed / anonymous-object returns from an unimported submodule

Covers ISSUE-1. Existing `test_class_can_be_used_when_not_expressedly_loaded` only returns a
**class** instance. Need a fixture method that returns a value whose dynamic type is a
**behavioral interface** (or anonymous `Object` with interfaces) living in a submodule the
user never imported, and assert it resolves instead of raising `KeyError`.

### TEST-2 🔴 (Medium) No regression test for typeguard "resolve once per process" (#5169)

The by-value-import bug that made typeguard resolution run every call has no guard. Add a
test that monkeypatches/counts `_load_typeguard_check` (or `_resolve_check`) invocations and
asserts it runs at most once across many `check_type` calls.

### TEST-3 🟡 (Medium) No test for `python -O` behavior

Assert that under optimized mode typeguard is not imported and `check_type` is not invoked.

### TEST-4 🟡 (Medium) No concurrency test for runtime-index build vs read

Two kernels loading the same cold cache entry simultaneously, racing the worker-thread build
against a reader. The atomic temp+rename and "manifest written last" ordering should handle
it; currently untested. (`runtime-index.test.ts` covers layout/validation/strip/fallback
well otherwise.)

### TEST-5 🟡 (Low) No validation of a real Sphinx/docgen build against lazy modules

Covers ISSUE-4. Validate an aws-cdk-lib (or jsii-calc) Sphinx `autodoc` build and a
jsii-docgen run still produce complete output with lazy submodules. The `.sphinx-lab`
experiment in the repo is the natural place to run this.

### TEST-6 🟢 (High) No test that `get_type_hints` is resolved at most once per stub

Covers ISSUE-6 proposal (1). **DONE** — `tests/test_type_checking_cache.py` asserts
`cached_type_hints` resolves each stub once (monkeypatched call count), returns a result
identical to `typing.get_type_hints`, hands back the same cached object on repeat calls, and
caches distinct stubs separately.

---

## Verified non-issues (checked, no action needed)

- **Wire format / `.jsii` spec unchanged.** No commit touched `@jsii/spec` or
  `gh-pages/content/specification/*`. Kernel `$jsii.*` serialization is untouched.
- **Rosetta unaffected.** Reads `.jsii` assemblies + TS source; never imports generated
  Python or uses the kernel package cache.
- **docgen unaffected at the data level.** Consumes the `.jsii` assembly via jsii-reflect,
  not generated Python (but see ISSUE-4 for the introspection caveat).
- **Runtime index is a private, versioned, best-effort on-disk cache.** Falls back to full
  eager parse on any inconsistency; correctness never depends on it. `resolveWithin` guards
  against `..`/absolute-path manifest tampering.
- **`naming` kernel API still works.** Reads only `metadata.targets`, which the runtime
  index preserves (only `types`, `readme`, `submodules` are dropped from the slim metadata).
- **Stripped `docs` / `locationInModule` are not read at runtime.** Confirmed no kernel/
  runtime consumer reads them; they're compile-time only.
- **`runtime-index-worker.js` is bundled** into the webpack runtime (`webpack.config.js`
  `index-worker` entry), so indexing is not silently disabled in the distributed runtime.

---

## Changelog

- _(today)_ — Initial issue tracker created from review of the lazy-import / synth-perf work.
- _(today)_ — Added ISSUE-6 (`get_type_hints` recomputed every call) + TEST-6 from the
  GitHub issue thread; reclassified ISSUE-3 as a footnote subsumed by ISSUE-6.
- _(today)_ — Noted ISSUE-6 origin: pre-existing since #3660 (Jul 2022), NOT introduced by
  the recent lazy-import / perf work.
- _(today)_ — Implemented ISSUE-6 proposal (1): added `cached_type_hints` memoization in
  `_type_checking.py`, switched codegen to emit it, updated 85 python snapshots, added
  `test_type_checking_cache.py` (TEST-6). Compliance + runtime-type-checking suites green.
