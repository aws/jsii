///!MATCH_ERROR: ERROR 'my_Prop' must use camelCase

export class MyClass {
    my_Prop?: number;
}
