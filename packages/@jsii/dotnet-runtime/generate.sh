#!/bin/bash
set -euo pipefail
src="./src"

# Generate metadata files based on package.json.
/usr/bin/env node ./Directory.Build.props.t.js > ${src}/Directory.Build.props
/usr/bin/env node ./NuGet.Metadata.props.t.js > ${src}/NuGet.Metadata.props

# Embed @jsii/runtime as a resource
bundle_dir="src/Amazon.JSII.Runtime/jsii-runtime"
mkdir -p ${bundle_dir}
rsync -av $(node -p 'require("path").dirname(require.resolve("@jsii/runtime/package.json"))')/webpack/ ${bundle_dir}


# Generate Source
/usr/bin/env node ./JsiiRuntimeProvider.t.js > ${src}/Amazon.JSII.Runtime/Services/JsiiRuntimeProvider.cs
