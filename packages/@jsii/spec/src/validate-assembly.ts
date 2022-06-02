import Ajv from 'ajv';

import { Assembly } from './assembly';

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
export const schema = require('../schema/jsii-spec.schema.json');

export function validateAssembly(obj: any): Assembly {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  validate(obj);

  if (validate.errors) {
    throw new Error(
      `Invalid assembly:\n${validate.errors
        .map((e) => ` * ${e.message}`)
        .join('\n')
        .toString()}`,
    );
  }
  return obj;
}
