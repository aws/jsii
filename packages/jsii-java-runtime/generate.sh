#!/bin/bash
set -euo pipefail
project="./project"

mkdir -p conf

# generate pom.xml and JsiiVersion.java with version from package.json
/usr/bin/env node ./pom.xml.t.js > ${project}/pom.xml
/usr/bin/env node JsiiVersion.t.js > ${project}/src/main/java/software/amazon/jsii/JsiiVersion.java

# embed jsii-runtime as a resource
mkdir -p ${project}/src/main/resources/software/amazon/jsii
rsync -av node_modules/jsii-runtime/dist/ ${project}/src/main/resources/software/amazon/jsii
