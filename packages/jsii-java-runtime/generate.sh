#!/bin/bash
set -euo pipefail
outdir=src/test
jsii-pacmak --target java --outdir ${outdir} node_modules/jsii-calc-lib/dist
jsii-pacmak --target java --outdir ${outdir} node_modules/jsii-calc/dist

# generate a java constant with the version number we should expect from jsii-runtime
version="$(node -e "console.log(require('./package.json').version)")"
version_java="src/main/java/org/jsii/JsiiVersion.java"
echo "Generating ${version_java} with version ${version}"

cat > ${version_java} <<HERE
package org.jsii;

@javax.annotation.Generated(value = "generate.sh", date = "$(date -u +"%Y-%m-%dT%H:%M:%SZ")")
final class JsiiVersion {
    private static final String BUILD_PART_REGEX = "\\\\+[a-z0-9]+$";
    private static final String RUNTIME_FULL_VERSION = "jsii-runtime@${version}";
    private static final String RUNTIME_VERSION = RUNTIME_FULL_VERSION.replace(BUILD_PART_REGEX, "");

    /**
     * Asserts that a peer runtimeVersion is compatible with this Java runtime version, which means
     * they share the same version components, with the possible exception of the build number.
     *
     * @param runtimeVersion the peer runtime's version, possibly including build number.
     *
     * @throws JsiiException if {@code runtimeVersion} and {@link RUNTIME_VERSION} aren't equal.
     */
    public static void assertCompatibleWith(final String runtimeVersion) {
        final String shortVersion = runtimeVersion.replace(BUILD_PART_REGEX, "");
        if (RUNTIME_VERSION.compareTo(shortVersion) != 0) {
            throw new JsiiException("Incompatible jsii-runtime version. Expecting "
                    + RUNTIME_VERSION
                    + ", actual was " + shortVersion);
        }
    }
}
HERE
