import * as path from 'path';
import * as lambda from '../../aws-lambda';
import { FileSystem } from '../../core';
import { Construct } from 'constructs';

/**
 * An AWS Lambda layer that includes the AWS CLI.
 */
export class AwsCliLayer extends lambda.LayerVersion {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      code: lambda.Code.fromAsset(path.join(__dirname, 'layer.zip'), {
        // we hash the layer directory (it contains the tools versions and Dockerfile) because hashing the zip is non-deterministic
        assetHash: FileSystem.fingerprint(path.join(__dirname, '../layer')),
      }),
      description: '/opt/awscli/aws',
    });
  }
}
