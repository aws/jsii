import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import * as spec from '../lib/assembly';

/**
 * Compile a jsii module from assembly, and produce an environment in which it is available as a module
 */
export class TestJsiiModule {
  public static async fromAssembly(
    assembly: spec.Assembly,
    packageInfo: { name: string },
  ) {
    // The following is silly, however: the helper has compiled the given source to
    // an assembly, and output files, and then removed their traces from disk.
    // But for the purposes of Rosetta, we need those files back on disk. So write
    // them back out again >_<
    //
    // In fact we will drop them in 'node_modules/<name>' so they can be imported
    // as if they were installed.
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'spec'));
    const modDir = path.join(tmpDir, 'node_modules', packageInfo.name);
    await fs.ensureDir(modDir);

    await fs.writeJSON(path.join(modDir, '.jsii'), assembly);
    await fs.writeJSON(path.join(modDir, 'package.json'), {
      name: packageInfo.name,
    });
    return new TestJsiiModule(assembly, modDir, tmpDir);
  }

  private constructor(
    private _assembly: spec.Assembly,
    public readonly moduleDirectory: string,
    public readonly workspaceDirectory: string,
  ) {}

  public get assembly() {
    return this._assembly;
  }

  public async syncAssembly() {
    this._assembly = await fs.readJSON(
      path.join(this.moduleDirectory, '.jsii'),
    );
  }

  public async cleanup() {
    await fs.remove(this.moduleDirectory);
  }
}

export function makeType(
  ns: string,
  name: string,
  assemblyName: string,
): spec.Type {
  const fqn = `${ns}.${name}`;
  return { fqn, name, assembly: assemblyName, kind: spec.TypeKind.Class };
}
