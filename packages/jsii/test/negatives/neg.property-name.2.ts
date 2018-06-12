///!MATCH_ERROR: ERROR 'my_Prop' must use camel-case

export class MyClass {
    my_Prop?: number;
}
