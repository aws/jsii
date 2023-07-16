import { Profiler, Session } from 'inspector';
import { performance, PerformanceObserver, PerformanceEntry } from 'perf_hooks';

/**
 * Result of a single run of the subject
 */
interface Iteration {
  /**
   * The result of perf_hooks measurement
   */
  performance: PerformanceEntry;

  /**
   * The cpu profile, undefined unless profiling is enabled.
   */
  profile?: Profiler.Profile;
}

/**
 * Result of a benchmark run
 */
interface Result {
  /**
   * The name of the benchmark
   */
  readonly name: string;

  /**
   * The average duration across all iterations
   */
  readonly average: number;

  /**
   * Maximum duration across all iteraions
   */
  readonly max: number;

  /**
   * Minimum duration across all iterations
   */
  readonly min: number;

  /**
   * max - min
   */
  readonly variance: number;

  /**
   * Results of individual runs
   */
  readonly iterations: readonly Iteration[];
}

/**
 * A simple benchmark for measuring synchronous functions. Uses the `perf_hooks`
 * module to measure how long a subject takes to execute and averages the result
 * over all runs. Runs `setup`, `beforeEach`, `afterEach`, and `teardown`
 * lifecycle hooks before, between, and after runs. These functions, and the
 * subject function, have access to an optionally defined `context` object that
 * can be returned from the `setup` function. This allows referencing shared
 * state across benchmark runs and lifecycle hooks to do things like setup,
 * teardown, stubbing, etc.
 */
export class Benchmark<C> {
  #iterations = 20;
  #profile = false;

  public constructor(private readonly name: string) {}
  #setup: () => C | Promise<C> = () => ({}) as C;
  #subject: (ctx: C) => void | Promise<void> = () => undefined;
  #beforeEach: (ctx: C) => void | Promise<void> = () => undefined;
  #afterEach: (ctx: C) => void | Promise<void> = () => undefined;
  #teardown: (ctx: C) => void | Promise<void> = () => undefined;

  /**
   * Create a setup function to be run once before the benchmark, optionally
   * return a context object to be used across runs and lifecycle functions.
   */
  public setup<T extends C>(fn: () => T | Promise<T>) {
    this.#setup = fn;
    return this as unknown as Benchmark<T>;
  }

  /**
   * Create a teardown function to be run once after all benchmark runs. Use to
   * clean up your mess.
   */
  public teardown(fn: (ctx: C) => any) {
    this.#teardown = fn;
    return this;
  }

  /**
   * Create a beforeEach function to be run before each iteration. Use to reset
   * state the subject may have changed.
   */
  public beforeEach(fn: (ctx: C) => any) {
    this.#beforeEach = fn;
    return this;
  }

  /**
   * Create an afterEach function to be run after each iteration. Use to reset
   * state the subject may have changed.
   */
  public afterEach(fn: (ctx: C) => any) {
    this.#afterEach = fn;
    return this;
  }

  /**
   * Setup the subject to be measured.
   */
  public subject(fn: (ctx: C) => void | Promise<void>) {
    this.#subject = fn;
    return this;
  }

  /**
   * Set the number of iterations to be run.
   */
  public iterations(i: number) {
    this.#iterations = i;
    return this;
  }

  /**
   * Enable the profiler to collect CPU and Memory usage.
   */
  public profile() {
    this.#profile = true;
    return this;
  }

  private async startProfiler(): Promise<Session> {
    const session = new Session();
    session.connect();

    return new Promise((ok) => {
      session.post('Profiler.enable', () => {
        session.post('Profiler.start', () => {
          ok(session);
        });
      });
    });
  }

  private async killProfiler(
    s?: Session,
  ): Promise<Profiler.Profile | undefined> {
    return new Promise((ok, ko) => {
      if (!s) {
        return ok(undefined);
      }

      s.post('Profiler.stop', (err, { profile }) => {
        if (err) {
          return ko(err);
        }

        return ok(profile);
      });
    });
  }

  private async makeObserver(): Promise<PerformanceEntry> {
    return new Promise((ok) => {
      const obs = new PerformanceObserver((list, observer) => {
        ok(list.getEntries()[0]);
        performance.clearMarks();
        observer.disconnect();
      });
      obs.observe({ entryTypes: ['function'] });
    });
  }

  private async *runIterations(ctx: C) {
    let i = 0;
    let profiler;
    const wrapped = performance.timerify(this.#subject);

    /* eslint-disable no-await-in-loop */
    while (i < this.#iterations) {
      const observer = this.makeObserver();
      await this.#beforeEach(ctx);
      if (this.#profile) {
        profiler = await this.startProfiler();
      }
      let profile: Profiler.Profile | undefined;
      let perf: PerformanceEntry;
      try {
        await wrapped(ctx);
        profile = await this.killProfiler(profiler);
        perf = await observer;
      } finally {
        await this.#afterEach(ctx);
      }

      i++;
      yield { profile, performance: perf };
    }
    /* eslint-enable no-await-in-loop */
  }

  /**
   * Run and measure the benchmark
   */
  public async run(): Promise<Result> {
    const iterations: Iteration[] = [];
    const c = await this.#setup?.();

    const durations = new Array<number>();
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    let sum = 0;
    let average = 0;

    let id = 0;
    const padding = this.#iterations.toString().length;
    for await (const result of this.runIterations(c)) {
      id += 1;
      const duration = result.performance.duration;
      durations.push(duration);
      if (min > duration) {
        min = duration;
      }
      if (max < duration) {
        max = duration;
      }
      sum += duration;
      average = sum / id;

      const idStr = id.toString().padStart(padding, ' ');
      const durStr = duration.toFixed(0);
      const eta = new Date(Date.now() + average * (this.#iterations - id));
      const pct = (100 * id) / this.#iterations;

      this.log(
        `Iteration ${idStr}/${this.#iterations} (${pct.toFixed(
          0,
        )}%) | Duration: ${durStr}ms | ETA ${eta.toISOString()}`,
      );
      iterations.push(result);
    }

    await this.#teardown(c);

    // Variance is the average of the squared differences from the mean
    const variance =
      durations
        .map((duration) => Math.pow(duration - average, 2))
        .reduce((accum, squareDev) => accum + squareDev) / durations.length;

    // Standard deviation is the square root of variance
    const stdDev = Math.sqrt(variance);

    this.log(`Completed: ${average.toFixed(0)}±${stdDev.toFixed(0)}ms`);

    return {
      name: this.name,
      average,
      max,
      min,
      variance,
      iterations,
    };
  }

  private log(message: string) {
    console.log(`${new Date().toISOString()} | ${this.name} | ${message}`);
  }
}
