import { KernelHost, IInputOutput, Input, Output } from '../lib';

const HOST_STACK_TRACE_SYMBOL = Symbol.for('jsii.context.hostStackTrace');

beforeEach(() => {
  (global as any)[HOST_STACK_TRACE_SYMBOL] = undefined;
});

test('sets host stack trace on global during request processing', () => {
  const trace = [
    ['my_stack.py', 42, 0, 'MyStack.__init__'],
    ['app.py', 12, 0, '<module>'],
  ];

  let capturedTrace: any = 'NOT_SET';

  const inout = new SpyInputOutput(
    [
      {
        api: 'stats',
        '$jsii.stacktrace': trace,
      } as any,
    ],
    () => {
      // By the time we write the response, the trace should have been set
      // during processing. We capture it from the kernel's perspective via
      // a spy on the output.
      capturedTrace = (global as any)[HOST_STACK_TRACE_SYMBOL];
      expect(capturedTrace).toEqual(trace);
    },
  );

  const host = new KernelHost(inout, { noStack: true });
  return new Promise<void>((ok) => {
    host.once('exit', () => {
      // After processing completes, the trace should be cleared
      expect((global as any)[HOST_STACK_TRACE_SYMBOL]).toBeUndefined();
      ok();
    });
    host.run();
  });
});

test('host stack trace is undefined when not provided in request', () => {
  const inout = new SpyInputOutput([{ api: 'stats' }]);

  const host = new KernelHost(inout, { noStack: true });
  return new Promise<void>((ok) => {
    host.once('exit', () => {
      expect((global as any)[HOST_STACK_TRACE_SYMBOL]).toBeUndefined();
      ok();
    });
    host.run();
  });
});

class SpyInputOutput implements IInputOutput {
  private readonly inputCommands: Input[];

  public constructor(
    inputCommands: Input[],
    private readonly onWrite?: (output: Output) => void,
  ) {
    this.inputCommands = [...inputCommands].reverse();
  }

  public read(): Input | undefined {
    return this.inputCommands.pop();
  }

  public write(obj: Output): void {
    this.onWrite?.(obj);
  }
}
