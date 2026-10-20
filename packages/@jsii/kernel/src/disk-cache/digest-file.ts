import { createHash, Hash } from 'crypto';
import { closeSync, openSync, readSync } from 'fs';

const ALGORITHM = 'sha256';
const BUFFER_SIZE = 16_384;

/**
 * Computes the digest used to key the cache entry for a file.
 */
export function digestFile(
  path: string,
  ...comments: readonly string[]
): Buffer {
  return readFileChunks(path, () => undefined, ...comments);
}

/**
 * Reads the file at `path` exactly once, passing each chunk to `onChunk`, and
 * returns the digest of the content that was read (as computed by
 * {@link digestFile}).
 *
 * Because the digest is computed from the same bytes that are passed to
 * `onChunk`, the result can be used to verify that the processed content
 * matches a previously computed digest, even if the file was modified in the
 * meantime.
 */
export function readFileChunks(
  path: string,
  onChunk: (chunk: Buffer) => void,
  ...comments: readonly string[]
): Buffer {
  const hash = createHash(ALGORITHM);

  const fd = openSync(path, 'r');
  try {
    let bytesRead = 0;
    do {
      // A new buffer per chunk, as `onChunk` may retain it.
      const buffer = Buffer.alloc(BUFFER_SIZE);
      bytesRead = readSync(fd, buffer);
      if (bytesRead > 0) {
        const chunk = buffer.subarray(0, bytesRead);
        hash.update(chunk);
        onChunk(chunk);
      }
    } while (bytesRead > 0);
  } finally {
    closeSync(fd);
  }
  return finish(hash, comments);
}

function finish(hash: Hash, comments: readonly string[]): Buffer {
  for (const comment of comments) {
    hash.update('\0');
    hash.update(comment);
  }
  return hash.digest();
}
