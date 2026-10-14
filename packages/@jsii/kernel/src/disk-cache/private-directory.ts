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
 * Creates `path` and any missing parents with mode `0700`. Existing
 * directories are left untouched.
 *
 * @returns the real path, and whether `path` itself was created.
 */
export function createPrivateDirectory(path: string): {
  readonly path: string;
  readonly created: boolean;
} {
  const created = mkdirSync(path, { recursive: true, mode: 0o700 }) != null;
  return { path: realpathSync(path), created };
}

/**
 * Verifies (best effort) that other users cannot modify the existing directory
 * at `realPath`. Needed even after {@link createPrivateDirectory}, as the
 * directory or its parents may already have existed.
 *
 * On POSIX, `realPath` must be a directory owned by the current user and not
 * writable by group or others. Every parent must be owned by the current user
 * or root, and not writable by group or others unless sticky (like `/tmp`).
 * ACLs are not considered. Windows is not checked.
 *
 * @param realPath a path without symbolic links, which callers must keep using.
 *
 * @throws InsecureDirectoryError if other users may modify the directory.
 */
export function verifyExistingDirectoryIsPrivate(realPath: string): void {
  const uid = process.getuid?.();
  if (uid == null) {
    // Windows does not have POSIX ownership or permission bits.
    return;
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

  for (let parent = dirname(realPath); ; parent = dirname(parent)) {
    const parentStat = lstatSync(parent);
    if (parentStat.isSymbolicLink()) {
      // `realPath` has no symbolic links, so the path was changed concurrently.
      throw new InsecureDirectoryError(
        realPath,
        `has a parent directory ${parent} that was replaced with a symbolic link`,
      );
    }
    if (parentStat.uid !== uid && parentStat.uid !== 0) {
      throw new InsecureDirectoryError(
        realPath,
        `has a parent directory ${parent} that is owned by uid ${parentStat.uid}, which is neither the current user (uid ${uid}) nor root`,
      );
    }
    if (
      (parentStat.mode & GROUP_OR_OTHER_WRITABLE) !== 0 &&
      (parentStat.mode & STICKY_BIT) === 0
    ) {
      throw new InsecureDirectoryError(
        realPath,
        `has a parent directory ${parent} that is writable by group or others (mode ${formatMode(parentStat)})`,
      );
    }

    if (dirname(parent) === parent) {
      // Reached the file system root
      break;
    }
  }
}

function formatMode(stat: Stats): string {
  return `0${(stat.mode & 0o7777).toString(8)}`;
}
