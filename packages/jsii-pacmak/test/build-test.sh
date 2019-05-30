#!/bin/bash
set -euo pipefail
outdir=$(mktemp -d)
# TODO: uncomment this for building jsii-calc
# bin/jsii-pacmak -o ${outdir} --recurse node_modules/jsii-calc -vv