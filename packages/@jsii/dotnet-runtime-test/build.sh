#!/bin/bash
set -euo pipefail

dotnet build --force -c Release ./test/Amazon.JSII.Runtime.IntegrationTests
