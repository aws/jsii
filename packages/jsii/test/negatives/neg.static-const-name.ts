// tslint:disable-next-line:comment-format
///!MATCH_ERROR: Static constant names must use TRUMP_CASE, PascalCase or camelCase: snake_case

export class MyClass {
    static readonly snake_case = 123;
}
