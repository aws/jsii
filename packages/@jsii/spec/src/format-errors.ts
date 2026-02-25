import type { ErrorObject } from 'ajv';

export function formatErrors(errors: ErrorObject[], dataVar: string): string {
  if (!errors || errors.length === 0) {
    return 'No errors';
  }
  return errors
    .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
    .join('\n * ');
}
