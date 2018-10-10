#!/bin/bash
set -euo pipefail
/bin/bash ./install.sh

node_modules/.bin/lerna publish --force-publish=* --skip-npm --skip-git --conventional-commits

node_modules/.bin/lerna run build --stream --sort

# update test expectations
UPDATE_DIFF=1 node_modules/.bin/lerna run test --stream --sort

