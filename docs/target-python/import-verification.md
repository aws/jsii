# Python Import Verification Checklist

> **Audience: AI coding agents.** This document is written to be consumed by an
> AI agent assisting with a jsii contribution. It encodes the verification steps
> an agent should run (and the order to run them) when a change affects the jsii
> **Python target's import behavior, lazy loading, or runtime type checking**. A
> human contributor can follow it too, but the phrasing and level of
> explicitness are aimed at an agent executing the steps autonomously.
>
> **Focus:** this checklist is **not** a comprehensive guide to the entire
> Python target. It covers the **import / module-loading / lazy-loading and
> runtime type-checking** surfaces (`packages/@jsii/python-runtime` and the lazy
> import / type-check codegen in
> `packages/jsii-pacmak/lib/targets/python.ts`), plus the general build/test and
> backwards-compatibility gates needed to validate such a change. It does **not**
> cover type-mapping correctness, naming conventions, inheritance/overrides,
> async, docstrings, or packaging — verify those separately if your change
> touches them.
>
> **Scope:** Python only. Changes to shared behavior (kernel API, wire format,
> `.jsii` spec) additionally require cross-language validation — see
> [`CONTRIBUTING.md`](../../CONTRIBUTING.md) and the compliance suite.
>
> **Sections are split into two tiers:**
> - **General checks (1–5)** — runnable by any contributor/agent from the jsii
>   repo alone.
> - **CDK-maintainer-only checks (A–C)** — require a local aws-cdk-lib checkout
>   and are intended for CDK-team maintainers validating a release-impacting
>   change. An agent without that checkout should skip them and say so.

A repeatable checklist for verifying that a jsii change affecting the Python
target's **import and lazy-loading behavior** is **complete** and introduces
**no breaking changes** for downstream Python consumers. It complements the
general contributor flow in [`CONTRIBUTING.md`](../../CONTRIBUTING.md) (build, unit
tests, snapshots, compliance report).

Work top to bottom; skip sections that provably don't apply and note why in the
PR.

---

## 0. Scope the change

- [ ] Which Python layers does it touch? Code generation
  (`targets/python.ts`), the host runtime (`packages/@jsii/python-runtime/src`),
  or both?
- [ ] Is it **runtime behavior**, **generated code shape**, or both?
- [ ] Does it change **import / load semantics** (lazy loading, module layout,
  PEP 562 submodules, `_LazyImport` proxies)? If so, section 3 is mandatory.
- [ ] Does it touch **runtime type checking** (`_type_checking.py`,
  `get_type_hints`, the `check_type` plumbing)? If so, section 4 applies.
- [ ] Record the **baseline** you'll compare against — normally the published
  jsii version currently used by aws-cdk-lib.

> Tip: map every call site in the area you're changing before you start. The
> runtime resolves classes, structs, enums, and behavioral interfaces through
> **separate** code paths — a fix to one often needs a sibling fix in the
> others.

---

# General checks (any contributor)

## 1. Build, unit tests, and snapshots

These are the standard gates (see `CONTRIBUTING.md`); listed here for
completeness.

- [ ] `yarn build` then `cd packages/@jsii/python-runtime && yarn test`.
- [ ] If you changed `targets/python.ts`, run `yarn test:update` in
  `jsii-pacmak` and review the Python snapshot diff by hand — only the intended
  change, generated code stays idiomatic.
- [ ] If you changed `jsii-calc` / `@scope/*`, recompile them
  (`cd packages/jsii-calc && yarn build`) so the `.jsii`, compiled `lib/`, and
  generated bindings are consistent.
- [ ] **Stale-fixture guard:** if importing a generated fixture fails with
  `ModuleNotFoundError: No module named '<pkg>.<x>'` or
  `Cannot find module './<x>'`, the compiled `lib/` is out of sync with source —
  rebuild before trusting any downstream result.

## 2. typeguard version matrix and type stubs

The Python runtime supports three typeguard major versions, each with its own
`check_type` branch in `packages/@jsii/python-runtime/src/jsii/_type_checking.py`
(`<= 2`, `== 3`, `>= 4`). The package's `yarn test` already runs all three plus
pyright:

- [ ] `cd packages/@jsii/python-runtime && yarn test` — runs `test:run:typeguard-2`
  (2.13.3), `test:run:typeguard-3` (3.0.2), `test:run:typeguard-4` (4.3.0), and
  `test:types` (pyright). (Versions as configured in the package's
  `build-tools`; treat those scripts as the source of truth.)
- [ ] If you changed `check_type` or any generated type-checking code, confirm
  **each** typeguard branch passes, not just the default.
- [ ] Expect typeguard 3.x to emit `UserWarning` for non-runtime protocols —
  that is normal pass-through behavior, not a failure.
- [ ] Note: typeguard 3.0.2 is incompatible with Python 3.14+ (uses the removed
  `ast.Str`); the `test:run:typeguard-3` harness auto-skips there.

## 3. Lazy-loading / import semantics

Only if the change touches import behavior, module layout, or type resolution.
These are the Python lazy surfaces introduced by the lazy-loading work; verify
each that your change could affect:

- [ ] **PEP 562 submodules:** `pkg.<submodule>` lazily imports and caches; an
  unknown name raises `AttributeError`; `dir(pkg)` still lists submodules.
