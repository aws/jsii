///!MATCH_ERROR: ERROR 'MethodIsNotCamelCase' must use camelCase

export class MyClass {
    MethodIsNotCamelCase() {
        return "hi";
    }
}
