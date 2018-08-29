#!/bin/bash
set -euo pipefail

# This script retrieves the .snk file needed
# to create strong names for .NET assemblies.
echo "Retrieving SNK..."

sudo apt install jq -y

ROLE=$(aws sts assume-role --region us-east-2 --role-arn ${DOTNET_STRONG_NAME_ROLE_ARN:-} --role-session-name "jsii-dotnet-snk")
export AWS_ACCESS_KEY_ID=$(echo $ROLE | jq -r .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo $ROLE | jq -r .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo $ROLE | jq .Credentials.SessionToken)

SNK_SECRET=$(aws secretsmanager get-secret-value --region us-east-2 --secret-id ${DOTNET_STRONG_NAME_SECRET_ID:-})
TMP_DIR=$(mktemp -d)
TMP_KEY="$TMP_DIR/key.snk"
echo $SNK_SECRET | jq -r .SecretBinary | base64 --decode > $TMP_KEY

cp $TMP_KEY packages/jsii-dotnet-jsonmodel/src/Amazon.JSII.JsonModel/
cp $TMP_KEY packages/jsii-dotnet-generator/src/Amazon.JSII.Generator/
cp $TMP_KEY packages/jsii-dotnet-runtime/src/Amazon.JSII.Runtime/

rm -rf $TMP_DIR
