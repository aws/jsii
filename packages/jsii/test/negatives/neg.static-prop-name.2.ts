///!MATCH_ERROR: Method and property names must use camelCase: PROP

export class MyClass {
    static get PROP() {
        return 123;
    }
}
