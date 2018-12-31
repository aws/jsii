///!MATCH_ERROR: Method and non-static non-readonly property names must use camelCase: Prop

export class MyClass {
    static get Prop() {
        return 123;
    }
}
