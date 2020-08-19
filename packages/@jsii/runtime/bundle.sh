#!/bin/bash
set -euo pipefail

npx webpack-cli

# HACK: the 'source-map' library used by @jsii/kernel requires __dirname/mappings.wasm
# this means we need to make sure this is also brought in to the clients until we figure it
# out or get rid of 'source-map' if possible.
cp $(node -p 'require.resolve("source-map/lib/mappings.wasm")') webpack/
