///!MATCH_ERROR: Properties cannot have names like putInXxx() - those conflict with Java collection builder convenience methods

export interface MyStruct {
    readonly putInFoo?: number;
}
