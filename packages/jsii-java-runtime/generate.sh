#!/bin/bash
set -euo pipefail
project="./project"

for ASSM in $(find ./node_modules/jsii-calc -follow -name .jsii); do
    jsii-pacmak --target java --outdir ${project}/src/test $(dirname ${ASSM})
done

# generate pom.xml and JsiiVersion.java with version from package.json
/usr/bin/env node ./pom.xml.t.js > ${project}/pom.xml
/usr/bin/env node JsiiVersion.t.js > ${project}/src/main/java/org/jsii/JsiiVersion.java

# embed jsii-runtime as a resource
mkdir -p ${project}/src/main/resources/org/jsii
rsync -av node_modules/jsii-runtime/dist/ ${project}/src/main/resources/org/jsii
