# Implementation Plan: Python Lazy Imports

## Overview

Replace eager submodule imports in jsii-pacmak's Python code generator with PEP 562 lazy loading. The change is scoped to `PythonModule.emit()` in `packages/jsii-pacmak/lib/targets/python.ts`. Modules with child submodules will generate a `_SUBMODULES` set, `__getattr__`, and `__dir__` instead of `from . import <submodule>` statements. Assembly-loading modules are excluded.

## Tasks

- [ ] 1. Add `import importlib as _importlib` to module header imports
  - In `PythonModule.emit()` in `packages/jsii-pacmak/lib/targets/python.ts`, add a conditional `import importlib as _importlib` line to the standard imports block
  - Only emit this import when `this.modules.length > 0` (module has child submodules)
  - Place it alongside the existing standard library imports (`abc`, `builtins`, `datetime`, etc.)
  - Do NOT emit it for assembly-loading modules (`this.loadAssembly === true`), since those never have child submodules (enforced by the existing `assert` in `addPythonModule`)
  - _Requirements: 1.1, 1.2, 1.5_

- [ ] 2. Replace eager submodule imports with lazy loading block
  - [ ] 2.1 Generate `_SUBMODULES` set and `__getattr__`/`__dir__` functions
    - In `PythonModule.emit()`, replace the existing "Loading modules" block (the `if (this.modules.length > 0)` section that emits `from . import <submodule>`) with the lazy loading code block
    - Emit a `_SUBMODULES` set literal containing sorted short names of all direct child submodules
    - Emit a `__getattr__` function that checks `_SUBMODULES`, calls `_importlib.import_module(f".{name}", __name__)`, caches in `globals()`, and raises `AttributeError` for unknown names
    - Emit a `__dir__` function returning `[*__all__, *_SUBMODULES]`
    - Keep `publication.publish()` in its current position before the lazy loading block
    - Keep `context.typeCheckingHelper.flushStubs(code)`, `context.intersectionTypes.flushHelperTypes(code)`, and `emitProtocolStripper` after the lazy loading block (unchanged)
    - Submodule names must remain in the `__all__` list (no changes to `exportedMembers` logic)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 7.1, 7.2, 8.1, 8.3_

  - [ ] 2.2 Ensure assembly-loading modules are excluded
    - Verify that the `loadAssembly` guard prevents lazy loading code from being emitted for assembly-loading modules
    - The existing code structure already handles this: the `if (this.modules.length > 0)` block is only reached for non-assembly modules (assembly modules never have child submodules due to the `assert` in `addPythonModule`)
    - No code change expected here — this is a verification step during implementation
    - _Requirements: 6.1, 6.2_

  - [ ]* 2.3 Write property test: Submodule set correctness (Property 1)
    - **Property 1: Submodule set correctness**
    - **Validates: Requirements 1.1, 8.1**
    - Install `fast-check` as a devDependency in `packages/jsii-pacmak/package.json`
    - Create test file `packages/jsii-pacmak/test/python-lazy-imports.prop.test.ts`
    - Generate random arrays of valid Python identifier strings as submodule names
    - Create a `PythonModule` with those submodules, run `emit()`, and verify:
      - The output contains a `_SUBMODULES` set with exactly those names, sorted
      - The output does NOT contain `from . import <name>` for any of those names

  - [ ]* 2.4 Write property test: __all__ includes submodule names (Property 2)
    - **Property 2: __all__ includes submodule names**
    - **Validates: Requirements 2.2**
    - Generate random arrays of submodule names, run `emit()`, and verify every submodule short name appears in the `__all__` list

  - [ ]* 2.5 Write property test: Assembly-loading modules excluded (Property 3)
    - **Property 3: Assembly-loading modules are excluded from lazy loading**
    - **Validates: Requirements 6.1**
    - Generate module configurations with `loadAssembly=true`, run `emit()`, and verify the output contains none of: `_SUBMODULES`, `def __getattr__`, `def __dir__`

  - [ ]* 2.6 Write property test: Code generation determinism (Property 4)
    - **Property 4: Code generation determinism (idempotence)**
    - **Validates: Requirements 8.2**
    - For a given module configuration, run `emit()` twice and verify the outputs are byte-for-byte identical

- [ ] 3. Checkpoint - Verify core implementation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Write example-based unit tests
  - [ ] 4.1 Create unit test file for lazy loading code generation
    - Create `packages/jsii-pacmak/test/python-lazy-imports.test.ts`
    - Test that a module with submodules generates `__getattr__` with correct `_importlib.import_module(f".{name}", __name__)` pattern
    - Test that a module with submodules generates `__dir__` returning `[*__all__, *_SUBMODULES]`
    - Test that a module with zero submodules generates no lazy loading code (`_SUBMODULES`, `__getattr__`, `__dir__` are absent)
    - Test that `__getattr__` raises `AttributeError` for unknown names (code structure check)
    - Test that `publication.publish()` appears before the lazy loading block in the output
    - Test that `import importlib as _importlib` is added to imports when submodules exist
    - Test that `import importlib as _importlib` is NOT added when no submodules exist
    - Test that the `from ..._jsii import *` statement is preserved in non-assembly modules
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 3.3, 6.1, 6.2, 7.1, 8.1, 8.3_

- [ ] 5. Update snapshot tests
  - [ ] 5.1 Regenerate Python target snapshots
    - Run `npx jest --updateSnapshot` for `packages/jsii-pacmak/test/generated-code/target-python.test.ts` to update all Python snapshot files
    - The snapshots for all four test fixture packages (`@scope/jsii-calc-base-of-base`, `@scope/jsii-calc-base`, `@scope/jsii-calc-lib`, `jsii-calc`) will be updated to reflect the new lazy loading pattern
    - Verify the updated snapshots show: `_SUBMODULES` set, `__getattr__`, `__dir__` in modules with submodules
    - Verify the updated snapshots do NOT show `from . import <submodule>` in modules with submodules
    - Verify assembly-loading modules remain unchanged in snapshots
    - Verify the mypy check passes on the generated code (runs automatically as part of the snapshot test)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 3.3, 4.5, 5.1, 5.2, 6.1, 6.2, 7.1, 7.2, 8.1, 8.2, 8.3_

- [ ] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The design uses TypeScript, matching the project's existing language
- `fast-check` is not currently in the monorepo and must be added as a devDependency for property tests
- The existing snapshot test infrastructure (`target-python.test.ts` → `harness.ts`) runs mypy on generated code, which validates type correctness of the new `__getattr__` and `__dir__` signatures
- The pyright check (`python-pyright.test.ts`) provides additional type checker validation
- Assembly-loading modules never have child submodules (enforced by `assert` in `addPythonModule`), so the `loadAssembly` exclusion is inherently satisfied by the existing code structure
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
