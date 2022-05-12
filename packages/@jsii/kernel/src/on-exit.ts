import * as fs from 'fs-extra';
import * as process from 'process';

const removeSyncPaths = new Array<string>();

export function removeSync(path: string): void {
  registerIfNeeded();
  removeSyncPaths.push(path);
}

let registered = false;

/**
 * Registers the exist handler if it has not been registered already. This is done exactly ocne per
 * process, so that processes with multiple kernels don't end up creating too many exit handlers, as
 * this reduces the chances they will correctly run.
 */
function registerIfNeeded() {
  if (registered) {
    return;
  }
  process.once('exit', onExitHandler);
  registered = true;

  function onExitHandler() {
    if (removeSyncPaths.length > 0) {
      for (const path of removeSyncPaths) {
        fs.removeSync(path);
      }
    }
  }
}
