///!MATCH_ERROR: Method and non-static non-readonly property names must use camelCase: MethodIsNotCamelCase

export class MyClass {
    MethodIsNotCamelCase() {
        return "hi";
    }
}
