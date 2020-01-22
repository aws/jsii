import * as cp from 'child_process';
import * as https from 'https';
import * as path from 'path';
import { PathLike, promises as fs } from 'fs';

export const minutes = (num: number) => num * 1000 * 60

/**
 * rmdirRecursive
 *
 * recursive directory removal for cleanup after build test. Node10 fs module
 * doesn't support the `recursive` option
 */
export const rmdirRecursive = async (dir: PathLike) => {
  const contents = await fs.readdir(dir);
  await Promise.all(contents.map(async (file) => {
    const currentPath = path.join(dir.toString(), file);
    if ((await fs.lstat(currentPath)).isDirectory()) {
      await rmdirRecursive(currentPath);
    } else {
      await fs.unlink(currentPath);
    }
  }));

  await fs.rmdir(dir);
};

/*
 * ProcessManager
 *
 * Used to track and clean up processes if tests fail or timeout
 */
export class ProcessManager {
  processes: {
    [pid: string]: {
      proc: cp.ChildProcess,
      promise: Promise<void>
    }
  };

  constructor() {
    this.processes = {};
  }

  async killAll() {
    const values = Object.values(this.processes);
    values.forEach(procObj => procObj.proc.kill());
    await Promise.all(values.map(proc => proc.promise));
    this.processes = {};
  }

  private add(proc: cp.ChildProcess, promise: Promise<void>) {
    const { pid } = proc;
    this.processes[pid] = { proc, promise };
  }

  private remove(proc: cp.ChildProcess) {
    delete this.processes[proc.pid];
  }

  spawn(cmd: string, args: string[], opts: any) {
    const proc = cp.spawn(cmd, args, opts);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);

    const promise: Promise<void> = new Promise((resolve, reject) => {
      proc.on('exit', code => {
        const message = `child process exited with code: ${code}`;
        if (code !== 0) {
          process.stderr.write(message);
          reject(new Error(message));
        } else {
          process.stdout.write(message);
          resolve();
        }

        this.remove(proc);
      });

      proc.on('error', error => {
        process.stderr.write(`Process ${proc.pid} error: ${error}`);
      });
    });

    this.add(proc, promise);
    return promise;
  }
}

/**
 * downloadReleaseAsset
 *
 * Wrap http calls to download release asset in a promise. Github responds with
 * a 302 sometimes which is required to be handled. Returns the buffer to be
 * streamed to destination fs stream.
 */
export const downloadReleaseAsset = (url: string): Promise<any> => new Promise((resolve, reject) => {
  const config = {
    headers: {
      'User-Agent': 'aws-cdk',
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/json'
    }
  };

  https.get(url, config, response => {
    if (response.statusCode! < 200 && response.statusCode !== 302) {
      reject(new Error(`Status Code: ${response.statusCode}`));
    }
    if (response.statusCode === 302 && response.headers.location) {
      return https.get(response.headers.location, config, response => {
        return resolve(response);
      });
    }

    return resolve(response);
  });
});
