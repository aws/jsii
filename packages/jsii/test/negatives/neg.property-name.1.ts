///!MATCH_ERROR: Method and property names must use camelCase: PROP

export class MyClass {
    public PROP?: number;
}
