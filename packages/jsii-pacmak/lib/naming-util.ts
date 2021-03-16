/**
 * Converts a jsii method/property names to pascal-case.
 *
 * This is different from `toPascalCase()` since it only capitalizes the first
 * letter. This handles avoids duplicates of things like `toIsoString()` and `toISOString()`.
 * The assumption is that the jsii name is camelCased.
 *
 * @param camelCase The original jsii method name
 * @returns A pascal-cased method name.
 */
export function jsiiToPascalCase(camelCase: string) {
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}
