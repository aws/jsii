///!MATCH_ERROR: Type names cannot use an underscore: My_Enum

export enum My_Enum {
    Foo,
    Goo
}
