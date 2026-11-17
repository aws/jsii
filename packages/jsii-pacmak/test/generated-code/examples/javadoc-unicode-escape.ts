// See: https://github.com/aws/jsii/issues/3302

/**
 * Props with backslashes in their docs.
 */
export interface UnicodeEscapeProps {
  /**
   * A regular expression, for example "\u0041" or "\u<Unicode>".
   *
   * Paths look like C:\users\me.
   *
   * @deprecated use C:\users instead, \u002A/ must not end the comment
   */
  readonly pattern: string;
}

/**
 * Matches "\u<Unicode>" in C:\users.
 */
export class UnicodeEscape {
  /**
   * @param props lives in C:\users
   * @returns a "\u0041"
   */
  public static match(props: UnicodeEscapeProps): string {
    return props.pattern;
  }
}
