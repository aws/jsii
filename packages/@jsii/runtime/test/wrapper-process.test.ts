import * as child from 'child_process';
import * as path from 'path';

const WRAPPER = path.resolve(__dirname, '..', 'bin', 'jsii-runtime.js');

// Signals are not delivered like this on Windows.
const posixTest = process.platform === 'win32' ? test.skip : test;

test('propagates the exit code of the kernel process', async () => {
  const proc = spawnWrapper();
  await waitForHello(proc);
  proc.stdin!.write('{"exit":3}\n');

  await expect(exitOf(proc)).resolves.toEqual({ code: 3, signal: null });
});

test('forwards responses written just before the kernel process exits', async () => {
  const proc = spawnWrapper();
  await waitForHello(proc);
  let stdout = '';
  proc.stdout!.on('data', (chunk) => (stdout += chunk.toString('utf-8')));
  proc.stdin!.write('{"api":"stats"}\n{"exit":0}\n');

  await expect(exitOf(proc)).resolves.toEqual({ code: 0, signal: null });
  expect(stdout).toBe('{"ok":{"objectCount":0}}\n');
});

posixTest('exits after forwarding SIGTERM to the kernel process', async () => {
  const proc = spawnWrapper();
  await waitForHello(proc);
  proc.kill('SIGTERM');

  // The kernel process dies from SIGTERM, which is reflected as 128 + 15
  await expect(exitOf(proc)).resolves.toEqual({ code: 143, signal: null });
});

posixTest('does not trap signals it does not forward', async () => {
  const proc = spawnWrapper();
  await waitForHello(proc);
  proc.kill('SIGUSR2');

  // Default disposition of SIGUSR2 is to terminate the process
  await expect(exitOf(proc)).resolves.toEqual({
    code: null,
    signal: 'SIGUSR2',
  });
});

function spawnWrapper(): child.ChildProcess {
  const proc = child.spawn(process.execPath, [WRAPPER], {
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  proc.stderr.resume();
  // Make sure we never leave a dangling process behind.
  const timer = setTimeout(() => proc.kill('SIGKILL'), 15_000);
  proc.once('exit', () => clearTimeout(timer));
  return proc;
}

async function waitForHello(proc: child.ChildProcess): Promise<void> {
  return new Promise((ok, ko) => {
    proc.stdout!.once('data', (chunk: Buffer) => {
      const line = chunk.toString('utf-8');
      if (line.startsWith('{"hello":')) {
        ok();
      } else {
        ko(new Error(`Unexpected first output: ${line}`));
      }
    });
  });
}

async function exitOf(
  proc: child.ChildProcess,
): Promise<{ code: number | null; signal: NodeJS.Signals | null }> {
  return new Promise((ok) =>
    proc.once('exit', (code, signal) => ok({ code, signal })),
  );
}
