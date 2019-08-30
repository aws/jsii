///!MATCH_ERROR: Properties cannot have names like addToXxx() - those conflict with Java collection builder convenience methods

export interface MyStruct {
    readonly addToFoo?: number;
}
