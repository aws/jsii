///!MATCH_ERROR: Methods and properties cannot have the signature setXxx(v) since these will conflict with Java property setters

export class MyClass {
    setFoo(_value: string) {
        return "hi";
    }
}
