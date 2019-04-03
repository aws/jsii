import { sourceToAssemblyHelper  } from 'jsii';
import reflect = require('jsii-reflect');
import { Test } from 'nodeunit';
import { compareAssemblies } from '../lib';
import { Mismatches } from '../lib/types';

export async function expectNoError(test: Test, original: string, updated: string) {
    const mms = await compare(original, updated);
    for (const msg of mms.messages()) {
      // tslint:disable-next-line:no-console
      console.error(`- ${msg}`);
    }
    test.equal(0, mms.count);
}

export async function expectError(test: Test, error: RegExp, original: string, updated: string) {
    const mms = await compare(original, updated);
    test.notEqual(0, mms.count);

    const msgs = Array.from(mms.messages());
    test.ok(msgs.some(m => error.test(m)), `Expected error like ${error}, got ${msgs}`);
}

async function compare(original: string, updated: string): Promise<Mismatches> {
  const ass1 = await sourceToAssemblyHelper(original);
  const ts1 = new reflect.TypeSystem();
  const originalAssembly = ts1.addAssembly(new reflect.Assembly(ts1, ass1));

  const ass2 = await sourceToAssemblyHelper(updated);
  const ts2 = new reflect.TypeSystem();
  const updatedAssembly = ts2.addAssembly(new reflect.Assembly(ts2, ass2));

  return compareAssemblies(originalAssembly, updatedAssembly);
}