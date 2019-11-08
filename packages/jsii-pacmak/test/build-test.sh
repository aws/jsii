#!/bin/bash
set -euo pipefail
cd $(dirname $0)

outdir=$(mktemp -d)
../bin/jsii-pacmak -o ${outdir} --recurse ../../jsii-calc -vv

rm -rf ${outdir}
