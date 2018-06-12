///!MATCH_ERROR: 'prop' is a const and must use either pascal-case or upper snake-case

export class MyClass {
    static readonly prop = 123;
}
