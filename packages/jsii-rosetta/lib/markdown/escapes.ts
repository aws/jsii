export interface Escaper {
  /**
   * Escape for use in XML/HTML text
   */
  text(x: string | null): string;

  /**
   * Escape for use in XML/HTML attributes
   */
  attribute(x: string | null): string;

  /**
   * Re-escape a string that has been escaped for text to be escaped for attributes
   *
   * Conceptually this unescapes text back to raw and re-escapes for attributes,
   * but for speed in practice we just do the additional escapes.
   */
  text2attr(x: string | null): string;
}

/**
 * Make a generic XML escaper
 */
export function makeXmlEscaper(): Escaper {
  const attr: Escapes = [...TEXT, ...ATTR_ADDL];

  return {
    text: (x) => escapeText(TEXT, x),
    attribute: (x) => escapeText(attr, x),
    text2attr: (x) => escapeText(ATTR_ADDL, x),
  };
}

/**
 * Make a Java specific escaper
 *
 * This one also escapes '@' because that triggers parsing of comment directives
 * in Java.
 */
export function makeJavaEscaper(): Escaper {
  const javaText: Escapes = [...TEXT, [new RegExp('@', 'g'), '&#64;']];
  const javaAttr: Escapes = [...javaText, ...ATTR_ADDL];

  return {
    text: (x) => escapeText(javaText, x),
    attribute: (x) => escapeText(javaAttr, x),
    text2attr: (x) => escapeText(ATTR_ADDL, x),
  };
}

type Escapes = Array<[RegExp, string]>;

const TEXT: Escapes = [
  [new RegExp('&', 'g'), '&amp;'],
  [new RegExp('<', 'g'), '&lt;'],
  [new RegExp('>', 'g'), '&gt;'],
];

// Additional escapes (in addition to the text escapes) which need to be escaped inside attributes.
const ATTR_ADDL: Escapes = [
  [new RegExp('"', 'g'), '&quot;'],
  [new RegExp("'", 'g'), '&apos;'],
];

function escapeText(set: Escapes, what: string | null): string {
  if (!what) {
    return '';
  }

  for (const [re, repl] of set) {
    what = what.replace(re, repl);
  }

  return what;
}
