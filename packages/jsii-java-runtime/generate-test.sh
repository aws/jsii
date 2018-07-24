#!/bin/bash
set -euo pipefail

mkdir -p conf
/usr/bin/env node ./user.xml.t.js > conf/user.xml

staging="test-maven-repo"
mkdir -p ${staging}
for ASSM in $(find ./node_modules/jsii-calc -follow -name .jsii); do
    echo "Generating java bindings for ${ASSM}"
    jsii-pacmak --target java --outdir ${staging} $(dirname ${ASSM}) --mvn-settings=${PWD}/conf/user.xml
done

# generate pom.xml and JsiiVersion.java with version from package.json
/usr/bin/env node ./test-pom.xml.t.js > ./test-project/pom.xml
