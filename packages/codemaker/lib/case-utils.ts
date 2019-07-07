import { default as camelcase } from 'camelcase';
import decamelize = require('decamelize');

const COMMON_ABBREVIATIONS = [
    'KiB',
    'MiB',
    'GiB',
];

export function toCamelCase(...args: string[]) {
    return camelcase(args);
}

export function toPascalCase(...args: string[]) {
    return camelcase(args, { pascalCase: true });
}

export function toSnakeCase(s: string, sep = '_') {
    // Save common abbrevations
    s = s.replace(ABBREV_RE, (_, before, abbr, after) => before + ucfirst(abbr.toLowerCase()) + after);
    return decamelize(s, sep);
}

function regexQuote(s: string) {
    return s.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

const ABBREV_RE = new RegExp('(^|[^A-Z])(' + COMMON_ABBREVIATIONS.map(regexQuote).join('|') + ')($|[^a-z])', 'g');

function ucfirst(s: string) {
    return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
}