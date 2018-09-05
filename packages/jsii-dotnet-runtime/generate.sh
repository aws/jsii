#!/bin/bash
set -euo pipefail
src="./src"

# Generate metadata files based on package.json.
/usr/bin/env node ./Directory.Build.props.t.js > ${src}/Directory.Build.props
/usr/bin/env node ./NuGet.Metadata.props.t.js > ${src}/NuGet.Metadata.props
