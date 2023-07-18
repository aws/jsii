/**
 * Doc Comment parsing
 *
 * I tried using TSDoc here.
 *
 * Pro:
 * - Future standard.
 * - Does validating parsing and complains on failure.
 * - Has a more flexible interpretation of the @example tag (starts in text mode).
 *
 * Con:
 * - Different tags from JSDoc (@defaultValue instead of @default, "@param name
 *   description" instead "@param name description".
 * - @example tag has a different interpretation than VSCode and JSDoc
 *   (VSCode/JSDoc starts in code mode), which is confusing for syntax
 *   highlighting in the editor.
 * - Allows no unknown tags.
 * - Wants to be in charge of parsing TypeScript, integrating into other build is
 *   possible but harder.
 * - Parse to a DOM with no easy way to roundtrip back to equivalent MarkDown.
 *
 * Especially the last point: while parsing to and storing the parsed docs DOM
 * in the jsii assembly is superior in the long term (for example for
 * converting to different output formats, JavaDoc, C# docs, refdocs which all
 * accept slightly different syntaxes), right now we can get 80% of the bang
 * for 10% of the buck by just reading, storing and reproducing MarkDown, which
 * is Readable Enough(tm).
 *
 * If we ever want to attempt TSDoc again, this would be a good place to look at:
 *
 * https://github.com/Microsoft/tsdoc/blob/master/api-demo/src/advancedDemo.ts
 */
import * as spec from '@jsii/spec';
import * as ts from 'typescript';

/**
 * Tags that we recognize
 */
enum DocTag {
  PARAM = 'param',
  DEFAULT = 'default',
  DEFAULT_VALUE = 'defaultValue',
  DEPRECATED = 'deprecated',
  RETURNS = 'returns',
  RETURN = 'return',
  STABLE = 'stable',
  EXPERIMENTAL = 'experimental',
  SEE = 'see',
  SUBCLASSABLE = 'subclassable',
  EXAMPLE = 'example',
  STABILITY = 'stability',
  STRUCT = 'struct',
}

/**
 * Parse all doc comments that apply to a symbol into JSIIDocs format
 */
export function parseSymbolDocumentation(
  sym: ts.Symbol,
  typeChecker: ts.TypeChecker,
): DocsParsingResult {
  const comment = ts
    .displayPartsToString(sym.getDocumentationComment(typeChecker))
    .trim();
  const tags = reabsorbExampleTags(sym.getJsDocTags());

  // Right here we'll just guess that the first declaration site is the most important one.
  return parseDocParts(comment, tags);
}

/**
 * Return the list of parameter names that are referenced in the docstring for this symbol
 */
export function getReferencedDocParams(sym: ts.Symbol): string[] {
  const ret = new Array<string>();
  for (const tag of sym.getJsDocTags()) {
    if (tag.name === DocTag.PARAM.valueOf()) {
      const parts = (tag.text ?? '').split(' ');
      ret.push(parts[0]);
    }
  }
  return ret;
}

function parseDocParts(
  comments: string | undefined,
  tags: ts.JSDocTagInfo[],
): DocsParsingResult {
  const diagnostics = new Array<string>();
  const docs: spec.Docs = {};
  const hints: TypeSystemHints = {};

  [docs.summary, docs.remarks] = splitSummary(comments);

  const tagNames = new Map<string, string | undefined>();
  for (const tag of tags) {
    // 'param' gets parsed as a tag and as a comment for a method
    if (tag.name !== DocTag.PARAM.valueOf()) {
      tagNames.set(tag.name, tag.text);
    }
  }

  function eatTag(...names: string[]): string | undefined {
    for (const name of names) {
      if (tagNames.has(name)) {
        const ret = tagNames.get(name);
        tagNames.delete(name);
        return ret ?? '';
      }
    }
    return undefined;
  }

  if (eatTag(DocTag.STRUCT) != null) {
    hints.struct = true;
  }

  docs.default = eatTag(DocTag.DEFAULT, DocTag.DEFAULT_VALUE);
  docs.deprecated = eatTag(DocTag.DEPRECATED);
  docs.example = eatTag(DocTag.EXAMPLE);
  docs.returns = eatTag(DocTag.RETURNS, DocTag.RETURN);
  docs.see = eatTag(DocTag.SEE);
  docs.subclassable =
    eatTag(DocTag.SUBCLASSABLE) !== undefined ? true : undefined;

  docs.stability = parseStability(eatTag(DocTag.STABILITY), diagnostics);
  //  @experimental is a shorthand for '@stability experimental', same for '@stable'
  const experimental = eatTag(DocTag.EXPERIMENTAL) !== undefined;
  const stable = eatTag(DocTag.STABLE) !== undefined;
  // Can't combine them
  if (countBools(docs.stability !== undefined, experimental, stable) > 1) {
    diagnostics.push('Use only one of @stability, @experimental or @stable');
  }
  if (experimental) {
    docs.stability = spec.Stability.Experimental;
  }
  if (stable) {
    docs.stability = spec.Stability.Stable;
  }

  // Can combine '@stability deprecated' with '@deprecated <reason>'
  if (docs.deprecated !== undefined) {
    if (
      docs.stability !== undefined &&
      docs.stability !== spec.Stability.Deprecated
    ) {
      diagnostics.push(
        "@deprecated tag requires '@stability deprecated' or no @stability at all.",
      );
    }
    docs.stability = spec.Stability.Deprecated;
  }

  if (docs.example?.includes('```')) {
    // This is currently what the JSDoc standard expects, and VSCode highlights it in
    // this way as well. TSDoc disagrees and says that examples start in text mode
    // which I tend to agree with, but that hasn't become a widely used standard yet.
    //
    // So we conform to existing reality.
    diagnostics.push(
      '@example must be code only, no code block fences allowed.',
    );
  }

  if (docs.deprecated?.trim() === '') {
    diagnostics.push(
      '@deprecated tag needs a reason and/or suggested alternatives.',
    );
  }

  if (tagNames.size > 0) {
    docs.custom = {};
    for (const [key, value] of tagNames.entries()) {
      docs.custom[key] = value ?? 'true'; // Key must have a value or it will be stripped from the assembly
    }
  }

  return { docs, diagnostics, hints };
}

