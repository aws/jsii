///!MATCH_ERROR: Method and non-static non-readonly property names must use camelCase: hello_world

export class MyClass {
    public hello_world() {
        return "hi";
    }
}
