docs(python): add import verification checklist for the Python target

## What

Adds `docs/target-python/import-verification.md`, a repeatable checklist for
verifying that a change affecting the jsii **Python** target's import behavior,
lazy loading, or runtime type checking is complete and introduces no breaking
changes for downstream Python consumers.

The doc is explicitly **scoped to imports / module-loading / lazy-loading and
runtime type checking** (plus the general build/test and backwards-compatibility
gates needed to validate such a change). It deliberately does **not** try to be
a comprehensive guide to the whole Python target — type mapping, naming,
inheritance, async, docstrings, and packaging are called out as out of scope.

## Why

The lazy-loading work in the Python target (PEP 562 submodules, `_LazyImport`
cross-module proxies, centralized/lazy `check_type`, on-demand type resolution
at the kernel boundary) introduced several import-time surfaces that are easy to
regress and not obvious to verify. This checklist captures, in one place, the
steps to validate those surfaces so future import-related changes can be checked
consistently.

## Structure

- **Audience:** written for AI coding agents assisting with a contribution
  (human-readable too).
- **General checks (1–5):** runnable from the jsii repo alone — build/tests/
  snapshots, typeguard 2/3/4 matrix + pyright, lazy-loading/import semantics
  (incl. `python -O`), runtime type-checking resolution, and Python version
  coverage.
- **CDK-maintainer-only checks (A–C):** require a local aws-cdk-lib checkout and
  target release-impacting changes — large-consumer validation, public Python
  API-surface diff, and import-time performance. Agents without that checkout
  are instructed to skip and say so rather than approximate.

## Notes for reviewers

- This is **process guidance**, not enforced tooling. A few of the
  CDK-maintainer-only steps (cold import sweep, public-surface diff with import-
  alias normalization, import-time benchmark) describe techniques for which a
  reusable harness is **not yet committed**; the doc flags those as
  manual/advanced. Happy to follow up by promoting that tooling into
  `build-tools/` if the team wants it runnable as a command.
- Verified the repo-fact references while writing: the `yarn test` typeguard
  2/3/4 + pyright flow, the three `check_type` version branches in
  `_type_checking.py`, the `if __debug__:` type-check guard in generated code,
  and `python_requires=">=3.10"`.
- No code changes; documentation only.

---

By submitting this pull request, I confirm that my contribution is made under the terms of the [Apache 2.0 license].

[Apache 2.0 license]: https://www.apache.org/licenses/LICENSE-2.0
