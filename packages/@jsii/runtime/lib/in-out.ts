import { api } from '@jsii/kernel';

import { SyncStdio } from './sync-stdio';

export type Output =
  | { hello: string }
  | { ok: api.KernelResponse }
  | { callback: api.Callback }
  | { pending: true }
  | { error: string; stack?: string };

export type Input =
  | ({ api: string } & api.KernelRequest)
  | { complete: api.CompleteRequest };

export interface IInputOutput {
  read(): Input | undefined;
  write(obj: Output): void;
}

export class InputOutput implements IInputOutput {
  public debug = false;

  public constructor(private readonly stdio = new SyncStdio()) {}

  public write(obj: Output) {
    const output = JSON.stringify(obj);
    this.stdio.writeLine(output);

    if (this.debug) {
      this.stdio.writeErrorLine(`< ${output}`);
    }
  }

  public read(): Input | undefined {
    let reqLine = this.stdio.readLine();
    if (!reqLine) {
      return undefined;
    }

    // skip recorded responses
    if (reqLine.startsWith('< ')) {
      return this.read();
    }

    // stip "> " from recorded requests
    if (reqLine.startsWith('> ')) {
      reqLine = reqLine.substr(2);
    }

    const input = JSON.parse(reqLine);

    if (this.debug) {
      this.stdio.writeErrorLine(`> ${JSON.stringify(input)}`);
    }

    return input;
  }
}
