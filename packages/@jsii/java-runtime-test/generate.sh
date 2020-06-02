#!/bin/bash
set -euo pipefail

# consumed by user.xml.t.js
staging="maven-repo"
rm -fr ${staging} && mkdir -p ${staging}

# Remove local artifacts from local maven repository
rm -fr project/.m2/software/amazon/jsii

# generate user.xml & pom.xml
node ./user.xml.t.js > ./project/user.xml
node ./pom.xml.t.js > ./project/pom.xml

# build jsii-calc and all dep and output to MAVEN_REPO
jsii-pacmak ../../jsii-calc --outdir ${staging} -t java --recurse --verbose $@
