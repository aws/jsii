#!/bin/bash
set -euo pipefail
res="./project/resources"

version=$(node -e "console.log(require('./package.json').version)")
echo "${version}" > project/version.txt

# embed jsii-runtime as a resource
mkdir -p ${res}
rsync -av node_modules/jsii-runtime/webpack/ ${res}

# generate jsii-calc for ruby
mkdir -p project/test/jsii-calc
jsii-pacmak --no-force-subdirectory -t ruby -o project/test/jsii-calc --recurse node_modules/jsii-calc
