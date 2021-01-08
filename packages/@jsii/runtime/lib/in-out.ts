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

/**
 * An IO provider for jsii API exchanges.
 */
export interface IInputOutput {
  /**
   * Writes a message to the jsii API host.
   * @param message the message to be sent.
   */
  write(message: Output): void;

  /**
   * Wait for a message from the jsii API host, then return it.
   *
   * @returns the received message, or `undefined` if the API host has no more
   *          requests to send.
   */
  read(): Input | undefined;
}

export class InputOutput implements IInputOutput {
  public debug = false;

  public constructor(private readonly stdio: SyncStdio) {}

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
