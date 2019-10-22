#!/bin/bash
scriptdir="$(cd $(dirname $0) && pwd)"
set -euo pipefail

# the reason we require a manual version is because we lerna doesn't respect pre 1.0
# version bumps, so any minor change will cause the "Y" component (in X.Y.Z) to be bumped
# and in pre-1.0 this is considered a major version bump.
ver=${1:-}
if [ -z "${ver}" ]; then
  echo "usage: ./bump.sh <version>"
  exit 1
fi

git clean -fqdx

yarn install

node_modules/.bin/lerna publish --force-publish=* --skip-npm --skip-git --conventional-commits --repo-version ${ver}

# update all "peerDependencies" sections in package.json files
# to match their corresponding "dependencies" version requirement
find . -name package.json | grep -v node_modules | xargs node scripts/sync-peer-deps.js

yarn build

# update test expectations
UPDATE_DIFF=1 yarn test

