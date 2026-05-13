import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { pacmak, TargetName } from '../../../lib';

/**
 * Tests for the Python lazy imports feature.
 *
 * These tests verify that the code generator correctly emits PEP 562
 * lazy loading code (`_SUBMODULES`, `__getattr__`, `__dir__`) instead of
 * eager `from . import <submodule>` statements.
 */

let outDir: string;

beforeEach(() => {
  outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lazy-imports-test-'));
});

afterEach(() => {
  fs.removeSync(outDir);
});

/**
 * Helper to generate Python code for a given fixture package and return
 * the content of a specific __init__.py file.
 */
async function generateAndRead(pkg: string, initPath: string): Promise<string> {
  const pkgRoot = path.resolve(__dirname, '..', '..', '..', '..', pkg);
  await pacmak({
    codeOnly: true,
    fingerprint: false,
    inputDirectories: [pkgRoot],
    outputDirectory: outDir,
    runtimeTypeChecking: false,
    targets: [TargetName.PYTHON],
  });

  const fullPath = path.join(outDir, 'python', 'src', initPath);
  return fs.readFileSync(fullPath, 'utf-8');
}

describe('Python lazy imports code generation', () => {
  // Use jsii-calc-lib which has submodules (custom_submodule_name, deprecation_removal)
  const LIB_PKG = '@scope/jsii-calc-lib';
  const LIB_INIT = 'scope/jsii_calc_lib/__init__.py';

  // Use jsii-calc which has many submodules
  const CALC_PKG = 'jsii-calc';
  const CALC_INIT = 'jsii_calc/__init__.py';

  // Use jsii-calc-base-of-base which has NO submodules
  const BASE_OF_BASE_PKG = '@scope/jsii-calc-base-of-base';
  const BASE_OF_BASE_INIT = 'scope/jsii_calc_base_of_base/__init__.py';

  test('module with submodules generates import importlib as _importlib', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    expect(content).toContain('import importlib as _importlib');
  });

  test('module with submodules generates _SUBMODULES set', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    expect(content).toContain('_SUBMODULES = {');
    expect(content).toContain('"custom_submodule_name",');
    expect(content).toContain('"deprecation_removal",');
  });

  test('module with submodules generates __getattr__ with importlib.import_module', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    expect(content).toContain('def __getattr__(name: str) -> object:');
    expect(content).toContain('if name in _SUBMODULES:');
    expect(content).toContain(
      'mod = _importlib.import_module(f".{name}", __name__)',
    );
    expect(content).toContain('globals()[name] = mod');
    expect(content).toContain('return mod');
  });

  test('module with submodules generates __getattr__ that raises AttributeError', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    expect(content).toContain(
      'raise AttributeError(f"module {__name__!r} has no attribute {name!r}")',
    );
  });

  test('module with submodules generates __dir__ function', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    expect(content).toContain('def __dir__() -> "list[str]":');
    expect(content).toContain('return [*__all__, *_SUBMODULES]');
  });

  test('module with submodules does NOT generate eager from . import statements outside TYPE_CHECKING', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    // Should not have eager imports outside of TYPE_CHECKING block
    // The only "from . import" should be inside "if typing.TYPE_CHECKING:"
    const lines = content.split('\n');
    let inTypeChecking = false;
    for (const line of lines) {
      if (line.includes('if typing.TYPE_CHECKING:')) {
        inTypeChecking = true;
        continue;
      }
      // TYPE_CHECKING block ends at next non-indented line
      if (inTypeChecking && !line.startsWith(' ') && line.trim() !== '') {
        inTypeChecking = false;
      }
      if (!inTypeChecking) {
        expect(line).not.toMatch(
          /^\s*from \. import (custom_submodule_name|deprecation_removal)/,
        );
      }
    }
    expect(content).not.toContain(
      '# Loading modules to ensure their types are registered',
    );
  });

  test('module with submodules generates TYPE_CHECKING imports for pyright compatibility', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    expect(content).toContain('if typing.TYPE_CHECKING:');
    expect(content).toContain(
      'from . import custom_submodule_name as custom_submodule_name',
    );
    expect(content).toContain(
      'from . import deprecation_removal as deprecation_removal',
    );
  });

  test('module with zero submodules does NOT generate lazy loading code', async () => {
    const content = await generateAndRead(BASE_OF_BASE_PKG, BASE_OF_BASE_INIT);
    expect(content).not.toContain('import importlib as _importlib');
    expect(content).not.toContain('_SUBMODULES');
    expect(content).not.toContain('def __getattr__');
    expect(content).not.toContain('def __dir__');
  });

  test('publication.publish() appears before the lazy loading block', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    const publishIdx = content.indexOf('publication.publish()');
    const submodulesIdx = content.indexOf('_SUBMODULES = {');
    expect(publishIdx).toBeGreaterThan(-1);
    expect(submodulesIdx).toBeGreaterThan(-1);
    expect(publishIdx).toBeLessThan(submodulesIdx);
  });

  test('submodule names are included in __all__', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    // __all__ should contain the submodule names
    const allMatch = content.match(/__all__ = \[([\s\S]*?)\]/);
    expect(allMatch).not.toBeNull();
    const allContent = allMatch![1];
    expect(allContent).toContain('"custom_submodule_name"');
    expect(allContent).toContain('"deprecation_removal"');
  });

  test('_SUBMODULES set entries are sorted', async () => {
    const content = await generateAndRead(CALC_PKG, CALC_INIT);
    const submodulesMatch = content.match(/_SUBMODULES = \{([\s\S]*?)\}/);
    expect(submodulesMatch).not.toBeNull();
    const entries = submodulesMatch![1]
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.startsWith('"'))
      .map((l) => l.replace(/[",]/g, ''));
    // Verify sorted order
    const sorted = [...entries].sort();
    expect(entries).toEqual(sorted);
  });

  test('non-assembly module preserves from ._jsii import * statement', async () => {
    const content = await generateAndRead(LIB_PKG, LIB_INIT);
    expect(content).toMatch(/from \.+_jsii import \*/);
  });

  test('jsii-calc root module with many submodules generates correct lazy loading', async () => {
    const content = await generateAndRead(CALC_PKG, CALC_INIT);
    // Should have lazy loading
    expect(content).toContain('import importlib as _importlib');
    expect(content).toContain('_SUBMODULES = {');
    expect(content).toContain('def __getattr__(name: str) -> object:');
    expect(content).toContain('def __dir__() -> "list[str]":');
    // Should have TYPE_CHECKING imports
    expect(content).toContain('if typing.TYPE_CHECKING:');
    // Should NOT have eager imports outside TYPE_CHECKING
    // (the only "from . import X" lines should be inside the TYPE_CHECKING block)
    const outsideTypeChecking = content.split('if typing.TYPE_CHECKING:')[0];
    expect(outsideTypeChecking).not.toMatch(/^from \. import \w+/m);
    // Verify some known submodules are in _SUBMODULES
    expect(content).toContain('"composition"');
    expect(content).toContain('"submodule"');
  });
});
