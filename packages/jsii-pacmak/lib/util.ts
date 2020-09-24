import { spawn, SpawnOptions } from 'child_process';
import * as fs from 'fs-extra';
import * as spec from '@jsii/spec';
import * as os from 'os';
import * as path from 'path';
import * as logging from './logging';

/**
 * Given an npm package directory and a dependency name, returns the package directory of the dep.
 * @param packageDir     the root of the package declaring the dependency.
 * @param dependencyName the name of the dependency to be resolved.
 * @return the resolved directory path.
 */
export function resolveDependencyDirectory(
  packageDir: string,
  dependencyName: string,
): string {
  const lookupPaths = [path.join(packageDir, 'node_modules')];
  return path.dirname(
    require.resolve(`${dependencyName}/package.json`, { paths: lookupPaths }),
  );
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
    error: unknown,
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
    } catch (error) {
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
 * Spawns a child process with the provided command and arguments. The child
 * process is always spawned using `shell: true`, and the contents of
 * `process.env` is used as the initial value of the `env` spawn option (values
 * provided in `options.env` can override those).
 *
 * @param cmd     the command to shell out to.
 * @param args    the arguments to provide to `cmd`
 * @param options any options to pass to `spawn`
 */
export async function shell(
  cmd: string,
  args: string[],
  { retry: retryOptions, ...options }: ShellOptions = {},
): Promise<string> {
  async function spawn1() {
    logging.debug(cmd, args.join(' '), JSON.stringify(options));
    return new Promise<string>((ok, ko) => {
      const child = spawn(cmd, args, {
        ...options,
        shell: true,
        env: { ...process.env, ...(options.env ?? {}) },
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      const stdout = new Array<Buffer>();
      const stderr = new Array<Buffer>();
      child.stdout.on('data', (chunk) => {
        if (logging.level >= logging.LEVEL_VERBOSE) {
          process.stderr.write(chunk); // notice - we emit all build output to stderr
        }
        stdout.push(Buffer.from(chunk));
      });
      child.stderr.on('data', (chunk) => {
        if (logging.level >= logging.LEVEL_VERBOSE) {
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
        const command = `${cmd} ${args.join(' ')}`;
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
          const message = (error as Error).message ?? error;
          const retryInfo =
            attemptsLeft > 0
              ? `Waiting ${backoffMs} ms before retrying (${attemptsLeft} attempts left)`
              : 'No attempts left';
          logging.info(
            `Command "${cmd} ${args.join(
              ' ',
            )}" failed with ${message}. ${retryInfo}.`,
          );
        }),
    });
  }
  return spawn1();
}

/**
 * Loads the assembly from a given module root directory.
 *
 * @param modulePath the path at which the node module is located.
 *
 * @return the parsed ``Assembly``.
 *
 * @throws if the module does not contain a JSII assembly file, or if it's invalid.
 */
export async function loadAssembly(modulePath: string): Promise<spec.Assembly> {
  const assmPath = path.join(modulePath, spec.SPEC_FILE_NAME);
  if (!(await fs.pathExists(assmPath))) {
    throw new Error(`Could not find ${assmPath}. Was the module built?`);
  }
  return spec.validateAssembly(await fs.readJson(assmPath));
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
      await fs.remove(this.directory);
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
