import { ChildProcessByStdio, spawn, SpawnOptions } from 'child_process';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import { Readable } from 'stream';

import * as logging from './logging';

/**
 * Find the directory that contains a given dependency, identified by its 'package.json', from a starting search directory
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export async function findDependencyDirectory(
  dependencyName: string,
  searchStart: string,
) {
  // Explicitly do not use 'require("dep/package.json")' because that will fail if the
  // package does not export that particular file.
  const entryPoint = require.resolve(dependencyName, {
    paths: [searchStart],
  });

  // Search up from the given directory, looking for a package.json that matches
  // the dependency name (so we don't accidentally find stray 'package.jsons').
  const depPkgJsonPath = await findPackageJsonUp(
    dependencyName,
    path.dirname(entryPoint),
  );

  if (!depPkgJsonPath) {
    throw new Error(
      `Could not find dependency '${dependencyName}' from '${searchStart}'`,
    );
  }

  return depPkgJsonPath;
}

/**
 * Whether the given dependency is a built-in
 *
 * Some dependencies that occur in `package.json` are also built-ins in modern Node
 * versions (most egregious example: 'punycode'). Detect those and filter them out.
 */
export function isBuiltinModule(depName: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  const { builtinModules } = require('module');
  return (builtinModules ?? []).includes(depName);
}

/**
 * Find the package.json for a given package upwards from the given directory
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export async function findPackageJsonUp(
  packageName: string,
  directory: string,
) {
  return findUp(directory, async (dir) => {
    const pjFile = path.join(dir, 'package.json');
    return (
      (await fs.pathExists(pjFile)) &&
      (await fs.readJson(pjFile)).name === packageName
    );
  });
}

/**
 * Find a directory up the tree from a starting directory matching a condition
 *
 * Will return `undefined` if no directory matches
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export async function findUp(
  directory: string,
  pred: (dir: string) => Promise<boolean>,
): Promise<string | undefined> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    if (await pred(directory)) {
      return directory;
    }

    const parent = path.dirname(directory);
    if (parent === directory) {
      return undefined;
    }
    directory = parent;
  }
}

export interface RetryOptions {
  /**
   * The maximum amount of attempts to make.
   *
   * @default 5
   */
  maxAttempts?: number;

  /**
   * The amount of time (in milliseconds) to wait after the first failed attempt.
   *
   * @default 150
   */
  backoffBaseMilliseconds?: number;

  /**
   * The multiplier to apply after each failed attempts. If the backoff before
   * the previous attempt was `B`, the next backoff is computed as
   * `B * backoffMultiplier`, creating an exponential series.
   *
   * @default 2
   */
  backoffMultiplier?: number;

  /**
   * An optionnal callback that gets invoked when an attempt failed. This can be
   * used to give the user indications of what is happening.
   *
   * This callback must not throw.
   *
   * @param error               the error that just occurred
   * @param attemptsLeft        the number of attempts left
   * @param backoffMilliseconds the amount of milliseconds of back-off that will
   *                            be awaited before making the next attempt (if
   *                            there are attempts left)
   */
  onFailedAttempt?: (
    error: Error,
    attemptsLeft: number,
    backoffMilliseconds: number,
  ) => void;
}

export class AllAttemptsFailed<R> extends Error {
  public constructor(
    public readonly callback: () => Promise<R>,
    public readonly errors: readonly Error[],
  ) {
    super(
      `All attempts failed. Last error: ${errors[errors.length - 1].message}`,
    );
  }
}

/**
 * Adds back-off and retry logic around the provided callback.
 *
 * @param cb   the callback which is to be retried.
 * @param opts the backoff-and-retry configuration
 *
 * @returns the result of `cb`
 */
export async function retry<R>(
  cb: () => Promise<R>,
  opts: RetryOptions = {},
  waiter: (ms: number) => Promise<void> = wait,
): Promise<R> {
  let attemptsLeft = opts.maxAttempts ?? 5;
  let backoffMs = opts.backoffBaseMilliseconds ?? 150;
  const backoffMult = opts.backoffMultiplier ?? 2;

  // Check for incorrect usage
  if (attemptsLeft <= 0) {
    throw new Error('maxTries must be > 0');
  }
  if (backoffMs <= 0) {
    throw new Error('backoffBaseMilliseconds must be > 0');
  }
  if (backoffMult <= 1) {
    throw new Error('backoffMultiplier must be > 1');
  }

  const errors = new Array<Error>();
  while (attemptsLeft > 0) {
    attemptsLeft--;
    try {
      // eslint-disable-next-line no-await-in-loop
      return await cb();
    } catch (error: any) {
      errors.push(error);
      if (opts.onFailedAttempt != null) {
        opts.onFailedAttempt(error, attemptsLeft, backoffMs);
      }
    }
    if (attemptsLeft > 0) {
      // eslint-disable-next-line no-await-in-loop
      await waiter(backoffMs).then(() => (backoffMs *= backoffMult));
    }
  }
  return Promise.reject(new AllAttemptsFailed(cb, errors));
}

