import { spawn, SpawnOptions } from 'child_process';
import * as fs from 'fs-extra';
import * as spec from '@jsii/spec';
import * as os from 'os';
import * as path from 'path';
import * as logging from './logging';

export interface ShellOptions extends SpawnOptions {
  /**
   * Retry execution up to 3 times if it fails
   *
   * @default false
   */
  retry?: boolean;
}

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

export async function shell(
  cmd: string,
  args: string[],
  options: ShellOptions = {},
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/require-await
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
              prefix(out, '#STDOUT> '),
              prefix(err, '#STDERR> '),
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
  /* eslint-enable @typescript-eslint/require-await */

  let attempts = options.retry ? 3 : 1;
  while (attempts > 0) {
    attempts--;
    try {
      return spawn1();
    } catch (e) {
      if (attempts === 0) {
        throw e;
      }
      logging.info(`${e.message} (retrying)`);
    }
  }
  throw new Error('No attempts left'); // This is, in fact, unreachable code.
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
