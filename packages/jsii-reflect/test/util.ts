import { sourceToAssemblyHelper, MultipleSourceFiles, PackageInfo } from 'jsii';

import { Assembly, TypeSystem } from '../lib';

export async function typeSystemFromSource(
  source: string | MultipleSourceFiles,
  cb?: (obj: PackageInfo) => void,
) {
  const asm = await assemblyFromSource(source, cb);
  return asm.system;
}

export async function assemblyFromSource(
  source: string | MultipleSourceFiles,
  cb?: (obj: PackageInfo) => void,
): Promise<Assembly> {
  const ass = await sourceToAssemblyHelper(source, cb);
  const ts = new TypeSystem();
  return ts.addAssembly(new Assembly(ts, ass));
}
