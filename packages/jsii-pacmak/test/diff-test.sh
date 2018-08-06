#!/bin/bash
set -e
cd $(dirname $0)

workdir="$(mktemp -d)"
success=true

function mktmpdir() {
    local newdir="${workdir}/$RANDOM"
    mkdir -p ${newdir}
    echo ${newdir}
}

function assert-generator() {
    local module=$1
    local module_root="$(cd ../../${module} && pwd)"

    # creating reference tgz for module ${module} (to avoid binary diffs across platforms)...
    local expected_tarball="${module_root}/$(cd ${module_root} && npm pack --ignore-scripts 2>/dev/null)"
    local workdir=$(mktmpdir)
    mv ${expected_tarball} ${workdir}
    local expected_tarball="${workdir}/$(basename ${expected_tarball})"

    local outdir="$(mktmpdir)"
    local original_expected="$PWD/expected.${module}"
    local expected="$(mktmpdir)"

    if [ -d ${original_expected} ]; then
        rsync -a ${original_expected}/ ${expected}/
    fi

    # put the real expected tarball instead of the placeholder
    for expected_tarball_placeholder in $(find ${expected} -name "*.tgz" || true); do
        rm -f ${expected_tarball_placeholder} && cp ${expected_tarball} ${expected_tarball_placeholder}
    done

    echo "Running jsii-pacmak test for ${module}"
    ../bin/jsii-pacmak --outdir ${outdir} ${module_root} --code-only --no-fingerprint

    # change the placeholder back
    for tarball_placeholder in $(find ${original_expected} -name "*.tgz" || true); do
        echo "Placeholder for the expected module tarball"                              > ${tarball_placeholder}
        echo "The diff-test.sh harness will replace it with the real expected tarball" >> ${tarball_placeholder}
    done

    if ! diff --strip-trailing-cr -arq ${outdir} ${expected}; then
        echo
        echo "------------------------------------------------------------------------"
        echo " diff-test for pacmak generator ${module} failed"
        echo "------------------------------------------------------------------------"
        echo " To update expectation run:"
        echo "    rsync -av --delete ${outdir}/ ${original_expected}/"
        echo "------------------------------------------------------------------------"
        success=false
    fi
}

assert-generator jsii-calc-base
assert-generator jsii-calc-lib
assert-generator jsii-calc

if ${success}; then
    # only remove working directory if tests pass. Otherwise, user might want to
    # update their expectations.
    rm -fr "${workdir}"
else
    echo "SOME TESTS FAILED"
    exit 1
fi

