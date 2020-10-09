import { KernelHost } from '../lib/host';
import { InputOutput, Input, Output } from '../lib/in-out';

const requestCount = 250_000;

class FakeInputOutput extends InputOutput {
  public debug = false;
  private count = 0;

  public write(_: Output) {
    /* noop */
  }

  public read(): Input | undefined {
    if (this.count === requestCount) {
      return undefined;
    }

    ++this.count;
    return { api: 'stats' };
  }
}

test(`runtime host is able to action ${requestCount} requests`, () => {
  const inout = new FakeInputOutput();
  const host = new KernelHost(inout, { debug: false, noStack: false });

  expect(() => host.run()).not.toThrow();
});