- [ ] **`_LazyImport` cross-module proxies:** a deferred sibling-module import
  resolves correctly on first attribute access (and a genuinely missing target
  fails loudly rather than returning a wrong value).
- [ ] **On-demand type resolution at the kernel boundary:** a value whose dynamic
  type lives in a **never-imported** submodule still resolves — for **all four**
  kinds (class, struct, enum, behavioral interface), since each has a separate
  resolution path.
- [ ] **`python -O` / `-OO`:** generated type-checking lives behind
  `if __debug__:` and is compiled out under `-O`; confirm the rest of the
  feature still works end-to-end and the type-check path is genuinely skipped.

## 4. Runtime type-checking resolution (if `check_type` / annotations changed)

Generated argument validation calls
`typing.get_type_hints(_typecheckingstub__<hash>)` and then `check_type`. Under
PEP 563 the stub annotations are strings that must resolve through the lazy
import machinery.

- [ ] Confirm `get_type_hints` resolves for runtime-type-checked methods whose
  argument types live in **sibling** submodules (the resolution must work even
  when that sibling was never explicitly imported).
- [ ] Confirm `check_type` still rejects genuinely wrong values (raises
  `TypeCheckError`) on each supported typeguard version.

## 5. Python version coverage

- [ ] Supported range is **3.10–3.14** (`python_requires=">=3.10"`). Note which
  version you tested on; spot-check the oldest and newest when feasible
  (remember the typeguard 3.x / 3.14 incompatibility above).

---

# CDK-maintainer-only checks

> **These require a local `aws-cdk-lib` checkout** and are intended for CDK-team
> maintainers validating a change that could affect a published release. They
> are **not** part of the baseline contributor flow. An AI agent without an
> aws-cdk-lib checkout (or without the supporting harness) should **skip these
> and state clearly that they were not run**, rather than approximating them.
>
> Where a step says "diff/sweep/benchmark," a reusable harness may not be
> committed yet — if so, treat the step as a manual/advanced procedure and note
> in the PR exactly what was run.

## A. Real large-consumer validation (aws-cdk-lib)

`jsii-calc` does not exercise scale or the cross-submodule shapes that real CDK
code hits. Validate against aws-cdk-lib generated **from the assembly, from
scratch** with your local toolchain — do **not** rely on the published bindings.

- [ ] Generate Python bindings from the assembly:
  ```
  jsii-pacmak <path-to-aws-cdk-lib> --code-only --target python \
    -o <out> --no-fingerprint --force-target
  ```
- [ ] Install your **local** python-runtime + the freshly generated bindings into
  a clean venv with `--no-deps` (so published runtimes don't shadow your local
  one). Verify the imported `jsii` is actually your local checkout.
- [ ] **Cold import sweep:** import every generated submodule in a fresh process
  each — expect 0 import-time failures.
- [ ] **Runtime round-trips:** build a small multi-service app and `synth()` it;
  exercise methods that return types defined in *other* submodules.
- [ ] **Callback path:** subclass/override host code (e.g. an `IAspect.visit`)
  so the kernel calls back into Python with cross-module objects.

## B. Backwards-compatibility: public Python API surface

The heart of "nothing breaks for users." Note: a pacmak/runtime-only change on
unchanged source produces the **same `.jsii` assembly**, so `jsii-diff` is a
no-op — the real risk lives in the **generated Python code shape**.

- [ ] Generate aws-cdk-lib Python bindings with the **baseline** jsii and with
  **your branch**, then diff the public surface:
  - public modules, classes, public methods/properties **with signatures**
    (param names, kinds, default presence), `__all__`, and exported constants.
  - Normalize internal import aliases before comparing — e.g.
    `_Resource_<hash>` (baseline) and `_aws_cdk_<hash>.Resource` (lazy) are the
    **same** class; only the generated alias differs.
- [ ] Expectations: **0** removed modules/classes/methods, **0** changed
  signatures, **0** removed `__all__` exports. Any genuine removal, rename, or
  retype is a breaking change and must be justified.

## C. Performance (if import or runtime cost could change)

- [ ] Benchmark **import time**, baseline vs branch, across many fresh processes;
  report median and min. Isolate pure-Python import cost from the node/kernel
  spawn (stub the assembly `load`) so you measure the Python-side effect.
- [ ] Workloads: root `import aws_cdk`, a single submodule, many submodules
  (~25), and a deep/nested submodule.
- [ ] For lazy changes, measure **first-touch** cost (the one-time import when a
  deferred dependency is first accessed) and confirm subsequent access has no
  per-call penalty.
- [ ] Result is a non-regression; explain any slowdown.

---

## Definition of done (Python)

**General (any contributor):**

1. Build, unit tests, and reviewed snapshots pass.
2. typeguard 2 / 3 / 4 and pyright all pass.
3. Lazy-loading / import surfaces affected by the change are verified, including
   `python -O`.
4. Runtime type-checking resolution verified if `check_type` / annotations
   changed.
5. Tested Python version(s) recorded in the PR.

**CDK-maintainer-only (release-impacting changes, requires aws-cdk-lib):**

6. Validated against aws-cdk-lib generated from scratch (cold import sweep,
   runtime round-trips, callbacks).
7. No breaking change to the generated public Python API surface.
8. Import/runtime performance is non-regressed.

> An agent should report which tier(s) it completed and explicitly flag any
> CDK-maintainer-only check it could not run.
