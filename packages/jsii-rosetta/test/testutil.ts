import { Assembly, writeAssembly } from '@jsii/spec';
import * as fs from 'fs-extra';
import { PackageInfo, compileJsiiForTest, TestWorkspace } from 'jsii';
import * as os from 'node:os';
import * as path from 'node:path';

import {
  SnippetTranslator,
  SnippetParameters,
  rosettaDiagFromTypescript,
  SnippetLocation,
  typeScriptSnippetFromCompleteSource,
  Translator,
} from '../lib';

export type MultipleSources = { [key: string]: string; 'index.ts': string };

export interface TestJsiiModuleOptions {
  /**
   * Whether or not to compress the assembly
   */
  readonly compressAssembly?: boolean;
}

/**
 * Compile a jsii module from source, and produce an environment in which it is available as a module
 */
export class TestJsiiModule {
  public static fromSource(
    source: string | MultipleSources,
    packageInfo: Partial<PackageInfo> & { name: string; main?: string; types?: string },
    options: TestJsiiModuleOptions = {},
  ): TestJsiiModule {
    const asm = compileJsiiForTest(source, {
      packageJson: packageInfo,
      compressAssembly: options.compressAssembly,
    });

    const ws = TestWorkspace.create();
    ws.addDependency(asm);
    return new TestJsiiModule(asm.assembly, ws, asm.compressAssembly === true);
  }

  public readonly moduleDirectory: string;
  public readonly workspaceDirectory: string;

  private constructor(
    public readonly assembly: Assembly,
    public readonly workspace: TestWorkspace,
    private readonly compressAssembly: boolean,
  ) {
    this.moduleDirectory = workspace.dependencyDir(assembly.name);
    this.workspaceDirectory = workspace.rootDirectory;
  }

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
  public updateAssembly() {
    writeAssembly(this.moduleDirectory, this.assembly, { compress: this.compressAssembly });
  }

  public cleanup() {
    this.workspace.cleanup();
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
