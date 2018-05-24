import * as camelcase from 'camelcase'
import * as decamelize from 'decamelize'

export function toCamelCase(...args: string[]) {
    return camelcase(...args);
}

export function toPascalCase(...args: string[]) {
    const v = toCamelCase(...args);
    return v.charAt(0).toUpperCase() + v.slice(1);
}

export function toSnakeCase(s: string, sep = '_') {
    return decamelize(s, sep)
}
