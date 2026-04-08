#!/bin/bash
set -euo pipefail
test="./test"
genRoot="${test}/generated"

# Clean up before we start working
rm -rf ${genRoot}

# Generate .NET projects for jsii-calc and its dependencies.
yarn jsii-pacmak -t dotnet --code-only --recurse -o ${genRoot} ../../jsii-calc

# Hack around project references to de-duplicate Amazon.JSII.Runtime in generated code.
runtimeCsproj="$(cd "$(dirname "$0")" && pwd)/../dotnet-runtime/src/Amazon.JSII.Runtime/Amazon.JSII.Runtime.csproj"
for csproj in ${genRoot}/dotnet/*/*.csproj
do
  (cd "$(dirname "${csproj}")" && dotnet remove package Amazon.JSII.Runtime)
  (cd "$(dirname "${csproj}")" && dotnet add reference "${runtimeCsproj}")
done

# Generate Directory.Build.props
/usr/bin/env node ./Directory.Build.props.t.js > ${test}/Directory.Build.props
