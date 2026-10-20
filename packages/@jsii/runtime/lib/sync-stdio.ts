import * as fs from 'fs';

const INPUT_BUFFER_SIZE = 1_048_576; // 1MiB (aka: 1024 * 1024), not related to max line length

/**
 * The default maximum length (in bytes) of a single jsii API message. This is
 * well beyond any legitimate request, and only exists so that a stream that
 * never sends a line terminator fails with a clear error instead of exhausting
 * memory.
 */
const DEFAULT_MAX_LINE_LENGTH = 268_435_456; // 256MiB

const MIN_EAGAIN_BACKOFF_MS = 1;
const MAX_EAGAIN_BACKOFF_MS = 10;

const NEWLINE = 0x0a; // '\n'

// Used to block the thread in `sleepSync`. Nothing ever notifies on it.
const SLEEP_ARRAY = new Int32Array(new SharedArrayBuffer(4));

export class SyncStdio {
  private bufferedData = Buffer.alloc(0);

  private readonly stderr: number;
  private readonly stdin: number;
  private readonly stdout: number;
  private readonly maxLineLength: number;

  // A buffer that will be used for all reading operations.
  private readonly readBuffer = Buffer.alloc(INPUT_BUFFER_SIZE);

  public constructor({
    errorFD,
    readFD,
    writeFD,
    maxLineLength = DEFAULT_MAX_LINE_LENGTH,
  }: SyncStdioOptions) {
    this.stderr = errorFD;
    this.stdin = readFD;
    this.stdout = writeFD;
    this.maxLineLength = maxLineLength;
  }

  public writeErrorLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), this.stderr);
  }

  public writeLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), this.stdout);
  }

  public readLine(): string | undefined {
    // Only scan data that has not been scanned yet for a newline.
    let scanFrom = 0;
    let newLinePos: number;
    while ((newLinePos = this.bufferedData.indexOf(NEWLINE, scanFrom)) < 0) {
      if (this.bufferedData.length > this.maxLineLength) {
        throw new Error(
          `Received a jsii API message longer than ${this.maxLineLength} bytes without a line terminator`,
        );
      }
      scanFrom = this.bufferedData.length;

      const read = fs.readSync(
        this.stdin,
        this.readBuffer,
        0,
        this.readBuffer.length,
        null,
      );

      if (read === 0) {
        return undefined;
      }

      const newData = this.readBuffer.slice(0, read);
      this.bufferedData = Buffer.concat([this.bufferedData, newData]);
    }

    if (newLinePos > this.maxLineLength) {
      throw new Error(
        `Received a jsii API message longer than ${this.maxLineLength} bytes`,
      );
    }

    const next = this.bufferedData.slice(0, newLinePos).toString('utf-8');
    this.bufferedData = this.bufferedData.slice(newLinePos + 1);

    return next;
  }

  private writeBuffer(buffer: Buffer, fd: number) {
    let offset = 0;
    let backoffMs = 0;
    while (offset < buffer.length) {
      try {
        offset += fs.writeSync(fd, buffer, offset);
        backoffMs = 0;
      } catch (e: any) {
        // We might get EAGAIN if the file descriptor was not opened for
        // blocking (O_SYNC) writes. In such cases, we'll keep trying until it
        // succeeds. This shouldn't take long as the process on the other side
        // is expected to actively wait for data on those pipes. We back off
        // exponentially between attempts so we don't spin the CPU if the other
        // side is slow to read.
        if (e.code !== 'EAGAIN') {
          throw e;
        }
        backoffMs = Math.min(
          Math.max(backoffMs * 2, MIN_EAGAIN_BACKOFF_MS),
          MAX_EAGAIN_BACKOFF_MS,
        );
        sleepSync(backoffMs);
      }
    }
  }
}

/**
 * Blocks the current thread for the specified duration.
 */
function sleepSync(ms: number): void {
  Atomics.wait(SLEEP_ARRAY, 0, 0, ms);
}

export interface SyncStdioOptions {
  /**
   * The file descriptor from which data is to be read. This MUST be opened for
   * blocking (O_SYNC) reading.
   */
  readonly readFD: number;

  /**
   * The file descriptor to which data is to be written. This SHOULD be opened
   * for blocking (O_SYNC) writing.
   */
  readonly writeFD: number;

  /**
   * The file descriptor to which errors data is to be written. This SHOULD be
   * opened for blocking (O_SYNC) writing.
   */
  readonly errorFD: number;

  /**
   * The maximum length (in bytes) of a line read from `readFD`. Reading a
   * longer line throws an error.
   *
   * @default 256MiB
   */
  readonly maxLineLength?: number;
}
