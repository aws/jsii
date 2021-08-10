import { spawn } from 'child_process';
import { error } from 'console';
import { constants as os } from 'os';
import { resolve } from 'path';
import { execArgv, execPath, exit, on, stdin, stdout } from 'process';
import { Duplex } from 'stream';

import '@jsii/node-check';

// Spawn another node process, with the following file descriptor setup:
// - No STDIN will be provided
// - STDOUT and STDERR will be intercepted, contents wrapped & forward to STDERR
// - FD#3 is the communication pipe to read jsii API messages
// - FD#4 is the communication pipe to write jsii API responses
const child = spawn(
  execPath,
  [...execArgv, resolve(__dirname, '..', 'lib', 'program.js')],
  { stdio: ['ignore', 'pipe', 'pipe', 'pipe'] },
);

//#region Exit, error and signal forwarders

child.once('end', (code, signal) => {
  if (signal != null) {
    // Child was killed by signal, this is usually reflected by exiting with
    // 128 + <signal code>
    exit(128 + (os.signals[signal as keyof typeof os.signals] ?? 0));
  }
  // Child exited, so we reflect it's exit code to our creator
  exit(code);
});

child.once('error', (err) => {
  console.error('Failed to spawn child process:', err.stack);
  exit(-1);
});

for (const signal of Object.keys(os.signals)) {
  // Those signals cannot be trapped (libuv would throw EINVAL).
  if (signal === 'SIGKILL' || signal === 'SIGSTOP') {
    continue;
  }

  // Forward all signals to the child
  on(signal, (sig) => child.kill(sig));
}

//#endregion

//#region STDOUT and STDERR handlers

/**
 * Creates chunk handlers for the child process' STDOUT and STDERR, which will
 * forward any data received through to this process' STDERR after having base64
 * encoded the data and wrapped it in a simple JSON blob denoting which stream
 * the data is for.
 *
 * @param tag the name of the stream (stdout or stderr) that received the data
 *
 * @returns a new handler for the `Readable.on('data', handler)` event.
 */
function makeHandler(
  tag: 'stdout' | 'stderr',
): (chunk: string | Buffer) => void {
  return (chunk) => {
    const buffer = Buffer.from(chunk);
    error(JSON.stringify({ [tag]: buffer.toString('base64') }));
  };
}

child.stdout.on('data', makeHandler('stdout'));
child.stderr.on('data', makeHandler('stderr'));

//#endregion

//#region Piping jsii API requests & responses

const commands: Duplex = (child.stdio as any)[3];
// Forwarding requests from this process' STDIN to the child's FD#3
stdin.pipe(commands);
// Forwarding responses from the child's FD#3 to this process' STDOUT
commands.pipe(stdout);

//#endregion
