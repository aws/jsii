import {
  copyFileSync,
  linkSync,
  mkdirSync,
  readdirSync,
  statSync,
  symlinkSync,
} from 'fs';
import { dirname, join } from 'path';

/**
 * If `node` is started with `--preserve-symlinks`, the module loaded will
 * preserve symbolic links instead of resolving them, making it possible to
 * symbolically link packages in place instead of fully copying them.
 */
const PRESERVE_SYMLINKS = process.execArgv.includes('--preserve-symlinks');

/**
 * Creates directories containing hard links if possible, and falls back on
 * copy otherwise.
 *
 * @param existing    is the original file or directory to link.
 * @param destination is the new file or directory to create.
 */
export function link(existing: string, destination: string): void {
  if (PRESERVE_SYMLINKS) {
    mkdirSync(dirname(destination), { recursive: true });
    symlinkSync(existing, destination);
    return;
  }

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
    link(join(existing, file), join(destination, file));
  }
}
