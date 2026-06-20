# Raw Measurements Log

## 1. Headline (user-reported, npx cdk synth, hyperfine)

| App | Before (1.133.0 eager) | After (lazy) | Saved | % |
|-----|------------------------|--------------|-------|---|
| app-1 | 6.728s | 5.103s | 1.625s | 24.2% |
| app-2 | 19.702s | 15.310s | 4.392s | 22.3% |
| app-3 | 74.506s | 55.844s | 18.662s | 25.0% |

Percentage is ~constant (~24%) => saving is proportional to total work, NOT fixed.

## 2. Reproduced npx cdk synth (venv activated, this machine)

| App | eager | lazy | saved | % |
|-----|-------|------|-------|---|
| app-1 | 6.099s | 5.087s | 1.01s | 16.6% |
| app-2 | 20.482s | 16.017s | 4.47s | 21.8% |
| app-3 | 73.04s | 60.95s (re-measured) | ~12s | ~16% |

Eager baseline reproduces tightly (73.0–73.4s, matches user 74.5s).
Lazy is the noisier run; app-3 lazy measured 56–64s across attempts.

## 3. CLI overhead (app-1, single session 2x2 matrix)

|        | python3 app.py | npx cdk synth | CLI adds |
|--------|----------------|---------------|----------|
| eager  | 4.641s | 6.175s | 1.534s |
| lazy   | 3.552s | 5.029s | 1.477s |

CLI overhead is CONSTANT (~1.5s) across builds — does NOT amplify the saving.
Saving via python3: 1.089s; via npx: 1.146s — essentially equal.

## 4. Import-only phase (median of 5 fresh procs)

| App | modules | eager import | lazy import | import saved |
|-----|---------|--------------|-------------|--------------|
| app-1 | 12 | 1.304s | 0.431s | 0.873s |
| app-2 | 23 | 1.486s | 0.647s | 0.839s |
| app-3 | 44 | 1.768s | 0.799s | 0.969s |

Import saving is ~FLAT (0.84–0.97s) regardless of module count. Does NOT scale.

## 5. Controlled 3-config attribution (app-2, 40k, cProfile call counts)

A=eager+1.133, B=eager+branch, C=lazy+branch.
- Import phase: A 1.48s -> B 1.06s -> C 0.61s (A->B runtime 0.42s, B->C codegen 0.45s)
- Synth hot path call counts IDENTICAL across A/B/C:
  check_type 1,325,464 ; get_type_hints 80,202 ; kernel IPC sends 40,102
- check_type self-time identical (~1780ms) => no per-call check_type speedup.
- NOTE: 1.133.0 did NOT have the "hot-patch" check_type; that was a different
  (merge-base) commit. check_type is defined in GENERATED code in 1.133.0 and
  computes typeguard version once at import. No per-resource check_type fix.

## 6. CPU vs blocked split (app-3, 8000 res, median of 5, unprofiled)

| metric | A eager+1133 | C lazy+branch | A-C |
|--------|--------------|---------------|-----|
| wall | 3.229s | 3.101s | 0.128s |
| Python CPU | 0.840s | 0.980s | -0.140 (lazy uses MORE cpu) |
| blocked (IPC wait) | 2.399s | 2.085s | 0.314s |

The synth-phase saving is entirely in BLOCKED (kernel IPC wait), not Python CPU.

## 7. Superlinearity scan (app-3, synth phase, us/resource)

| res | eager us/res | lazy us/res | eager blocked | lazy blocked | wall saved |
|-----|--------------|-------------|---------------|--------------|------------|
| 4,000 | 459 | 456 | 1.40s | 1.28s | 0.01s |
| 20,000 | 346 | 307 | 4.85s | 3.87s | 0.78s |
| 40,000 | 373 | 309 | 10.66s | 7.82s | 2.55s |
| 80,000 | 382 | 325 | 22.16s | 16.75s | 4.62s |
| 160,000 | 428 | 358 | 51.92s | 38.38s | 11.28s |

Per-resource cost RISES with size for both builds (superlinear), faster for eager.
Wall saved grows 0.01 -> 11.28s. THIS is why the saving "scales" and the % stays
~constant. Linear extrapolation from 8k would predict only ~3s @160k; actual ~11s.

## 8. perf_hooks hypothesis — TESTED, REJECTED as superlinear driver

