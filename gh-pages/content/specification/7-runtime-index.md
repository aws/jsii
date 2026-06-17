# The _jsii_ runtime assembly index

!!! note
    This document describes the on-disk format of the _runtime assembly index_. The format is **not part
    of the published `.jsii` assembly specification** and carries **no backwards-compatibility
    guarantee**: it is a private, best-effort, on-disk cache owned exclusively by `@jsii/kernel`. Any
    consumer other than the kernel that reads these files does so at its own risk.

## Purpose

Loading a package makes the _kernel_ parse the package's entire `.jsii` assembly up front, even though a
typical execution only ever looks up a tiny fraction of the declared types (well under 1% for a large
assembly such as `aws-cdk-lib`). The _runtime assembly index_ is a compact, derived representation that
lets the kernel:

- read the assembly **metadata** (everything except the type definitions) cheaply;
- enumerate every type's **fully-qualified name** and **kind** without materializing its definition; and
- parse an individual type's definition **lazily, on first lookup**, so untouched types are never parsed.

The index is **derived data**. It is built from, and is always reconstructible from, the package's
`.jsii` assembly. It is **strictly best-effort**: any missing, malformed, or unreadable file MUST cause
the kernel to fall back to a full, eager parse of the `.jsii` assembly. Correctness never depends on the
cache.

## Location and file set

The index lives **inside the package's cache entry** — the directory into which the package tarball was
extracted by the on-disk package cache. It is only built and used for packages served from that stable
cache; it is never written for validating loads or uncached loads.

An index consists of **three files**:

