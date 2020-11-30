import * as fs from 'fs';

import { sleep } from './sleep';

// Note: the `process.std{in,out,err}.fd` is not part of the `@types/node` declarations, because
// those cannot model how those fields are guaranteed to be absent within the context of worker
// threads. The should be present here, but since we must resort to `as any`, we take the extra
// precaution of defaulting if those values are not present.

const STDIN_FD: number = (process.stdin as any).fd ?? 0;
const STDOUT_FD: number = (process.stdout as any).fd ?? 1;
const STDERR_FD: number = (process.stderr as any).fd ?? 2;

const INPUT_BUFFER_SIZE = 1_048_576; // 1MiB (aka: 1024 * 1024), not related to max line length

export class SyncStdio {
  private bufferedData = Buffer.alloc(0);

  public writeErrorLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), STDERR_FD);
  }

  public writeLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), STDOUT_FD);
  }

  public readLine(): string | undefined {
    const buff = Buffer.alloc(INPUT_BUFFER_SIZE);
    while (!this.bufferedData.includes('\n', 0, 'utf-8')) {
      const read = readSync(STDIN_FD, buff, 0, buff.length);

      if (read === 0) {
        return undefined;
      }

      const newData = buff.slice(0, read);
      this.bufferedData = Buffer.concat([this.bufferedData, newData]);
    }

    const newLinePos = this.bufferedData.indexOf('\n', 0, 'utf-8');
    const next = this.bufferedData.slice(0, newLinePos).toString('utf-8');
    this.bufferedData = this.bufferedData.slice(newLinePos + 1);

    return next;
  }

  private writeBuffer(buffer: Buffer, fd: number) {
    let offset = 0;
    while (offset < buffer.length) {
      try {
        offset += fs.writeSync(fd, buffer, offset);
      } catch (e) {
        if (e.code !== 'EAGAIN') {
          throw e;
        }
        // Sleep 50 milliseconds or until the stream has drained
        sleep(50 /*ms*/, new Promise((ok) => process.stdout.once('drain', ok)));
      }
    }
  }
}

/**
 * A patched up implementation of `fs.readSync` that works around the quirks associated with
 * synchronous I/O involving `STDIN`, `STDOUT` and `STDERR` on NodeJS, where this is all expected
 * to be asynchronous and hence has some "interesting" behavior in certain particular cases.
 *
 * @param fd        the file descriptor to read from (typically 0 / STDIN)
 * @param buffer    the buffer in which to place the read data
 * @param offset    the offset in the buffer at which to place the read data
 * @param length    the number of bytes to be read
 * @param position  where to begin reading from the file (defaults to the current read location)
 *
 * @returns the amount of bytes read, or `0` if EOF has been reached.
 */
function readSync(
  fd: number,
  buffer: Buffer,
  offset: number,
  length: number,
  position: number | null = null,
): number {
  // We are using a `while (true)` here to avoid recursively re-entering the function, in order to
  // avoid thrashing memory with stack frames, when we are more likely to face `EAGAIN` on systems
  // with low resources (near memory limit and/or high load).
  //
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return fs.readSync(fd, buffer, offset, length, position);
    } catch (error) {
      switch (error.code) {
        // HACK: node may set O_NONBLOCK on it's STDIN depending on what kind of input it is made
        // of (see https://github.com/nodejs/help/issues/2663). When STDIN has O_NONBLOCK, calls may
        // result in EAGAIN. In such cases, the call should be retried until it succeeds. This kind
        // of polling could result in horrible CPU thrashing: while we can sleep between two
        // attempts, sleeping too much would slow everything to a crawl, and not enough would cause
        // significant wasting of CPU cycles.
        case 'EAGAIN':
          // Keep trying until it no longer says EAGAIN. We'll be waiting a little before retrying
          // in order to avoid thrashing the CPU like there is no tomorrow. Waits 50 milliseconds or
          // until the stream notifies it became readable again.
          sleep(
            50 /*ms*/,
            new Promise((ok) => process.stdin.once('readable', ok)),
          );
          break;

        // HACK: in Windows, when STDIN (aka FD#0) is wired to a socket (as is the case when started
        // as a subprocess with piped IO), `fs.readSync` will throw "Error: EOF: end of file, read"
        // instead of returning 0 (which is what the documentation suggests it would do). This is
        // currently believed to be a bug in `node`: https://github.com/nodejs/node/issues/35997
        case 'EOF':
          return 0;

        default:
          throw error;
      }
    }
  }
}
