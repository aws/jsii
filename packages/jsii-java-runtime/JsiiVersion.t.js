const version = require('jsii-runtime/package.json').version;
process.stdout.write(`package org.jsii;

final class JsiiVersion {
    static final String JAVA_RUNTIME_VERSION = "jsii-runtime@${version}";
}
`);