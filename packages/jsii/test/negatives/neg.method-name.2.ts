///!MATCH_ERROR: ERROR 'hello_world' must use camelCase

export class MyClass {
    hello_world() {
        return "hi";
    }
}
