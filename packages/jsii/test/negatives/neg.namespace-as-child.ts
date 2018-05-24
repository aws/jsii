///!MATCH_ERROR: this structure cannot be supported in all languages

// this structure is not supported because it cannot be represented in all languages
// this means that call sub-namespaces must be concrete types

export class A {

}

// Missing a type named A.B

export namespace A.B {

    export class C {

    }

}