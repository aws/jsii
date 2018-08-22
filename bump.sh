#!/bin/bash
set -euo pipefail
ver=${1:-}
if [ -z "${ver}" ]; then
  echo "usage: ./bump.sh <version>"
  exit 1
fi

node_modules/.bin/lerna publish --force-publish=* --skip-npm --skip-git --conventional-commits --repo-version ${ver}

node_modules/.bin/lerna run build

# update test expectations
UPDATE_DIFF=1 node_modules/.bin/lerna run test

