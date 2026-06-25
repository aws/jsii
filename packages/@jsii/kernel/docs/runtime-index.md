# Runtime assembly index

This document describes the on-disk format of the runtime assembly index built
by `@jsii/kernel`.

The format is not part of the published `.jsii` assembly specification and has
no backwards-compatibility guarantee. It is a private, best-effort, on-disk
cache owned by the kernel. Anything other than the kernel that reads these files
does so at its own risk.

## Purpose

Loading a package normally makes the kernel parse the package's entire `.jsii`
assembly up front, even though a typical execution only looks up a small
fraction of the declared types (well under 1% for a large assembly such as
`aws-cdk-lib`). The runtime assembly index is a derived representation that lets
the kernel:

- read the assembly metadata (everything except the type definitions) cheaply;
- enumerate every type's fully-qualified name and kind without materializing its
  definition; and
- parse an individual type's definition on first lookup, so types that are never
  used are never parsed.

The index is derived data, always reconstructible from the package's `.jsii`
assembly. It is best-effort: any missing, malformed, or unreadable file causes
the kernel to fall back to a full, eager parse. Correctness never depends on the
cache.

## Location and file set

The index lives inside the package's cache entry, the directory into which the
package tarball was extracted by the on-disk package cache. It is only built and
used for packages served from that cache; it is never written for validating
loads or uncached loads.

An index consists of three files:

