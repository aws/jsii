#!/bin/bash
set -e
export PATH=$PWD/node_modules/.bin:$PATH

packdir="$PWD/pack"
rm -fr ${packdir}
mkdir -p ${packdir}

# run "npm run package" in all modules (which support it)
# this should emit a publishable to the "dist" directory of each module
lerna run package --stream

# collect all "dist" directories into "pack"
for dist in $(lerna exec "[ -d ./dist ] && echo \${PWD}/dist || true"); do
  echo "collecting $dist"
  rsync -av ${dist}/ ${packdir}/
done

