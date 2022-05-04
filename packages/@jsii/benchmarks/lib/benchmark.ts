import { performance, PerformanceObserver, PerformanceEntry } from 'perf_hooks';

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
  readonly iterations: readonly PerformanceEntry[];
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
  /**
   * How many times to run the subject
   */
  #iterations = 5;

  /**
   * Results of individual runs
   */
  #results: PerformanceEntry[] = [];

  public constructor(private readonly name: string) {}
  #setup: () => C = () => ({} as C);
  #subject: (ctx: C) => void = () => undefined;
  #beforeEach: (ctx: C) => void = () => undefined;
  #afterEach: (ctx: C) => void = () => undefined;
  #teardown: (ctx: C) => void = () => undefined;

  /**
   * Create a setup function to be run once before the benchmark, optionally
   * return a context object to be used across runs and lifecycle functions.
   */
  public setup<T extends C>(fn: () => T) {
    this.#setup = fn;
    return this as unknown as Benchmark<T>;
  }

  /**
   * Create a teardown function to be run once after all benchmark runs. Use to
   * clean up your mess.
   */
  public teardown(fn: (ctx: C) => void) {
    this.#teardown = fn;
    return this;
  }

  /**
   * Create a beforeEach function to be run before each iteration. Use to reset
   * state the subject may have changed.
   */
  public beforeEach(fn: (ctx: C) => void) {
    this.#beforeEach = fn;
    return this;
  }

  /**
   * Create an afterEach function to be run after each iteration. Use to reset
   * state the subject may have changed.
   */
  public afterEach(fn: (ctx: C) => void) {
    this.#afterEach = fn;
    return this;
  }

  /**
   * Setup the subject to be measured.
   */
  public subject(fn: (ctx: C) => void) {
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
   * Run and measure the benchmark
   */
  public async run(): Promise<Result> {
    return new Promise((ok) => {
      const wrapped = performance.timerify(this.#subject);
      const obs = new PerformanceObserver((list, observer) => {
        this.#results = list.getEntries();
        performance.clearMarks();
        observer.disconnect();
        const durations = this.#results.map((i) => i.duration);
        const max = Math.max(...durations);
        const min = Math.min(...durations);
        const variance = max - min;

        return ok({
          name: this.name,
          average:
            durations.reduce((accum, duration) => accum + duration, 0) /
            durations.length,
          max,
          min,
          variance,
          iterations: this.#results,
        });
      });
      obs.observe({ entryTypes: ['function'] });

      const c = this.#setup?.();
      try {
        for (let i = 0; i < this.#iterations; i++) {
          this.#beforeEach(c);
          wrapped(c);
          this.#afterEach(c);
        }
      } finally {
        this.#teardown(c);
      }
    });
  }
}
