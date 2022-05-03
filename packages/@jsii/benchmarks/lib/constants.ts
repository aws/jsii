import * as path from 'path';

export const fixturesDir = path.join(__dirname, '..', 'fixtures');

export const cdkTagv2_21_1 = 'v2.21.1';
export const cdkv2_21_1 = path.join(
  fixturesDir,
  `aws-cdk-lib@${cdkTagv2_21_1.replace(/\./g, '-')}.tgz`,
);
