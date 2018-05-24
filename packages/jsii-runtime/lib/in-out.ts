import { SyncStdio } from './sync-stdio'
import { api } from 'jsii-kernel'

export type Output = 
    { hello: string } |
    { ok: api.KernelResponse } | 
    { callback: api.Callback } |
    { pending: true } |
    { error: string, stack?: string };

export type Input = 
    { api: string } & api.KernelRequest |
    { complete: api.CompleteRequest };

export class InputOutput {
    debug = false

    private readonly stdio = new SyncStdio();

    write(obj: Output) {
        const output = JSON.stringify(obj);
        this.stdio.writeLine(output);

        if (this.debug) {
            this.stdio.writeErrorLine('< ' + output);
        }
    }
    
    read(): Input | undefined {
        let reqLine = this.stdio.readLine();
        if (!reqLine) {
            return undefined;
        }
    
        // skip recorded responses
        if (reqLine.indexOf('< ') === 0) {
            return this.read();
        }
    
        // stip "> " from recorded requests
        if (reqLine.indexOf('> ') === 0) {
            reqLine = reqLine.substr(2);
        }
    
        const input = JSON.parse(reqLine);

        if (this.debug) {
            this.stdio.writeErrorLine('> ' + JSON.stringify(input));
        }

        return input;
    }
}