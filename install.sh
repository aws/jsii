#!/bin/bash
set -euo pipefail

echo "============================================================================================="
echo "installing repo-global dependencies..."
npm i --no-package-lock --global-style

export PATH=node_modules/.bin:$PATH

echo "============================================================================================="
echo "boostrapping..."
lerna bootstrap --reject-cycles
