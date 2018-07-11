#!/bin/bash
set -euo pipefail

# TODO: Auto-rev NuGet package versions on each local build.
# Because we we don't rev the versions, dotnet will pick
# up an old build from the cache if it exists. So we
# explicitly clear the cache as a temporary workaround.
dotnet nuget locals all --clear
dotnet build -c Release ./src/AWS.Jsii.Generator.sln

# TODO: Publishing for all four platforms takes ~30 seconds. It might
# be worth skipping non-linux platforms for Debug builds.
dotnet publish -c Release src/AWS.Jsii.Generator.CLI/ -r win-x86
dotnet publish -c Release src/AWS.Jsii.Generator.CLI/ -r win-x64
dotnet publish -c Release src/AWS.Jsii.Generator.CLI/ -r osx-x64
dotnet publish -c Release src/AWS.Jsii.Generator.CLI/ -r linux-x64

# This should be part of prepack, but it must be done BEFORE
# pacmak tests are run, so we do it here.
mkdir -p cli
rsync -av ./src/AWS.Jsii.Generator.CLI/bin/Release/netcoreapp2.0/ ./cli/
