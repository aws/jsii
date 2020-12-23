import { AssemblyTargets } from '@jsii/spec';
import { Schema, Validator } from 'jsonschema';
import { DiagnosticCategory } from 'typescript';

/**
 * The key which is used in tsconfig.json to store the jsii configuration.
 */
export const JSII_CONFIG_ENTRY = 'x-jsii';

/**
 * jsii configuration data.
 */
export interface JsiiConfigBlock {
  /**
   * Diagnostic message severity configuration
   */
  readonly diagnostics?: {
    readonly [code: string]: keyof typeof DiagnosticCategory;
  };

  /**
   * What kind of version format to emit in the generated assembly documents.
   *
   * @default 'full'
   */
  readonly jsiiVersionFormat?: 'short' | 'full';

  /**
   * Additional metadata to record in the assembly, for application-specific
   * purposes.
   */
  readonly metadata?: { readonly [key: string]: any };

  /**
   * Language target configuration blocks.
   */
  readonly targets: AssemblyTargets;
}

/**
 * Validates a jsii configuration block using json schema (the schema itself can
 * be found in this package, under schema/jsii-config.schema.json).
 *
 * @param config the configuration to be validated.
 *
 * @returns the validated configuration.
 */
export function validateJsiiConfigBlock(config: any): JsiiConfigBlock {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
  const schema: Schema = require('../../schema/jsii-config.schema.json');

  const validator = new Validator();
  validator.addSchema(schema);

  const result = validator.validate(config, schema, { nestedErrors: true });
  if (!result.valid) {
    throw new Error(
      `Invalid ${JSII_CONFIG_ENTRY} configuration: ${result.toString()}`,
    );
  }

  return config;
}