export interface ShellOptions extends Omit<SpawnOptions, 'shell' | 'stdio'> {
  /**
   * Configure in-line retries if the execution fails.
   *
   * @default - no retries
   */
  readonly retry?: RetryOptions;
}

/**
 * Spawns a shell with the provided commandline.
 *
 * The child process is always spawned using `shell: true`, and the contents of
 * `process.env` is used as the initial value of the `env` spawn option (values
 * provided in `options.env` can override those).
 */
export async function shell(
  commandLine: string,
  options?: ShellOptions,
): Promise<string> {
  return handleSubprocess(options, () => {
    logging.debug(commandLine, JSON.stringify(options));
    return {
      command: commandLine,
      child: spawn(commandLine, {
        ...options,
        shell: true,
        env: { ...process.env, ...(options?.env ?? {}) },
        stdio: ['ignore', 'pipe', 'pipe'],
      }),
    };
  });
}

/**
 * Spawns a subprocess with the provided command and arguments.
 *
 * The child process is always spawned using `shell: false`, and the contents of
 * `process.env` is used as the initial value of the `env` spawn option (values
 * provided in `options.env` can override those).
 *
 * To make this work on Windows, if the binary happens to resolve to a batch file
 * we run it through cmd.exe.
 *
 * @param binary     the command to shell out to.
 * @param args    the arguments to provide to `cmd`
 * @param options any options to pass to `spawn`
 */
export async function subprocess(
  binary: string,
  args: string[],
  options?: ShellOptions,
): Promise<string> {
  if (os.platform() === 'win32') {
    const resolved = resolveBinaryWindows(binary);
    // Anything that's not an executable, run it through cmd.exe
    if (!resolved.toLocaleLowerCase().endsWith('.exe')) {
      binary = process.env.COMSPEC ?? 'cmd.exe';
      args = ['/d', '/c', resolved, ...args];
    }
  }

  return handleSubprocess(options, () => {
    logging.debug(binary, args.join(' '), JSON.stringify(options ?? {}));
    return {
      command: `${binary} ${args.join(' ')}`.trim(),
      child: spawn(binary, args, {
        ...options,
        env: { ...process.env, ...(options?.env ?? {}) },
        stdio: ['ignore', 'pipe', 'pipe'],
      }),
    };
  });
}

async function handleSubprocess(
  { retry: retryOptions }: ShellOptions = {},
  doSpawn: () => {
    command: string;
    child: ChildProcessByStdio<null, Readable, Readable>;
  },
): Promise<string> {
  async function spawn1() {
    return new Promise<string>((ok, ko) => {
      const { command, child } = doSpawn();
      const stdout = new Array<Buffer>();
      const stderr = new Array<Buffer>();
      child.stdout.on('data', (chunk) => {
        if (logging.level.valueOf() >= logging.LEVEL_SILLY) {
          process.stderr.write(chunk); // notice - we emit all build output to stderr
        }
        stdout.push(Buffer.from(chunk));
      });
      child.stderr.on('data', (chunk) => {
        if (logging.level.valueOf() >= logging.LEVEL_SILLY) {
          process.stderr.write(chunk);
        }
        stderr.push(Buffer.from(chunk));
      });
      child.once('error', ko);

      // Must use CLOSE instead of EXIT; EXIT may fire while there is still data in the
      // I/O pipes, which we will miss if we return at that point.
      child.once('close', (code, signal) => {
        const out = Buffer.concat(stdout).toString('utf-8');
        if (code === 0) {
          return ok(out);
        }
        const err = Buffer.concat(stderr).toString('utf-8');
        const reason = signal != null ? `signal ${signal}` : `status ${code}`;
        return ko(
          new Error(
            [
              `Command (${command}) failed with ${reason}:`,
              // STDERR first, the erro message could be truncated in logs.
              prefix(err, '#STDERR> '),
              prefix(out, '#STDOUT> '),
            ].join('\n'),
          ),
        );

        function prefix(text: string, add: string): string {
          return text
            .split('\n')
            .map((line) => `${add}${line}`)
            .join('\n');
        }
      });
    });
  }

  if (retryOptions != null) {
    return retry(spawn1, {
      ...retryOptions,
      onFailedAttempt:
        retryOptions.onFailedAttempt ??
        ((error, attemptsLeft, backoffMs) => {
          const message = error.message ?? error;
          const retryInfo =
            attemptsLeft > 0
              ? `Waiting ${backoffMs} ms before retrying (${attemptsLeft} attempts left)`
              : 'No attempts left';
          logging.info(`${message}. ${retryInfo}.`);
        }),
    });
  }

  return spawn1();
}

