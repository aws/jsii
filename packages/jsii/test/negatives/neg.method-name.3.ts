///!MATCH_ERROR: Methods and properties cannot have names like getXxx() - those conflict with Java property getters by the same name

export class MyClass {
    public getFoo() {
        return "hi";
    }
}
