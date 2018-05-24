/**
 * Can be passed to JSON.stringify to filter out empty arrays and objects.
 */
export function filterEmpty(key: any, value: any): any {
    key;
    
    if (Array.isArray(value) && value.length == 0) {
        return undefined;
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return undefined;
    }

    return value;
}
