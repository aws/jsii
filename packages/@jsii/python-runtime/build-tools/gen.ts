#!/usr/bin/env npx ts-node

import { copyFileSync, readdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const EMBEDDED_SOURCE = resolve(__dirname, '..', '..', 'runtime', 'webpack');
const EMBEDDED_INFO = resolve(__dirname, '..', '..', 'runtime', 'package.json');

const data = require('../package.json');
const embeddedData = require(EMBEDDED_INFO);

writeFileSync(
  resolve(__dirname, '..', 'src', 'jsii', '_metadata.json'),
  JSON.stringify(
    {
      version: data.version,
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

for (const filename of readdirSync(EMBEDDED_SOURCE)) {
  const filepath = join(EMBEDDED_SOURCE, filename);
  copyFileSync(
    filepath,
    resolve(__dirname, '..', 'src', 'jsii', '_embedded', 'jsii', filename),
  );
}
