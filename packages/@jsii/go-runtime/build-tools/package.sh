#!/bin/bash
set -euo pipefail
scriptdir=$(cd $(dirname $0) && pwd)
cd ${scriptdir}/..

rm -fr dist
mkdir -p dist/go
rsync -av jsii-runtime-go/* dist/go/
