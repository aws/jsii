import { lstatSync, mkdirSync, realpathSync, Stats } from 'fs';
import { dirname } from 'path';

const GROUP_OR_OTHER_WRITABLE = 0o022;
const STICKY_BIT = 0o1000;

/**
 * Indicates that a directory cannot be used because other users may be able to
 * modify its contents.
 */
export class InsecureDirectoryError extends Error {
  public constructor(
    public readonly path: string,
    reason: string,
  ) {
    super(`${path} ${reason}`);
    this.name = InsecureDirectoryError.name;
  }
}

/**
 * Creates `path` (if needed) so that it is private to the current user, and
 * verifies that no other user can modify its contents.
 *
 * On POSIX platforms, this requires that:
 * - `path` is a directory owned by the current user, and is not writable by
 *   group or others;
 * - every ancestor of `path` is owned by the current user or by `root`, and is
 *   either not writable by group or others, or has the sticky bit set (like
 *   `/tmp`). Otherwise another user could rename `path` and put a different
 *   directory in its place.
 *
 * Symbolic links are resolved first, and the checks apply to the resolved
 * location. Callers must use the returned path from then on: it contains no
 * symbolic links, so replacing a link in the original path later has no
 * effect. Directories that may be swapped for a link (anything another user
 * can write to) are rejected by the checks above.
 *
 * On Windows, directories are created with the default (inherited) ACL, and no
 * ownership checks are performed.
 *
 * @returns the real path of the directory.
 *
 * @throws InsecureDirectoryError if the directory is not private to the current
 *         user.
 */
export function ensurePrivateDirectory(path: string): {
  readonly path: string;
  readonly created: boolean;
} {
  // `mode` applies to every directory this creates, but not to existing ones.
  const created = mkdirSync(path, { recursive: true, mode: 0o700 }) != null;
  const realPath = realpathSync(path);

  const uid = process.getuid?.();
  if (uid == null) {
    // Windows does not have POSIX ownership or permission bits.
    return { path: realPath, created };
  }

  const stat = lstatSync(realPath);
  if (stat.isSymbolicLink() || !stat.isDirectory()) {
    throw new InsecureDirectoryError(realPath, 'is not a directory');
  }
  if (stat.uid !== uid) {
    throw new InsecureDirectoryError(
      realPath,
      `is owned by uid ${stat.uid}, not by the current user (uid ${uid})`,
    );
  }
  if ((stat.mode & GROUP_OR_OTHER_WRITABLE) !== 0) {
    throw new InsecureDirectoryError(
      realPath,
      `is writable by group or others (mode ${formatMode(stat)})`,
    );
  }

  for (let ancestor = dirname(realPath); ; ancestor = dirname(ancestor)) {
    const ancestorStat = lstatSync(ancestor);
    if (ancestorStat.isSymbolicLink()) {
      // `realPath` has no symbolic links, so the path was changed concurrently.
      throw new InsecureDirectoryError(
        realPath,
        `has an ancestor directory ${ancestor} that was replaced with a symbolic link`,
      );
    }
    if (ancestorStat.uid !== uid && ancestorStat.uid !== 0) {
      throw new InsecureDirectoryError(
        realPath,
        `has an ancestor directory ${ancestor} that is owned by uid ${ancestorStat.uid}, which is neither the current user (uid ${uid}) nor root`,
      );
    }
    if (
      (ancestorStat.mode & GROUP_OR_OTHER_WRITABLE) !== 0 &&
      (ancestorStat.mode & STICKY_BIT) === 0
    ) {
      throw new InsecureDirectoryError(
        realPath,
        `has an ancestor directory ${ancestor} that is writable by group or others (mode ${formatMode(ancestorStat)})`,
      );
    }

    if (dirname(ancestor) === ancestor) {
      // Reached the file system root
      break;
    }
  }

  return { path: realPath, created };
}

function formatMode(stat: Stats): string {
  return `0${(stat.mode & 0o7777).toString(8)}`;
}
