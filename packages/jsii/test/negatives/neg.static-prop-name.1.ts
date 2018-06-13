///!MATCH_ERROR: 'Prop' is a static property and must use camelCase

export class MyClass {
    static get Prop() {
        return 123;
    }
}
