import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { pacmak } from '../lib';
import { loadTargetPlugins, PLUGIN_API_VERSION } from '../lib/plugins';

const DEMO_PLUGIN = path.join(__dirname, 'plugins', 'demo-target.js');

describe('loadTargetPlugins', () => {
  test('loads a well-formed plugin and returns a builder factory under its name', () => {
    const builders = loadTargetPlugins([DEMO_PLUGIN]);
    expect(Object.keys(builders)).toEqual(['demo']);
    expect(typeof builders.demo).toBe('function');
  });

  test('rejects a plugin whose name collides with a built-in target', () => {
    expect(() => loadTargetPlugins([fixture({ targetName: 'python', targetConstructor: class {} })])).toThrow(
      /collides with a built-in target/,
    );
  });

  test('rejects a plugin without a targetName', () => {
    expect(() => loadTargetPlugins([fixture({ targetConstructor: class {} })])).toThrow(
      /non-empty 'targetName'/,
    );
  });

  test('rejects a plugin declaring neither or both of targetConstructor/builderFactory', () => {
    expect(() => loadTargetPlugins([fixture({ targetName: 'x' })])).toThrow(
      /exactly one of 'targetConstructor' or 'builderFactory'/,
    );
    expect(() =>
      loadTargetPlugins([
        fixture({ targetName: 'x', targetConstructor: class {}, builderFactory: () => undefined }),
      ]),
    ).toThrow(/exactly one of 'targetConstructor' or 'builderFactory'/);
  });

  test('rejects a plugin written against a different plugin-API major', () => {
    const otherMajor = `${Number(PLUGIN_API_VERSION.split('.')[0]) + 1}.0.0`;
    expect(() =>
      loadTargetPlugins([
        fixture({ targetName: 'x', targetConstructor: class {}, pluginApiVersion: otherMajor }),
      ]),
    ).toThrow(/requires plugin API/);
  });

  /** Writes a throwaway plugin module exporting the given declaration. */
  function fixture(declaration: Record<string, unknown>): string {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pacmak-plugin-'));
    const file = path.join(dir, 'index.js');
    fs.writeFileSync(
      file,
      [
        'class Ctor {}',
        'const factory = () => undefined;',
        'module.exports = {',
        ...Object.entries(declaration).map(([key, value]) => {
          if (key === 'targetConstructor') return value ? '  targetConstructor: Ctor,' : '';
          if (key === 'builderFactory') return value ? '  builderFactory: factory,' : '';
          return `  ${key}: ${JSON.stringify(value)},`;
        }),
        '};',
        '',
      ].join('\n'),
    );
    return file;
  }
});

describe('pacmak with a target plugin', () => {
  const JSII_CALC = path.resolve(__dirname, '..', '..', 'jsii-calc');

  test(
    'generates code for a plugin target end-to-end (jsii-calc, code only)',
    async () => {
      const outdir = fs.mkdtempSync(path.join(os.tmpdir(), 'pacmak-plugin-out-'));
      try {
        await pacmak({
          codeOnly: true,
          forceTarget: true,
          inputDirectories: [JSII_CALC],
          outputDirectory: outdir,
          plugins: [DEMO_PLUGIN],
          targets: ['demo'],
        });

        const manifestPath = path.join(outdir, 'demo', 'demo-manifest.json');
        expect(fs.existsSync(manifestPath)).toBe(true);
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        expect(manifest.generatedBy).toBe('demo');
        expect(manifest.assembly).toBe('jsii-calc');
        expect(manifest.typeCount).toBeGreaterThan(50);
      } finally {
        fs.rmSync(outdir, { force: true, recursive: true });
      }
    },
    120_000,
  );

  test('an unknown target still fails loudly, listing plugin names as valid', async () => {
    await expect(
      pacmak({
        inputDirectories: [JSII_CALC],
        plugins: [DEMO_PLUGIN],
        targets: ['rust'],
      }),
    ).rejects.toThrow(/Unsupported target: 'rust'.*demo/);
  });
});
