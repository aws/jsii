#!/bin/bash
set -e
cd $(dirname $0)

langs=$((cd ../lib/generators && ls -1 *.d.ts) | sed -e 's/\.d\.ts//')

function assert-generator() {
    local module=$1
    local module_root="$(cd ../../${module} && pwd)"

    echo "=========================================================================================="
    echo " module: ${module}"
    echo "=========================================================================================="

    # creating reference tgz for module ${module} (to avoid binary diffs across platforms)...
    local tarball="${module_root}/$(cd ${module_root} && npm pack --ignore-scripts 2>/dev/null)"
    local workdir=$(mktemp -d)
    mv ${tarball} ${workdir}
    local tarball="${workdir}/$(basename ${tarball})"

    for lang in $langs; do
        local outdir="$(mktemp -d)"
        local expected="$PWD/expected.${lang}.${module}"

        local expected_tarball=$(find ${expected} -name "*.tgz" || true)
        if [ -n "${expected_tarball}" ]; then
            rm -f ${expected_tarball} && cp ${tarball} ${expected_tarball}
        fi

        echo
        echo "Running jsii-pacmak for language ${lang}"
        echo "    Actual: ${outdir}"
        echo "    Expected: ${expected}"
        ../bin/jsii-pacmak -t ${lang} -o ${outdir} ${module_root}

        if ! diff -arq ${outdir} ${expected}; then
            echo
            echo "------------------------------------------------------------------------"
            echo " diff-test for pacmak generator ${lang}/${module} failed"
            echo "------------------------------------------------------------------------"
            echo " To update expectation run:"
            echo "    rsync -av --delete ${outdir}/ ${expected}/"
            echo "------------------------------------------------------------------------"
            exit 1
        fi
    done

    echo
    echo "SUCCESS"
    echo
}

assert-generator jsii-calc
assert-generator jsii-calc-lib
