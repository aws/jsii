import { default as camelcase } from 'camelcase';
import * as decamelize from 'decamelize';

export function toCamelCase(...args: string[]) {
    return camelcase(args);
}

export function toPascalCase(...args: string[]) {
    return camelcase(args, { pascalCase: true });
}

export function toSnakeCase(s: string, sep = '_') {
    return decamelize(s, sep);
}
