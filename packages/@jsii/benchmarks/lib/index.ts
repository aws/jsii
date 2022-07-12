import { Benchmark } from './benchmark';
import { cdkTag } from './constants';
import * as awsCdkLib from './suite/aws-cdk-lib';

export const benchmarks = [
  // Reference comparison using the TypeScript compiler
  new Benchmark(`Compile aws-cdk-lib@${cdkTag} (tsc)`)
    .setup(awsCdkLib.setup)
    .beforeEach(awsCdkLib.beforeEach)
    .teardown(awsCdkLib.teardown)
    .subject(awsCdkLib.buildWithTsc),

  // Always run against the same version of CDK source
  new Benchmark(`Compile aws-cdk-lib@${cdkTag}`)
    .setup(awsCdkLib.setup)
    .beforeEach(awsCdkLib.beforeEach)
    .teardown(awsCdkLib.teardown)
    .subject(awsCdkLib.buildWithJsii),
];
