#!/bin/bash
set -euo pipefail
project="./project"

for ASSM in $(find ./node_modules/jsii-calc -follow -name .jsii); do
    staging="${TMPDIR}/generate"
    mkdir -p ${staging}
    jsii-pacmak --target java --outdir ${staging} $(dirname ${ASSM})
    cp -r ${staging}/src/main/* ${project}/src/test/
    rm -rf ${staging}
done

# generate pom.xml and JsiiVersion.java with version from package.json
/usr/bin/env node ./pom.xml.t.js > ${project}/pom.xml
/usr/bin/env node JsiiVersion.t.js > ${project}/src/main/java/org/jsii/JsiiVersion.java

# embed jsii-runtime as a resource
mkdir -p ${project}/src/main/resources/org/jsii
rsync -av node_modules/jsii-runtime/dist/ ${project}/src/main/resources/org/jsii
