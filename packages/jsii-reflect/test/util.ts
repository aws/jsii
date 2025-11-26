import { sourceToAssemblyHelper, MultipleSourceFiles, PackageInfo } from 'jsii';

import { Assembly, TypeSystem } from '../lib';

export function typeSystemFromSource(
  source: string | MultipleSourceFiles,
  cb?: (obj: PackageInfo) => void,
) {
  const asm = assemblyFromSource(source, cb);
  return asm.system;
}

export function assemblyFromSource(
  source: string | MultipleSourceFiles,
  cb?: (obj: PackageInfo) => void,
): Assembly {
  const ass = sourceToAssemblyHelper(source, cb);

  let pjData: any = {};
  if (typeof source === 'object' && 'package.json' in source) {
    pjData = JSON.parse(source['package.json']);
  }

  const ts = new TypeSystem();
  return ts.addAssembly(new Assembly(ts, ass, '/fake-dir', pjData));
}
