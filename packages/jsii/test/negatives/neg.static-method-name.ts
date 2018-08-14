///!MATCH_ERROR: Method and property names must use camelCase: METHOD

export class MyClass {
    METHOD() {
        return "hi";
    }
}
