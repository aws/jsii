import * as spec from '@jsii/spec';
import {
  existsSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { join } from 'path';

/**
 * Version of the on-disk runtime index format.
 *
 * Bump this whenever the layout written by {@link buildIndex} changes in a way
 * that an older reader could not understand (or an older writer would produce
 * incorrectly). The version is encoded in the index/bodies file *names*, so a
 * bump simply means the current runtime looks for (and builds) a different
 * file. This is deliberately filename-based rather than a field inside the
 * file: a single cache entry may be shared by multiple jsii runtimes of
 * different versions at the same time, and each must be able to read and write
 * its own index without clobbering another version's.
 *
 * Indices for other versions are left untouched (they are tiny and may be in
 * use by a concurrent runtime); they are simply never read by this version.
 */
export const RUNTIME_INDEX_VERSION = 1;

/** Name of the index file for a given format version, within a cache entry. */
function indexFileName(version: number): string {
  return `.jsii.runtime-index.v${version}.json`;
}

/** Name of the bodies file (slimmed type definitions) for a format version. */
function bodiesFileName(version: number): string {
  return `.jsii.runtime-bodies.v${version}`;
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

interface IndexEntry {
  readonly kind: spec.TypeKind;
  readonly offset: number;
  readonly length: number;
}

/**
 * {@link AssemblyTypes} backed by a runtime index: the kind and byte range of
 * each type is known up front, but a type's definition is only read and parsed
 * the first time it is requested. Parsed definitions are memoized so repeated
 * lookups (e.g. after the kernel clears its own type cache) do not re-parse.
 */
class LazyTypes implements AssemblyTypes {
  readonly #index: ReadonlyMap<string, IndexEntry>;
  readonly #bodiesPath: string;
  readonly #memo = new Map<string, spec.Type>();
  #bodies?: Buffer;

  public constructor(
    index: ReadonlyMap<string, IndexEntry>,
    bodiesPath: string,
  ) {
    this.#index = index;
    this.#bodiesPath = bodiesPath;
  }

  public get count(): number {
    return this.#index.size;
  }

  public fqns(): Iterable<string> {
    return this.#index.keys();
  }

  public kindOf(fqn: string): spec.TypeKind | undefined {
    return this.#index.get(fqn)?.kind;
  }

  public get(fqn: string): spec.Type | undefined {
    const memoized = this.#memo.get(fqn);
    if (memoized != null) {
      return memoized;
    }

    const entry = this.#index.get(fqn);
    if (entry == null) {
      return undefined;
    }

    // Read the bodies blob once (lazily), then decode only this type's slice.
    const bodies = (this.#bodies ??= readFileSync(this.#bodiesPath));
    const json = bodies.toString(
      'utf-8',
      entry.offset,
      entry.offset + entry.length,
    );
    const type = JSON.parse(json) as spec.Type;
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
 * the index) when no index for the current format version exists, or it is
 * unreadable, malformed, or its bodies file is absent. Throws only for "real"
 * load errors, such as the assembly using unsupported features -- matching the
 * behavior of a full load.
 */
function tryLoadIndexed(
  packageDir: string,
  supportedFeatures: spec.JsiiFeature[],
): LoadedAssembly | undefined {
  const indexPath = join(packageDir, indexFileName(RUNTIME_INDEX_VERSION));
  const bodiesPath = join(packageDir, bodiesFileName(RUNTIME_INDEX_VERSION));

  let raw: any;
  try {
    raw = JSON.parse(readFileSync(indexPath, 'utf-8'));
  } catch {
    return undefined;
  }

  if (
    raw == null ||
    typeof raw.types !== 'object' ||
    raw.header == null ||
    !existsSync(bodiesPath)
  ) {
    return undefined;
  }

  const index = new Map<string, IndexEntry>(
    Object.entries(raw.types as { [fqn: string]: IndexEntry }),
  );
  const metadata: spec.Assembly = {
    ...(raw.header as spec.Assembly),
    types: {},
  };

  // Feature checking is cheap and must happen regardless of validation; mirror
  // what a full load does.
  checkSupportedFeatures(metadata, supportedFeatures);

  return { metadata, types: new LazyTypes(index, bodiesPath) };
}

/**
 * Fields the runtime kernel never reads, dropped from the indexed bodies to
 * shrink them (and speed up the per-type parse). Verified against all kernel
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
 * Each type is serialized (minus the runtime-unused fields) into a single
 * "bodies" blob; an index file records, per FQN, the type kind and the byte
 * range of its definition within that blob. Both files are written atomically
 * (temp file + rename) so a concurrent reader never observes a partial write.
 */
function buildIndex(packageDir: string, assembly: spec.Assembly): void {
  const types = assembly.types ?? {};

  const chunks: Buffer[] = [];
  const index: { [fqn: string]: IndexEntry } = {};
  let offset = 0;
  for (const [fqn, type] of Object.entries(types)) {
    const body = Buffer.from(JSON.stringify(type, slimReplacer), 'utf-8');
    index[fqn] = { kind: type.kind, offset, length: body.length };
    chunks.push(body);
    offset += body.length;
  }

  // The header is the assembly without the bulky parts the kernel reads lazily
  // (`types`) or never (`readme`, `submodules`). `submodules` in particular is
  // large for packages like aws-cdk-lib (per-submodule language-binding
  // metadata) and is only consumed by compile-time tooling, not the runtime.
  const {
    types: _types,
    readme: _readme,
    submodules: _submodules,
    ...header
  } = assembly;

  // Write bodies first: if the (current-version) index is present, its bodies
  // are guaranteed to exist (a partial state just triggers a rebuild on the
  // next load). The version is part of the file names so that runtimes of
  // different format versions sharing this cache entry never clobber each
  // other.
  writeFileAtomic(
    join(packageDir, bodiesFileName(RUNTIME_INDEX_VERSION)),
    Buffer.concat(chunks),
  );
  writeFileAtomic(
    join(packageDir, indexFileName(RUNTIME_INDEX_VERSION)),
    Buffer.from(JSON.stringify({ header, types: index }), 'utf-8'),
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
