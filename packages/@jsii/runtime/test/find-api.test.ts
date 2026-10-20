import { KernelHost, IInputOutput, Input, Output } from '../lib';

test.each(['constructor', 'callbackHandler', 'toString', 'hasOwnProperty'])(
  'rejects non-API kernel member %p',
  async (apiName) => {
    const inout = new SpyInputOutput([{ api: apiName }]);
    const host = new KernelHost(inout, { noStack: true });
    await new Promise<void>((ok) => {
      host.once('exit', () => ok());
      host.run();
    });
    // The error is reported to the host as an error response.
    expect(inout.outputs).toEqual([
      {
        error: `Invalid kernel api call: ${apiName}`,
        name: 'Error',
        stack: undefined,
      },
    ]);
  },
);

test('accepts a kernel API name', async () => {
  const inout = new SpyInputOutput([{ api: 'stats' }]);
  const host = new KernelHost(inout, { noStack: true });
  await new Promise<void>((ok) => {
    host.once('exit', () => ok());
    host.run();
  });
  expect(inout.outputs).toEqual([{ ok: { objectCount: 0 } }]);
});

class SpyInputOutput implements IInputOutput {
  public readonly outputs = new Array<Output>();
  private readonly inputCommands: Input[];

  public constructor(inputCommands: Input[]) {
    this.inputCommands = [...inputCommands].reverse();
  }

  public read(): Input | undefined {
    return this.inputCommands.pop();
  }

  public write(obj: Output): void {
    this.outputs.push(obj);
  }
}
