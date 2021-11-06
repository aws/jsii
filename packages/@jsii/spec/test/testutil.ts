import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import * as spec from '../lib/assembly';

/**
 * Construct a temp directory and write an assembly file inside it
 */
export class TestAssembly {
  public static async fromAssembly(
    assembly: spec.Assembly,
    packageInfo: { name: string },
  ) {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'spec'));
    await fs.writeJSON(path.join(tmpDir, '.jsii'), assembly);
    await fs.writeJSON(path.join(tmpDir, 'package.json'), {
      name: packageInfo.name,
    });
    return new TestAssembly(assembly, tmpDir);
  }

  private constructor(
    private _assembly: spec.Assembly,
    public readonly directory: string,
  ) {}

  public get assembly() {
    return this._assembly;
  }

  /**
   * Sync the _assembly property with the contents of the file.
   */
  public async syncAssembly() {
    this._assembly = await fs.readJSON(path.join(this.directory, '.jsii'));
  }

  public async cleanup() {
    await fs.remove(this.directory);
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
