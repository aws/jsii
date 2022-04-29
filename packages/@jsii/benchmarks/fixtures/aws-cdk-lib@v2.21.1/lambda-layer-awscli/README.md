# AWS Lambda Layer with AWS CLI



This module exports a single class called `AwsCliLayer` which is a `lambda.Layer` that bundles the AWS CLI.

Any Lambda Function that uses this layer must use a Python 3.x runtime.

Usage:

```ts
// AwsCliLayer bundles the AWS CLI in a lambda layer
import { AwsCliLayer } from 'aws-cdk-lib/lambda-layer-awscli';

declare const fn: lambda.Function;
fn.addLayers(new AwsCliLayer(this, 'AwsCliLayer'));
```

The CLI will be installed under `/opt/awscli/aws`.
