import { Schema, Validator } from 'jsonschema';

import { Assembly } from './assembly';

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
export const schema: Schema = require('../schema/jsii-spec.schema.json');

export function validateAssembly(obj: any): Assembly {
  const validator = new Validator();
  validator.addSchema(schema); // For definitions
  const result = validator.validate(obj, schema, { nestedErrors: true });
  if (result.valid) {
    return obj;
  }
  throw new Error(`Invalid assembly:\n${result.toString()}`);
}
