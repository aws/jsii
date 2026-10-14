import { homedir, tmpdir } from 'os';
import { isAbsolute, join } from 'path';

/**
 * The default package cache location: in the user's cache directory, or a
 * per-user directory in `os.tmpdir()` if there is no usable home directory.
 *
 * Callers must verify the location is private (`os.tmpdir()` may be shared).
 */
export function defaultCacheRoot(): string {
  return userCacheRoot() ?? tmpdirCacheRoot();
}

/** In the user's cache directory, or `undefined` without a home directory. */
function userCacheRoot(): string | undefined {
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

/** In `os.tmpdir()`, named by UID so users sharing it don't collide. */
function tmpdirCacheRoot(): string {
  const uid = process.getuid?.();
  // Windows has no UIDs, but its tmpdir is per-user.
  return join(
    tmpdir(),
    uid != null ? `aws-jsii-package-cache-${uid}` : 'aws-jsii-package-cache',
  );
}

/**
 * The user's home directory, if usable. `os.homedir()` uses `HOME` (or
 * `USERPROFILE`), else the password database, and throws if neither exists.
 */
function withHome(cb: (home: string) => string): string | undefined {
  let home: string | undefined;
  try {
    home = nonEmptyAbsolute(homedir());
  } catch {
    home = undefined;
  }
  return home && cb(home);
}

function nonEmptyAbsolute(path: string | undefined): string | undefined {
  return path && isAbsolute(path) ? path : undefined;
}
