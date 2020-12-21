#!/bin/bash
set -euo pipefail

# Build just Runtime and it's dependencies instead of the
# solution to avoid integration tests from trying to be
# built before the calc packages are generated.
dotnet build --force -c Release ./src/Amazon.JSII.Runtime.sln
