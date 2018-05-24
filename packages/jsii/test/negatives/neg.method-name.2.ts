///!MATCH_ERROR: Member names cannot use an underscore: hello_world

export class MyClass {
    hello_world() {
        return "hi";
    }
}
