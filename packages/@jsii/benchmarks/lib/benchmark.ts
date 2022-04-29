import * as mt from 'microtime';

interface IterationResult {
  elapsed: number;
}

interface Result {
  name: string;
  average: number;
  iterations: IterationResult[];
}

export class Benchmark<C> {
  private readonly _iterations = 5;
  private readonly _results: IterationResult[] = [];

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

  public run(): Result {
    const c = this._setup?.();
    for (let i = 0; i < this._iterations; i++) {
      this._beforeEach(c);
      const start = mt.nowDouble();
      this._subject(c);
      const end = mt.nowDouble();
      this._afterEach(c);

      this._results.push({
        elapsed: end - start,
      });
    }

    this._teardown(c);

    return {
      name: this.name,
      average:
        this._results.reduce((accum, { elapsed }) => accum + elapsed, 0) /
        this._results.length,
      iterations: this._results,
    };
  }
}