/**
 * Resolve a command to an executable on Windows
 */
function resolveBinaryWindows(command: string): string {
  const extensions = (
    process.env.PATHEXT ?? '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH'
  ).split(';');

  const dirs = [
    process.cwd(),
    ...(process.env.PATH?.split(path.delimiter) ?? []),
  ];

  for (const dir of dirs) {
    for (const ext of ['', ...extensions]) {
      const candidate = path.resolve(dir, `${command}${ext}`);
      if (fs.pathExistsSync(candidate)) {
        return candidate;
      }
    }
  }

  throw new Error(
    `Unable to resolve command: ${command} in ${process.env.PATH}`,
  );
}

/**
 * Strip filesystem unsafe characters from a string
 */
export function slugify(x: string) {
  return x.replace(/[^a-zA-Z0-9_-]/g, '_');
}

/**
 * Class that makes a temporary directory and holds on to an operation object
 */
export class Scratch<A> {
  public static async make<A>(
    factory: (dir: string) => Promise<A>,
  ): Promise<Scratch<A>>;
  public static async make<A>(factory: (dir: string) => A): Promise<Scratch<A>>;
  public static async make<A>(factory: (dir: string) => A | Promise<A>) {
    const tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), 'npm-pack'));
    return new Scratch(tmpdir, await factory(tmpdir), false);
  }

  public static fake<A>(directory: string, object: A) {
    return new Scratch(directory, object, true);
  }

  public static async cleanupAll<A>(tempDirs: Array<Scratch<A>>) {
    await Promise.all(tempDirs.map((t) => t.cleanup()));
  }

  private constructor(
    public readonly directory: string,
    public readonly object: A,
    private readonly fake: boolean,
  ) {}

  public async cleanup() {
    if (!this.fake) {
      try {
        await fs.remove(this.directory);
      } catch (e: any) {
        if (e.code === 'EBUSY') {
          // This occasionally happens on Windows if we try to clean up too
          // quickly after we're done... Could be because some AV software is
          // still running in the background.
          // Wait 1s and retry once!
          await new Promise((ok) => setTimeout(ok, 1_000));
          try {
            await fs.remove(this.directory);
          } catch (e2: any) {
            logging.warn(`Unable to clean up ${this.directory}: ${e2}`);
          }
          return;
        }
        logging.warn(`Unable to clean up ${this.directory}: ${e}`);
      }
    }
  }
}

export function setExtend<A>(xs: Set<A>, els: Iterable<A>) {
  for (const el of els) {
    xs.add(el);
  }
}

export async function filterAsync<A>(
  xs: A[],
  pred: (x: A) => Promise<boolean>,
): Promise<A[]> {
  const mapped = await Promise.all(
    xs.map(async (x) => ({ x, pred: await pred(x) })),
  );
  return mapped.filter(({ pred }) => pred).map(({ x }) => x);
}

export async function wait(ms: number): Promise<void> {
  return new Promise((ok) => setTimeout(ok, ms));
}

export function flatten<A>(xs: readonly A[][]): A[] {
  return Array.prototype.concat.call([], ...xs);
}

export function zip<A, B>(xs: A[], ys: B[]): Array<[A, B]> {
  const ret = new Array<[A, B]>();
  for (let i = 0; i < xs.length; i++) {
    ret.push([xs[i], ys[i]]);
  }
  return ret;
}

export function setAdd<T>(setA: Set<T>, setB: Iterable<T>) {
  for (const b of setB) {
    setA.add(b);
  }
}
