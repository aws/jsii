#!/bin/bash
set -euo pipefail

function generate_module() {
    local module=$1
    local outroot=$2

    local javadir=${outroot}/java
    local resourcedir=${outroot}/resources

    if [ ! -d "${module}/dist" ]; then
        echo "Cannot find module jsii dist directory: ${module}/dist"
        exit 1
    fi

    local staging=$(mktemp -d)
    jsii-pacmak --target java --outdir ${staging} ${module}/dist
    echo "staging: ${staging}"



    rsync -av ${staging}/ ${javadir}

    local assemblies="$(cd ${staging} && find . -name assembly.jsii)"
    for assembly in ${assemblies}; do
        local outdir="${resourcedir}/$(dirname ${assembly})"
        mkdir -p "${outdir}"
        echo "copying assembly ${assembly} to ${outdir}"
        cp -f "${staging}/${assembly}" "${outdir}"
    done
}

outdir=src/test

generate_module node_modules/jsii-calc-lib ${outdir}
generate_module node_modules/jsii-calc ${outdir}
