#!/bin/bash
set -euo pipefail
/bin/bash ./install.sh

node_modules/.bin/lerna publish --force-publish=* --skip-npm --skip-git --conventional-commits

# update all "peerDependencies" sections in package.json files
# to match their corresponding "dependencies" version requirement
find . -name package.json | grep -v node_modules | xargs node scripts/sync-peer-deps.js

node_modules/.bin/lerna run build --stream --sort

# update test expectations
UPDATE_DIFF=1 node_modules/.bin/lerna run test --stream --sort

