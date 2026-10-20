#!/bin/bash
set -euo pipefail

# Run integration tests
echo "Running integration tests"
dotnet test -c Release ./test/Amazon.JSII.Runtime.IntegrationTests/Amazon.JSII.Runtime.IntegrationTests.csproj \
  --logger "trx;LogFileName=${PWD}/test-results.trx"

# Create the report consumed by tools/jsii-compliance
node ./compliance-report.js ./test-results.trx ./compliance-report.json
