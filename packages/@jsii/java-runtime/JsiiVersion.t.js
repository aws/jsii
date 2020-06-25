const path = require('path');
const version = require('@jsii/runtime/package.json').version.replace(/\+.+$/, ''); // omit "+build" postfix;
process.stdout.write(`// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

package software.amazon.jsii;

@javax.annotation.Generated(value = "${path.basename(__filename)}", date = "${new Date().toISOString()}")
final class JsiiVersion {
    /** The version of the @jsii/runtime this client was tested with **/
    static final String JSII_RUNTIME_VERSION = "@jsii/runtime@${version}";
}
`);
