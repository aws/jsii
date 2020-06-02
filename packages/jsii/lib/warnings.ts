/**
 * Indicates which warnings are currently enabled. By default all warnings are
 * enabled, and can be silenced through the --silence-warning option.
 */
export const enabledWarnings: { [name: string]: boolean } = {
  'reserved-word': true,
};
