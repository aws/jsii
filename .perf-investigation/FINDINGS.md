# jsii Python Lazy-Loading: Performance Investigation Findings

> Working document. Investigates WHERE the synth-time savings on the
> `python-imports-6` branch (lazy Python bindings + branch jsii runtime) come
> from, using the `cdk-python-benchmark` apps.

## TL;DR (current best understanding)

The savings have **two** components:

1. **Fixed import/startup saving (~0.85s):** lazy `_LazyImport` proxies +
   `_lazy_build_X()` factories defer class-body execution and cross-module
   imports. Directly measured, reproducible, does NOT scale with resources.
2. **A per-resource synth saving that GROWS with app size (superlinear):**
   located in IPC/kernel-wait time, not Python CPU. This is what makes the
   percentage stay ~constant (~25%) instead of shrinking. **Mechanism still
   under verification** — leading candidate is the aws-cdk-lib core
   `perf_hooks` global measure-buffer growth interacting with kernel heap size.

## Benchmark apps

| App | Stacks | Res/stack | Total res | service imports |
|-----|--------|-----------|-----------|-----------------|
| app-1 | 20 | 400 | 8,000 | 12 |
| app-2 | 100 | 400 | 40,000 | 23 |
| app-3 | 400 | 400 | 160,000 | 44 |

All build only `ssm.StringParameter` (self-contained, no IAM/VPC deps).

## Configurations under test

- **A** = eager bindings (released aws-cdk-lib 2.260.0) + jsii 1.133.0 — true BEFORE
- **B** = eager bindings + branch jsii — isolates the RUNTIME change
- **C** = lazy bindings (local) + branch jsii — AFTER (adds the CODEGEN change)

## Methodology notes / gotchas discovered

- `cdk.json` runs `python3 app.py`; hyperfine MUST run with the venv activated,
  else `python3` resolves to the global mise Python (aws-cdk-lib 2.214.0 /
  jsii 1.114.1) and the venv swap is invisible. (First npx runs were invalid
  for this reason.)
- Machine load was a major confounder: two runaway Kiro plugin helpers drove
  load avg to 200+. Killed (PIDs 98383, 1372). Benchmarks only trustworthy at
  load < ~12 on this 10-core machine.
- cProfile masks the real wall-clock difference (adds large uniform overhead);
  use it only for call counts / relative self-time, not wall time.
- `performance_reporting=False` only skips writing the counters file; the
  `performance.measure()` calls (and buffer growth) still happen.
