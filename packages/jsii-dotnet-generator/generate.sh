#!/bin/bash
set -euo pipefail
src="./src"

# Generate JsiiVersion.cs and Directory.Build.props
/usr/bin/env node ./Directory.Build.props.t.js > ${src}/Directory.Build.props
/usr/bin/env node JsiiVersion.t.js > ${src}/Amazon.JSII.Generator/JsiiVersion.cs
