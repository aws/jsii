#!/bin/bash
set -euo pipefail
outdir=$(mktemp -d)
bin/jsii-pacmak -o ${outdir} --recurse node_modules/jsii-calc -vv
