#!/bin/bash
set -euo pipefail

# Run unit tests
dotnet test -c Release ./src/Amazon.JSII.Generator.UnitTests
