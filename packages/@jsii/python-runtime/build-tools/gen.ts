#!/usr/bin/env npx ts-node

import { copyFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { TargetName } from 'jsii-pacmak';
import { toReleaseVersion } from 'jsii-pacmak/lib/targets/version-utils';

const EMBEDDED_SOURCE = resolve(__dirname, '..', '..', 'runtime', 'webpack');
const EMBEDDED_INFO = resolve(__dirname, '..', '..', 'runtime', 'package.json');

const data = require('../package.json');
const embeddedData = require(EMBEDDED_INFO);

writeFileSync(
  resolve(__dirname, '..', 'src', 'jsii', '_metadata.json'),
  JSON.stringify(
    {
      version: toReleaseVersion(data.version, TargetName.PYTHON),
      description: data.description,
      license: data.license,
      author: data.author.name,
      'jsii-runtime': {
        version: embeddedData.version,
      },
      bugs: data.bugs.url,
      homepage: data.homepage,
      repository: data.repository.url,
    },
    null,
    2,
  ),
  { encoding: 'utf-8' },
);

const EMBEDDED_TARGET = resolve(
  __dirname,
  '..',
  'src',
  'jsii',
  '_embedded',
  'jsii',
);

function embedFiles(
  sourceDirectory: string,
  prefix?: string,
): { [path: string]: string } {
  const result: { [path: string]: string } = {};

  for (const filename of readdirSync(sourceDirectory)) {
    // Ignore dot-files
    if (filename.startsWith('.')) {
      continue;
    }
    const filepath = resolve(sourceDirectory, filename);
    if (statSync(filepath).isDirectory()) {
      // Not using path.join because we don't want Windows path separators here
      const nextPrefix = prefix ? `${prefix}/${filename}` : filename;
      Object.assign(result, embedFiles(filepath, nextPrefix));
      continue;
    }

    const embeddedFileName = prefix
      ? `${prefix.replace(/[/]/g, '__')}__${filename}`
      : filename;
    const targetFile = resolve(EMBEDDED_TARGET, embeddedFileName);
    copyFileSync(filepath, targetFile);
    // Not using path.join because we don't want Windows path separators here
    result[embeddedFileName] = prefix ? `${prefix}/${filename}` : filename;
  }

  return result;
}

const embeddedFiles = embedFiles(EMBEDDED_SOURCE);

writeFileSync(
  resolve(EMBEDDED_TARGET, '__init__.py'),
  `EMBEDDED_FILES = {
${Object.entries(embeddedFiles)
  // Sorting to ensure `bin/jsii-runtime.js` is first.
  .map(([embedded, actual]) => `    "${embedded}": "${actual}",`)
  .join('\n')}
}

ENTRYPOINT = ${JSON.stringify('bin/jsii-runtime.js'.replace(/[/]/g, '__'))}

__all__ = ["EMBEDDED_FILES", "ENTRYPOINT"]
`,
  { encoding: 'utf-8' },
);
