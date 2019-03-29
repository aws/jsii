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
import spec = require('jsii-spec');
import ts = require('typescript');

export function parseSymbolDocumentation(comments: string | undefined, tags: ts.JSDocTagInfo[]): DocsParsingResult {
  const diagnostics = new Array<string>();
  const docs: spec.Docs = {};

  [docs.summary, docs.remarks] = splitSummary(comments);

  const tagNames = new Map<string, string | undefined>();
  for (const tag of tags) {
    // 'param' gets parsed as a tag and as a comment for a method
    if (tag.name !== 'param') { tagNames.set(tag.name, tag.text); }
  }

  function eatTag(...names: string[]): string | undefined {
    for (const name of names) {
      if (tagNames.has(name)) {
        const ret = tagNames.get(name);
        tagNames.delete(name);
        return ret || '';
      }
    }
    return undefined;
  }

  docs.default = eatTag('default', 'defaultValue');
  docs.deprecated = eatTag('deprecated');
  docs.example = eatTag('example');
  docs.returns = eatTag('returns', 'return');
  docs.seeLink = eatTag('see');

  const experimental = eatTag('experimental') !== undefined;
  const stable = eatTag('stable') !== undefined;

  if (docs.example && docs.example.indexOf('```') >= 0) {
    diagnostics.push('@example must be code only, no code block fences allowed.');
  }

  if (experimental && stable) {
    diagnostics.push('Element is marked both @experimental and @stable.');
  }

  if (docs.deprecated !== undefined && docs.deprecated.trim() === '') {
    diagnostics.push('@deprecated tag needs a reason and/or suggested alternatives.');
  }

  if (experimental) { docs.stability = spec.Stability.Experimental; }
  if (stable) { docs.stability = spec.Stability.Stable; }

  if (tagNames.size > 0) {
    docs.custom = {};
    for (const [key, value] of tagNames.entries()) {
      docs.custom[key] = value || 'true';  // Key must have a value or it will be stripped from the assembly
    }
  }

  return { docs, diagnostics };
}

export interface DocsParsingResult {
  docs: spec.Docs;
  diagnostics?: string[];
}

/**
 * Split the doc comment into summary and remarks
 */
export function splitSummary(docBlock: string | undefined): [string | undefined, string | undefined] {
  if (!docBlock) { return [undefined, undefined]; }
  const summary = summaryLine(docBlock);
  const remarks = docBlock.substr(summary.length);
  return [endWithPeriod(noNewlines(summary.trim())), remarks.trim()];
}

/**
 * Replace newlines with spaces for use in tables
 */
function noNewlines(s: string) {
  return s.replace(/\n/g, ' ');
}

function endWithPeriod(s: string) {
  return s.endsWith('.') ? s : s + '.';
}

/**
 * Find the summary line for a doc comment
 *
 * In principle we'll take the first paragraph, but if there are no paragraphs
 * (because people don't put in paragraph breaks) or the first paragraph is too
 * lang, we'll take the first sentence (terminated by a period).
 */
function summaryLine(str: string) {
  const paras = str.split('\n\n');
  if (paras.length > 1 && paras[0].split(' ').length < 30) { return paras[0]; }

  const m = /^([^.]+\.)/.exec(str);
  if (m) { return m[1]; }

  return str;
}