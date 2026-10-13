import '@jsii/check-node/run';

import { spawn } from 'child_process';
import { error } from 'console';
import { constants as os } from 'os';
import { resolve } from 'path';
import { type Duplex, finished, type Readable } from 'stream';

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

const commands: Duplex = (child.stdio as any)[3];
// The FD#3 pipe can fail (e.g: EPIPE when the child goes away while a request
// is being forwarded). Without a listener, this would crash this process with
// an unhandled 'error' event, instead of letting the child's exit status be
// propagated by the 'exit' handler.
commands.on('error', (err) => {
  console.error('Error on jsii API channel to child process:', err.stack);
});

//#region Exit, error and signal forwarders

/** The first terminating signal this process received, if any. */
let receivedSignal: NodeJS.Signals | undefined;

child.once('exit', (code, signal) => {
  const exitSignal = signal ?? receivedSignal;
  const exitCode =
    exitSignal != null
      ? // Child was killed by signal (or exited because we asked it to), this
        // is usually reflected by exiting with 128 + <signal code>
        128 + (os.signals[exitSignal] ?? 0)
      : // Child exited, so we reflect it's exit code to our creator
        (code ?? 0);

  // Forward whatever the child wrote before exiting, then exit ourselves.
  void Promise.all(
    [child.stdout!, child.stderr!, commands].map(readableFinished),
  ).then(() => flushAndExit(exitCode));
});

child.once('error', (err) => {
  console.error('Failed to spawn child process:', err.stack);
  process.exit(-1);
});

// Only forward the signals that ask a process to terminate. Other signals are
// either about this process' own state (e.g: SIGSEGV, SIGBUS, SIGPIPE, SIGCHLD)
// or are not meant to be relayed, and trapping them would prevent their default
// behavior from applying to this process.
const FORWARDED_SIGNALS: readonly NodeJS.Signals[] = [
  'SIGINT',
  'SIGTERM',
  'SIGHUP',
  'SIGQUIT',
];
for (const signal of FORWARDED_SIGNALS) {
  try {
    process.on(signal, (sig) => {
      receivedSignal ??= sig;
      child.kill(sig);
      // The child installs handlers for these signals (via `signal-exit`), and
      // spends its idle time blocked in a synchronous read of FD#3, during
      // which those handlers cannot run. Closing our end of FD#3 unblocks it,
      // so it can terminate.
      process.stdin.unpipe(commands);
      commands.end();
    });
  } catch {
    // Some signals cannot be trapped on some platforms (e.g: Windows), in
    // which case libuv throws EINVAL. Nothing to forward then.
  }
}

/**
 * Resolves once the readable side of `stream` has ended, closed or errored.
 */
async function readableFinished(stream: Readable): Promise<void> {
  return new Promise((ok) => finished(stream, { writable: false }, () => ok()));
}

/**
 * Waits for pending writes to this process' STDOUT and STDERR to be flushed,
 * then exits with the provided code.
 */
function flushAndExit(code: number): void {
  let pending = 2;
  const done = () => {
    if (--pending === 0) {
      process.exit(code);
    }
  };
  process.stdout.write('', done);
  process.stderr.write('', done);
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

// Forwarding requests from this process' STDIN to the child's FD#3
process.stdin.pipe(commands);
// Forwarding responses from the child's FD#3 to this process' STDOUT
commands.pipe(process.stdout);

//#endregion
