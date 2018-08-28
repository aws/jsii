///!MATCH_ERROR: Method and property names must use camelCase: my_Prop

export class MyClass {
    public my_Prop?: number;
}
