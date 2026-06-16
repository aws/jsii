import * as spec from '@jsii/spec';
import {
  closeSync,
  existsSync,
  openSync,
  readFileSync,
  readSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs';
import { isAbsolute, join, resolve, sep } from 'path';

/**
 * Version of the on-disk runtime index format.
 *
 * Bump this whenever the manifest or data-file layout written by
 * {@link buildIndex} changes in a way that an older reader could not understand
 * (or an older writer would produce incorrectly). The version is encoded both
 * in the manifest file *name* and in a field *inside* it:
 *
 * - The name (`.jsii.runtime.v{VERSION}.json`) lets a single cache entry shared
 *   by multiple jsii runtimes of different versions at the same time keep each
 *   version's own manifest side-by-side without clobbering. A runtime simply
 *   never reads a manifest whose name encodes a version other than its own.
 * - The `version` field is an integrity check that a file's contents match what
 *   its name claims.
 *
 * The format is a private, best-effort, on-disk cache owned exclusively by this
 * package. It is not part of the published `.jsii` assembly specification and
 * carries no backwards-compatibility guarantee.
 */
export const RUNTIME_INDEX_VERSION = 1;

/** Discriminator stored in (and required of) a runtime index manifest. */
const MANIFEST_SCHEMA = 'jsii/runtime-index';

/**
 * Base name of the binary data file for a given format version, recorded in the
 * manifest. Like the manifest, the data file is versioned in its name so that a
 * cache entry shared by multiple jsii runtimes of different versions never has
 * one version clobber another's data file.
 */
function dataFileName(version: number): string {
  return `.jsii.runtime-index.v${version}`;
}

/** Name of the manifest file for a given format version, within a cache entry. */
function manifestFileName(version: number): string {
  return `.jsii.runtime.v${version}.json`;
}

/**
 * Mapping between {@link spec.TypeKind} and the compact unsigned-byte ordinal
 * stored in the data file's `kinds` column. New ordinals MUST only be appended
 * and MUST be accompanied by a {@link RUNTIME_INDEX_VERSION} bump.
 */
const KIND_BY_ORDINAL: readonly spec.TypeKind[] = [
  spec.TypeKind.Class,
  spec.TypeKind.Interface,
  spec.TypeKind.Enum,
];

function ordinalOfKind(kind: spec.TypeKind): number {
  const ordinal = KIND_BY_ORDINAL.indexOf(kind);
  if (ordinal < 0) {
    throw new Error(`Unindexable type kind: ${kind}`);
  }
  return ordinal;
}

/** A `[start, start + length)` byte range within the data file. */
interface ByteRange {
  readonly start: number;
  readonly length: number;
}

/** Byte layout of the regions within the data file. */
interface Layout {
  readonly typeCount: number;
  /** Column: FQNs joined by "\n", UTF-8. */
  readonly names: ByteRange;
  /** Column: one unsigned byte per type, the {@link KIND_BY_ORDINAL} ordinal. */
  readonly kinds: ByteRange;
  /** Column: `typeCount + 1` little-endian uint32 offsets into the `defs` region. */
  readonly offsets: ByteRange;
  /** Region: the concatenated, doc-stripped type definitions. */
  readonly defs: ByteRange;
}

/** Shape of the manifest file (`.jsii.runtime.v{VERSION}.json`). */
interface Manifest {
  readonly schema: typeof MANIFEST_SCHEMA;
  readonly version: number;
  /** Path to the data file, relative to the manifest's own directory. */
  readonly data: string;
  /** Assembly metadata minus `types`, `readme`, and `submodules`. */
  readonly assemblyMetadata: Omit<
    spec.Assembly,
    'types' | 'readme' | 'submodules'
  >;
  readonly layout: Layout;
}

/**
 * Accessor for the types of a loaded assembly.
 *
 * There are two implementations: {@link EagerTypes}, backed by the fully parsed
 * `types` map of an assembly, and {@link LazyTypes}, which parses each type
 * definition on first access from a pre-built index. Both expose the same
 * surface so the kernel does not care which one it is holding.
 */
export interface AssemblyTypes {
  /** The total number of types declared by the assembly. */
  readonly count: number;

  /** Iterates the fully-qualified names of all declared types. */
  fqns(): Iterable<string>;

  /**
   * Returns the {@link spec.TypeKind} of a type without materializing its full
   * definition, or `undefined` if the FQN is unknown.
   */
  kindOf(fqn: string): spec.TypeKind | undefined;

  /**
   * Returns the full definition of a type, or `undefined` if the FQN is
   * unknown. Callers must not mutate the returned object.
   */
  get(fqn: string): spec.Type | undefined;
}

/** {@link AssemblyTypes} backed by a fully parsed `types` map. */
class EagerTypes implements AssemblyTypes {
  public constructor(
    private readonly types: { readonly [fqn: string]: spec.Type },
  ) {}

  public get count(): number {
    return Object.keys(this.types).length;
  }

  public fqns(): Iterable<string> {
    return Object.keys(this.types);
  }

  public kindOf(fqn: string): spec.TypeKind | undefined {
    return this.types[fqn]?.kind;
  }

  public get(fqn: string): spec.Type | undefined {
    return this.types[fqn];
  }
}

/**
 * {@link AssemblyTypes} backed by a columnar runtime index.
 *
 * The small columns (names, kinds, offsets) are read up front so that the kind
 * and byte range of every type is known without parsing; a type's definition is
 * only read from the (large) `defs` region and parsed the first time it is
 * requested. Parsed definitions are memoized so repeated lookups (e.g. after the
 * kernel clears its own type cache) do not re-parse.
 */
class LazyTypes implements AssemblyTypes {
  /** FQN -> row index, shared by the columns. */
  readonly #rows: ReadonlyMap<string, number>;
  /** The columns region of the data file (names + kinds + offsets). */
  readonly #columns: Buffer;
  readonly #kindsStart: number;
  readonly #offsetsStart: number;
  readonly #dataPath: string;
  readonly #defs: ByteRange;
  readonly #memo = new Map<string, spec.Type>();
  /** The `defs` region bytes, read lazily on first {@link get}. */
  #defsBytes?: Buffer;

  public constructor(opts: {
    readonly rows: ReadonlyMap<string, number>;
    readonly columns: Buffer;
    readonly kindsStart: number;
    readonly offsetsStart: number;
    readonly dataPath: string;
    readonly defs: ByteRange;
  }) {
    this.#rows = opts.rows;
    this.#columns = opts.columns;
    this.#kindsStart = opts.kindsStart;
    this.#offsetsStart = opts.offsetsStart;
    this.#dataPath = opts.dataPath;
    this.#defs = opts.defs;
  }

  public get count(): number {
    return this.#rows.size;
  }

  public fqns(): Iterable<string> {
    return this.#rows.keys();
  }

  public kindOf(fqn: string): spec.TypeKind | undefined {
    const row = this.#rows.get(fqn);
    if (row == null) {
      return undefined;
    }
    return KIND_BY_ORDINAL[this.#columns[this.#kindsStart + row]];
  }

  public get(fqn: string): spec.Type | undefined {
    const memoized = this.#memo.get(fqn);
    if (memoized != null) {
      return memoized;
    }

    const row = this.#rows.get(fqn);
    if (row == null) {
      return undefined;
    }

    // Read the (large) defs region once, lazily, then decode only this slice.
    const defs = (this.#defsBytes ??= readFileRange(
      this.#dataPath,
      this.#defs.start,
      this.#defs.length,
    ));
    const begin = this.#columns.readUInt32LE(this.#offsetsStart + row * 4);
    const end = this.#columns.readUInt32LE(this.#offsetsStart + (row + 1) * 4);
    const type = JSON.parse(defs.toString('utf-8', begin, end)) as spec.Type;
    this.#memo.set(fqn, type);
    return type;
  }
}

export interface LoadedAssembly {
  /** The assembly metadata (without the heavyweight `types` map). */
  readonly metadata: spec.Assembly;
  /** Accessor for the assembly's types. */
  readonly types: AssemblyTypes;
}

/**
 * Loads an assembly from a package directory.
 *
 * When the directory is a stable package-cache entry (`cached`) and assembly
 * validation is not requested, a compact "runtime index" is used so that only
 * the types actually accessed during execution are parsed -- a large saving for
 * big assemblies (e.g. aws-cdk-lib), of which a typical run touches a tiny
 * fraction.
 *
 * The index is built on first use, whether the package was just extracted into
 * the cache or had been cached by an earlier run that predates this feature,
 * and is transparently rebuilt when {@link RUNTIME_INDEX_VERSION} changes.
 * Building and using the index is strictly best-effort: any failure falls back
 * to a full, eager load, so correctness never depends on the cache.
 */
export function loadRuntimeAssembly(
  packageDir: string,
  options: {
    readonly cached: boolean;
    readonly validate: boolean;
    readonly supportedFeatures: spec.JsiiFeature[];
  },
): LoadedAssembly {
  const { cached, validate, supportedFeatures } = options;

  // The index drops information needed for schema validation, and trades strict
  // content for a faster shape; only use it for the regular (non-validating)
  // cached load path.
  const useIndex = cached && !validate;

  if (useIndex) {
    const indexed = tryLoadIndexed(packageDir, supportedFeatures);
    if (indexed != null) {
      return indexed;
    }
  }

  // Full eager load: the assembly is parsed in its entirety.
  const metadata = spec.loadAssemblyFromPath(
    packageDir,
    validate,
    supportedFeatures,
  );

  if (useIndex) {
    // Populate the index for subsequent loads. Best-effort -- never fail a load
    // because the index could not be written.
    try {
      buildIndex(packageDir, metadata);
    } catch {
      // Ignore: the next load will simply try again.
    }
  }

  return { metadata, types: new EagerTypes(metadata.types ?? {}) };
}

/**
 * Attempts to load the assembly via an existing, current runtime index.
 *
 * Returns `undefined` (so the caller falls back to a full load that rebuilds
 * the index) when no manifest for the current format version exists, or it is
 * unreadable, malformed, or its data file is absent/inconsistent. Throws only
 * for "real" load errors, such as the assembly using unsupported features --
 * matching the behavior of a full load.
 */
function tryLoadIndexed(
  packageDir: string,
  supportedFeatures: spec.JsiiFeature[],
): LoadedAssembly | undefined {
  const manifestPath = join(
    packageDir,
    manifestFileName(RUNTIME_INDEX_VERSION),
  );

  let manifest: Manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as Manifest;
  } catch {
    return undefined;
  }

  if (
    manifest == null ||
    manifest.schema !== MANIFEST_SCHEMA ||
    manifest.version !== RUNTIME_INDEX_VERSION ||
    typeof manifest.data !== 'string' ||
    manifest.assemblyMetadata == null ||
    !isValidLayout(manifest.layout)
  ) {
    return undefined;
  }

  // The data path comes from a file and is therefore untrusted: it must resolve
  // to a plain file within the cache entry directory (no absolute paths, no
  // `..` escape).
  const dataPath = resolveWithin(packageDir, manifest.data);
  if (dataPath == null || !existsSync(dataPath)) {
    return undefined;
  }

  const { typeCount, names, kinds, offsets, defs } = manifest.layout;

  // The columns must be contiguous from the start of the file, and the regions
  // must agree with the on-disk file size.
  if (
    names.start !== 0 ||
    kinds.start !== names.start + names.length ||
    offsets.start !== kinds.start + kinds.length ||
    defs.start !== offsets.start + offsets.length ||
    kinds.length !== typeCount ||
    offsets.length !== (typeCount + 1) * 4
  ) {
    return undefined;
  }

  let columns: Buffer;
  try {
    if (statSync(dataPath).size !== defs.start + defs.length) {
      return undefined;
    }
    // Read only the (small) columns region eagerly; defs are read on demand.
    columns = readFileRange(dataPath, 0, defs.start);
  } catch {
    return undefined;
  }

  // The final offset must point exactly at the end of the defs region.
  if (columns.readUInt32LE(offsets.start + typeCount * 4) !== defs.length) {
    return undefined;
  }

  const fqns =
    names.length === 0
      ? []
      : columns
          .toString('utf-8', names.start, names.start + names.length)
          .split('\n');
  if (fqns.length !== typeCount) {
    return undefined;
  }

  const rows = new Map<string, number>();
  for (let i = 0; i < fqns.length; i++) {
    rows.set(fqns[i], i);
  }

  const metadata: spec.Assembly = {
    ...(manifest.assemblyMetadata as spec.Assembly),
    types: {},
  };

  // Feature checking is cheap and must happen regardless of validation; mirror
  // what a full load does.
  checkSupportedFeatures(metadata, supportedFeatures);

  return {
    metadata,
    types: new LazyTypes({
      rows,
      columns,
      kindsStart: kinds.start,
      offsetsStart: offsets.start,
      dataPath,
      defs,
    }),
  };
}

