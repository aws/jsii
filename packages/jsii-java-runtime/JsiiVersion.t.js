const version = require('jsii-runtime/package.json').version;
process.stdout.write(`package org.jsii;

final class JsiiVersion {
    /** The version of the jsii-runtime this client was tested with **/
    static final String JSII_RUNTIME_VERSION = "jsii-runtime@${version}";
}
`);