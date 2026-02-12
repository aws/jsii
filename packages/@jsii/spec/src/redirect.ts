import { formatErrors } from './format-errors';

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
export const assemblyRedirectSchema = require('../schema/assembly-redirect.schema.json');

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { validateRedirect: validateSchema } = require('../lib/validators');

const SCHEMA = 'jsii/file-redirect';

export interface AssemblyRedirect {
  readonly schema: typeof SCHEMA;

  /**
   * The compression applied to the target file, if any.
   */
  readonly compression?: 'gzip';

  /**
   * The name of the file the assembly is redirected to.
   */
  readonly filename: string;
}

/**
 * Checks whether the provided value is an assembly redirect. This only checks
 * for presence of the correct value in the `schema` attribute. For full
 * validation, `validateAssemblyRedirect` should be used instead.
 *
 * @param obj the value to be tested.
 *
 * @returns `true` if the value is indeed an AssemblyRedirect.
 */
export function isAssemblyRedirect(obj: unknown): obj is AssemblyRedirect {
  if (typeof obj !== 'object' || obj == null) {
    return false;
  }
  return (obj as any).schema === SCHEMA;
}

/**
 * Validates the provided value as an assembly redirect.
 *
 * @param obj the value to be tested.
 *
 * @returns the validated value.
 */
export function validateAssemblyRedirect(obj: unknown): AssemblyRedirect {
  if (!validateSchema(obj)) {
    throw new Error(
      `Invalid assembly redirect:\n * ${formatErrors(validateSchema.errors, 'redirect')}`,
    );
  }

  return obj as AssemblyRedirect;
}
