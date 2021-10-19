import * as path from 'path';

import { WorkerPool } from '../lib/worker-pool';

let workerModule: typeof import('worker_threads') | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  workerModule = require('worker_threads');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
}

(workerModule ? describe : describe.skip)('worker pool tests', () => {
  let pool: WorkerPool;
  beforeEach(() => {
    pool = new WorkerPool(workerModule!, 2, path.join(__dirname, 'test-worker.js'));
  });

  afterEach(() => {
    pool.cleanup();
  });

  test('roundtrip a couple of items', async () => {
    const input = range(10).map((value) => ({ value }));
    const responses = await pool.process(input);
    expect(responses).toEqual(input);
  });

  test('roundtrip many items', async () => {
    const input = range(1000).map((value) => ({ value }));
    const responses = await pool.process(input);
    expect(responses).toEqual(input);
  });

  test('throw an error', async () => {
    const input = range(100).map((value) => ({ value }));
    (input[3] as any).doThrow = 'this was an injected error';
    const responses = pool.process(input);
    await expect(responses).rejects.toThrow(/injected error/);
  });
});

function range(n: number): number[] {
  const ret = new Array<number>();
  for (let i = 0; i < n; i++) {
    ret.push(i);
  }
  return ret;
}
