import * as fs from 'fs';

const STDIN_FD = 0;
const STDOUT_FD = 1;
const STDERR_FD = 2;
const INPUT_BUFFER_SIZE = 1024 * 1024; // not related to max line length

export class SyncStdio {
  private readonly inputQueue = new Array<string>();
  private currentLine = '';

  public writeErrorLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), STDERR_FD);
  }

  public writeLine(line: string) {
    this.writeBuffer(Buffer.from(`${line}\n`), STDOUT_FD);
  }

  public readLine(): string | undefined {
    if (this.inputQueue.length > 0) {
      return this.inputQueue.shift();
    }

    try {
      const buff = Buffer.alloc(INPUT_BUFFER_SIZE);
      const read = fs.readSync(STDIN_FD, buff, 0, buff.length, null);

      if (read === 0) {
        return undefined;
      }

      const str = buff.slice(0, read).toString();

      for (const ch of str) {
        if (ch === '\n') {
          this.inputQueue.push(this.currentLine);
          this.currentLine = '';
        } else {
          this.currentLine += ch;
        }
      }
    } catch (e) {
      // HACK: node opens STDIN with O_NONBLOCK, meaning attempts to synchrounously read from it may
      // result in EAGAIN. In such cases, the call should be retried until it succeeds. This kind of
      // polling may be terribly inefficient, and the "correct" way to address this is to stop
      // relying on synchronous reads from STDIN. This is however a non-trivial endeavor, and the
      // current state of things is very much broken in node >= 13.2, as can be see in
      // https://github.com/aws/aws-cdk/issues/5187
      if (e.code !== 'EAGAIN') {
        throw e;
      }
    }

    const next = this.inputQueue.shift();
    if (next == null) {
      return this.readLine();
    }

    return next;
  }

  private writeBuffer(buffer: Buffer, fd: number) {
    let offset = 0;
    while (offset < buffer.length) {
      try {
        offset += fs.writeSync(fd, buffer, offset);
      } catch (e) {
        if (e.code !== 'EAGAIN') { throw e; }
      }
    }
  }
}
