import * as path from 'node:path';

export const fixturesDir = path.resolve(__dirname, '..', 'fixtures');

export const cdkTagv2_21_1 = 'v2.21.1';
export const cdkv2_21_1 = path.resolve(
  fixturesDir,
  `aws-cdk-lib@${cdkTagv2_21_1.replace(/\./g, '-')}.tgz`,
);
