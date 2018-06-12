///!MATCH_ERROR: 'PROP' is a static property and must use camel-case

export class MyClass {
    static get PROP() {
        return 123;
    }
}
