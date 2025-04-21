import '@jsii/check-node/run';

import { spawn } from 'child_process';
import { error } from 'console';
import { constants as os } from 'os';
import { resolve } from 'path';
import { Duplex } from 'stream';

// Spawn another node process, with the following file descriptor setup:
// - No STDIN will be provided
// - STDOUT and STDERR will be intercepted, contents wrapped & forward to STDERR
// - FD#3 is the communication pipe to read & write jsii API messages
const child = spawn(
  process.execPath,
  [
    ...process.execArgv,
    // Instruct the module loader to NOT resolve symbolic links, so we don't
    // have to copy modules around all the time (which is expensive to do).
    '--preserve-symlinks',
    resolve(__dirname, '..', 'lib', 'program.js'),
  ],
  { stdio: ['ignore', 'pipe', 'pipe', 'pipe'] },
);

//#region Exit, error and signal forwarders

child.once('end', (code, signal) => {
  if (signal != null) {
    // Child was killed by signal, this is usually reflected by exiting with
    // 128 + <signal code>
    process.exit(128 + (os.signals[signal as keyof typeof os.signals] ?? 0));
  }
  // Child exited, so we reflect it's exit code to our creator
  process.exit(code);
});

child.once('error', (err) => {
  console.error('Failed to spawn child process:', err.stack);
  process.exit(-1);
});

for (const signal of Object.keys(os.signals)) {
  // Those signals cannot be trapped (libuv would throw EINVAL).
  if (signal === 'SIGKILL' || signal === 'SIGSTOP') {
    continue;
  }

  // Forward all signals to the child
  process.on(signal as NodeJS.Signals, (sig) => child.kill(sig));
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
    // Use the chunk directly if it's already a Buffer, otherwise create a Buffer from it
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    error(JSON.stringify({ [tag]: buffer.toString('base64') }));
  };
}

child.stdout!.on('data', makeHandler('stdout'));
child.stderr!.on('data', makeHandler('stderr'));

//#endregion

//#region Piping jsii API requests & responses

const commands: Duplex = (child.stdio as any)[3];
// Forwarding requests from this process' STDIN to the child's FD#3
process.stdin.pipe(commands);
// Forwarding responses from the child's FD#3 to this process' STDOUT
commands.pipe(process.stdout);

//#endregion
