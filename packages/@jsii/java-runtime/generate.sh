#!/bin/bash
set -euo pipefail
project="./project"
versions_plugin_version=2.20.1

mkdir -p conf

# generate pom.xml and JsiiVersion.java with version from package.json
/usr/bin/env node ./pom.xml.t.js > ${project}/pom.xml
/usr/bin/env node ./user.xml.t.js > ${project}/user.xml
/usr/bin/env node ./JsiiVersion.t.js > ${project}/src/main/java/software/amazon/jsii/JsiiVersion.java

# embed @jsii/runtime as a resource
mkdir -p ${project}/src/main/resources/software/amazon/jsii
rsync -av $(node -p 'require("path").dirname(require.resolve("@jsii/runtime/package.json"))')/webpack/ ${project}/src/main/resources/software/amazon/jsii

/usr/bin/env node ./BundledRuntime.t.js > ${project}/src/main/java/software/amazon/jsii/BundledRuntime.java

# Use the Maven 'versions' plugin to resolve our wide ranges to point versions.
# We want the "latest matching" version anyway (*), and if we don't the resolution
# now (which downloads the .poms of all possible versions) it will happen during
# every single build.
#
# (*) Consumers can still override versions in their own poms.
(cd $project && mvn org.codehaus.mojo:versions-maven-plugin:${versions_plugin_version}:resolve-ranges)