#!/bin/bash
set -e
modules="$(node_modules/.bin/lerna ls 2>/dev/null | grep -v private | cut -d' ' -f1 | xargs)"
version="$(cat lerna.json | grep version | cut -d'"' -f4)"

echo "Packing version ${version}..."

root="$PWD"
dist="${root}/dist"

rm -fr ${dist}
mkdir -p ${dist}
cd ${dist}

for module in ${modules}; do
    npm pack ${root}/packages/${module}
done

echo "Tarballs under: ${dist}"
