#!/bin/bash
set -euo pipefail

pip install wheel

export NODE_OPTIONS="--max-old-space-size=4096 ${NODE_OPTIONS:-}"

if ! npm ci --help; then
  echo "upgrading npm, because "npm ci" is not supported"
  npm i -g npm@~6.8.0
fi

echo "============================================================================================="
echo "installing repo-global dependencies..."
npm ci --global-style

export PATH=node_modules/.bin:$PATH

echo "============================================================================================="
echo "boostrapping..."
lerna bootstrap --reject-cycles --ci
