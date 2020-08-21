import * as fs from 'fs';

const STDIN_FD = 0;
const STDOUT_FD = 1;
const STDERR_FD = 2;
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
      try {
        const read = fs.readSync(STDIN_FD, buff, 0, buff.length, null);

        if (read === 0) {
          return undefined;
        }

        const newData = buff.slice(0, read);
        this.bufferedData = Buffer.concat([this.bufferedData, newData]);
      } catch (e) {
        // HACK: node may set O_NONBLOCK on it's STDIN depending on what kind of input it is made
        // of (see https://github.com/nodejs/help/issues/2663). When STDIN has O_NONBLOCK, calls may
        // result in EAGAIN. In such cases, the call should be retried until it succeeds. This kind
        // of polling will result in horrible CPU thrashing, but there does not seem to be a way to
        // force a O_SYNC access to STDIN in a reliable way within node.
        // In order to make this stop we need to either stop depending on synchronous reads, or to
        // provision our own communication channel that can reliably be synchronous. This work is
        // "tracked" at https://github.com/aws/aws-cdk/issues/5187
        if (e.code !== 'EAGAIN') {
          throw e;
        }
      }
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
