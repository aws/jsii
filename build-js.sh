#!/bin/bash
# Build only the JavaScript packages
set -euo pipefail
scope=""
for package in $(node_modules/.bin/lerna ls); do
    scope="$scope --scope $package"
done
node_modules/.bin/lerna $scope run build
node_modules/.bin/lerna $scope run test
