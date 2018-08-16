/**
 * Can be passed to JSON.stringify to filter out empty arrays, objects and strings, as well as ``false``.
 */
export function filterEmpty(_key: any, value: any): any {
    if (Array.isArray(value) && value.length === 0) {
        return undefined;
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return undefined;
    }
    if (!value) {
        return undefined;
    }

    return value;
}
