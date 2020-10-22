import * as fs from 'fs-extra';

import { Kernel } from '../lib';

export async function closeRecording(kernel: Kernel): Promise<void> {
  const logfile: fs.WriteStream = (kernel as any).logfile;
  if (!logfile) {
    return Promise.resolve();
  }

  logfile.end();

  return new Promise((ok) => {
    logfile.once('finish', () => {
      ok();
    });
  });
}

/**
 * Start recording all interaction with the kernel object.
 *
 * This method installs a proxy function for each public API in the kernel (methods that do not
 * start with '_') and records input requests and output requests into JSON stream files.
 *
 * @param kernel The kernel object to record.
 * @param inputLog Input log stream
 * @param outputLog Output log stream.
 */
export function recordInteraction(kernel: Kernel, inputOutputLogPath: string) {
  const logfile = fs.createWriteStream(inputOutputLogPath);
  (kernel as any).logfile = logfile;

  Object.getOwnPropertyNames(Kernel.prototype)
    .filter((p) => !p.startsWith('_'))
    .forEach((api) => {
      const old = Object.getOwnPropertyDescriptor(Kernel.prototype, api)!;

      Object.defineProperty(kernel, api, {
        value(...args: any[]) {
          logInput({ api, ...args[0] });
          try {
            const ret = old.value.apply(this, args);

            // if this is an async function, wait for the promised value.
            if (typeof ret?.then === 'function') {
              return new Promise((ok, fail) => {
                return ret
                  .then((value: any) => {
                    logOutput({ ok: value });
                    ok(value);
                  })
                  .catch((err: any) => {
                    logOutput({ error: err.message });
                    fail(err);
                  });
              });
            }

            logOutput({ ok: ret });
            return ret;
          } catch (e) {
            logOutput({ error: e.message });
            throw e;
          }
        },
      });
    });

  function logInput(obj: any) {
    const inputLine = `${JSON.stringify(obj)}\n`;
    logfile.write(`> ${inputLine}`);
  }

  function logOutput(obj: any) {
    const outputLine = `${JSON.stringify(obj)}\n`;
    logfile.write(`< ${outputLine}`);
  }
}
