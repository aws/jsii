#!/bin/bash
set -e
export PATH=$PWD/node_modules/.bin:$PATH

dist="$PWD/dist"
rm -fr ${dist}
mkdir -p ${dist}

lerna ls | grep -v "private" | cut -d" " -f1 | xargs -n1 -I{} \
    lerna exec --scope {} --stream -- "npm pack && mv *.tgz ${dist}"
