///!MATCH_ERROR: Member names cannot use an underscore: my_Prop

export class MyClass {
    my_Prop?: number;
}
