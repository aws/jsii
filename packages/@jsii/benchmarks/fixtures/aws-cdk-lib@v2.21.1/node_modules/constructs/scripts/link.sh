#!/bin/bash

# Creates a symlink under node_modules of a package consuming this library
# that replaces the version from NPM with this local version.
# Helpful when developing a project that depends on this library
# (like the AWS CDK),
# and needing to do some changes in this package -
# you can test your changes on a real consumer of this library.
#
# Usage:
#   cd my/project/that/uses/constructs/library
#   /path/to/source/of/constructs/scripts/link.sh

set -euo pipefail

# we are in scripts/, so the root is one level up
root="$(cd $(dirname $0)/.. && pwd)"
mkdir -p node_modules # -p makes mkdir not fail if the directory already exists
dest=node_modules/constructs

echo "Linking: '${root}' to '${dest}'"
rm -fr ${dest}
# since root is a directory, node_modules needs to be the destination
ln -fs ${root} node_modules
