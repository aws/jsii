///!MATCH_ERROR: ERROR 'hello_world' must use camel-case

export class MyClass {
    hello_world() {
        return "hi";
    }
}
