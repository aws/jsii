# Package Cache

When an application uses a *jsii module*, the [jsii runtime][runtime architecture] extracts the module's bundled
JavaScript package before loading it. To avoid doing this on every run, extracted packages are kept in a cache on disk
and re-used by later runs.

The cache is enabled by default. It only stores packages that were extracted from the *jsii modules* your applications
use, and entries that have not been used for a while are removed automatically.

[runtime architecture]: ../../overview/runtime-architecture.md

## Location

By default, the cache is stored in a directory that belongs to the current user:

| Platform      | Default location                                    |
| ------------- | --------------------------------------------------- |
| macOS         | `~/Library/Caches/com.amazonaws.jsii/package-cache` |
| Linux, others | `~/.cache/aws/jsii/package-cache`                   |
| Windows       | `%LOCALAPPDATA%\AWS\jsii\package-cache`             |

The cache contains code that is loaded and run by your applications, so it should be private to the current user.
Directories created by the jsii runtime are only accessible by the current user. Before it uses a directory, the jsii
runtime also checks, on a best-effort basis, that other users cannot modify it: the directory must be owned by the
current user and not writable by group or others, and every parent directory must be owned by the current user or by
`root`, and either not writable by group or others, or have the sticky bit set (like `/tmp`). These checks look at
ownership and permission bits only. They do not take access control lists into account, and are skipped on Windows,
where the default locations are private to the user.

If the current user has no home directory, or the default location does not pass these checks, the jsii runtime uses
a per-user directory in the system's temporary directory instead (`aws-jsii-package-cache-<uid>` in `os.tmpdir()`),
subject to the same checks. If that directory does not pass the checks either, packages are extracted without caching,
which is slower. In both cases, the jsii runtime prints a warning naming the directory and the reason.

## Configuration

The cache can be configured with the following environment variables.

### `JSII_RUNTIME_PACKAGE_CACHE`

Set to `disabled` to turn off the cache. Packages are then extracted again by every run. The default value is
`enabled`. Any value other than `enabled` (case insensitive) turns off the cache.

### `JSII_RUNTIME_PACKAGE_CACHE_ROOT`

The directory to store the cache in, instead of the default location. If the directory does not exist, it is created so
that it is only accessible by the current user.

!!! note
    The jsii runtime does not check a directory explicitly configured with `JSII_RUNTIME_PACKAGE_CACHE_ROOT`. Users who
    can write to it can change the code your applications load from the cache, so only share it with users you trust.

### `JSII_RUNTIME_PACKAGE_CACHE_TTL`

The number of days after which an unused cache entry is removed. The default is `30`. Expired entries are removed when
the jsii runtime exits.
