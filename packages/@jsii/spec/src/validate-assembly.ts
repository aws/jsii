import Ajv from 'ajv';

import { Assembly } from './assembly';

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
export const schema = require('../schema/jsii-spec.schema.json');

export function validateAssembly(obj: any): Assembly {
  const ajv = new Ajv({
    allErrors: true,
  });
  const validate = ajv.compile(schema);
  validate(obj);

  if (validate.errors) {
    let descr = '';
    if (typeof obj.name === 'string' && obj.name !== '') {
      descr =
        typeof obj.version === 'string'
          ? ` ${obj.name}@${obj.version}`
          : ` ${obj.name}`;
    }
    throw new Error(
      `Invalid assembly${descr}:\n* ${ajv.errorsText(validate.errors, {
        separator: '\n* ',
        dataVar: 'assembly',
      })}`,
    );
  }
  return obj;
}
