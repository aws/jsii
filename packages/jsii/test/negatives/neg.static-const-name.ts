///!MATCH_ERROR: 'snake_case' is a const and must use PascalCase, UPPER_SNAKE_CASE or camelCase

export class MyClass {
    static readonly snake_case = 123;
}
