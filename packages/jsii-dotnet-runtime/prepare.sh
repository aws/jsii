#!/bin/bash
set -euo pipefail

# embed jsii-runtime as a resource
bundle_dir="src/AWS.Jsii.Runtime/jsii-runtime"
mkdir -p ${bundle_dir}
rsync -av node_modules/jsii-runtime/dist/ ${bundle_dir}

# TODO: Auto-rev NuGet package versions on each local build.
# Because we we don't rev the versions, dotnet will pick
# up an old build from the cache if it exists. So we
# explicitly clear the cache as a temporary workaround.
dotnet nuget locals all --clear
dotnet build -c Release ./src/AWS.Jsii.Runtime.sln