aws-cdk-lib core (`core/lib/private/perf.js`) emits `performance.measure()` per
profiled call into a global buffer, cleared only at end of synth(). Warning
"1,000,001 measure entries" fires at 160k for BOTH builds.

Neutralized `performance.measure` in the kernel via NODE_OPTIONS=--require patch:

| res | lazy us/res (nopatch) | lazy us/res (patched) | saved |
|-----|-----------------------|------------------------|-------|
| 4,000 | 459.6 | 392.2 | 67.4 |
| 20,000 | 308.2 | 275.0 | 33.2 |
| 40,000 | 321.1 | 280.9 | 40.2 |
| 80,000 | 319.6 | 285.9 | 33.7 |
| 160,000 | 352.4 | 323.0 | 29.4 |

Superlinear rise (20k->160k): nopatch +44 us/res, patched +48 us/res — UNCHANGED.
=> perf_hooks is a ~constant ~30us/res tax (same for both builds), NOT the
   superlinear driver. Hypothesis rejected. Investigation continues (GC/heap,
   construct-tree O(n) per-op costs).

## 9. Python GC hypothesis — TESTED, REJECTED

app-3 lazy, gc on vs off (performance_reporting=False):

| res | us/res gc_on | us/res gc_off | gc_collections |
|-----|--------------|---------------|----------------|
| 4,000 | 432 | 424 | 18 |
| 20,000 | 310 | 302 | 63 |
| 40,000 | 320 | 319 | 122 |
| 80,000 | 339 | 317 | 245 |
| 160,000 | 342 | 349 | 488 |

Curves nearly identical; superlinear rise persists with GC disabled.
=> Python-side GC is NOT the superlinear driver.

Since ~2/3 of synth time is BLOCKED on the Node kernel IPC, the superlinear
cost is on the KERNEL (Node) side. Remaining candidates: V8 heap/GC growth as
the object reference map grows, or O(n)-per-op construct/token operations in
the CDK JS. Next: measure kernel per-op IPC latency growth directly.

## 10. Per-op kernel latency growth — THE MECHANISM (app-3, 160k)

Monkeypatched `_NodeProcess.send` to time every kernel round-trip, bucketed
into deciles by op index.

| decile | eager ms/op | lazy ms/op | diff |
|--------|-------------|------------|------|
| 1 | 0.2254 | 0.1646 | 0.0608 |
| 2 | 0.1892 | 0.1646 | 0.0246 |
| 3 | 0.2012 | 0.1591 | 0.0421 |
| 4 | 0.1924 | 0.1584 | 0.0340 |
| 5 | 0.2256 | 0.1604 | 0.0652 |
| 6 | 0.2007 | 0.1541 | 0.0466 |
| 7 | 0.2115 | 0.1694 | 0.0421 |
| 8 | 0.2093 | 0.1473 | 0.0620 |
| 9 | 0.2434 | 0.1484 | 0.0950 |
| 10 | 1.3326 | 1.0861 | 0.2465 (this is the synth() emit tail) |

Per-CREATE latency (deciles 1-9): eager 0.211ms vs lazy 0.159ms = lazy ~25%
faster PER CALL, and it is FLAT across the run (no per-op growth).
Over ~144k create ops: ~7.6s saved. Plus a faster synth() emit tail.
Total send time: eager 51.8s vs lazy 40.3s.

### CONCLUSION
The per-op kernel round-trip is a CONSTANT ~0.05ms (~25%) faster on the lazy
build, on EVERY call. It does not grow per-op. The earlier "superlinear" look
in us/resource was an artifact of the fixed synth() emit tail being amortized
differently across workload sizes, NOT per-op growth.

So the synth saving = (constant per-op kernel latency reduction) x (number of
ops). Because op count == resource count, the ABSOLUTE saving scales linearly
with resources, while the PERCENTAGE stays ~constant (~25%). That is exactly
the user's observed pattern.

WHY is each kernel call faster on lazy? The kernel's loaded type surface is
smaller (lazy registers types on demand vs eager registering all of every
imported module's types at load). A smaller registered-type / object-reference
working set in the kernel => cheaper per-call serialization/lookup/V8 heap
behavior. (This is the strongest-supported explanation; further kernel-side
profiling could confirm the exact hot path.)
