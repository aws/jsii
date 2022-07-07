import * as path from 'node:path';

export const fixturesDir = path.resolve(__dirname, '..', 'fixtures');

export const cdkTag = 'v2.31.0';
export const cdk = path.resolve(
  fixturesDir,
  `aws-cdk-lib@${cdkTag.replace(/\./g, '-')}.tgz`,
);
