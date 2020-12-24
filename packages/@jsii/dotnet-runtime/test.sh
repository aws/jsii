#!/bin/bash
set -euo pipefail

# Run unit tests
echo "Running library unit tests"

# Logger argument to try and avoid hanging (see https://github.com/microsoft/vstest/issues/2080)
dotnet test -c Release --logger:"console;noprogress=true" ./src/Amazon.JSII.Runtime.sln
