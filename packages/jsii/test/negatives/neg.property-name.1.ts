///!MATCH_ERROR: ERROR 'PROP' must use camel-case

export class MyClass {
    PROP?: number;
}
