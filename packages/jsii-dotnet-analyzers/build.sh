#!/bin/bash
set -euo pipefail

dotnet build --force -c Release ./src/Amazon.JSII.Analyzers

cp -f ./bin/Release/NuGet/*.nupkg ./bin/Release/NuGet/*.snupkg .
