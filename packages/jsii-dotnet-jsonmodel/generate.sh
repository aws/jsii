#!/bin/bash
set -euo pipefail
src="./src"

# Generate Directory.Build.props
/usr/bin/env node ./Directory.Build.props.t.js > ${src}/Directory.Build.props

