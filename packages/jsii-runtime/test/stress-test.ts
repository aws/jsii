import { InputOutput, Input, Output } from '../lib/in-out';
import { KernelHost } from '../lib/host';

const requestCount = 250000;

class FakeInputOutput extends InputOutput {
  public debug = false;
  private count = 0;

  public write(_: Output) { /* noop */ }

  public read(): Input | undefined {
    if(this.count === requestCount) {
      return undefined;
    }

    ++this.count;
    return { api: 'stats' };
  }
}

const inout = new FakeInputOutput();
const host = new KernelHost(inout, { debug: false, noStack: false });
host.run();

console.info('jsii-runtime stress test succeeded');
