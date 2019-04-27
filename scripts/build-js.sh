#!/bin/bash
# Build only the JavaScript packages
set -euo pipefail

export NO_DOTNET=true
export JSII_PACMAK_TARGETS="js"

# Test packages
scope="\
    --scope @scope/jsii-calc-base-of-base \
    --scope @scope/jsii-calc-base \
    --scope @scope/jsii-calc-lib \
    --scope jsii-calc \
    "
for package in $(node_modules/.bin/lerna ls); do
    scope="$scope --scope $package"
done
node_modules/.bin/lerna $scope run build
