///!MATCH_ERROR: Method and property names must use camelCase: Prop

export class MyClass {
    static get Prop() {
        return 123;
    }
}
