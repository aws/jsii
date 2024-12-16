import { Assembly, SchemaVersion, SPEC_FILE_NAME } from '@jsii/spec';
import { toPascalCase } from 'codemaker';
import * as fs from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';

import { checkTree, TREE } from './harness';
import { pacmak } from '../../lib';

for (const prerelease of ['4.5.6-pre.1337', '2.0.0-rc.42']) {
  test(`foo@1.2.3 depends on bar@^${prerelease}`, async () => {
    const outDir = await fs.mkdtemp(
      join(tmpdir(), 'jsii-pacmak.prerelease-identifiers.test.output.'),
    );

    try {
      await mockSourceDirectory('1.2.3', { bar: `^${prerelease}` }, (source) =>
        pacmak({
          codeOnly: true,
          force: true,
          fingerprint: false,
          inputDirectories: [source],
          outputDirectory: outDir,
        }),
      );

      expect({ [TREE]: checkTree(outDir) }).toMatchSnapshot('<outDir>/');
    } finally {
      await fs.remove(outDir);
    }
  });

  test(`foo@${prerelease}`, async () => {
    const outDir = await fs.mkdtemp(
      join(tmpdir(), 'jsii-pacmak.prerelease-identifiers.test.output.'),
    );

    try {
      await mockSourceDirectory(prerelease, undefined, (source) =>
        pacmak({
          codeOnly: true,
          force: true,
          fingerprint: false,
          inputDirectories: [source],
          outputDirectory: outDir,
        }),
      );

      expect({ [TREE]: checkTree(outDir) }).toMatchSnapshot('<outDir>/');
    } finally {
      await fs.remove(outDir);
    }
  });
}

//#region Test Helpers

async function mockSourceDirectory<T>(
  version: string,
  dependencies: { readonly [name: string]: string } | undefined,
  cb: (source: string) => Promise<T>,
): Promise<T> {
  const dir = await fs.mkdtemp(
    join(tmpdir(), 'jsii-pacmak.prerelease-identifiers.test.input.'),
  );
  try {
    const assembly = mockAssembly('foo', version, dependencies);
    await fs.writeJson(join(dir, SPEC_FILE_NAME), assembly, { spaces: 2 });
    await fs.writeJson(
      join(dir, 'package.json'),
      {
        jsii: {
          outdir: 'dist',
          targets: assembly.targets,
        },
        license: assembly.license,
        name: assembly.name,
        peerDependencies: assembly.dependencies,
        version: assembly.version,
      },
      { spaces: 2 },
    );

    /* eslint-disable no-await-in-loop */
    for (const [name, version] of Object.entries(assembly.dependencies ?? {})) {
      const pkgDir = join(dir, 'node_modules', name);
      await fs.mkdirp(pkgDir);
      const assembly = mockAssembly(name, version.replace(/^[^\d]/, ''));
      await fs.writeJson(join(pkgDir, SPEC_FILE_NAME), assembly, { spaces: 2 });
      await fs.writeJson(
        join(pkgDir, 'package.json'),
        {
          jsii: {
            outdir: 'dist',
            targets: assembly.targets,
          },
          license: assembly.license,
          name: assembly.name,
          version: assembly.version,
        },
        { spaces: 2 },
      );
      // Necessary otherwise 'require.resolve()' will fail
      await fs.writeFile(join(pkgDir, 'index.js'), 'module.exports = {};');
    }
    /* eslint-enable no-await-in-loop */

    return await cb(dir);
  } finally {
    await fs.remove(dir);
  }
}

function mockAssembly(
  name: string,
  version: string,
  dependencies?: { readonly [name: string]: string },
): Assembly {
  return {
    author: { name: 'Test', roles: ['test'] },
    dependencies,
    dependencyClosure:
      dependencies &&
      Object.keys(dependencies).reduce(
        (closure, name) => ({
          ...closure,
          [name]: { targets: targetsOf(name) },
        }),
        {},
      ),
    description: `Test assembly: ${name}`,
    fingerprint: '<NOPE>',
    homepage: `https://test.nope/${name}`,
    jsiiVersion: '1337.42.1337',
    license: 'UNLICENSED',
    name,
    repository: { type: 'git', url: `${name}.nope.git` },
    schema: SchemaVersion.LATEST,
    targets: targetsOf(name),
    version,
  };

  function targetsOf(name: string): Assembly['targets'] {
    return {
      dotnet: {
        namespace: `Com.Acme.${toPascalCase(name)}`,
        packageId: `Com.Acme.${toPascalCase(name)}`,
      },
      go: {},
      java: {
        maven: { groupId: 'com.acme', artifactId: name },
        package: `com.acme.${name}`,
      },
      python: {
        distName: name,
        module: name,
      },
    };
  }
}

//#endregion
