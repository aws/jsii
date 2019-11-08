import { default as camelcase } from 'camelcase';
import decamelize = require('decamelize');

const COMMON_ABBREVIATIONS = [
  'KiB',
  'MiB',
  'GiB',
];

export function toCamelCase(...args: string[]): string {
  return camelcase(args);
}

export function toPascalCase(...args: string[]): string {
  return camelcase(args, { pascalCase: true });
}

const ABBREV_RE = new RegExp(`(^|[^A-Z])(${COMMON_ABBREVIATIONS.map(regexQuote).join('|')})($|[^a-z])`, 'g');
export function toSnakeCase(s: string, sep = '_'): string {
  // Save common abbrevations
  s = s.replace(ABBREV_RE, (_, before, abbr, after) => before + ucfirst(abbr.toLowerCase()) + after);
  return decamelize(s, sep);

  function ucfirst(str: string) {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  }
}

function regexQuote(s: string) {
  return s.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}
