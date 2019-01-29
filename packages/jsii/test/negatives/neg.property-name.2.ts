///!MATCH_ERROR: Method and non-static non-readonly property names must use camelCase: my_Prop

export class MyClass {
    public my_Prop?: number;
}
