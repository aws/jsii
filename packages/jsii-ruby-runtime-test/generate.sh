#!/bin/bash
set -euo pipefail

cd project

version=$(node -e "console.log(require('../package.json').version)")
echo "${version}" > version.txt

rm -f Gemfile.lock

# generate jsii-calc for ruby
rm -fr "vendor"

outdir="vendor/cache"
mkdir -p ${outdir}

# copy jsii_runtime gem to cache
cp ../node_modules/jsii-ruby-runtime/*.gem ${outdir}

jsii-pacmak -v -t ruby -o ${outdir} --recurse ../node_modules/jsii-calc
