#!/bin/bash
set -e
cd $(dirname $0)

langs=$((cd ../lib/generators && ls -1 *.d.ts) | sed -e 's/\.d\.ts//')
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

    echo "=========================================================================================="
    echo " module: ${module}"
    echo "=========================================================================================="

    # creating reference tgz for module ${module} (to avoid binary diffs across platforms)...
    local expected_tarball="${module_root}/$(cd ${module_root} && npm pack --ignore-scripts 2>/dev/null)"
    local workdir=$(mktmpdir)
    mv ${expected_tarball} ${workdir}
    local expected_tarball="${workdir}/$(basename ${expected_tarball})"

    for lang in $langs; do
        local outdir="$(mktmpdir)"
        local original_expected="$PWD/expected.${lang}.${module}"
        local expected="$(mktmpdir)"

        if [ -d ${original_expected} ]; then
            rsync -a ${original_expected}/ ${expected}/
        fi

        # put the real expected tarball instead of the placeholder
        local expected_tarball_placeholder="$(find ${expected} -name "*.tgz" || true)"
        if [ -n "${expected_tarball_placeholder}" ]; then
            rm -f ${expected_tarball_placeholder} && cp ${expected_tarball} ${expected_tarball_placeholder}
        fi

        echo
        echo "Running jsii-pacmak for language ${lang}"
        echo "    Actual: ${outdir}"
        echo "    Expected: ${original_expected}"
        ../bin/jsii-pacmak -t ${lang} -o ${outdir} ${module_root}

        # change the placeholder back
        if [ -n "${expected_tarball_placeholder}" ]; then
            local original_expected_tarball_placeholder="$(find ${original_expected} -name "*.tgz")"
            echo "Placeholder for the expected module tarball"                              > ${original_expected_tarball_placeholder}
            echo "The diff-test.sh harness will replace it with the real expected tarball" >> ${original_expected_tarball_placeholder}
        fi

        if ! diff -arq ${outdir} ${expected}; then
            echo
            echo "------------------------------------------------------------------------"
            echo " diff-test for pacmak generator ${lang}/${module} failed"
            echo "------------------------------------------------------------------------"
            echo " To update expectation run:"
            echo "    rsync -av --delete ${outdir}/ ${original_expected}/"
            echo "------------------------------------------------------------------------"
            success=false
        fi
    done

    echo
    echo "SUCCESS"
    echo
}

assert-generator jsii-calc
assert-generator jsii-calc-lib

if ${success}; then
    # only remove working directory if tests pass. Otherwise, user might want to
    # update their expectations.
    rm -fr "${workdir}"
else
    echo "SOME TESTS FAILED"
fi

