export const enum SupportLevel {
  /**
   * Soft-deprecated, removed as of releases made starting at DEADLINE. This
   * will output a yellow warning to the console, until the DEADLINE has been
   * reached, at which point it'll be a SCARY RED WARNING.
   */
  DEPRECATED = 'end-of-life',

  /**
   * Supported releases, nothing to see. No message will be output.
   */
  SUPPORTED = 'supported',
  /**
   * EOL releases are unsupported, so this will emit a SCARY RED WARNING.
   */
  END_OF_LIFE = 'unsupported',

  /**
   * Those releases are newer than the current software package, so we have not
   * tested with it. People may encounter all kinds of weird bugs, especially
   * early in the release cycle... So we'll issue a yellow warning here.
   */
  UNTESTED = 'untested',
}

/**
 * The deadline after which deprecated releases will move to
 * `SupportLevel.END_OF_LIFE`.
 */
export const DEADLINE = '2021-09-01';
/**
 * The DEADLINE, expressed in milliseconds since the epoch.
 */
export const DEADLINE_EPOCH_MS = new Date(
  `${DEADLINE}T00:00:00.000Z`,
).getTime();

/**
 * For each SemVer range, what is the support level for such versions of Node.
 * The ranges are checked in declaration order (so it is a good idea to keep the
 * left-open ranges at the beginning, and the right-open ranges at the end.
 * First match wins.
 *
 * Also, if you are setting a new entry to `SupportLevel.DEPRECATED`, do not
 * forget to also change the `DEADLINE` value.
 */
export const VERSION_SUPPORT: { readonly [range: string]: SupportLevel } = {
  '<10.3.0': SupportLevel.END_OF_LIFE,
  '^10.3.0': SupportLevel.DEPRECATED,
  '^11.0.0-0': SupportLevel.END_OF_LIFE,
  '^12.4.0': SupportLevel.SUPPORTED,
  '^13.0.0-0': SupportLevel.END_OF_LIFE,
  '^14.5.0': SupportLevel.SUPPORTED,
  '^15.0.0-0': SupportLevel.END_OF_LIFE,
  '^16.3.0': SupportLevel.SUPPORTED,
  // Anything else will be treated as SupportLevel.UNTESTED.
};
