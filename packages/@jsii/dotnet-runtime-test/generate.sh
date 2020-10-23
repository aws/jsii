#!/bin/bash
set -euo pipefail
test="./test"
genRoot="${test}/generated"

# Clean up before we start working
rm -rf ${genRoot}

# Generate .NET projects for jsii-calc and its dependencies.
jsii-pacmak -t dotnet --code-only --recurse -o ${genRoot} ../../jsii-calc

# Hack around project references to de-duplicate Amazon.JSII.Runtime in generated code.
for csproj in ${genRoot}/dotnet/*/*.csproj
do
  dotnet remove ${csproj} package Amazon.JSII.Runtime
  dotnet add    ${csproj} reference ../dotnet-runtime/src/Amazon.JSII.Runtime/Amazon.JSII.Runtime.csproj
done

# Generate Directory.Build.props
/usr/bin/env node ./Directory.Build.props.t.js > ${test}/Directory.Build.props