export interface DocsParsingResult {
  docs: spec.Docs;
  hints: TypeSystemHints;
  diagnostics?: string[];
}

export interface TypeSystemHints {
  /**
   * Only present on interfaces. This indicates that interface must be handled as a struct/data type
   * even through it's name starts with a capital letter `I`.
   */
  struct?: boolean;
}

/**
 * Split the doc comment into summary and remarks
 *
 * Normally, we'd expect people to split into a summary line and detail lines using paragraph
 * markers. However, a LOT of people do not do this, and just paste a giant comment block into
 * the docstring. If we detect that situation, we will try and extract the first sentence (using
 * a period) as the summary.
 */
export function splitSummary(
  docBlock: string | undefined,
): [string | undefined, string | undefined] {
  if (!docBlock) {
    return [undefined, undefined];
  }
  const summary = summaryLine(docBlock);
  const remarks = uberTrim(docBlock.slice(summary.length));
  return [endWithPeriod(noNewlines(summary.trim())), remarks];
}

/**
 * Replace newlines with spaces for use in tables
 */
function noNewlines(s: string) {
  return s.replace(/\n/g, ' ');
}

function endWithPeriod(s: string) {
  return ENDS_WITH_PUNCTUATION_REGEX.test(s) ? s : `${s}.`;
}

/**
 * Trims a string and turns it into `undefined` if the result would have been an
 * empty string.
 */
function uberTrim(str: string): string | undefined {
  str = str.trim();
  return str === '' ? undefined : str;
}

const SUMMARY_MAX_WORDS = 20;

/**
 * Find the summary line for a doc comment
 *
 * In principle we'll take the first paragraph, but if there are no paragraphs
 * (because people don't put in paragraph breaks) or the first paragraph is too
 * long, we'll take the first sentence (terminated by a punctuation).
 */
function summaryLine(str: string) {
  const paras = str.split('\n\n');
  if (paras.length > 1 && paras[0].split(' ').length < SUMMARY_MAX_WORDS) {
    return paras[0];
  }

  const m = FIRST_SENTENCE_REGEX.exec(str);
  if (m) {
    return m[1];
  }

  return paras[0];
}

const PUNCTUATION = ['!', '?', '.', ';'].map((s) => `\\${s}`).join('');
const ENDS_WITH_PUNCTUATION_REGEX = new RegExp(`[${PUNCTUATION}]$`);
const FIRST_SENTENCE_REGEX = new RegExp(
  `^([^${PUNCTUATION}]+[${PUNCTUATION}][ \n\r])`,
); // Needs a whitespace after the punctuation.

function intBool(x: boolean): number {
  return x ? 1 : 0;
}

function countBools(...x: boolean[]) {
  return x.map(intBool).reduce((a, b) => a + b, 0);
}

function parseStability(
  s: string | undefined,
  diagnostics: string[],
): spec.Stability | undefined {
  if (s === undefined) {
    return undefined;
  }

  switch (s) {
    case 'stable':
      return spec.Stability.Stable;
    case 'experimental':
      return spec.Stability.Experimental;
    case 'external':
      return spec.Stability.External;
    case 'deprecated':
      return spec.Stability.Deprecated;
  }
  diagnostics.push(`Unrecognized @stability: '${s}'`);
  return undefined;
}

/**
 * Unrecognized tags that follow an '@ example' tag will be absorbed back into the example value
 *
 * The TypeScript parser by itself is naive and will start parsing a new tag there.
 *
 * We do this until we encounter a supported @ keyword.
 */
function reabsorbExampleTags(tags: ts.JSDocTagInfo[]): ts.JSDocTagInfo[] {
  const recognizedTags: string[] = Object.values(DocTag);
  const ret = [...tags];

  let i = 0;
  while (i < ret.length) {
    if (ret[i].name === 'example') {
      while (i + 1 < ret.length && !recognizedTags.includes(ret[i + 1].name)) {
        // Incorrectly classified as @tag, absorb back into example
        ret[i].text += `@${ret[i + 1].name}${ret[i + 1].text}`;
        ret.splice(i + 1, 1);
      }
    }
    i++;
  }

  return ret;
}
