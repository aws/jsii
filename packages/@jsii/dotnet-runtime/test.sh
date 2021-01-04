#!/bin/bash
set -euo pipefail

# Run unit tests
echo "Running library unit tests"

dotnet test -c Release ./src/Amazon.JSII.Runtime.sln
