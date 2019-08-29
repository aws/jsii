#!/bin/bash
set -euo pipefail

if [ ! -d ./node_modules ]; then
    npm run bootstrap
fi

export PATH=./node_modules/.bin:$PATH

echo "============================================================================================="
echo "building..."
lerna run build --stream --sort --scope=jsii-dotnet-jsonmodel --include-filtered-dependencies
lerna run build --stream --sort --scope=jsii-dotnet-runtime --include-filtered-dependencies
lerna run build --stream --sort --scope=jsii-dotnet-analyzers --include-filtered-dependencies
lerna run build --stream --sort --ignore=jsii-dotnet-jsonmodel --ignore=jsii-dotnet-runtime --ignore=jsii-dotnet-analyzers

echo "============================================================================================="
echo "testing..."
lerna run test --stream
