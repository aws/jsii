import {
  copyFileSync,
  linkSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  statSync,
  symlinkSync,
} from 'fs';
import * as os from 'os';
import { dirname, isAbsolute, join, relative } from 'path';

/**
 * If `node` is started with `--preserve-symlinks`, the module loaded will
 * preserve symbolic links instead of resolving them, making it possible to
 * symbolically link packages in place instead of fully copying them.
 */
const PRESERVE_SYMLINKS = process.execArgv.includes('--preserve-symlinks');

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
  const realRoot = realpathSync(existingRoot);
  recurse(existingRoot, destinationRoot);

  function recurse(existing: string, destination: string): void {
    // Never follow symbolic links found inside the tree: recreate them as-is
    // instead, so the copy cannot read from (or reach) outside `existingRoot`.
    const stat =
      existing === existingRoot ? statSync(existing) : lstatSync(existing);
    if (stat.isSymbolicLink()) {
      try {
        symlinkSync(readlinkSync(existing), destination);
      } catch (e: any) {
        if (e.code !== 'EPERM') {
          throw e;
        }
        // Not allowed to create symlinks (Windows, non-Admin). Copy the target
        // instead, but only if it resolves inside the tree being linked.
        const target = realpathSync(existing);
        const rel = relative(realRoot, target);
        if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
          throw new Error(
            `Refusing to copy ${existing}, a symbolic link pointing outside of ${existingRoot}`,
          );
        }
        recurse(target, destination);
      }
      return;
    }
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
