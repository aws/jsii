#!/bin/bash
set -euo pipefail
test="./test"

# Generate NuGet packages for jsii-calc and its dependencies.
jsii-pacmak -vv -t dotnet --recurse -o ${test}/generated ../jsii-calc

# Generate Directory.Build.props
/usr/bin/env node ./Directory.Build.props.t.js > ${test}/Directory.Build.props