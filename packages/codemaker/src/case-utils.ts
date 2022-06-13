import * as camelcase from 'camelcase';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import decamelize = require('decamelize');

const COMMON_ABBREVIATIONS = ['KiB', 'MiB', 'GiB'];

export function toCamelCase(...args: string[]): string {
  return camelcase(args);
}

export function toPascalCase(...args: string[]): string {
  return camelcase(args, { pascalCase: true });
}

const ABBREV_RE = new RegExp(
  `(^|[^A-Z])(${COMMON_ABBREVIATIONS.map(regexQuote).join('|')})($|[^a-z])`,
  'g',
);
export function toSnakeCase(s: string, separator = '_'): string {
  // Save common abbrevations
  s = s.replace(
    ABBREV_RE,
    (_, before: string, abbr: string, after: string) =>
      before + ucfirst(abbr.toLowerCase()) + after,
  );
  return decamelize(s, { separator });

  function ucfirst(str: string) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  }
}

function regexQuote(s: string) {
  return s.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}
