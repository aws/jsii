import * as spec from '@jsii/spec';
import {
  existsSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs';
import { isAbsolute, join, resolve, sep } from 'path';
import { Worker } from 'worker_threads';

/**
 * Version of the on-disk runtime index format.
 *
 * Bump this whenever the manifest, index, or defs layout written by
 * {@link buildIndex} changes in a way that an older reader could not understand
 * (or an older writer would produce incorrectly). The version is encoded both
 * in the file *names* and in a `version` field *inside* the manifest:
 *
 * - The names (`.jsii.runtime.v{VERSION}.json`, ...) let a single cache entry
 *   shared by multiple jsii runtimes of different versions at the same time keep
 *   each version's own files side-by-side without clobbering. A runtime simply
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

/** Name of the manifest file for a given format version, within a cache entry. */
function manifestFileName(version: number): string {
  return `.jsii.runtime.v${version}.json`;
}

/** Name of the binary index file (columns) for a given format version. */
function indexFileName(version: number): string {
  return `.jsii.runtime-index.v${version}`;
}

/** Name of the JSONL definitions file for a given format version. */
function defsFileName(version: number): string {
  return `.jsii.runtime-defs.v${version}.jsonl`;
}

/**
 * File name of the compiled worker entry point that builds the index, resolved
 * as a sibling of this module. In a normal (unbundled) install it is the
 * kernel's own compiled `runtime-index-builder.js`; in the webpack-bundled
 * runtime it is emitted next to `program.js` (see the runtime's webpack config).
 */
const RUNTIME_INDEX_BUILDER = 'runtime-index-builder.js';

/** Data handed to the index-builder worker via {@link Worker} `workerData`. */
export interface IndexBuilderWorkerData {
  readonly packageDir: string;
  readonly supportedFeatures: spec.JsiiFeature[];
}

/**
 * Mapping between {@link spec.TypeKind} and the compact unsigned-byte ordinal
 * stored in the index file's `kinds` column. New ordinals MUST only be appended
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

/** A `[start, start + length)` byte range within the index file. */
interface ByteRange {
  readonly start: number;
  readonly length: number;
}

/** Byte layout of the three columns within the index file. */
interface Layout {
  readonly typeCount: number;
  /** Column: FQNs joined by "\n", UTF-8. */
  readonly names: ByteRange;
  /** Column: one unsigned byte per type, the {@link KIND_BY_ORDINAL} ordinal. */
  readonly kinds: ByteRange;
  /**
   * Column: `typeCount + 1` little-endian uint32 byte offsets into the *defs*
   * file. Type `i`'s definition is the byte range `[offsets[i], offsets[i+1])`.
   */
  readonly offsets: ByteRange;
}

/** Shape of the manifest file (`.jsii.runtime.v{VERSION}.json`). */
interface Manifest {
  readonly schema: typeof MANIFEST_SCHEMA;
  readonly version: number;
  /** Path to the binary index file, relative to the manifest's own directory. */
  readonly index: string;
  /** Path to the JSONL definitions file, relative to the manifest's own directory. */
  readonly defs: string;
  /** Assembly metadata minus `types`, `readme`, and `submodules`. */
  readonly assemblyMetadata: AssemblyMetadata;
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
   * Iterates `[fqn, kind]` for every declared type, by row, without requiring a
   * name lookup. Preferred over `fqns()` + `kindOf()` when visiting every type.
   */
  entries(): Iterable<readonly [string, spec.TypeKind | undefined]>;

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

  public *entries(): Iterable<readonly [string, spec.TypeKind | undefined]> {
    for (const [fqn, type] of Object.entries(this.types)) {
      yield [fqn, type.kind];
    }
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
 * The columns (names, kinds, offsets) are held in memory as a single buffer, so
 * every type's kind and definition can be addressed by *row*. Two things are
 * produced lazily, on first use:
 *
 * - the `name -> row` map, built on the first lookup *by FQN* (`get`/`kindOf`);
 *   a package whose types are never looked up by name never builds it;
 * - a type's definition, read from the (large) JSONL defs file and parsed on
 *   first access, then memoized.
 *
 * Visiting every type (`entries()`/`fqns()`) walks rows directly and does not
 * build the `name -> row` map.
 */
class LazyTypes implements AssemblyTypes {
  readonly #index: Buffer;
  readonly #namesStart: number;
  readonly #namesLength: number;
  readonly #kindsStart: number;
  readonly #offsetsStart: number;
  readonly #typeCount: number;
  readonly #defsPath: string;
  readonly #memo = new Map<string, spec.Type>();
  /** FQNs in row order, decoded from the `names` column on first use. */
  #names?: string[];
  /** FQN -> row index, built on first lookup by FQN. */
  #rows?: ReadonlyMap<string, number>;
  /** The whole defs file, read on first {@link get}. */
  #defsBytes?: Buffer;

  public constructor(opts: {
    readonly index: Buffer;
    readonly namesStart: number;
    readonly namesLength: number;
    readonly kindsStart: number;
    readonly offsetsStart: number;
    readonly typeCount: number;
    readonly defsPath: string;
  }) {
    this.#index = opts.index;
    this.#namesStart = opts.namesStart;
    this.#namesLength = opts.namesLength;
    this.#kindsStart = opts.kindsStart;
    this.#offsetsStart = opts.offsetsStart;
    this.#typeCount = opts.typeCount;
    this.#defsPath = opts.defsPath;
  }

  public get count(): number {
    return this.#typeCount;
  }

  public fqns(): Iterable<string> {
    return this.#decodeNames();
  }

  public *entries(): Iterable<readonly [string, spec.TypeKind | undefined]> {
    const names = this.#decodeNames();
    for (let i = 0; i < names.length; i++) {
      yield [names[i], KIND_BY_ORDINAL[this.#index[this.#kindsStart + i]]];
    }
  }

  public kindOf(fqn: string): spec.TypeKind | undefined {
    const row = this.#rowOf(fqn);
    if (row == null) {
      return undefined;
    }
    return KIND_BY_ORDINAL[this.#index[this.#kindsStart + row]];
  }

  public get(fqn: string): spec.Type | undefined {
    const memoized = this.#memo.get(fqn);
    if (memoized != null) {
      return memoized;
    }

    const row = this.#rowOf(fqn);
    if (row == null) {
      return undefined;
    }

    // Read the (large) defs file once, lazily, then decode only this type's line.
    const defs = (this.#defsBytes ??= readFileSync(this.#defsPath));
    const begin = this.#index.readUInt32LE(this.#offsetsStart + row * 4);
    const end = this.#index.readUInt32LE(this.#offsetsStart + (row + 1) * 4);
    const type = JSON.parse(defs.toString('utf-8', begin, end)) as spec.Type;
    this.#memo.set(fqn, type);
    return type;
  }

  /** Decodes the `names` column into a row-ordered array, lazily and once. */
  #decodeNames(): string[] {
    if (this.#names == null) {
      this.#names =
        this.#namesLength === 0
          ? []
          : this.#index
              .toString(
                'utf-8',
                this.#namesStart,
                this.#namesStart + this.#namesLength,
              )
              .split('\n');
    }
    return this.#names;
  }

  /** Resolves an FQN to its row, building the `name -> row` map lazily and once. */
  #rowOf(fqn: string): number | undefined {
    if (this.#rows == null) {
      const names = this.#decodeNames();
      const rows = new Map<string, number>();
      for (let i = 0; i < names.length; i++) {
        rows.set(names[i], i);
      }
      this.#rows = rows;
    }
    return this.#rows.get(fqn);
  }
}

/**
 * Assembly metadata as returned by {@link loadRuntimeAssembly}.
 *
 * Narrower than {@link spec.Assembly}: `types` are accessed through
 * {@link AssemblyTypes} instead, and `readme`/`submodules` are compile-time
 * only data not available at runtime. Omitting them here means TypeScript
 * will flag any accidental access at compile time.
 */
export type AssemblyMetadata = Omit<
  spec.Assembly,
  'types' | 'readme' | 'submodules'
>;

export interface LoadedAssembly {
  /** The assembly metadata (without `types`, `readme`, or `submodules`). */
  readonly metadata: AssemblyMetadata;
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

  // Only use the index for cached, non-validating loads:
  // Validation needs the full unmodified assembly, and uncached loads are obviously not cached.
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
    // Build the index for *subsequent* loads off the critical path: the current
    // run is served eagerly from `metadata` and never reads the index being
    // built, so there is no reason to make this load wait for it. The work runs
    // on a worker thread; this load returns as soon as the assembly is parsed.
    // Strictly best-effort -- a failure to start (or finish) the worker just
    // means the next load tries again.
    buildIndexInWorker(packageDir, supportedFeatures);
  }

  return { metadata, types: new EagerTypes(metadata.types ?? {}) };
}

/**
 * Builds the runtime index for a cached package by (re-)reading its assembly.
 *
 * This is the unit of work performed on the index-builder worker thread; it is
 * intentionally self-contained (takes only a `packageDir`) so it can run with
 * no shared state. Errors propagate to the caller.
 */
export function buildRuntimeIndex(
  packageDir: string,
  supportedFeatures: spec.JsiiFeature[],
): void {
  const metadata = spec.loadAssemblyFromPath(
    packageDir,
    false,
    supportedFeatures,
  );
  buildIndex(packageDir, metadata);
}

/**
 * Starts a worker thread that builds the runtime index for a cached package and
 * returns immediately, without awaiting it.
 *
 * The worker is `unref`'d so it never keeps the host process alive on its own;
 * building the index is purely an optimization for future loads. The worker
 * shares no kernel state -- it is handed only the `packageDir` and re-reads the
 * assembly itself. All failures are swallowed; this is strictly best-effort.
 *
 * Returns the {@link Worker} (so callers that want to, e.g., await it on a
 * graceful shutdown can), or `undefined` if it could not be started.
 */
export function buildIndexInWorker(
  packageDir: string,
  supportedFeatures: spec.JsiiFeature[],
): Worker | undefined {
  try {
    const workerData: IndexBuilderWorkerData = {
      packageDir,
      supportedFeatures,
    };
    const worker = new Worker(join(__dirname, RUNTIME_INDEX_BUILDER), {
      workerData,
    });
    // Swallow worker failures (e.g. the entry file is missing in an environment
    // that did not ship it); the next load will simply retry.
    worker.once('error', () => undefined);
    worker.unref();
    return worker;
  } catch {
    // Ignore synchronous start failures: best-effort.
    return undefined;
  }
}

/**
 * Attempts to load the assembly via an existing, current runtime index.
 *
 * Returns `undefined` (so the caller falls back to a full load that rebuilds
 * the index) when no manifest for the current format version exists, or it is
 * unreadable, malformed, or its index/defs files are absent or inconsistent.
 * Throws only for "real" load errors, such as the assembly using unsupported
 * features -- matching the behavior of a full load.
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
    typeof manifest.index !== 'string' ||
    typeof manifest.defs !== 'string' ||
    manifest.assemblyMetadata == null ||
    !isValidLayout(manifest.layout)
  ) {
    return undefined;
  }

  // The index/defs paths come from a file and are therefore untrusted: each must
  // resolve to a plain file within the cache entry directory (no absolute paths,
  // no `..` escape).
  const indexPath = resolveWithin(packageDir, manifest.index);
  const defsPath = resolveWithin(packageDir, manifest.defs);
  if (
    indexPath == null ||
    defsPath == null ||
    !existsSync(indexPath) ||
    !existsSync(defsPath)
  ) {
    return undefined;
  }

  const { typeCount, names, kinds, offsets } = manifest.layout;

  // The columns must be contiguous from the start of the index file.
  if (
    names.start !== 0 ||
    kinds.start !== names.start + names.length ||
    offsets.start !== kinds.start + kinds.length ||
    kinds.length !== typeCount ||
    offsets.length !== (typeCount + 1) * 4
  ) {
    return undefined;
  }

  let index: Buffer;
  let defsSize: number;
  try {
    index = readFileSync(indexPath);
    defsSize = statSync(defsPath).size;
  } catch {
    return undefined;
  }

  // The index file is exactly the three columns; the offsets must be monotonic,
  // start at 0, and end exactly at the defs file's size.
  if (index.length !== offsets.start + offsets.length) {
    return undefined;
  }
  let previous = index.readUInt32LE(offsets.start);
  if (previous !== 0) {
    return undefined;
  }
  for (let i = 1; i <= typeCount; i++) {
    const current = index.readUInt32LE(offsets.start + i * 4);
    if (current < previous) {
      return undefined;
    }
    previous = current;
  }
  if (previous !== defsSize) {
    return undefined;
  }

  const metadata = manifest.assemblyMetadata;

  // Feature checking is cheap and must happen regardless of validation; mirror
  // what a full load does.
  checkSupportedFeatures(metadata, supportedFeatures);

  return {
    metadata,
    types: new LazyTypes({
      index,
      namesStart: names.start,
      namesLength: names.length,
      kindsStart: kinds.start,
      offsetsStart: offsets.start,
      typeCount,
      defsPath,
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
    isByteRange(l.offsets)
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
  const base = resolve(dir);
  const resolved = resolve(base, relativePath);
  if (resolved !== base && !resolved.startsWith(base + sep)) {
    return undefined;
  }
  return resolved;
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
 * Produces three files (see the runtime-index specification): a small JSON
 * manifest, a binary index file with the `names | kinds | offsets` columns, and
 * a JSONL defs file with one doc-stripped type definition per line. All files
 * are written atomically (temp file + rename) so a concurrent reader never
 * observes a partial write, and the manifest is written last.
 */
function buildIndex(packageDir: string, assembly: spec.Assembly): void {
  const types = assembly.types ?? {};
  const fqns = Object.keys(types);
  const typeCount = fqns.length;

  const kinds = Buffer.allocUnsafe(typeCount);
  const offsets = Buffer.allocUnsafe((typeCount + 1) * 4);
  const defLines: Buffer[] = [];
  let offset = 0;
  for (let i = 0; i < typeCount; i++) {
    const type = types[fqns[i]];
    kinds[i] = ordinalOfKind(type.kind);
    offsets.writeUInt32LE(offset, i * 4);
    // One JSON object per line (JSONL); the trailing newline is part of the
    // line's byte range and is harmless to `JSON.parse`.
    const line = Buffer.from(
      `${JSON.stringify(type, slimReplacer)}\n`,
      'utf-8',
    );
    defLines.push(line);
    offset += line.length;
  }
  offsets.writeUInt32LE(offset, typeCount * 4);

  const names = Buffer.from(fqns.join('\n'), 'utf-8');
  const defs = Buffer.concat(defLines);

  const layout: Layout = {
    typeCount,
    names: { start: 0, length: names.length },
    kinds: { start: names.length, length: kinds.length },
    offsets: { start: names.length + kinds.length, length: offsets.length },
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
    index: indexFileName(RUNTIME_INDEX_VERSION),
    defs: defsFileName(RUNTIME_INDEX_VERSION),
    assemblyMetadata,
    layout,
  };

  // Write the data files before the manifest, so that a present, current-version
  // manifest always implies complete index and defs files. A crash in between
  // leaves manifest-less data files, which the next load simply overwrites.
  writeFileAtomic(join(packageDir, defsFileName(RUNTIME_INDEX_VERSION)), defs);
  writeFileAtomic(
    join(packageDir, indexFileName(RUNTIME_INDEX_VERSION)),
    Buffer.concat([names, kinds, offsets]),
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
  assembly: AssemblyMetadata,
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
