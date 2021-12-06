import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import { PackageInfo, compileJsiiForTest } from 'jsii';
import * as os from 'os';
import * as path from 'path';

import {
  SnippetTranslator,
  SnippetParameters,
  rosettaDiagFromTypescript,
  SnippetLocation,
  typeScriptSnippetFromCompleteSource,
  Translator,
} from '../lib';

export type MultipleSources = { [key: string]: string; 'index.ts': string };

/**
 * Compile a jsii module from source, and produce an environment in which it is available as a module
 */
export class TestJsiiModule {
  public static async fromSource(
    source: string | MultipleSources,
    packageInfo: Partial<PackageInfo> & { name: string },
  ) {
    const { assembly, files } = await compileJsiiForTest(source, (pi) => {
      Object.assign(pi, packageInfo);
    });

    // The following is silly, however: the helper has compiled the given source to
    // an assembly, and output files, and then removed their traces from disk.
    // But for the purposes of Rosetta, we need those files back on disk. So write
    // them back out again >_<
    //
    // In fact we will drop them in 'node_modules/<name>' so they can be imported
    // as if they were installed.
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-rosetta'));
    const modDir = path.join(tmpDir, 'node_modules', packageInfo.name);
    await fs.ensureDir(modDir);

    await fs.writeJSON(path.join(modDir, '.jsii'), assembly);
    await fs.writeJSON(path.join(modDir, 'package.json'), {
      name: packageInfo.name,
      jsii: packageInfo.jsii,
    });
    for (const [fileName, fileContents] of Object.entries(files)) {
      // eslint-disable-next-line no-await-in-loop
      await fs.ensureDir(path.dirname(path.join(modDir, fileName)));
      // eslint-disable-next-line no-await-in-loop
      await fs.writeFile(path.join(modDir, fileName), fileContents);
    }

    return new TestJsiiModule(assembly, modDir, tmpDir);
  }

  private constructor(
    public readonly assembly: spec.Assembly,
    public readonly moduleDirectory: string,
    public readonly workspaceDirectory: string,
  ) {}

  /**
   * Make a snippet translator for the given source w.r.t this compiled assembly
   */
  public successfullyCompile(source: string) {
    const location = testSnippetLocation('testutil');
    const snippet = typeScriptSnippetFromCompleteSource(source, location, false, {
      [SnippetParameters.$COMPILATION_DIRECTORY]: this.workspaceDirectory,
    });
    const ret = new SnippetTranslator(snippet, {
      includeCompilerDiagnostics: true,
    });
    if (ret.compileDiagnostics.length > 0) {
      for (const diag of ret.compileDiagnostics.map(rosettaDiagFromTypescript)) {
        console.error(diag.formattedMessage);
      }
      throw new Error('Compilation failures');
    }
    return ret;
  }

  public translateHere(source: string) {
    const location = testSnippetLocation('testutil');
    const snip = typeScriptSnippetFromCompleteSource(source.trimLeft(), location, true, {
      [SnippetParameters.$COMPILATION_DIRECTORY]: this.workspaceDirectory,
    });

    const trans = new Translator(true);
    const ret = trans.translate(snip);
    if (trans.diagnostics.length > 0) {
      for (const diag of trans.diagnostics) {
        console.error(diag.formattedMessage);
      }
      throw new Error('Compilation failures');
    }
    return ret;
  }

  /**
   * Update the file to reflect the latest changes to the assembly object.
   */
  public async updateAssembly() {
    await fs.writeJSON(path.join(this.moduleDirectory, '.jsii'), this.assembly);
  }

  public async cleanup() {
    await fs.remove(this.moduleDirectory);
  }
}

export function testSnippetLocation(fileName: string): SnippetLocation {
  return { api: { api: 'file', fileName }, field: { field: 'example' } };
}

export const DUMMY_JSII_CONFIG = {
  targets: {
    dotnet: {
      namespace: 'Example.Test.Demo',
      packageId: 'Example.Test.Demo',
    },
    go: { moduleName: 'example.test/demo' },
    java: {
      maven: {
        groupId: 'example.test',
        artifactId: 'demo',
      },
      package: 'example.test.demo',
    },
    python: {
      distName: 'example-test.demo',
      module: 'example_test_demo',
    },
  },
};

export async function withTemporaryDirectory<T>(callback: (dir: string) => Promise<T>): Promise<T> {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), path.basename(__filename)));
  return callback(tmpdir).finally(() => fs.removeSync(tmpdir));
}
