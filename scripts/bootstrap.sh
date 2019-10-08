#!/bin/bash
set -euo pipefail

export NODE_OPTIONS="--max-old-space-size=4096 ${NODE_OPTIONS:-}"

if ! npm ci --help; then
  echo "upgrading npm, because "npm ci" is not supported"
  npm i -g npm@~6.8.0
fi

echo "============================================================================================="
echo "installing repo-global dependencies..."
npm ci --global-style
gem update --system
gem install 'bundler:~>1.17.2'

export PATH=node_modules/.bin:$PATH

echo "============================================================================================="
echo "boostrapping..."
lerna bootstrap --reject-cycles --ci

echo "============================================================================================="
echo "installing local links..."
npm run install-local-packages
