import { performance, PerformanceObserver, PerformanceEntry } from 'perf_hooks';

/**
 * Result of a benchmark run
 */
interface Result {
  /**
   * The name of the benchmark
   */
  name: string;

  /**
   * The average length across all iterations
   */
  average: number;

  /**
   * Results of individual runs
   */
  iterations: PerformanceEntry[];
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
  private _iterations = 5;

  /**
   * Results of individual runs
   */
  private results: PerformanceEntry[] = [];

  public constructor(private readonly name: string) {}
  private _setup: () => C = () => ({} as C);
  private _subject: (ctx: C) => void = () => undefined;
  private _beforeEach: (ctx: C) => void = () => undefined;
  private _afterEach: (ctx: C) => void = () => undefined;
  private _teardown: (ctx: C) => void = () => undefined;

  /**
   * Create a setup function to be run once before the benchmark, optionally
   * return a context object to be used across runs and lifecycle functions.
   */
  public setup<T extends C>(fn: () => T) {
    this._setup = fn;
    return this as unknown as Benchmark<T>;
  }

  /**
   * Create a teardown function to be run once after all benchmark runs. Use to
   * clean up your mess.
   */
  public teardown(fn: (ctx: C) => any) {
    this._teardown = fn;
    return this;
  }

  /**
   * Create a beforeEach function to be run before each iteration. Use to reset
   * state the subject may have changed.
   */
  public beforeEach(fn: (ctx: C) => any) {
    this._beforeEach = fn;
    return this;
  }

  /**
   * Create an afterEach function to be run after each iteration. Use to reset
   * state the subject may have changed.
   */
  public afterEach(fn: (ctx: C) => any) {
    this._afterEach = fn;
    return this;
  }

  /**
   * Setup the subject to be measured.
   */
  public subject(fn: (ctx: C) => void) {
    this._subject = fn;
    return this;
  }

  /**
   * Set the number of iterations to be run.
   */
  public iterations(i: number) {
    this._iterations = i;
    return this;
  }

  /**
   * Run and measure the benchmark
   */
  public async run(): Promise<Result> {
    return new Promise((ok) => {
      const wrapped = performance.timerify(this._subject);
      const obs = new PerformanceObserver((list, observer) => {
        this.results = list.getEntries();
        performance.clearMarks();
        observer.disconnect();

        return ok({
          name: this.name,
          average:
            this.results.reduce((accum, { duration }) => accum + duration, 0) /
            this.results.length,
          iterations: this.results,
        });
      });
      obs.observe({ entryTypes: ['function'] });

      const c = this._setup?.();
      for (let i = 0; i < this._iterations; i++) {
        this._beforeEach(c);
        wrapped(c);
        this._afterEach(c);
      }

      this._teardown(c);
    });
  }
}
