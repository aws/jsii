# PR Review Fixes Tracker

## 1. Nested class `__qualname__` not set correctly

**Reviewer comment:** Classes inside classes (e.g. `CfnBucket.LifecycleRuleProperty`) get wrong `__qualname__` when wrapped in a lazy factory function. Python sets it to `_lazy_build_CfnBucket.<locals>.CfnBucket.LifecycleRuleProperty` instead of `CfnBucket.LifecycleRuleProperty`.

**Fix:** Added `emitNestedQualnames()` to `BasePythonClassType` that recursively emits `__qualname__` fixups for all nested class/interface/struct members after the outer class qualname is set. Called in all three factory wrapper close sites (Class, Interface, Struct).

**Files changed:**
- `packages/jsii-pacmak/lib/targets/python.ts`
- Snapshots updated

**Status:** ✅ Done
