#!/bin/bash
set -e
cd $(dirname $0)
langs=$((cd ../lib/generators && ls -1 *.d.ts) | sed -e 's/\.d\.ts//')

for lang in $langs; do
    outdir="$(mktemp -d)"
    expected="$PWD/expected.${lang}"
    echo
    echo "Running jsii-pacmak for language ${lang}"
    echo "    Actual: ${outdir}"
    echo "    Expected: ${expected}"
    ../bin/jsii-pacmak -t ${lang} -o ${outdir} ../../jsii-calc/dist/

    if ! diff -arq ${outdir} ${expected}; then
        echo
        echo "------------------------------------------------------------------------"
        echo " diff-test for pacmak generator ${lang} failed"
        echo "------------------------------------------------------------------------"
        echo " To update expectation run:"
        echo "    rsync -av --delete ${outdir}/ ${expected}/"
        echo "------------------------------------------------------------------------"
        exit 1
    fi
done
