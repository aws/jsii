import * as fs from 'fs';

const INPUT_BUFFER_SIZE = 1_048_576; // 1MiB (aka: 1024 * 1024), not related to max line length

export class SyncStdio {
  private bufferedData = Buffer.alloc(0);

  private readonly stderr: number;
  private readonly stdin: number;
  private readonly stdout: number;

  // A buffer that will be used for all reading operations.
  private readonly readBuffer = Buffer.alloc(INPUT_BUFFER_SIZE);

  public constructor({ errorFD, readFD, writeFD }: SyncStdioOptions) {
    this.stderr = errorFD;
    this.stdin = readFD;
    this.stdout = writeFD;
  }

  public writeErrorLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), this.stderr);
  }

  public writeLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), this.stdout);
  }

  public readLine(): string | undefined {
    while (!this.bufferedData.includes('\n', 0, 'utf-8')) {
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
        // We might get EAGAIN if the file descriptor was not opened for
        // blocking (O_SYNC) writes. In such cases, we'll keep trying until it
        // succeeds. This shouldn't take long as the process on the other side
        // is expected to actively wait for data on those pipes.
        if (e.code !== 'EAGAIN') {
          throw e;
        }
      }
    }
  }
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
}
