///!MATCH_ERROR: Methods and properties cannot have the signature getXxx() since these will conflict with Java property getters by the same name

export class MyClass {
    getFoo() {
        return "hi";
    }
}