/** Validates the structural shape of a {@link Layout} read from disk. */
function isValidLayout(layout: unknown): layout is Layout {
  if (layout == null || typeof layout !== 'object') {
    return false;
  }
  const l = layout as Record<string, unknown>;
  return (
    isUint(l.typeCount) &&
    isByteRange(l.names) &&
    isByteRange(l.kinds) &&
    isByteRange(l.offsets) &&
    isByteRange(l.defs)
  );
}

function isByteRange(value: unknown): value is ByteRange {
  if (value == null || typeof value !== 'object') {
    return false;
  }
  const r = value as Record<string, unknown>;
  return isUint(r.start) && isUint(r.length);
}

function isUint(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

/**
 * Resolves `relativePath` against `dir`, returning the absolute path only if it
 * stays strictly within `dir`. Rejects absolute paths and any `..` traversal
 * (guarding against a tampered or corrupted manifest pointing elsewhere).
 */
function resolveWithin(dir: string, relativePath: string): string | undefined {
  if (relativePath === '' || isAbsolute(relativePath)) {
    return undefined;
  }
  if (relativePath.split(/[\\/]/).includes('..')) {
    return undefined;
  }
  const base = resolve(dir);
  const resolved = resolve(base, relativePath);
  if (resolved !== base && !resolved.startsWith(base + sep)) {
    return undefined;
  }
  return resolved;
}

/** Reads `length` bytes starting at `position` from a file. */
function readFileRange(path: string, position: number, length: number): Buffer {
  const fd = openSync(path, 'r');
  try {
    const buffer = Buffer.allocUnsafe(length);
    let read = 0;
    while (read < length) {
      const n = readSync(fd, buffer, read, length - read, position + read);
      if (n === 0) {
        throw new Error(
          `Unexpected end of file reading ${path} (wanted ${length} bytes at ${position}, got ${read})`,
        );
      }
      read += n;
    }
    return buffer;
  } finally {
    closeSync(fd);
  }
}

/**
 * Fields the runtime kernel never reads, dropped from the indexed definitions
 * to shrink them (and speed up the per-type parse). Verified against all kernel
 * and runtime consumers: documentation and source locations are used at compile
 * time, not at runtime.
 */
function slimReplacer(key: string, value: unknown): unknown {
  if (key === 'docs' || key === 'locationInModule' || key === 'sourceLine') {
    return undefined;
  }
  return value;
}

/**
 * Builds (or overwrites) the runtime index for an assembly in its cache entry.
 *
 * Produces two files: a small JSON manifest (assembly metadata + byte layout)
 * and a binary data file laid out columnarly as `names | kinds | offsets | defs`
 * (see the runtime-index specification). Both files are written atomically
 * (temp file + rename) so a concurrent reader never observes a partial write.
 */
function buildIndex(packageDir: string, assembly: spec.Assembly): void {
  const types = assembly.types ?? {};
  const fqns = Object.keys(types);
  const typeCount = fqns.length;

  const kinds = Buffer.allocUnsafe(typeCount);
  const offsets = Buffer.allocUnsafe((typeCount + 1) * 4);
  const defChunks: Buffer[] = [];
  let offset = 0;
  for (let i = 0; i < typeCount; i++) {
    const type = types[fqns[i]];
    kinds[i] = ordinalOfKind(type.kind);
    offsets.writeUInt32LE(offset, i * 4);
    const def = Buffer.from(JSON.stringify(type, slimReplacer), 'utf-8');
    defChunks.push(def);
    offset += def.length;
  }
  offsets.writeUInt32LE(offset, typeCount * 4);

  const names = Buffer.from(fqns.join('\n'), 'utf-8');
  const defs = Buffer.concat(defChunks);

  const layout: Layout = {
    typeCount,
    names: { start: 0, length: names.length },
    kinds: { start: names.length, length: kinds.length },
    offsets: { start: names.length + kinds.length, length: offsets.length },
    defs: {
      start: names.length + kinds.length + offsets.length,
      length: defs.length,
    },
  };

  // The assembly metadata without the bulky parts the kernel reads lazily
  // (`types`) or never (`readme`, `submodules`). `submodules` in particular is
  // large for packages like aws-cdk-lib (per-submodule language-binding
  // metadata) and is only consumed by compile-time tooling, not the runtime.
  const {
    types: _types,
    readme: _readme,
    submodules: _submodules,
    ...assemblyMetadata
  } = assembly;

  const manifest: Manifest = {
    schema: MANIFEST_SCHEMA,
    version: RUNTIME_INDEX_VERSION,
    data: dataFileName(RUNTIME_INDEX_VERSION),
    assemblyMetadata,
    layout,
  };

  // Write the data file before the manifest, so that a present, current-version
  // manifest always implies a complete data file. A crash in between leaves a
  // manifest-less data file, which the next load simply overwrites.
  writeFileAtomic(
    join(packageDir, dataFileName(RUNTIME_INDEX_VERSION)),
    Buffer.concat([names, kinds, offsets, defs]),
  );
  writeFileAtomic(
    join(packageDir, manifestFileName(RUNTIME_INDEX_VERSION)),
    Buffer.from(JSON.stringify(manifest), 'utf-8'),
  );
}

function writeFileAtomic(targetPath: string, data: Buffer): void {
  const tmpPath = `${targetPath}.${process.pid}.tmp`;
  try {
    writeFileSync(tmpPath, data);
    renameSync(tmpPath, targetPath);
  } catch (e) {
    try {
      rmSync(tmpPath, { force: true });
    } catch {
      // ignore cleanup failures
    }
    throw e;
  }
}

function checkSupportedFeatures(
  assembly: spec.Assembly,
  supportedFeatures: spec.JsiiFeature[],
): void {
  const unsupported = (assembly.usedFeatures ?? []).filter(
    (feat) => !supportedFeatures.includes(feat),
  );
  if (unsupported.length > 0) {
    throw new Error(
      `This jsii tool cannot load the given assembly; using unsupported feature(s): ${unsupported.join(
        ', ',
      )} (supported features: ${supportedFeatures.join(', ')})`,
    );
  }
}
