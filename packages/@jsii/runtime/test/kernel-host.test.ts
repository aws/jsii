import { api } from '@jsii/kernel';

import { KernelHost, IInputOutput, Input, Output } from '../lib';
import { loadRequest } from './_load-request';

test('can load libraries from within a callback', () => {
  const inout = new TestInputOutput([
    { api: 'load', ...loadRequest('@scope/jsii-calc-base-of-base') },
    { api: 'load', ...loadRequest('@scope/jsii-calc-base') },
    { api: 'load', ...loadRequest('@scope/jsii-calc-lib') },
    {
      api: 'create',
      fqn: 'Object',
      interfaces: ['@scope/jsii-calc-lib.IFriendly'],
      overrides: [{ method: 'hello' }],
    },
    {
      api: 'invoke',
      objref: { [api.TOKEN_REF]: 'Object@10000' },
      method: 'hello',
    },
    { api: 'load', ...loadRequest('jsii-calc') },
    { complete: { cbid: 'jsii::callback::20000', result: 'SUCCESS!' } },
  ]);
  const host = new KernelHost(inout, { noStack: true, debug: false });
  return new Promise<void>((ok) => {
    host.once('exit', (code) => {
      expect(code).toBe(0);
      ok(inout.expectCompleted());
    });
    host.run();
  });
});

class TestInputOutput implements IInputOutput {
  private readonly inputCommands: Input[];

  public constructor(
    inputCommands: Input[],
    private readonly allowErrors = false,
  ) {
    this.inputCommands = inputCommands.reverse();
  }

  public read(): Input | undefined {
    return this.inputCommands.pop();
  }

  public write(obj: Output): void {
    if (!this.allowErrors) {
      expect(obj).not.toHaveProperty('error');
    }
    if ('ok' in obj && 'assembly' in obj.ok) {
      // Removing the type count as this is subject to change!
      (obj.ok as any).types = '*redacted*';
    }
    expect(obj).toMatchSnapshot();
  }

  /**
   * Validates that all inputs have been consumed, and all expected outputs have been checked.
   */
  public expectCompleted(): void {
    expect(this.inputCommands).toEqual([]);
  }
}
