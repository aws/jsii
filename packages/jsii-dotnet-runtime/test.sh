#!/bin/bash
set -euo pipefail

# Run unit tests
echo "Running library unit tests"
dotnet test -c Release ./src/Amazon.JSII.Runtime.UnitTests

# Regenerate jsii-calc and jsii-calc-lib before running integration tests.
echo "Generating code for the calculator library (for integration tests)"
jsii-pacmak -t dotnet --recurse -o ./test ../jsii-calc

# Run integration tests
echo "Running integration tests"
dotnet build -c Release ./test/Amazon.JSII.Runtime.IntegrationTests.sln
dotnet test -c Release ./test/Amazon.JSII.Runtime.IntegrationTests/Amazon.JSII.Runtime.IntegrationTests.csproj
