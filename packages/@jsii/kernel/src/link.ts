import { copyFileSync, linkSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Creates directories containing hard links if possible, and falls back on
 * copy otherwise.
 *
 * @param existing    is the original file or directory to link.
 * @param destination is the new file or directory to create.
 */
export function link(existing: string, destination: string): void {
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
