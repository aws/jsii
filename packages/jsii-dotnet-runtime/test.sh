#!/bin/bash
set -euo pipefail

# Run unit tests
dotnet test -c Release ./src/AWS.Jsii.Runtime.UnitTests

# Regenerate jsii-calc and jsii-calc-lib before running integration tests.
jsii-pacmak -t dotnet -o ./test ../jsii-calc-lib
jsii-pacmak -t dotnet -o ./test ../jsii-calc

# Run integration tests
dotnet build -c Release ./test/AWS.Jsii.Runtime.IntegrationTests.sln
dotnet test -c Release ./test/AWS.Jsii.Runtime.IntegrationTests/AWS.Jsii.Runtime.IntegrationTests.csproj
