#!/bin/bash
# verifies that the package does not introduce breaking changes to APIs
# against the currently published version.
set -euo pipefail
script_dir="$(cd $(dirname $0) && pwd)"
package_name=$(node -p "require('./package.json').name")
exec npx jsii-diff --keys npm:${package_name}
