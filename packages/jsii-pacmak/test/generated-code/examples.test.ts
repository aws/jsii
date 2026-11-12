import { AssemblyTargets, SPEC_FILE_NAME } from '@jsii/spec';
import * as fs from 'fs-extra';
import * as jsii from 'jsii';
import * as os from 'os';
import * as path from 'path';
import * as ts from 'typescript';

import { checkTree, TREE } from './harness';
import * as pacmak from '../../lib';

const EXAMPLES_ROOT = path.resolve(__dirname, 'examples');

/**
 * Compiler errors to demote to warnings for specific examples, so we can
 * observe the generated code for constructs the compiler currently rejects.
 * Error codes cannot be re-categorized through `jsii.diagnostics`, so the
 * category is shadowed on the code instance for the duration of the compile.
 */
const DEMOTED_ERRORS: Record<string, jsii.Code[]> = {
  'redeclared-interface-member.ts': [
    jsii.JsiiDiagnostic.JSII_5015_REDECLARED_INTERFACE_MEMBER,
  ],
};

function compileExample(name: string, source: string) {
  const demoted = DEMOTED_ERRORS[name] ?? [];
  for (const code of demoted) {
    Object.defineProperty(code, 'category', {
      configurable: true,
      value: ts.DiagnosticCategory.Warning,
    });
  }
  try {
    return jsii.compileJsiiForTest(source);
  } finally {
    for (const code of demoted) {
      delete (code as any).category;
    }
  }
}

for (const name of fs.readdirSync(EXAMPLES_ROOT)) {
  const file = path.join(EXAMPLES_ROOT, name);
  test(name, async () => {
    const source = await fs.readFile(file, 'utf8');
    const compiled = compileExample(name, source);

    const targets: AssemblyTargets = {
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
    };

    const tmpdir = await fs.mkdtemp(
      path.join(os.tmpdir(), 'jsii-pacmak-examples.tests-'),
    );
    try {
      // Create pretend source tree
      await fs.writeJson(
        path.join(tmpdir, SPEC_FILE_NAME),
        { ...compiled.assembly, targets },
        {
          encoding: 'utf8',
          spaces: 2,
        },
      );
      await fs.writeJson(path.join(tmpdir, 'package.json'), {
        name: compiled.assembly.name,
        version: compiled.assembly.version,
        jsii: {
          outdir: 'dist',
          targets,
        },
      });

      // Execute pacmak on source tree
      const outputDirectory = path.join(tmpdir, 'dist');
      await pacmak.pacmak({
        inputDirectories: [tmpdir],
        outputDirectory,
        codeOnly: true,
        fingerprint: false,
        forceSubdirectory: true,
        parallel: false,
        updateNpmIgnoreFiles: false,
      });

      expect({
        [TREE]: checkTree(outputDirectory, { excludes }),
      }).toMatchSnapshot('<outDir>/');
    } finally {
      await fs.remove(tmpdir);
    }
  });
}

const excludedFiles = new Set([
  'LICENSE',
  'MANIFEST.in',
  'README.md',
  'version',
]);
function excludes(file: string): boolean {
  return (
    // Ignore known excluded files, they don't add much value.
    excludedFiles.has(path.basename(file)) ||
    // Ignore the tarballs, they are boring...
    file.endsWith('.tgz') ||
    // Ignore the "js" generated code, because it's boring...
    file.split(path.sep)[0] === 'js'
  );
}
