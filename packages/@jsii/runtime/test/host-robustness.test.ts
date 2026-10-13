import { api } from '@jsii/kernel';

import { IInputOutput, Input, InputOutput, KernelHost, Output } from '../lib';
import { loadRequest } from './_load-request';
import { SyncStdio } from '../lib/sync-stdio';

const OBJREF = {
  [api.TOKEN_REF]: 'Object@10000',
  [api.TOKEN_INTERFACES]: ['@scope/jsii-calc-base-of-base.IVeryBaseInterface'],
};

/** Loads an assembly, creates an object with an overridden method, then invokes it. */
const START_CALLBACK: Input[] = [
  { api: 'load', ...loadRequest('@scope/jsii-calc-base-of-base') },
  {
    api: 'create',
    fqn: 'Object',
    interfaces: ['@scope/jsii-calc-base-of-base.IVeryBaseInterface'],
    overrides: [{ method: 'foo' }],
  },
  { api: 'invoke', objref: OBJREF, method: 'foo' },
];
const START_CALLBACK_OUTPUTS = [
  {
    ok: expect.objectContaining({ assembly: '@scope/jsii-calc-base-of-base' }),
  },
  { ok: OBJREF },
  { callback: expect.objectContaining({ cbid: 'jsii::callback::20000' }) },
];
const CBID = 'jsii::callback::20000';

describe('malformed requests are reported as errors', () => {
  test.each([
    ['a number', 42],
    ['a string', 'hello'],
    ['a boolean', false],
    ['null', null],
    ['an array', [{ api: 'stats' }]],
  ])('non-object request (%s)', async (_, req) => {
    const outputs = await runHost([req as any, { api: 'stats' }]);

    expect(outputs).toEqual([
      expect.objectContaining({
        error: expect.stringContaining(
          'Malformed request, expected a JSON object',
        ),
        name: '@jsii/kernel.Fault',
      }),
      { ok: { objectCount: 0 } },
    ]);
  });

  test.each([
    ['missing api', { method: 'foo' }, 'Malformed request, "api" field'],
    ['unknown api', { api: 'doesNotExist' }, 'Invalid kernel api call'],
    ['unexpected callback', { callback: {} }, 'Unexpected `callback` result'],
  ])('%s', async (_, req, message) => {
    const outputs = await runHost([req as any, { api: 'stats' }]);

    expect(outputs).toEqual([
      expect.objectContaining({ error: expect.stringContaining(message) }),
      { ok: { objectCount: 0 } },
    ]);
  });

  test('during a callback, malformed requests do not interrupt the callback', async () => {
    const outputs = await runHost([
      ...START_CALLBACK,
      42 as any,
      { complete: null } as any,
      { complete: { cbid: CBID } },
    ]);

    expect(outputs).toEqual([
      ...START_CALLBACK_OUTPUTS,
      expect.objectContaining({
        error: expect.stringContaining('expected a JSON object'),
      }),
      expect.objectContaining({
        error: expect.stringContaining('"api" field is required'),
      }),
      { ok: { result: undefined } },
    ]);
  });

  test('completing a different callback fails the pending callback', async () => {
    const outputs = await runHost([
      ...START_CALLBACK,
      { complete: { cbid: 'jsii::callback::99999', result: 'nope' } },
      { api: 'stats' },
    ]);

    expect(outputs).toEqual([
      ...START_CALLBACK_OUTPUTS,
      expect.objectContaining({
        error: expect.stringContaining(
          'Unexpected completion of callback "jsii::callback::99999"',
        ),
      }),
      { ok: { objectCount: 1 } },
    ]);
  });
});

test('many requests while waiting for a callback do not exhaust the stack', async () => {
  const requestCount = 100_000;
  let outputCount = 0;
  let lastOutputs: Output[] = [];
  const inputs: Input[] = [
    ...START_CALLBACK,
    ...Array.from({ length: requestCount }, () => ({ api: 'stats' }) as any),
    { complete: { cbid: CBID } },
  ].reverse();

  const inout: IInputOutput = {
    read: () => inputs.pop(),
    write: (obj) => {
      outputCount++;
      lastOutputs = [...lastOutputs.slice(-1), obj];
    },
  };

  await new Promise<void>((ok) => {
    const host = new KernelHost(inout, { noStack: true });
    host.once('exit', () => ok());
    host.run();
  });

  // load + create + callback + one per stats request + invoke result
  expect(outputCount).toBe(requestCount + 4);
  expect(lastOutputs).toEqual([
    { ok: { objectCount: 1 } },
    { ok: { result: undefined } },
  ]);
});

test('async request during a sync callback does not leave an unhandled rejection', async () => {
  const unhandled = jest.fn();
  process.on('unhandledRejection', unhandled);
  try {
    const outputs = await runHost([
      ...START_CALLBACK,
      // `end` returns a promise, which rejects because the ID is unknown.
      { api: 'end', promiseid: 'does-not-exist' },
      { complete: { cbid: CBID } },
    ]);

    // Give the rejected promise a chance to surface as unhandled.
    await new Promise((ok) => setTimeout(ok, 50));

    expect(outputs).toEqual([
      ...START_CALLBACK_OUTPUTS,
      expect.objectContaining({
        error: expect.stringContaining(
          'Cannot handle async operations while waiting for a sync callback',
        ),
      }),
      { ok: { result: undefined } },
    ]);
    expect(unhandled).not.toHaveBeenCalled();
  } finally {
    process.off('unhandledRejection', unhandled);
  }
});

test('InputOutput skips any number of recorded responses', () => {
  const lines = [
    ...Array.from({ length: 100_000 }, () => '< {"ok":{}}'),
    '> {"api":"stats"}',
  ].reverse();
  const stdio = {
    readLine: () => lines.pop(),
    writeLine: () => undefined,
    writeErrorLine: () => undefined,
  } as unknown as SyncStdio;

  const inout = new InputOutput(stdio);
  expect(inout.read()).toEqual({ api: 'stats' });
  expect(inout.read()).toBeUndefined();
});

/**
 * Runs a KernelHost with the provided inputs until it exits, and returns all
 * the outputs it wrote (with stack traces removed).
 */
async function runHost(inputs: Input[]): Promise<Output[]> {
  const outputs: Output[] = [];
  const queue = [...inputs].reverse();
  const inout: IInputOutput = {
    read: () => queue.pop(),
    write: (obj) => outputs.push(obj),
  };
  return new Promise((ok) => {
    const host = new KernelHost(inout, { noStack: true });
    host.once('exit', (code) => {
      expect(code).toBe(0);
      expect(queue).toEqual([]);
      ok(outputs);
    });
    host.run();
  });
}
