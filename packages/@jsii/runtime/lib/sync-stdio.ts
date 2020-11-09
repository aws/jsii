import * as fs from 'fs';

import { sleep } from './sleep';

// When possible (i.e: we are on a UNIX system where `/dev/std{in,out,err}` pseudo-files exist), we
// will re-open those streams in synchronous mode, because `node` might otherwise turn those to
// `O_NONBLOCK` under our feet, causing vast inefficiencies later on (as we must busy-poll around
// `EAGAIN` errors). Notably, Windows does not offer the `/dev/std{in,out,err}` interfaces, so we
// must still be able to handle unexpected non-blocking-ness.
const STDIN_FD = fs.existsSync('/dev/stdin')
  ? fs.openSync(
      '/dev/stdin',
      fs.constants.O_DIRECT | fs.constants.O_RDONLY | fs.constants.O_SYNC,
    )
  : 0;
const STDOUT_FD = fs.existsSync('/dev/stdout')
  ? fs.openSync(
      '/dev/stdout',
      fs.constants.O_APPEND |
        fs.constants.O_DIRECT |
        fs.constants.O_WRONLY |
        fs.constants.O_SYNC,
    )
  : 1;
const STDERR_FD = fs.existsSync('/dev/stderr')
  ? fs.openSync(
      '/dev/stderr',
      fs.constants.O_APPEND |
        fs.constants.O_DIRECT |
        fs.constants.O_WRONLY |
        fs.constants.O_SYNC,
    )
  : 2;

const INPUT_BUFFER_SIZE = 1024 * 1024; // not related to max line length

const EMPTY_BUFFER = Buffer.alloc(0);

export class SyncStdio {
  private bufferedData = EMPTY_BUFFER;

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
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return fs.readSync(fd, buffer, offset, length, position);
    } catch (error) {
      switch (error.code) {
        // HACK: node may set O_NONBLOCK on it's STDIN depending on what kind of input it is made
        // of (see https://github.com/nodejs/help/issues/2663). When STDIN has O_NONBLOCK, calls may
        // result in EAGAIN. In such cases, the call should be retried until it succeeds. This kind
        // of polling will result in horrible CPU thrashing, but there does not seem to be a way to
        // force a O_SYNC access to STDIN in a reliable way within node.
        // In order to make this stop we need to either stop depending on synchronous reads, or to
        // provision our own communication channel that can reliably be synchronous. This work is
        // "tracked" at https://github.com/aws/aws-cdk/issues/5187
        case 'EAGAIN':
          // Keep trying until it no longer says EAGAIN. We'll be waiting a little before retrying
          // in order to avoid thrashing the CPU like there is no tomorrow. This is not entirely
          // ideal, but it has to do.
          sleep(50 /*ms*/);
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
