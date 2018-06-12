///!MATCH_ERROR: 'Prop' is a static property and must use camel-case

export class MyClass {
    static get Prop() {
        return 123;
    }
}
