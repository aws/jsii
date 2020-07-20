#!/bin/bash
set -euo pipefail

# This script retrieves the .snk file needed to create strong names for .NET assemblies.

function echo_usage() {
    echo "USAGE: Set the following environment variables, then run ./fetch-dotnet-snk.sh with no arguments."
    echo -e "\tDOTNET_STRONG_NAME_ENABLED=true"
    echo -e "\tDOTNET_STRONG_NAME_ROLE_ARN=<ARN of a role with access to the secret. You must have iam:AssumeRole permissions for this role.>"
    echo -e "\tDOTNET_STRONG_NAME_SECRET_REGION=<The AWS region (i.e. us-east-2) in which in the secret is stored.>"
    echo -e "\tDOTNET_STRONG_NAME_SECRET_ID=<The name (i.e. production/my/key) or ARN of the secret containing the .snk file.>"
}

if [ -z "${DOTNET_STRONG_NAME_ENABLED:-}" ]; then
    echo "Environment variable DOTNET_STRONG_NAME_ENABLED is not set. Skipping strong-name signing."
    exit 0
fi

# TODO: FIXME LATER
echo "!!! STRONG NAME SIGNING TEMPORARILY DISABLED !!!"
exit 0
# END OF TODO

echo "Retrieving SNK..."

if [ -z "${DOTNET_STRONG_NAME_ROLE_ARN:-}" ]; then
    echo "Strong name signing is enabled, but DOTNET_STRONG_NAME_ROLE_ARN is not set."
    echo_usage
    exit 1
fi

if [ -z "${DOTNET_STRONG_NAME_SECRET_REGION:-}" ]; then
    echo "Strong name signing is enabled, but DOTNET_STRONG_NAME_SECRET_REGION is not set."
    echo_usage
    exit 1
fi

if [ -z "${DOTNET_STRONG_NAME_SECRET_ID:-}" ]; then
    echo "Strong name signing is enabled, but DOTNET_STRONG_NAME_SECRET_ID is not set."
    echo_usage
    exit 1
fi

ROLE=$(aws sts assume-role --region ${DOTNET_STRONG_NAME_SECRET_REGION:-} --role-arn ${DOTNET_STRONG_NAME_ROLE_ARN:-} --role-session-name "jsii-dotnet-snk")
export AWS_ACCESS_KEY_ID=$(node -p "(${ROLE}).Credentials.AccessKeyId")
export AWS_SECRET_ACCESS_KEY=$(node -p "(${ROLE}).Credentials.SecretAccessKey")
export AWS_SESSION_TOKEN=$(node -p "(${ROLE}).Credentials.SessionToken")

SNK_SECRET=$(aws secretsmanager get-secret-value --region ${DOTNET_STRONG_NAME_SECRET_REGION:-} --secret-id ${DOTNET_STRONG_NAME_SECRET_ID:-})
TMP_DIR=$(mktemp -d)
TMP_KEY="$TMP_DIR/key.snk"
node -p "(${SNK_SECRET}).SecretBinary" | base64 --decode > $TMP_KEY

cp $TMP_KEY packages/@jsii/dotnet-runtime/src/Amazon.JSII.Analyzers/key.snk
cp $TMP_KEY packages/@jsii/dotnet-runtime/src/Amazon.JSII.JsonModel/key.snk
cp $TMP_KEY packages/@jsii/dotnet-runtime/src/Amazon.JSII.Runtime/key.snk

rm -rf $TMP_DIR
