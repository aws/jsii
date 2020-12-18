import * as fs from 'fs';

import { SyncReader } from './sync-reader';

// Note: the `process.std{in,out,err}.fd` is not part of the `@types/node` declarations, because
// those cannot model how those fields are guaranteed to be absent within the context of worker
// threads. The should be present here, but since we must resort to `as any`, we take the extra
// precaution of defaulting if those values are not present.

const STDIN_FD: number = (process.stdin as any).fd ?? 0;
const STDOUT_FD: number = (process.stdout as any).fd ?? 1;
const STDERR_FD: number = (process.stderr as any).fd ?? 2;

export class SyncStdio {
  private readonly buffer: Buffer;
  private readonly stdin: SyncReader;

  private bufferedData = Buffer.alloc(0);

  public constructor(
    stdin: number = STDIN_FD,
    bufferSize = process.stdin.readableHighWaterMark,
  ) {
    this.stdin = new SyncReader(stdin, bufferSize);
    this.buffer = Buffer.alloc(bufferSize);
  }

  public writeErrorLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), STDERR_FD);
  }

  public writeLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), STDOUT_FD);
  }

  public readLine(): string | undefined {
    while (!this.bufferedData.includes('\n', 0, 'utf-8')) {
      const read = this.stdin.readSync(this.buffer, 0, this.buffer.length);

      if (read === 0) {
        return undefined;
      }

      const newData = this.buffer.slice(0, read);
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
        // We'll retry immediately, and possibly thrash the CPU until the buffer was drained. We
        // do not currently have a better way around.
      }
    }
  }
}
