import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import { loadRuntimeAssembly, RUNTIME_INDEX_VERSION } from './runtime-index';

const INDEX_FILE = `.jsii.runtime-index.v${RUNTIME_INDEX_VERSION}.json`;
const BODIES_FILE = `.jsii.runtime-bodies.v${RUNTIME_INDEX_VERSION}`;

/** A minimal but structurally-valid assembly with a few types. */
function sampleAssembly() {
  return {
    schema: 'jsii/0.10.0',
    name: 'test',
    version: '1.0.0',
    fingerprint: '****',
    jsiiVersion: '5.0.0',
    readme: { markdown: 'x'.repeat(1000) }, // should be dropped from the header
    submodules: {
      'test.sub': { locationInModule: { filename: 'sub.ts', line: 1 } },
    }, // large for real packages; runtime never reads it -> dropped
    types: {
      'test.Foo': {
        assembly: 'test',
        fqn: 'test.Foo',
        kind: 'class',
        name: 'Foo',
        docs: { summary: 'a class', remarks: 'y'.repeat(500) },
        locationInModule: { filename: 'foo.ts', line: 1 },
      },
      'test.IBar': {
        assembly: 'test',
        fqn: 'test.IBar',
        kind: 'interface',
        name: 'IBar',
      },
      'test.Color': {
        assembly: 'test',
        fqn: 'test.Color',
        kind: 'enum',
        name: 'Color',
        members: [{ name: 'RED' }, { name: 'GREEN' }],
      },
    },
  };
}

describe('runtime index', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'jsii-runtime-index-test-'));
    writeFileSync(join(dir, '.jsii'), JSON.stringify(sampleAssembly()));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  const load = () =>
    loadRuntimeAssembly(dir, {
      cached: true,
      validate: false,
      supportedFeatures: [],
    });

  test('first cached load builds the index files', () => {
    expect(existsSync(join(dir, INDEX_FILE))).toBe(false);
    const loaded = load();

    expect(existsSync(join(dir, INDEX_FILE))).toBe(true);
    expect(existsSync(join(dir, BODIES_FILE))).toBe(true);
    expect(loaded.types.count).toBe(3);
    expect(loaded.types.get('test.Foo')?.kind).toBe('class');
  });

  test('subsequent load reads the index, not the original assembly', () => {
    load(); // builds index

    // Corrupt the original assembly: a correct lazy load must not touch it.
    writeFileSync(join(dir, '.jsii'), 'this is not valid json');

    const loaded = load();
    expect(loaded.types.count).toBe(3);
    expect(loaded.types.kindOf('test.IBar')).toBe('interface');
    const foo = loaded.types.get('test.Foo');
    expect(foo?.kind).toBe('class');
    // Runtime-unused fields are stripped from the indexed bodies.
    expect((foo as any).docs).toBeUndefined();
    expect((foo as any).locationInModule).toBeUndefined();
    // ...and from the header.
    expect((loaded.metadata as any).readme).toBeUndefined();
    expect((loaded.metadata as any).submodules).toBeUndefined();
    // Fields the kernel does read survive.
    expect(loaded.metadata.name).toBe('test');
    expect(loaded.metadata.jsiiVersion).toBe('5.0.0');
  });

  test('unknown FQNs resolve to undefined (kernel turns this into a fault)', () => {
    const loaded = load();
    expect(loaded.types.get('test.DoesNotExist')).toBeUndefined();
    expect(loaded.types.kindOf('test.DoesNotExist')).toBeUndefined();
  });

  test('a corrupt index for the current version is ignored and rebuilt', () => {
    load(); // builds a current index

    const indexPath = join(dir, INDEX_FILE);
    writeFileSync(indexPath, 'not valid json');

    const loaded = load(); // must fall back to the .jsii and rebuild
    expect(loaded.types.count).toBe(3);
    expect(() => JSON.parse(readFileSync(indexPath, 'utf-8'))).not.toThrow();
  });

  test('an index for a different format version is not used, and is left intact', () => {
    // Simulates another jsii runtime (different index version) sharing the
    // same cache entry. Its files must be ignored and must survive untouched.
    const otherIndex = join(
      dir,
      `.jsii.runtime-index.v${RUNTIME_INDEX_VERSION + 1}.json`,
    );
    const otherBodies = join(
      dir,
      `.jsii.runtime-bodies.v${RUNTIME_INDEX_VERSION + 1}`,
    );
    writeFileSync(otherIndex, JSON.stringify({ header: {}, types: {} }));
    writeFileSync(otherBodies, 'other-version bodies');

    const loaded = load();
    expect(loaded.types.count).toBe(3);

    // Our version's files were built...
    expect(existsSync(join(dir, INDEX_FILE))).toBe(true);
    // ...and the other version's files were left untouched.
    expect(readFileSync(otherIndex, 'utf-8')).toBe(
      JSON.stringify({ header: {}, types: {} }),
    );
    expect(readFileSync(otherBodies, 'utf-8')).toBe('other-version bodies');
  });

  test('an existing cached package without an index gets one built', () => {
    // Simulates a package cached by a runtime that predates this feature.
    expect(existsSync(join(dir, INDEX_FILE))).toBe(false);
    const loaded = load();
    expect(existsSync(join(dir, INDEX_FILE))).toBe(true);
    expect(loaded.types.count).toBe(3);
  });

  test('non-cached loads do not write an index (eager fallback)', () => {
    const loaded = loadRuntimeAssembly(dir, {
      cached: false,
      validate: false,
      supportedFeatures: [],
    });
    expect(existsSync(join(dir, INDEX_FILE))).toBe(false);
    expect(existsSync(join(dir, BODIES_FILE))).toBe(false);
    // ...but it still loads everything eagerly, including docs.
    expect(loaded.types.count).toBe(3);
    expect((loaded.types.get('test.Foo') as any).docs).toEqual({
      summary: 'a class',
      remarks: 'y'.repeat(500),
    });
  });
});
