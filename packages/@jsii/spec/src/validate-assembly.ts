import { Assembly } from './assembly';
import { formatErrors } from './format-errors';

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
export const schema = require('../schema/jsii-spec.schema.json');

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { validateAssembly: validateSchema } = require('../lib/validators');

export function validateAssembly(obj: any): Assembly {
  if (!validateSchema(obj)) {
    let descr = '';
    if (typeof obj.name === 'string' && obj.name !== '') {
      descr =
        typeof obj.version === 'string'
          ? ` ${obj.name}@${obj.version}`
          : ` ${obj.name}`;
    }
    throw new Error(
      `Invalid assembly${descr}:\n * ${formatErrors(validateSchema.errors, 'assembly')}`,
    );
  }
  return obj;
}
