#!/bin/bash
set -euo pipefail
test="./test"

# Generate NuGet packages for jsii-calc and its dependencies.
# TODO: uncomment this for building jsii-calc
# jsii-pacmak -vv -t dotnet --recurse -o ${test}/generated ../jsii-calc
jsii-pacmak -vv -t dotnet --recurse -o ${test}/generated ../jsii-calc-base
jsii-pacmak -vv -t dotnet --recurse -o ${test}/generated ../jsii-calc-lib

# Generate Directory.Build.props
/usr/bin/env node ./Directory.Build.props.t.js > ${test}/Directory.Build.props