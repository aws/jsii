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

An index consists of two files:

| Role         | Default name                     | Contents                                                                         |
| ------------ | -------------------------------- | -------------------------------------------------------------------------------- |
| **Manifest** | `.jsii.runtime.v{VERSION}.json`  | Small JSON: format version, assembly metadata, and a reference to the data file. |
| **Data**     | `.jsii.runtime-index.v{VERSION}` | Binary: the columnar type index followed by the type definitions.                |

Both filenames are versioned (see [Versioning](#versioning)). The manifest records the data file it
belongs to, so the data filename is conceptually an implementation detail of a given manifest — but
versioning it as well prevents a runtime of one format version from clobbering another version's data
file when they share a cache entry.

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
   * Path to the data file, relative to the directory containing this manifest.
   * Defaults to ".jsii.runtime-index.v{VERSION}" on write. See "Security" for read rules.
   */
  readonly data: string;

  /**
   * The assembly metadata with the heavyweight, runtime-unused members removed:
   * `types` (indexed separately), `readme`, and `submodules`.
   */
  readonly assemblyMetadata: Omit<spec.Assembly, 'types' | 'readme' | 'submodules'>;

  /** Byte layout of the regions within the data file. All offsets are from the start of the file. */
  readonly layout: {
    readonly typeCount: number;
    /** Column: FQNs, joined by "\n", UTF-8. */
    readonly names: ByteRange;
    /** Column: one unsigned byte per type, the TypeKind ordinal (see "Kind ordinals"). */
    readonly kinds: ByteRange;
    /**
     * Column: `typeCount + 1` little-endian uint32 values. The definition of type `i`
     * occupies `[defs.start + offsets[i], defs.start + offsets[i+1])`.
     */
    readonly offsets: ByteRange;
    /** Region: the concatenated, doc-stripped type definitions. */
    readonly defs: ByteRange;
  };
}

interface ByteRange {
  readonly start: number; // inclusive, bytes from start of the data file
  readonly length: number;
}
```

!!! note
    `assemblyMetadata` is the assembly minus `types`, `readme`, and `submodules`. `submodules` in particular is
    large for packages like `aws-cdk-lib` (per-submodule language-binding metadata) and is only consumed
    by compile-time tooling, never by the runtime.

## The data file — `.jsii.runtime-index.v{VERSION}`

A single binary file laid out as four contiguous regions, in this order, each delimited by the
`layout` ranges in the manifest:

```
┌──────────────────────────────────────────────────────────────────┐
│ names   : "fqn0\nfqn1\n…\nfqnN-1"     (UTF-8)                    │
│ kinds   : uint8[typeCount]            (TypeKind ordinals)        │
│ offsets : uint32le[typeCount + 1]     (offsets into the defs)    │
│ defs    : <type0-json><type1-json>…   (UTF-8, doc-stripped)      │
└──────────────────────────────────────────────────────────────────┘
```

The **columnar** layout exists so the kernel can build its in-memory index without allocating one object
per type: `kinds` and `offsets` are consumed directly as typed-array views over the file buffer (zero
parsing), and only `names` is decoded. Measured on `aws-cdk-lib` (20,351 types) this loads ~3.3× faster
than an equivalent JSON object map and is ~43% smaller.

### Definitions

Each type's definition is the JSON serialization of its `spec.Type`, **with runtime-unused fields removed**:
`docs`, `locationInModule`, and `sourceLine`. These are used by compile-time tooling, never by the
kernel or _host_ runtimes at execution time. The definition for type `i` is the byte slice

```
data.subarray(layout.defs.start + offsets[i], layout.defs.start + offsets[i + 1])
```

decoded as UTF-8 and parsed with `JSON.parse` on first access, then memoized.

### Kind ordinals

`kinds[i]` is the unsigned-byte ordinal of the type's `spec.TypeKind`:

| Ordinal | `TypeKind`  |
| ------- | ----------- |
| `0`     | `class`     |
| `1`     | `interface` |
| `2`     | `enum`      |

A reader encountering an unknown ordinal MUST treat the manifest as unusable and fall back to an eager
parse. New ordinals MUST only be appended, and MUST be accompanied by a [version](#versioning) bump.

## Read algorithm

1. Compute the manifest name for the reader's `RUNTIME_INDEX_VERSION` and read it from the cache entry
   directory. If absent or unparseable as JSON → **return nothing** (fall back to eager parse).
2. Validate `schema === "jsii/runtime-index"` and `version === RUNTIME_INDEX_VERSION`. On mismatch →
   fall back.
3. Resolve `data` against the manifest's directory and validate it per [Security](#security). If it
   escapes the directory, or the file is absent → fall back.
4. Validate `layout` (ranges within the file, `offsets` length `=== typeCount + 1`, monotonic
   non-decreasing offsets, final offset `=== defs.length`). On any inconsistency → fall back.
5. Perform the same **feature check** an eager load would (reject the assembly if it uses
   `usedFeatures` the tool does not support — this is a _real_ load error, not a fall-back).
6. Construct the lazy type accessor over `assemblyMetadata` + the data file. Type definitions are read
   and parsed on first lookup.

Any I/O or decoding failure at any step is non-fatal and resolves to "no index", except the feature
check in step 5, which mirrors the behavior of an eager load.

## Write algorithm

The index is built once per cached package, the first time it is loaded — whether it was just extracted
or had been cached by an earlier run that predates this feature.

1. Compute the `assemblyMetadata`, the per-type `(kind, offset, length)` index, and the concatenated
   definitions.
2. Write the **data file** first, atomically (temp file + `rename`), under its default name.
3. Write the **manifest** second, atomically, recording `version`, `data`, `assemblyMetadata`, and `layout`.

The data file is written before the manifest so that a present, current-version manifest always implies
a complete data file. A crash between the two writes leaves a manifest-less data file, which the next
load simply overwrites.

## Versioning

The version is recorded **in two places**:

- **In the manifest filename** (`.jsii.runtime.v{VERSION}.json`) — so that a single cache entry shared
  by multiple jsii runtimes of different versions at the same time can each read and write _their own_
  manifest without clobbering another version's. A runtime simply never reads a manifest whose name
  encodes a version other than its own.
- **In the `version` field inside the manifest** — as an integrity check that the file's contents match
  what its name claims, independent of the filename.

Bump `RUNTIME_INDEX_VERSION` whenever the manifest or data layout changes in a way an older reader could
not understand, or an older writer would produce incorrectly (e.g. new kind ordinals, changed column
widths or order, changed body-stripping rules). Because the version is in the filename, a bump
transparently invalidates older indices: the new runtime looks for (and builds) a new manifest, and
leaves indices for other versions untouched.

!!! note "Pre-release"
    While this feature remains unreleased, its layout may be changed **in place without a version bump** —
    there are no deployed readers to be compatible with. The version remains `1` until the first release
    that ships it.

## Concurrency and atomicity

- Both files are written via temp-file + `rename`, so a concurrent reader never observes a partial write.
- Temp file names incorporate the writing process's PID to avoid collisions between concurrent builders.
- Two runtimes of the same version racing to build the index will each produce a byte-equivalent result;
  the last `rename` wins harmlessly.

## Security

The `data` path is read from a file and therefore MUST be treated as untrusted input on read:

- It MUST resolve to a path **within the manifest's own directory** (the cache entry). Readers MUST
  reject absolute paths, any path containing `..` segments, and paths that resolve (including via
  symlinks) outside that directory.
- In practice writers only ever emit the default basename `.jsii.runtime-index.v{VERSION}`; the field
  exists for self-containment, and the validation is defense-in-depth against a tampered or corrupted
  cache.

## Open questions

- Should the columnar index and the definitions live in **one** data file (as specified here) or in two
  separate files? One file keeps the cache entry tidy and the manifest's `layout` already disambiguates
  the regions; two files would let the (small) index and (large) definitions be read/cached independently.
- Should `names` be prefix-compressed? FQNs share long common prefixes (`aws-cdk-lib.aws_s3.…`). This
  would shrink the data file further at the cost of a small decode step; it is the dominant remaining
  contributor to both file size and load time.
- Should the name→row lookup map be built **lazily** (on first `get`/`kindOf` by FQN) rather than
  eagerly? The load-time constructor-tagging pass iterates types by row and does not need the map, so
  deferring it would remove most of the residual eager-load cost.
