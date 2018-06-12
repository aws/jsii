///!MATCH_ERROR: ERROR 'MethodIsNotCamelCase' must use camel-case

export class MyClass {
    MethodIsNotCamelCase() {
        return "hi";
    }
}
