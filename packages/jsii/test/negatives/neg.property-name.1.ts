///!MATCH_ERROR: 'PROP' must use camelCase (start with a lowercase letter)

export class MyClass {
    PROP?: number;
}
