///!MATCH_ERROR: ERROR 'METHOD' must use camel-case

export class MyClass {
    METHOD() {
        return "hi";
    }
}
