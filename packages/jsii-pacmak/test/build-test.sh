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
case "${OSTYPE}" in
"msys" | "cygwin" | "win32")
    # On Windows, there is usually no python3.exe (the GitHub action workers will have a python3
    # shim, but using this actually results in a WinError with Python 3.7 and 3.8 where venv will
    # fail to copy the python binary if it's not invoked as python.exe). More on this particular
    # issue can be read here: https://bugs.python.org/issue43749
    PYTHON='python'
    ;;
*)
    PYTHON='python3'
    ;;
esac

venv="${outdir}/.env"
${PYTHON} -m venv ${venv}
if [ -f ${venv}/bin/activate ]; then
    . ${venv}/bin/activate
else
    # Hello Windows!
    . ${venv}/Scripts/activate
fi
${PYTHON} -m pip install --upgrade pip~=22.0 twine~=4.0

# Provision a specific NuGet package cache
NUGET_CACHE=${outdir}/.nuget/packages
OPTS="--dotnet-nuget-global-packages-folder=${NUGET_CACHE}"

# Single target, recursive build to a certain location
clean_dists
echo "Testing SINGLE TARGET, RECURSIVE build."
../bin/jsii-pacmak ${OPTS} -v -o ${outdir} --recurse ../../jsii-calc

# Multiple targets, build one-by-one into own directory
clean_dists
echo "Testing ONE-BY-ONE build."
for dir in $packagedirs; do
    ../bin/jsii-pacmak ${OPTS} -v $dir
done

# Multiple targets, build all at once into own directory
clean_dists
echo "Testing ALL-AT-ONCE build."
../bin/jsii-pacmak ${OPTS} -v --no-parallel $packagedirs
