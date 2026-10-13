import { homedir, tmpdir } from 'os';
import { isAbsolute, join } from 'path';

/**
 * Determines the default location of the package cache.
 *
 * The location is derived from the current user's own directories.
 *
 * @returns the default package cache root, or `undefined` if the current user
 *          has no usable home directory. In that case, use
 *          {@link fallbackCacheRoot} instead.
 */
export function defaultCacheRoot(): string | undefined {
  if (process.platform === 'win32') {
    const localAppData =
      nonEmptyAbsolute(process.env.LOCALAPPDATA) ??
      withHome((home) => join(home, 'AppData', 'Local'));
    return localAppData && join(localAppData, 'AWS', 'jsii', 'package-cache');
  }

  if (process.platform === 'darwin') {
    return withHome((home) =>
      join(home, 'Library', 'Caches', 'com.amazonaws.jsii', 'package-cache'),
    );
  }

  // Linux and every other POSIX platform
  return withHome((home) =>
    join(home, '.cache', 'aws', 'jsii', 'package-cache'),
  );
}

/**
 * Determines the location of the package cache to use when the default one is
 * not available or not private to the current user.
 *
 * This is a per-user directory under `os.tmpdir()`. Because `os.tmpdir()` may
 * be shared with other users (e.g: `/tmp`), the caller MUST verify that the
 * directory is private to the current user before using it: another user
 * could have created it first.
 */
export function fallbackCacheRoot(): string {
  // The user ID is part of the name so that users sharing a temporary
  // directory do not collide. Windows has no UIDs, but its temporary directory
  // is normally per-user already.
  const uid = process.getuid?.();
  return join(
    tmpdir(),
    uid != null ? `aws-jsii-package-cache-${uid}` : 'aws-jsii-package-cache',
  );
}

/**
 * Calls `cb` with the current user's home directory, if one can be determined.
 *
 * `os.homedir()` uses `HOME` (or `USERPROFILE` on Windows) when it is set, and
 * otherwise falls back to the current user's entry in the password database.
 */
function withHome(cb: (home: string) => string): string | undefined {
  let home: string | undefined;
  try {
    home = nonEmptyAbsolute(homedir());
  } catch {
    // The current user has no home directory (e.g: no password database
    // entry). We never fall back to the current working directory; the
    // caller uses `fallbackCacheRoot()` instead.
    home = undefined;
  }
  return home && cb(home);
}

function nonEmptyAbsolute(path: string | undefined): string | undefined {
  return path && isAbsolute(path) ? path : undefined;
}
