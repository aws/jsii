#!/bin/bash
set -euo pipefail
outdir=src/test
jsii-pacmak --target java --outdir ${outdir} node_modules/jsii-calc-lib/dist
jsii-pacmak --target java --outdir ${outdir} node_modules/jsii-calc/dist

