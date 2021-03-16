#!/bin/sh
set -euo pipefail
scriptdir=$(cd $(dirname $0) && pwd)
cd ${scriptdir}

modules="\
  ../@scope/jsii-calc-base-of-base \
  ../@scope/jsii-calc-base \
  ../@scope/jsii-calc-lib \
  ./"

for mod in $modules; do
  node -p "require('./package.json').name"
  (
    cd $mod
    yarn build
    yarn test:update
  )
done

