import { createHash } from 'crypto';
import { openSync, readSync, closeSync } from 'fs';

const ALGORITHM = 'sha256';

export function digestFile(
  path: string,
  ...comments: readonly string[]
): Buffer {
  const hash = createHash(ALGORITHM);

  const buffer = Buffer.alloc(16_384);
  const fd = openSync(path, 'r');
  try {
    let bytesRead = 0;
    while ((bytesRead = readSync(fd, buffer)) > 0) {
      hash.update(buffer.slice(0, bytesRead));
    }
    for (const comment of comments) {
      hash.update('\0');
      hash.update(comment);
    }
    return hash.digest();
  } finally {
    closeSync(fd);
  }
}
