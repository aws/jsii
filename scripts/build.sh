#!/bin/bash
set -euo pipefail

if [ ! -d ./node_modules ]; then
    npm run bootstrap
fi

export PATH=./node_modules/.bin:$PATH

echo "============================================================================================="
echo "building..."
lerna run build --stream --sort

echo "============================================================================================="
echo "testing..."
lerna run test --stream
