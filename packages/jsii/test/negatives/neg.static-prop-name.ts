///!MATCH_ERROR: 'prop' is a static property and must be pascal-case

export class MyClass {
    static readonly prop = 123;
}
