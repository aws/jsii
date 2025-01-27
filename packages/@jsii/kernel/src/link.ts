import {
  copyFileSync,
  linkSync,
  mkdirSync,
  readdirSync,
  statSync,
  symlinkSync,
} from 'fs';
import * as os from 'os';
import { dirname, join } from 'path';

/**
 * If `node` is started with `--preserve-symlinks`, the module loaded will
 * preserve symbolic links instead of resolving them, making it possible to
 * symbolically link packages in place instead of fully copying them.
 */
const PRESERVE_SYMLINKS = true;

/**
 * Link existing to destination directory
 *
 * - If Node has been started with a module resolution strategy that does not
 *   resolve symlinks (so peerDependencies can be found), use symlinking.
 *   Symlinking may fail on Windows for non-Admin users.
 * - If not symlinking the entire directory, crawl the directory tree and
 *   hardlink all files (if possible), copying them if not.
 *
 * @param existingRoot    is the original file or directory to link.
 * @param destinationRoot is the new file or directory to create.
 */
export function link(existingRoot: string, destinationRoot: string): void {
  mkdirSync(dirname(destinationRoot), { recursive: true });

  if (PRESERVE_SYMLINKS) {
    try {
      symlinkSync(existingRoot, destinationRoot);
      return;
    } catch (e: any) {
      // On Windows, non-Admin users aren't allowed to create symlinks. In that case, fall back to the copying workflow.
      const winNoSymlink = e.code === 'EPERM' && os.platform() === 'win32';

      if (!winNoSymlink) {
        throw e;
      }
    }
  }
  // Fall back to the slow method
  recurse(existingRoot, destinationRoot);

  function recurse(existing: string, destination: string): void {
    const stat = statSync(existing);
    if (!stat.isDirectory()) {
      try {
        linkSync(existing, destination);
      } catch {
        copyFileSync(existing, destination);
      }
      return;
    }

    mkdirSync(destination, { recursive: true });
    for (const file of readdirSync(existing)) {
      recurse(join(existing, file), join(destination, file));
    }
  }
}
