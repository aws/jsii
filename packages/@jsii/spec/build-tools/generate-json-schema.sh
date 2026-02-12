#!/bin/bash
set -euo pipefail

{
    # Input
    INPUT_FILE='lib/assembly.d.ts'

    # Output
    OUTPUT_DIR='schema'
    OUTPUT_FILE="${OUTPUT_DIR}/jsii-spec.schema.json"

    mkdir -p ${OUTPUT_DIR}

    echo "Generating JSON schema into ${OUTPUT_FILE}"
    typescript-json-schema                   \
        ${INPUT_FILE}      'Assembly'        \
        --out              ${OUTPUT_FILE}    \
        --refs             true              \
        --required         true              \
        --strictNullChecks true              \
        --topRef           true
}

{
    # Input
    INPUT_FILE='lib/redirect.d.ts'

    # Output
    OUTPUT_DIR='schema'
    OUTPUT_FILE="${OUTPUT_DIR}/assembly-redirect.schema.json"

    mkdir -p ${OUTPUT_DIR}

    echo "Generating JSON schema into ${OUTPUT_FILE}"
    typescript-json-schema                   \
        ${INPUT_FILE}      'AssemblyRedirect'\
        --out              ${OUTPUT_FILE}    \
        --refs             true              \
        --required         true              \
        --strictNullChecks true              \
        --topRef           true
}

# Generate standalone validation code from schemas
echo "Generating standalone validation code"
node build-tools/generate-validators.js
