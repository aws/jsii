#!/bin/bash
set -euo pipefail

# Run unit tests
dotnet test -c Release ./src/AWS.Jsii.Generator.UnitTests
