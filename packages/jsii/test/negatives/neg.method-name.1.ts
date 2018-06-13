///!MATCH_ERROR: 'METHOD' must use camelCase

export class MyClass {
    METHOD() {
        return "hi";
    }
}
