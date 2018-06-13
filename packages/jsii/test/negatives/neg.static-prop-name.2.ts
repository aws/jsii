///!MATCH_ERROR: 'PROP' is a static property and must use camelCase

export class MyClass {
    static get PROP() {
        return 123;
    }
}
