#!/bin/bash
set -euo pipefail

# embed jsii-runtime as a resource
bundle_dir="src/Amazon.JSII.Runtime/jsii-runtime"
mkdir -p ${bundle_dir}
rsync -av $(node -p 'require("path").dirname(require.resolve("jsii-runtime/package.json"))')/webpack/ ${bundle_dir}

# Build just Runtime and it's dependencies instead of the
# solution to avoid integration tests from trying to be
# built before the calc packages are generated.
dotnet build --force -c Release ./src/Amazon.JSII.Runtime

cp -f ./bin/Release/NuGet/*.nupkg ./bin/Release/NuGet/*.snupkg .
