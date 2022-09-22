import * as fs from 'fs-extra';

import { RuntimeError, JsiiErrorType, JsiiFault, Kernel } from './kernel';

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

  Object.entries(Object.getOwnPropertyDescriptors(Kernel.prototype))
    .filter(([p, v]) => !p.startsWith('_') && typeof v.value === 'function')
    .forEach(([api, old]) => {
      Object.defineProperty(kernel, api, {
        ...old,
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
                    logOutput({ error: err.message, name: err.name });
                    fail(err);
                  });
              });
            }

            logOutput({ ok: ret });
            return ret;
          } catch (e: any) {
            logOutput({ error: e.message, name: e.name });
            if (e.type === JsiiErrorType.RUNTIME_ERROR) {
              throw new RuntimeError(e.message);
            }
            throw new JsiiFault(e.message);
          }
        },
      });
    });

  function logInput(obj: any) {
    logfile.write(`> ${JSON.stringify(obj)}\n`);
  }

  function logOutput(obj: any) {
    logfile.write(`< ${JSON.stringify(obj)}\n`);
  }
}
