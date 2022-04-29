import * as mt from 'microtime';

interface IterationResult {
  elapsed: number;
}

interface Result {
  name: string;
  average: number;
  iterations: IterationResult[];
}

export class Benchmark<C = undefined> {
  private readonly _iterations = 5;
  private readonly results: IterationResult[] = [];

  public constructor(
    private readonly name: string,
    private readonly subject: (ctx?: C) => any,
  ) {
  }

  private _beforeAll: () => void = () => undefined;
  private _beforeEach: () => void = () => undefined;
  private _afterAll: () => void = () => undefined;
  private _afterEach: () => void = () => undefined;

  public beforeAll(fn: () => any) {
    this._beforeAll = fn;
  }

  public beforeEach(fn: () => any) {
    this._beforeEach = fn;
  }

  public afterAll(fn: () => any) {
    this._afterAll = fn;
  }

  public afterEach(fn: () => any) {
    this._afterEach = fn;
  }

  public run(): Result {
    this._beforeAll();

    for (let i = 0; i < this._iterations; i++) {
      this._beforeEach();
      const start = mt.now();
      this.subject();
      const end = mt.now();
      this._afterEach();

      this.results.push({
        elapsed: end - start,
      });
    }

    this._afterAll();

    return {
      name: this.name,
      average: (
        this.results.reduce((accum, { elapsed }) => accum + elapsed, 0) /
        this.results.length
      ),
      iterations: this.results,
    };
  }
}
