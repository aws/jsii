#!/bin/bash
set -euo pipefail

dotnet build --force -c Release ./src/Amazon.JSII.Analyzers
