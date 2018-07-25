#!/bin/bash
set -euo pipefail

# Generates the necessary files to test the JSII runtime
# * Java bindings for jsii-calc (and it's JSII dependencies)
# * A maven user settings file to allow maven to use local repositories appropriately
# * A POM file for the test project, that references the dependencies correctly
# Executing this script is required for the test-project to be buildable

mkdir -p conf
/usr/bin/env node ./user.xml.t.js > conf/user.xml

staging="maven-repo"
mkdir -p ${staging}
for ASSM in $(node toposort.js $(find ./node_modules/jsii-calc -follow -name .jsii)); do
    echo "Generating java bindings for ${ASSM}"
    jsii-pacmak --target java --outdir ${staging} $(dirname ${ASSM}) --mvn-settings=${PWD}/conf/user.xml
done

# generate pom.xml and JsiiVersion.java with version from package.json
/usr/bin/env node ./pom.xml.t.js > ./project/pom.xml
