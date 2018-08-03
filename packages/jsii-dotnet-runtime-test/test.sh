#!/bin/bash
set -euo pipefail

# Run integration tests
echo "Running integration tests"
#dotnet build -c Release ./test/Amazon.JSII.Runtime.IntegrationTests
dotnet test -c Release ./test/Amazon.JSII.Runtime.IntegrationTests/Amazon.JSII.Runtime.IntegrationTests.csproj
