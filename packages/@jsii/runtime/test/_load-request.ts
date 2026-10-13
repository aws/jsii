import { api, ASSEMBLY_SUPPORTED_FEATURES } from '@jsii/kernel';
import * as spec from '@jsii/spec';
import { loadAssemblyFromPath } from '@jsii/spec';
import * as child from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Creates a `load` request for the given library, packing it into a tarball
 * if that has not been done yet.
 */
export function loadRequest(library: string): api.LoadRequest {
  const assembly = loadAssembly();
  const tarball = path.join(
    __dirname,
    '_tarballs',
    library,
    `${assembly.fingerprint.replace('/', '_')}.tgz`,
  );
  if (!fs.existsSync(tarball)) {
    packageLibrary(tarball);
  }
  return {
    name: assembly.name,
    version: assembly.version,
    tarball,
  };

  function loadAssembly(): spec.Assembly {
    return loadAssemblyFromPath(
      path.resolve(require.resolve(`${library}/package.json`), '..'),
      true,
      // Features that the kernel we are wrapping supports
      ASSEMBLY_SUPPORTED_FEATURES,
    );
  }

  function packageLibrary(target: string): void {
    const targetDir = path.dirname(target);
    fs.mkdirSync(targetDir, { recursive: true });
    const result = child.spawnSync(
      'npm',
      ['pack', path.dirname(require.resolve(`${library}/package.json`))],
      { cwd: targetDir, shell: true, stdio: ['inherit', 'pipe', 'pipe'] },
    );
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      console.error(result.stderr.toString('utf-8'));
      throw new Error(
        `Unable to 'npm pack' ${library}: process ${
          result.signal != null
            ? `killed by ${result.signal}`
            : `exited with code ${result.status}`
        }`,
      );
    }
    fs.renameSync(
      path.join(targetDir, result.stdout.toString('utf-8').trim()),
      target,
    );
  }
}
