import * as cp from 'child_process';
import { IncomingMessage } from 'http';
import * as https from 'https';
import { Readable } from 'stream';
import { extract } from 'tar';

/**
 * @param num a quantity of minutes (could be fractional)
 *
 * @return equivalent number of milliseconds
 */
export function minutes(num: number): number {
  return num * 1000 * 60;
}

/**
 * Used to track and clean up processes if tests fail or timeout
 */
export class ProcessManager {
  private readonly processes: {
    [pid: string]: {
      proc: cp.ChildProcess;
      promise: Promise<void>;
    };
  } = {};

  /**
   * kill all still running processes
   *
   * @param signal sent to terminate process
   */
  public async killAll(signal: NodeJS.Signals = 'SIGTERM') {
    const values = Object.values(this.processes);
    await Promise.all(
      values.map(({ proc, promise }) => async () => {
        proc.kill(signal);
        await promise;
        this.remove(proc);
      }),
    );
  }

  private add(proc: cp.ChildProcess, promise: Promise<void>) {
    this.processes[proc.pid] = { proc, promise };
  }

  private remove(proc: cp.ChildProcess) {
    delete this.processes[proc.pid];
  }

  /**
   * spawn new child process
   *
   * @param shell command being called
   * @param arguments passed to command
   * @param options passed to child process spawn
   */
  public async spawn(
    cmd: string,
    args: string[],
    opts: any = {},
  ): Promise<void> {
    const proc = cp.spawn(cmd, args, { stdio: 'inherit', ...opts });
    const cmdString = `${cmd} ${args.join(' ')}`;
    process.stdout.write(`Running command: ${cmdString}\n`);

    const promise = new Promise<void>((ok, ko) => {
      proc.once('exit', (code) => {
        const message = `child process exited with code: ${code}\n`;
        if (code === 0) {
          process.stdout.write(message);
          ok();
        } else {
          process.stderr.write(`Command failed: ${cmdString}\n`);
          process.stderr.write(message);
          ko(new Error(message));
        }

        this.remove(proc);
      });

      proc.once('error', (error) => {
        process.stderr.write(`Command failed: ${cmdString}\n`);
        process.stderr.write(
          `Process ${proc.pid} error: ${error.message} - ${error.stack}`,
        );
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        ko();
      });
    });

    this.add(proc, promise);
    return promise;
  }
}

/**
 * write downloaded asset to file
 *
 * @param source stream
 * @param destination directory for extracted files
 */
export async function extractFileStream(source: Readable, destination: string) {
  return new Promise((ok, ko) => {
    const destStream = extract({ cwd: destination });
    destStream.once('close', ok);
    destStream.once('error', ko);
    source.once('error', ko);

    source.pipe(destStream);
  });
}

/**
 * Wrap http calls to download release asset in a promise. Github responds with
 * a 302 sometimes which is required to be handled. Returns the buffer to be
 * streamed to destination fs stream.
 *
 * @param url of downloadable asset
 *
 * @returns readable stream of asset data
 */
export async function downloadReleaseAsset(url: string): Promise<Readable> {
  return new Promise((ok, ko) => {
    const config = {
      headers: {
        'User-Agent': '@jsii/integ-test',
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    };

    https.get(url, config, (response: IncomingMessage) => {
      if (response.statusCode === 302) {
        if (!response.headers.location) {
          throw new Error('Bad redirect, no location header found');
        }

        return https.get(response.headers.location, config, ok);
      } else if (
        response.statusCode &&
        (response.statusCode < 200 || response.statusCode > 300)
      ) {
        return ko(new Error(`Status Code: ${response.statusCode}`));
      }

      return ok(response);
    });
  });
}
