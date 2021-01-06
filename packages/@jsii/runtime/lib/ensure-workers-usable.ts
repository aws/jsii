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
  const [nodeMajor, nodeMinor] = process.versions.node
    .split('.')
    .map((num) => parseInt(num, 10));
  if (nodeMajor < 10 || (nodeMajor === 10 && nodeMinor < 5)) {
    console.error(
      `Unsupported node version: ${process.versions.node}. Node >= 10.5.0 is required.`,
    );
    process.exit(-1);
  }

  // Will throw if non-0 exit is encountered.
  child.execFileSync(
    process.execPath,
    ['--experimental-worker', ...process.execArgv, ...process.argv.slice(1)],
    { stdio: 'inherit' },
  );

  process.exit(0);
}
