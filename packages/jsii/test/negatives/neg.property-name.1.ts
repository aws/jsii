///!MATCH_ERROR: ERROR 'PROP' must use camelCase

export class MyClass {
    PROP?: number;
}
