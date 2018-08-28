///!MATCH_ERROR: Methods and properties cannot have names like setXxx() - those conflict with Java property setters by the same name

export class MyClass {
    public setFoo(_value: string) {
        return "hi";
    }
}
