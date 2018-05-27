#!/bin/bash
set -e
lerna publish --skip-git --skip-npm
modules="$(node_modules/.bin/lerna ls 2>/dev/null | grep -v private | cut -d' ' -f1 | xargs)"
version="$(cat lerna.json | grep version | cut -d'"' -f4)"

echo "Packing version ${version}..."

root="$PWD"
dist="${root}/dist"
staging="${dist}/staging"

rm -fr ${dist}

mkdir -p ${staging}
cd ${staging}

for module in ${modules}; do
    npm pack ${root}/packages/${module}
done

zipfile="${dist}/jsii-${version}.zip"
echo "Creating ${zipfile}..."
zip "${zipfile}" *
