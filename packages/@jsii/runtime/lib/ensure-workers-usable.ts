/**
 * This module ensures `worker_threads` is present and usable. If that is not
 * the case, it will verify we are running `node >= 10`, then proceed to launch
 * another instance of the current program, with the "--experimental-worker"
 * node option set (which will make `worker_threads` available).
 *
 * This should be imported very early in the program (as all initialization that
 * happened before then may have to be re-done in the child process).
 */

import * as child from 'child_process';
import * as os from 'os';
import * as process from 'process';

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('worker_threads');
} catch {
  // If we cannot find `worker_threads`, we must restart with the
  // --experimental-worker node option. Since node does not offer a process
  // replacing flavor of exec/spawn, we have to start a second subprocess,
  // inheriting STDIO, then forward the exit code, etc...

  // But first, ensure we have a node version that is actually recent enough to
  // be supported. The `process.versions.node` value is "Major.Minor.Patch".
  const nodeMajor = parseInt(process.versions.node.split('.')[0], 10);
  if (nodeMajor < 10) {
    console.error(
      `Unsupported node version: ${process.versions.node}. Node >= 10.3.0 is required.`,
    );
    process.exit(-1);
  }

  const result = child.spawnSync(
    process.execPath,
    ['--experimental-worker', ...process.execArgv, ...process.argv.slice(1)],
    { shell: false, stdio: 'inherit' },
  );

  if (result.error) {
    throw result.error;
  } else if (result.signal != null) {
    // Convention is that a process killed by signal exits with 128+signal
    process.exit(os.constants.signals[result.signal as NodeJS.Signals] + 128);
  } else {
    process.exit(result.status ?? -1);
  }
}
