import { once } from 'events';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  buildIndexInWorker,
  buildRuntimeIndex,
  loadRuntimeAssembly,
  RUNTIME_INDEX_VERSION,
} from './runtime-index';
import { runIndexBuilder } from './runtime-index-builder';

const MANIFEST_FILE = `.jsii.runtime.v${RUNTIME_INDEX_VERSION}.json`;
const DATA_FILE = `.jsii.runtime-index.v${RUNTIME_INDEX_VERSION}`;

/** A minimal but structurally-valid assembly with a few types. */
function sampleAssembly() {
  return {
    schema: 'jsii/0.10.0',
    name: 'test',
    version: '1.0.0',
    fingerprint: '****',
    jsiiVersion: '5.0.0',
    readme: { markdown: 'x'.repeat(1000) }, // should be dropped from the metadata
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

async function waitFor(
  predicate: () => boolean,
  timeoutMs = 10_000,
): Promise<void> {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeoutMs) {
      throw new Error('Timed out waiting for condition');
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
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

  /** Build the index synchronously (the work a builder worker performs). */
  const build = () => buildRuntimeIndex(dir, []);

  const load = () =>
    loadRuntimeAssembly(dir, {
      cached: true,
      validate: false,
      supportedFeatures: [],
    });

  test('building the index produces the manifest and data files', () => {
    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(false);
    build();
    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(true);
    expect(existsSync(join(dir, DATA_FILE))).toBe(true);
  });

  test('the manifest is self-describing (schema, version, data path, layout)', () => {
    build();
    const manifest = JSON.parse(
      readFileSync(join(dir, MANIFEST_FILE), 'utf-8'),
    );
    expect(manifest.schema).toBe('jsii/runtime-index');
    expect(manifest.version).toBe(RUNTIME_INDEX_VERSION);
    expect(manifest.data).toBe(DATA_FILE);
    expect(manifest.layout.typeCount).toBe(3);
    // Columns are contiguous from the start of the data file.
    const { names, kinds, offsets, defs } = manifest.layout;
    expect(names.start).toBe(0);
    expect(kinds.start).toBe(names.start + names.length);
    expect(offsets.start).toBe(kinds.start + kinds.length);
    expect(defs.start).toBe(offsets.start + offsets.length);
    expect(kinds.length).toBe(3);
    expect(offsets.length).toBe((3 + 1) * 4);
    // assemblyMetadata carries the header, never the heavyweight members.
    expect(manifest.assemblyMetadata.name).toBe('test');
    expect(manifest.assemblyMetadata.types).toBeUndefined();
    expect(manifest.assemblyMetadata.readme).toBeUndefined();
    expect(manifest.assemblyMetadata.submodules).toBeUndefined();
  });

  test('a load with an existing index reads it, not the original assembly', () => {
    build();

    // Corrupt the original assembly: a correct lazy load must not touch it.
    writeFileSync(join(dir, '.jsii'), 'this is not valid json');

    const loaded = load();
    expect(loaded.types.count).toBe(3);
    expect(loaded.types.kindOf('test.IBar')).toBe('interface');
    expect(loaded.types.kindOf('test.Color')).toBe('enum');
    const foo = loaded.types.get('test.Foo');
    expect(foo?.kind).toBe('class');
    // Runtime-unused fields are stripped from the indexed definitions.
    expect((foo as any).docs).toBeUndefined();
    expect((foo as any).locationInModule).toBeUndefined();
    // ...and from the assembly metadata.
    expect((loaded.metadata as any).readme).toBeUndefined();
    expect((loaded.metadata as any).submodules).toBeUndefined();
    // Fields the kernel does read survive.
    expect(loaded.metadata.name).toBe('test');
    expect(loaded.metadata.jsiiVersion).toBe('5.0.0');
  });

  test('enumerating fqns returns every declared type', () => {
    build();
    writeFileSync(join(dir, '.jsii'), 'this is not valid json');
    const loaded = load();
    expect([...loaded.types.fqns()].sort()).toEqual([
      'test.Color',
      'test.Foo',
      'test.IBar',
    ]);
  });

  test('unknown FQNs resolve to undefined (kernel turns this into a fault)', () => {
    build();
    const loaded = load();
    expect(loaded.types.get('test.DoesNotExist')).toBeUndefined();
    expect(loaded.types.kindOf('test.DoesNotExist')).toBeUndefined();
  });

  test('a corrupt manifest for the current version is ignored (eager fallback)', () => {
    build();
    writeFileSync(join(dir, MANIFEST_FILE), 'not valid json');

    // Must fall back to the .jsii (served eagerly), never throw.
    const loaded = load();
    expect(loaded.types.count).toBe(3);
    expect(loaded.types.get('test.Foo')?.kind).toBe('class');
  });

  test('a manifest whose data file is missing is ignored (eager fallback)', () => {
    build();
    rmSync(join(dir, DATA_FILE), { force: true });

    const loaded = load();
    expect(loaded.types.count).toBe(3);
  });

  test('a manifest with an inconsistent layout is ignored (eager fallback)', () => {
    build();
    const manifestPath = join(dir, MANIFEST_FILE);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    // Claim more types than the data file actually holds.
    manifest.layout.typeCount = 999;
    writeFileSync(manifestPath, JSON.stringify(manifest));

    const loaded = load();
    expect(loaded.types.count).toBe(3); // served from .jsii
  });

  test('a manifest pointing outside the cache entry is rejected (eager fallback)', () => {
    build();
    const manifestPath = join(dir, MANIFEST_FILE);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    manifest.data = '../escape';
    writeFileSync(manifestPath, JSON.stringify(manifest));

    // Path traversal must be refused; load falls back to the .jsii.
    const loaded = load();
    expect(loaded.types.count).toBe(3);
  });

  test('building does not clobber a different format version sharing the cache', () => {
    // Simulates another jsii runtime (different index version) sharing the
    // same cache entry. Its files are version-namespaced and must survive a
    // build by our version untouched.
    const otherVersion = RUNTIME_INDEX_VERSION + 1;
    const otherManifest = join(dir, `.jsii.runtime.v${otherVersion}.json`);
    const otherDataName = `.jsii.runtime-index.v${otherVersion}`;
    const otherDataPath = join(dir, otherDataName);
    const otherManifestContents = JSON.stringify({
      schema: 'jsii/runtime-index',
      version: otherVersion,
      data: otherDataName,
      assemblyMetadata: {},
      layout: {},
    });
    const otherDataContents = 'other-version data file';
    writeFileSync(otherManifest, otherManifestContents);
    writeFileSync(otherDataPath, otherDataContents);

    build();

    // Our version's files were written...
    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(true);
    // ...and the other version's files were left untouched.
    expect(readFileSync(otherManifest, 'utf-8')).toBe(otherManifestContents);
    expect(readFileSync(otherDataPath, 'utf-8')).toBe(otherDataContents);
  });

  test('non-cached loads do not build an index (eager fallback)', () => {
    const loaded = loadRuntimeAssembly(dir, {
      cached: false,
      validate: false,
      supportedFeatures: [],
    });
    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(false);
    expect(existsSync(join(dir, DATA_FILE))).toBe(false);
    // ...but it still loads everything eagerly, including docs.
    expect(loaded.types.count).toBe(3);
    expect((loaded.types.get('test.Foo') as any).docs).toEqual({
      summary: 'a class',
      remarks: 'y'.repeat(500),
    });
  });

  describe('worker', () => {
    test('buildIndexInWorker builds the index on a worker thread', async () => {
      expect(existsSync(join(dir, MANIFEST_FILE))).toBe(false);

      const worker = buildIndexInWorker(dir, []);
      expect(worker).toBeDefined();
      await once(worker!, 'exit');

      expect(existsSync(join(dir, MANIFEST_FILE))).toBe(true);
      expect(existsSync(join(dir, DATA_FILE))).toBe(true);

      // The built index is readable by a subsequent (warm) load.
      const loaded = load();
      expect(loaded.types.count).toBe(3);
      expect(loaded.types.get('test.Foo')?.kind).toBe('class');
    });

    test('a cold cached load serves eagerly and builds the index in the background', async () => {
      expect(existsSync(join(dir, MANIFEST_FILE))).toBe(false);

      // Cold load returns immediately, served from the parsed assembly.
      const loaded = load();
      expect(loaded.types.count).toBe(3);
      expect(loaded.types.get('test.Foo')?.kind).toBe('class');

      // The index is produced off the critical path; it appears shortly after.
      await waitFor(() => existsSync(join(dir, MANIFEST_FILE)));
      expect(existsSync(join(dir, DATA_FILE))).toBe(true);
    });
  });

  describe('runIndexBuilder (worker entry)', () => {
    test('builds the index for the given package directory', () => {
      runIndexBuilder({ packageDir: dir, supportedFeatures: [] });
      expect(existsSync(join(dir, MANIFEST_FILE))).toBe(true);
      const loaded = load();
      expect(loaded.types.count).toBe(3);
    });

    test('is a no-op when no package directory is given', () => {
      expect(() => runIndexBuilder({} as any)).not.toThrow();
      expect(existsSync(join(dir, MANIFEST_FILE))).toBe(false);
    });
  });
});
