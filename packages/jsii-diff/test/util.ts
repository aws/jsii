import { MultipleSourceFiles, sourceToAssemblyHelper } from 'jsii';
import * as reflect from 'jsii-reflect';

import { compareAssemblies } from '../lib';
import { Mismatches } from '../lib/types';

export function expectNoError(
  original: string | MultipleSourceFiles,
  updated: string | MultipleSourceFiles,
) {
  const mms = compare(original, updated);
  for (const msg of mms.messages()) {
    console.error(`- ${msg}`);
  }
  expect(Array.from(mms.messages())).toEqual([]);
}

export function expectError(
  error: RegExp | undefined,
  original: string | MultipleSourceFiles,
  updated: string | MultipleSourceFiles,
) {
  if (error == null) {
    expectNoError(original, updated);
    return;
  }

  const mms = compare(original, updated);
  expect(mms.count).not.toBe(0);

  const msgs = Array.from(mms.messages());

  if (!msgs.some((m) => error.test(m))) {
    expect(msgs.join(',')).toMatch(error);
  }
}

export function compare(
  original: string | MultipleSourceFiles,
  updated: string | MultipleSourceFiles,
): Mismatches {
  const ass1 = sourceToAssemblyHelper(original);
  const ts1 = new reflect.TypeSystem();
  const originalAssembly = ts1.addAssembly(new reflect.Assembly(ts1, ass1));

  const ass2 = sourceToAssemblyHelper(updated);
  const ts2 = new reflect.TypeSystem();
  const updatedAssembly = ts2.addAssembly(new reflect.Assembly(ts2, ass2));

  return compareAssemblies(originalAssembly, updatedAssembly);
}
