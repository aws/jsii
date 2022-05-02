import { performance, PerformanceObserver, PerformanceEntry } from 'perf_hooks';

interface Result {
  name: string;
  average: number;
  iterations: PerformanceEntry[];
}

export class Benchmark<C> {
  private readonly _iterations = 5;
  private _results: PerformanceEntry[] = [];

  public constructor(private readonly name: string) {}

  private _setup: () => C = () => ({} as C);
  private _subject: (ctx: C) => void = () => undefined;
  private _beforeEach: (ctx: C) => void = () => undefined;
  private _teardown: (ctx: C) => void = () => undefined;
  private _afterEach: (ctx: C) => void = () => undefined;

  public setup<T extends C>(fn: () => T) {
    this._setup = fn;
    return this as unknown as Benchmark<T>;
  }

  public teardown(fn: (ctx: C) => any) {
    this._teardown = fn;
    return this;
  }

  public beforeEach(fn: (ctx: C) => any) {
    this._beforeEach = fn;
    return this;
  }

  public afterEach(fn: (ctx: C) => any) {
    this._afterEach = fn;
    return this;
  }

  public subject(fn: (ctx: C) => void) {
    this._subject = fn;
    return this;
  }

  public async run(): Promise<Result> {
    return new Promise((ok) => {
      const wrapped = performance.timerify(this._subject);
      const obs = new PerformanceObserver((list, observer) => {
        this._results = list.getEntries();
        performance.clearMarks();
        observer.disconnect();

        return ok({
          name: this.name,
          average:
            this._results.reduce((accum, { duration }) => accum + duration, 0) /
            this._results.length,
          iterations: this._results,
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
