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
  const ts = new TypeSystem();
  return ts.addAssembly(new Assembly(ts, ass));
}
