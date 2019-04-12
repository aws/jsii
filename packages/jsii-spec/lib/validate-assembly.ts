import jsonschema = require('jsonschema');
import { Assembly } from './spec';

// tslint:disable-next-line:no-var-requires
export const schema: jsonschema.Schema = require('../schema/jsii-spec.schema.json');

export function validateAssembly(obj: any): Assembly {
    const validator = new jsonschema.Validator();
    validator.addSchema(schema); // For definitions
    const result = validator.validate(obj, schema, { nestedErrors: true } as any); // nestedErrors does exist but is not in the TypeScript definitions
    if (result.valid) { return obj; }
    throw new Error(`Invalid assembly:\n${result}`);
}