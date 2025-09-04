#!/bin/bash
#------------------------------------------------------------------------
# updates all package.json files to the latest jsii
# and jsii-rosetta versions
# updates the jsii-pacmak peer dep to the latest supported version
# updates the TypeScript version to the equivalent jsii version
# updates the build matrix in the .github/workflows/main.yml file
#------------------------------------------------------------------------
set -euo pipefail
scriptdir=$(cd $(dirname $0) && pwd)

# go to repo root
cd ${scriptdir}/..

# load version data
tomorrow=$(date -v+1d +%s)
supported=$(curl -sS https://raw.githubusercontent.com/aws/jsii-rosetta/refs/heads/main/releases.json |\
  jq "(.maintenance | to_entries | sort_by(.value) | .[] | select(.value | .[0:19] +\"Z\" | fromdateiso8601 >= $tomorrow) | .key), .current")
latest=$(echo $supported | jq -sr '.[-1]')
oldest=$(echo $supported | jq -sr '.[0]')

echo "Latest supported jsii & jsii-rosetta version: $latest"
echo "Oldest supported jsii & jsii-rosetta version: $oldest"
echo ""

# Set jsii-pacmak minimal dependency
echo "Updating jsii-pacmak peerDependency to >=$oldest.0"
echo ""
npm --prefix packages/jsii-pacmak pkg set peerDependencies.jsii-rosetta=">=$oldest.0"

# Update TypeScript version
echo "Updating TypeScript version to latest"
echo ""
npm pkg set devDependencies.typescript=">=$latest.x"

# GitHub Actions
matrix=$(echo $supported | jq -rs '["latest"] + map(. + ".x") | @csv')
echo "Updating GitHub Actions workflow to run jsii-pacmak integration tests for $matrix"
echo ""
yq -i ".jobs.pacmak-integration-test.strategy.matrix.rosetta = [$matrix]" .github/workflows/main.yml

# update jsii and jsii-rosetta versions
echo "Upgrading jsii & jsii-rosetta to latest"
echo ""
npx lerna exec --parallel ncu -- --upgrade --target=latest --dep=prod,dev --filter=jsii,jsii-rosetta
