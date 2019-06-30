#!/bin/bash
set -euo pipefail

npm run gen

dotnet build --force -c Release ./src/Amazon.JSII.Generator.sln
dotnet publish -c Release src/Amazon.JSII.Generator.CLI/

mkdir -p cli
rsync -av ./src/Amazon.JSII.Generator.CLI/bin/Release/netcoreapp2.0/ ./cli/

cp -f ./bin/Release/NuGet/*.nupkg .
