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

  test('first cached load builds the manifest and data files', () => {
    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(false);
    const loaded = load();

    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(true);
    expect(existsSync(join(dir, DATA_FILE))).toBe(true);
    expect(loaded.types.count).toBe(3);
    expect(loaded.types.get('test.Foo')?.kind).toBe('class');
  });

  test('the manifest is self-describing (schema, version, data path, layout)', () => {
    load();
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

  test('subsequent load reads the index, not the original assembly', () => {
    load(); // builds index

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
    load();
    writeFileSync(join(dir, '.jsii'), 'this is not valid json');
    const loaded = load();
    expect([...loaded.types.fqns()].sort()).toEqual([
      'test.Color',
      'test.Foo',
      'test.IBar',
    ]);
  });

  test('unknown FQNs resolve to undefined (kernel turns this into a fault)', () => {
    const loaded = load();
    expect(loaded.types.get('test.DoesNotExist')).toBeUndefined();
    expect(loaded.types.kindOf('test.DoesNotExist')).toBeUndefined();
  });

  test('a corrupt manifest for the current version is ignored and rebuilt', () => {
    load(); // builds a current index

    const manifestPath = join(dir, MANIFEST_FILE);
    writeFileSync(manifestPath, 'not valid json');

    const loaded = load(); // must fall back to the .jsii and rebuild
    expect(loaded.types.count).toBe(3);
    expect(() => JSON.parse(readFileSync(manifestPath, 'utf-8'))).not.toThrow();
  });

  test('a manifest whose data file is missing is ignored and rebuilt', () => {
    load();
    rmSync(join(dir, DATA_FILE), { force: true });

    const loaded = load(); // data file gone -> fall back, rebuild both
    expect(loaded.types.count).toBe(3);
    expect(existsSync(join(dir, DATA_FILE))).toBe(true);
  });

  test('a manifest with an inconsistent layout is ignored and rebuilt', () => {
    load();
    const manifestPath = join(dir, MANIFEST_FILE);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    // Claim more types than the data file actually holds.
    manifest.layout.typeCount = 999;
    writeFileSync(manifestPath, JSON.stringify(manifest));

    const loaded = load();
    expect(loaded.types.count).toBe(3); // rebuilt from .jsii
  });

  test('a manifest pointing outside the cache entry is rejected', () => {
    load();
    const manifestPath = join(dir, MANIFEST_FILE);
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    manifest.data = '../escape';
    writeFileSync(manifestPath, JSON.stringify(manifest));

    // Path traversal must be refused; load falls back to the .jsii and rebuilds
    // a valid manifest (with the default, in-directory data path).
    const loaded = load();
    expect(loaded.types.count).toBe(3);
    expect(JSON.parse(readFileSync(manifestPath, 'utf-8')).data).toBe(
      DATA_FILE,
    );
  });

  test('a manifest for a different format version is not used, and its files are left intact', () => {
    // Simulates another jsii runtime (different index version) sharing the
    // same cache entry. Its files must be ignored and survive untouched —
    // including its data file, which (being version-namespaced) must not be
    // clobbered by our version's writer.
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

    const loaded = load();
    expect(loaded.types.count).toBe(3);

    // Our version's manifest was built...
    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(true);
    // ...and the other version's files were left untouched.
    expect(readFileSync(otherManifest, 'utf-8')).toBe(otherManifestContents);
    expect(readFileSync(otherDataPath, 'utf-8')).toBe(otherDataContents);
  });

  test('an existing cached package without an index gets one built', () => {
    // Simulates a package cached by a runtime that predates this feature.
    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(false);
    const loaded = load();
    expect(existsSync(join(dir, MANIFEST_FILE))).toBe(true);
    expect(loaded.types.count).toBe(3);
  });

  test('non-cached loads do not write an index (eager fallback)', () => {
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
});