| Role     | Default name                          | Contents                                                                          |
| -------- | ------------------------------------- | --------------------------------------------------------------------------------- |
| Manifest | `.jsii.runtime.v{VERSION}.json`       | Small JSON: format version, assembly metadata, references to the other two files. |
| Index    | `.jsii.runtime-index.v{VERSION}`      | Binary columns: FQN `names`, type `kinds`, and `offsets` into the defs file.      |
| Defs     | `.jsii.runtime-defs.v{VERSION}.jsonl` | One doc-stripped type definition per line ([JSON Lines](https://jsonlines.org)).  |

The binary columns are kept in a separate file from the type definitions so the
defs file stays a clean, readable JSONL document. The `kinds` and `offsets`
columns contain NUL and other control bytes, which would otherwise make tooling
treat the whole file as binary. The index file is small and not meant to be read
by humans.

All three filenames are versioned (see [Versioning](#versioning)). The manifest
records the paths of the other two files; versioning those names as well keeps a
runtime of one format version from clobbering another version's files when they
share a cache entry.

## The manifest

The manifest (`.jsii.runtime.v{VERSION}.json`) is a small JSON document. It is
the only file parsed eagerly on load, and is kept to a few kilobytes so the
`JSON.parse` cost is negligible.

```ts
interface RuntimeIndexManifest {
  /** Discriminator identifying this file. Equals "jsii/runtime-index". */
  readonly schema: 'jsii/runtime-index';

  /**
   * The format version. Equals the reader's RUNTIME_INDEX_VERSION, and matches
   * the version encoded in this file's name. See "Versioning".
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
     * defs file. Line `i` (the definition of type `i`) occupies the byte range
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

`assemblyMetadata` drops `types`, `readme`, and `submodules`. `submodules` in
particular is large for packages like `aws-cdk-lib` (per-submodule
language-binding metadata) and is only consumed by compile-time tooling, never
by the runtime.

## The index file

The index file (`.jsii.runtime-index.v{VERSION}`) is binary, laid out as three
contiguous columns in this order, each delimited by the `layout` ranges in the
manifest:

```ascii
names   : "fqn0\nfqn1\n...\nfqnN-1"   (UTF-8)
kinds   : uint8[typeCount]            (TypeKind ordinals)
offsets : uint32le[typeCount + 1]     (byte offsets into defs)
```

The columnar layout lets the kernel address every type's kind and definition by
row index without allocating one object per type: `kinds` is a byte per type,
and `offsets` is read directly as little-endian `uint32`. The `names` column is
decoded only when a lookup by FQN is first performed (see
[Lazy name resolution](#lazy-name-resolution)).

### Kind ordinals

`kinds[i]` is the unsigned-byte ordinal of the type's `spec.TypeKind`:

| Ordinal | `TypeKind`  |
| ------- | ----------- |
| `0`     | `class`     |
| `1`     | `interface` |
| `2`     | `enum`      |

A reader that encounters an unknown ordinal treats the manifest as unusable and
falls back to an eager parse. New ordinals are only ever appended, with a
[version](#versioning) bump.

## The defs file

The defs file (`.jsii.runtime-defs.v{VERSION}.jsonl`) is a
[JSON Lines](https://jsonlines.org) file: row `i` is the JSON serialization of
type `i`'s `spec.Type` on its own line, terminated by `"\n"`, with runtime-unused
fields removed (`docs`, `locationInModule`, `sourceLine`, which are used by
compile-time tooling, never by the kernel or host runtimes at execution time).

The definition of type `i` is the byte range `[offsets[i], offsets[i+1])` of this
file, which includes the trailing `"\n"` (harmless to `JSON.parse`). It is read
and parsed on first access, then memoized. `offsets[0]` is `0` and
`offsets[typeCount]` equals the file's size.

## Lazy name resolution

The kernel addresses types by row index wherever it can, so the `names` column
is not eagerly turned into a lookup map:

- Iteration (`entries()`) yields `[fqn, kind]` for each row by scanning the
  `names` column once and reading `kinds[i]`. No name-to-row map is needed. This
  backs the kernel's legacy constructor-tagging pass, which only runs for
  assemblies built with jsii older than 1.19.0.
- Lookup by FQN (`get(fqn)`, `kindOf(fqn)`) needs to map an FQN to its row. That
  map is built on the first such lookup, by decoding the `names` column once. A
  run that never looks a package's types up by FQN (for example a transitively
  loaded dependency that is never used) never builds the map.

## Read algorithm

1. Compute the manifest name for the reader's `RUNTIME_INDEX_VERSION` and read it
   from the cache entry directory. If it is absent or not parseable as JSON,
   return nothing and fall back to an eager parse.
2. Check that `schema` is `"jsii/runtime-index"` and `version` equals
   `RUNTIME_INDEX_VERSION`. On a mismatch, fall back.
3. Resolve `index` and `defs` against the manifest's directory and validate each
   per [Security](#security). If either escapes the directory, or either file is
   absent, fall back.
4. Validate `layout` against the index file: the columns are contiguous from
   offset `0` (`names.start` is `0`, `kinds` follows `names`, `offsets` follows
   `kinds`), `kinds.length` equals `typeCount`, `offsets.length` equals
   `(typeCount + 1) * 4`, and the index file's size equals
   `offsets.start + offsets.length`. Validate that `offsets` is monotonic
   non-decreasing, `offsets[0]` is `0`, and `offsets[typeCount]` equals the defs
   file's size. On any inconsistency, fall back.
5. Perform the same feature check an eager load would: reject the assembly if it
   uses `usedFeatures` the tool does not support. This is a real load error, not
   a fall-back.
6. Construct the lazy type accessor over `assemblyMetadata`, the index columns,
   and the defs file path. The name-to-row map and individual definitions are
   produced on first use, as described in
   [Lazy name resolution](#lazy-name-resolution).

Any I/O or decoding failure at any step is non-fatal and resolves to "no index",
except the feature check in step 5, which mirrors an eager load.

## Write algorithm

The index is built once per cached package, the first time it is loaded, whether
the package was just extracted or had been cached by an earlier run that predates
this feature. It is built on a worker thread, off the load critical path, so the
current run is never delayed by it.

1. Compute the `assemblyMetadata`, the three columns (`names`, `kinds`,
   `offsets`), and the JSONL `defs` content. `offsets` is the running byte
   position of each line within the defs content.
2. Write the defs file and the index file first, each atomically (temp file then
   `rename`).
3. Write the manifest last, atomically, recording `version`, `index`, `defs`,
   `assemblyMetadata`, and `layout`.

The manifest is written last so a present, current-version manifest always
implies complete index and defs files. A crash beforehand leaves data files with
no manifest, which the next load overwrites.

## Versioning

The version is recorded in two places:

- In the filenames (`.jsii.runtime.v{VERSION}.json` and the others), so a cache
  entry shared by multiple jsii runtimes of different versions can have each one
  read and write its own files without clobbering another version's. A runtime
  never reads a manifest whose name encodes a version other than its own.
- In the `version` field inside the manifest, as an integrity check that the
  file's contents match what its name claims.

Bump `RUNTIME_INDEX_VERSION` whenever the manifest, index, or defs layout changes
in a way an older reader could not understand, or an older writer would produce
incorrectly (for example new kind ordinals, changed column widths or order, or
changed definition-stripping rules). Because the version is in the filenames, a
bump invalidates older indices: the new runtime looks for (and builds) new files
and leaves other versions' files untouched.

## Concurrency and atomicity

- All files are written via temp file then `rename`, so a concurrent reader
  never sees a partial write.
- Temp file names include the writing process's PID to avoid collisions between
  concurrent builders.
- Two runtimes of the same version racing to build the index each produce
  byte-equivalent files; the last `rename` wins harmlessly.

## Security

The `index` and `defs` paths are read from a file, so they are treated as
untrusted input on read:

- Each must resolve to a path within the manifest's own directory (the cache
  entry). Readers reject absolute paths, any path containing `..` segments, and
  paths that resolve outside that directory.
- In practice writers only ever emit the default basenames. The fields exist for
  self-containment, and the validation is defense in depth against a tampered or
  corrupted cache.
