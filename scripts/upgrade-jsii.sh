#!/bin/bash
#------------------------------------------------------------------------
# updates all package.json files to the latest jsii
# and jsii-rosetta versions
# updates the jsii-pacmak peer dep to the latest supported version
# updates the build matrix in the .github/workflows/main.yml file
#------------------------------------------------------------------------
set -euo pipefail
scriptdir=$(cd $(dirname $0) && pwd)

# go to repo root
cd ${scriptdir}/..

# load version data
tomorrow=$(date -v+1d +%s)
supported=$(curl -sS https://raw.githubusercontent.com/aws/jsii-rosetta/refs/heads/main/releases.json |\
  jq ".maintenance | to_entries | sort_by(.value) | .[] | select(.value | .[0:19] +\"Z\" | fromdateiso8601 >= $tomorrow) | .key")
oldest=$(echo $supported | jq -sr '.[0]')

# Set jsii-pacmak minimal dependency
npm --prefix packages/jsii-pacmak pkg set peerDependencies.jsii-rosetta=">=$oldest.0"

echo "Oldest supported jsii & jsii-rosetta version: $oldest"
echo ""

# update jsii and jsii-rosetta versions
echo "Upgrade jsii & jsii-rosetta to latest"
echo ""
npx lerna exec --parallel ncu -- --upgrade --target=latest --dep=prod,dev --filter=jsii,jsii-rosetta
