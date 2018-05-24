///!MATCH_ERROR: 'METHOD' must use camelCase (start with a lowercase letter)

export class MyClass {
    METHOD() {
        return "hi";
    }
}
