import * as spec from '@jsii/spec';

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const spdx: Set<string> = require('spdx-license-list/simple');

export function validateLicense(text: string): string | never {
  if (text === 'UNLICENSED') {
    return text;
  }
  if (!spdx.has(text)) {
    throw new Error(
      `Invalid license identifier: "${text}", see valid license identifiers at https://spdx.org/licenses`,
    );
  }
  return text;
}

export function validateStability(text: string): spec.Stability | never {
  const validValues = Object.values(spec.Stability);
  for (const value of validValues) {
    if (value === text) {
      return value;
    }
  }
  throw new Error(
    `Invalid stability rating: "${text}", valid values are ${validValues
      .map((val) => `"${val}"`)
      .join(', ')}`,
  );
}
