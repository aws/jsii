import { MODULE_NAME_PREFIX, MODULE_NAME_POSTFIX } from 'jsii-spec'

/**
 * Normalizes the name of a package to a jsii module name.
 * @param packageName npm package name (e.g. "aws-cdk-core")
 * @returns the jsii module name "aws_cdk_core"
 */
export function normalizeJsiiModuleName(packageName: string) {
    return MODULE_NAME_PREFIX + packageName.replace(/[^a-zA-Z0-9]/g, '_') + MODULE_NAME_POSTFIX;
}
