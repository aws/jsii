import jsonschema = require('jsonschema');
import { Assembly } from './spec';

// tslint:disable-next-line:no-var-requires
export const schema: jsonschema.Schema = require('../schema/jsii-spec.schema.json');

export function validateAssembly(obj: any): Assembly {
    const validator = new jsonschema.Validator();
    const result = validator.validate(obj, schema);
    if (result.valid) { return obj; }
    throw new Error(`Invalid assembly:\n${result}`);
}
