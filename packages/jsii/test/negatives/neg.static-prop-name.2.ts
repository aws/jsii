///!MATCH_ERROR: Method and non-static non-readonly property names must use camelCase: PROP

export class MyClass {
    static get PROP() {
        return 123;
    }
}
