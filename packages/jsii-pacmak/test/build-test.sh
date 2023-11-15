#!/bin/bash
set -euo pipefail
cd $(dirname $0)

# Test various build modes for jsii-pacmak (these are all ways in
# which users can decide to run jsii-pacmak)
#
# The following list of packages must be toposorted, like a monorepo
# manager would order the individual builds.
pacmak=${PWD}/../bin/jsii-pacmak
packagedirs="\
    ${PWD}/../../@scope/jsii-calc-base-of-base \
    ${PWD}/../../@scope/jsii-calc-base \
    ${PWD}/../../@scope/jsii-calc-lib \
    ${PWD}/../../jsii-calc \
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

# Note the venv is not used by the jsii-pacmak commands
${PYTHON} -m pip install --upgrade pip>=23.3.1 setuptools>=68.0.0 wheel>=0.41.3 twine~=4.0

# Provision a specific NuGet package cache
NUGET_CACHE=${outdir}/.nuget/packages
OPTS="--dotnet-nuget-global-packages-folder=${NUGET_CACHE}"

# Single target, recursive build to a certain location
clean_dists
echo "Testing SINGLE TARGET, RECURSIVE build."
(
    # Run from the ${outdir} and use a relative --outdir value...
    calcdir=${PWD}/../../jsii-calc
    cd ${outdir}
    ${pacmak} ${OPTS} -v -o dist --recurse ${calcdir}
)
for tgt in dotnet go java python; do
    # Ensure the target artifacts have been created as expected...
    if [ ! -d "${outdir}/dist/${tgt}" ]; then
        echo "Assertion Failure: Expected a ${tgt} directory to exist in ${outdir}, but none found..."
        exit 1
    fi
done
rm -rf "${outdir}/dist"

# Multiple targets, build one-by-one into own directory
clean_dists
echo "Testing ONE-BY-ONE build."
for dir in $packagedirs; do
    ${pacmak} ${OPTS} -v $dir
done

# Multiple targets, build all at once into own directory
clean_dists
echo "Testing ALL-AT-ONCE build."
${pacmak} ${OPTS} -v --no-parallel $packagedirs

# Test custom pack command
clean_dists
echo "Testing yarn custom pack command."
${pacmak} ${OPTS} -v --pack-command='yarn pack -f custom.tgz -s && echo custom.tgz' ${PWD}/../../@scope/jsii-calc-base-of-base

# Test custom mvn settings command
clean_dists
echo "Testing custom mvn parameters."
${pacmak} ${OPTS} -v --mvn-builder=singlethreaded --mvn-threads=4 $packagedirs
