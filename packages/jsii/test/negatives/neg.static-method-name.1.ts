///!MATCH_ERROR: Method and property names must use camelCase: MethodIsNotCamelCase

export class MyClass {
    MethodIsNotCamelCase() {
        return "hi";
    }
}
