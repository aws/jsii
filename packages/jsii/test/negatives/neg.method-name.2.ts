///!MATCH_ERROR: Method and property names must use camelCase: hello_world

export class MyClass {
    public hello_world() {
        return "hi";
    }
}
