#!/bin/bash
set -euo pipefail
cd $(dirname $0)

# Test various build modes for jsii-pacmak (these are all ways in
# which users can decide to run jsii-pacmak)
#
# The following list of packages must be toposorted, like a monorepo
# manager would order the individual builds.
packagedirs="\
    ../../@scope/jsii-calc-base-of-base \
    ../../@scope/jsii-calc-base \
    ../../@scope/jsii-calc-lib \
    ../../jsii-calc \
    "
clean_dists() {
    for dir in $packagedirs; do rm -rf $dir/dist; done
}

outdir=$(mktemp -d)
final_cleanup() {
    rm -rf ${outdir}
}
trap final_cleanup EXIT

# Prepare Python venv to avoid depending on system stuff
venv="${outdir}/.env"
python3 -m venv ${venv}
if [ -f ${venv}/bin/activate ]; then
    . ${venv}/bin/activate
else
    # Hello Windows!
    . ${venv}/Scripts/activate
fi
python3 -m pip install pip~=20.0.2 setuptools~=46.1.3 wheel~=0.34.2 twine~=3.1.1

# Single target, recursive build to a certain location
clean_dists
echo "Testing SINGLE TARGET, RECURSIVE build."
../bin/jsii-pacmak -o ${outdir} --recurse ../../jsii-calc

# Multiple targets, build one-by-one into own directory
clean_dists
echo "Testing ONE-BY-ONE build."
for dir in $packagedirs; do
    ../bin/jsii-pacmak $dir
done

# Multiple targets, build all at once into own directory
clean_dists
echo "Testing ALL-AT-ONCE build."
../bin/jsii-pacmak $packagedirs
