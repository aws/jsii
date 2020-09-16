#!/usr/bin/env npx ts-node

import { copyFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const EMBEDDED_SOURCE = resolve(__dirname, '..', '..', 'runtime', 'webpack');

for (const filename of readdirSync(EMBEDDED_SOURCE)) {
  const filepath = join(EMBEDDED_SOURCE, filename);
  copyFileSync(
    filepath,
    resolve(__dirname, '..', 'jsii-experimental', 'embedded', filename),
  );
}