| Role         | Default name                          | Contents                                                                              |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------- |
| **Manifest** | `.jsii.runtime.v{VERSION}.json`       | Small JSON: format version, assembly metadata, and references to the other two files. |
| **Index**    | `.jsii.runtime-index.v{VERSION}`      | Binary columns: FQN `names`, type `kinds`, and `offsets` into the defs file.          |
| **Defs**     | `.jsii.runtime-defs.v{VERSION}.jsonl` | One doc-stripped type definition per line ([JSON Lines](https://jsonlines.org)).      |

Splitting the binary columns (the **index**) from the type definitions (the **defs**) keeps the defs file
a clean, human-readable JSONL document — the binary `kinds`/`offsets` columns, which contain NUL and other
control bytes, would otherwise cause tooling to treat the whole file as binary. The index file is small
and not meant to be read by humans.

All three filenames are versioned (see [Versioning](#versioning)). The manifest records the paths of the
other two files; versioning them as well prevents a runtime of one format version from clobbering another
version's files when they share a cache entry.

## The manifest — `.jsii.runtime.v{VERSION}.json`

The manifest is a small JSON document. It is the only file parsed eagerly on load, and is deliberately
kept to a few kilobytes so that `JSON.parse` cost is negligible.

```ts
interface RuntimeIndexManifest {
  /** Discriminator identifying this file. MUST equal "jsii/runtime-index". */
  readonly schema: 'jsii/runtime-index';

  /**
   * The format version. MUST equal the reader's RUNTIME_INDEX_VERSION, and MUST
   * match the version encoded in this file's name. See "Versioning".
   */
  readonly version: number;

  /**
   * Path to the binary index file, relative to the directory containing this
   * manifest. Defaults to ".jsii.runtime-index.v{VERSION}". See "Security".
   */
  readonly index: string;

  /**
   * Path to the JSONL definitions file, relative to the directory containing
   * this manifest. Defaults to ".jsii.runtime-defs.v{VERSION}.jsonl". See "Security".
   */
  readonly defs: string;

  /**
   * The assembly metadata with the heavyweight, runtime-unused members removed:
   * `types` (indexed separately), `readme`, and `submodules`.
   */
  readonly assemblyMetadata: Omit<spec.Assembly, 'types' | 'readme' | 'submodules'>;

  /** Byte layout of the three columns within the index file. */
  readonly layout: {
    readonly typeCount: number;
    /** Column: FQNs joined by "\n", UTF-8. */
    readonly names: ByteRange;
    /** Column: one unsigned byte per type, the TypeKind ordinal (see "Kind ordinals"). */
    readonly kinds: ByteRange;
    /**
     * Column: `typeCount + 1` little-endian uint32 values, byte offsets into the
     * **defs file**. Line `i` (the definition of type `i`) occupies the byte range
     * `[offsets[i], offsets[i+1])` of the defs file.
     */
    readonly offsets: ByteRange;
  };
}

interface ByteRange {
  readonly start: number; // inclusive, bytes from the start of the index file
  readonly length: number;
}
```

!!! note
    `assemblyMetadata` is the assembly minus `types`, `readme`, and `submodules`. `submodules` in particular is
    large for packages like `aws-cdk-lib` (per-submodule language-binding metadata) and is only consumed
    by compile-time tooling, never by the runtime.

## The index file — `.jsii.runtime-index.v{VERSION}`

A binary file laid out as three contiguous columns, in this order, each delimited by the `layout` ranges
in the manifest:

```
┌──────────────────────────────────────────────────────────────────┐
│ names   : "fqn0\nfqn1\n…\nfqnN-1"     (UTF-8)                    │
│ kinds   : uint8[typeCount]            (TypeKind ordinals)        │
│ offsets : uint32le[typeCount + 1]     (byte offsets into defs)   │
└──────────────────────────────────────────────────────────────────┘
```

The **columnar** layout lets the kernel address every type's kind and definition by **row index**
without allocating one object per type: `kinds` is a byte per type, and `offsets` is read directly as
little-endian `uint32`. The `names` column is decoded only when a lookup **by FQN** is first performed
(see [Lazy name resolution](#lazy-name-resolution)).

### Kind ordinals

`kinds[i]` is the unsigned-byte ordinal of the type's `spec.TypeKind`:

| Ordinal | `TypeKind`  |
| ------- | ----------- |
| `0`     | `class`     |
| `1`     | `interface` |
| `2`     | `enum`      |

A reader encountering an unknown ordinal MUST treat the manifest as unusable and fall back to an eager
parse. New ordinals MUST only be appended, and MUST be accompanied by a [version](#versioning) bump.

## The defs file — `.jsii.runtime-defs.v{VERSION}.jsonl`

A [JSON Lines](https://jsonlines.org) file: row `i` is the JSON serialization of type `i`'s `spec.Type`
on its own line, terminated by `"\n"`, **with runtime-unused fields removed** (`docs`,
`locationInModule`, `sourceLine` — used by compile-time tooling, never by the kernel or _host_ runtimes
at execution time).

The definition of type `i` is the byte range `[offsets[i], offsets[i+1])` of this file (which includes
the trailing `"\n"`, harmless to `JSON.parse`). It is read and parsed on first access, then memoized.
`offsets[0]` is `0` and `offsets[typeCount]` equals the file's size.

## Lazy name resolution

The kernel addresses types by **row index** wherever possible, so the `names` column is not eagerly
materialized:

- **Iteration** (`entries()`): yields `[fqn, kind]` for each row `0..typeCount-1` by scanning the `names`
  column once and reading `kinds[i]` — no name→row map is needed. (This backs the kernel's legacy
  constructor-tagging pass, which only runs for assemblies built with jsii `< 1.19.0`.)
- **Lookup by FQN** (`get(fqn)` / `kindOf(fqn)`): requires mapping an FQN to its row. The `name → row`
  map is built **lazily**, on the first such lookup, by decoding the `names` column once. A run that
  never looks a package's types up by FQN (e.g. a transitively-loaded dependency that is never used)
  never materializes the map at all.

## Read algorithm

1. Compute the manifest name for the reader's `RUNTIME_INDEX_VERSION` and read it from the cache entry
   directory. If absent or unparseable as JSON → **return nothing** (fall back to eager parse).
2. Validate `schema === "jsii/runtime-index"` and `version === RUNTIME_INDEX_VERSION`. On mismatch →
   fall back.
3. Resolve `index` and `defs` against the manifest's directory and validate each per [Security](#security).
   If either escapes the directory, or either file is absent → fall back.
4. Validate `layout` against the index file: the columns are contiguous from offset `0`
   (`names.start === 0`, `kinds` follows `names`, `offsets` follows `kinds`), `kinds.length === typeCount`,
   `offsets.length === (typeCount + 1) * 4`, and the index file's size equals `offsets.start + offsets.length`.
   Validate that `offsets` is monotonic non-decreasing, `offsets[0] === 0`, and `offsets[typeCount]`
   equals the defs file's size. On any inconsistency → fall back.
5. Perform the same **feature check** an eager load would (reject the assembly if it uses
   `usedFeatures` the tool does not support — this is a _real_ load error, not a fall-back).
6. Construct the lazy type accessor over `assemblyMetadata`, the index columns, and the defs file path.
   The `name → row` map and individual definitions are produced on first use, as described in
   [Lazy name resolution](#lazy-name-resolution).

Any I/O or decoding failure at any step is non-fatal and resolves to "no index", except the feature
check in step 5, which mirrors the behavior of an eager load.

## Write algorithm

The index is built once per cached package, the first time it is loaded — whether it was just extracted
or had been cached by an earlier run that predates this feature.

1. Compute the `assemblyMetadata`, the three columns (`names`, `kinds`, `offsets`), and the JSONL `defs`
   content. `offsets` is the running byte position of each line within the defs content.
2. Write the **defs file** and the **index file** first, each atomically (temp file + `rename`).
3. Write the **manifest** last, atomically, recording `version`, `index`, `defs`, `assemblyMetadata`,
   and `layout`.

The manifest is written last so that a present, current-version manifest always implies complete index
and defs files. A crash beforehand leaves manifest-less data files, which the next load overwrites.

## Versioning

The version is recorded **in two places**:

- **In the filenames** (`.jsii.runtime.v{VERSION}.json`, etc.) — so that a single cache entry shared by
  multiple jsii runtimes of different versions at the same time can each read and write _their own_
  files without clobbering another version's. A runtime simply never reads a manifest whose name encodes
  a version other than its own.
- **In the `version` field inside the manifest** — as an integrity check that the file's contents match
  what its name claims, independent of the filename.

Bump `RUNTIME_INDEX_VERSION` whenever the manifest, index, or defs layout changes in a way an older
reader could not understand, or an older writer would produce incorrectly (e.g. new kind ordinals,
changed column widths or order, changed definition-stripping rules). Because the version is in the
filenames, a bump transparently invalidates older indices: the new runtime looks for (and builds) new
files, and leaves other versions' files untouched.

## Concurrency and atomicity

- All files are written via temp-file + `rename`, so a concurrent reader never observes a partial write.
- Temp file names incorporate the writing process's PID to avoid collisions between concurrent builders.
- Two runtimes of the same version racing to build the index will each produce byte-equivalent files;
  the last `rename` wins harmlessly.

## Security

The `index` and `defs` paths are read from a file and therefore MUST be treated as untrusted input on
read:

- Each MUST resolve to a path **within the manifest's own directory** (the cache entry). Readers MUST
  reject absolute paths, any path containing `..` segments, and paths that resolve (including via
  symlinks) outside that directory.
- In practice writers only ever emit the default basenames; the fields exist for self-containment, and
  the validation is defense-in-depth against a tampered or corrupted cache.
