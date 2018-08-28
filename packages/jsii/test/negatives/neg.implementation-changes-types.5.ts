// tslint:disable:comment-format
// tslint:disable-next-line:max-line-length
///!MATCH_ERROR: jsii.ISomethingElse#something changes the type of property when implementing jsii.ISomething (expected jsii.Superclass, found jsii.Subclass)

export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
    something: Superclass;
}

export interface ISomethingElse extends ISomething {
    addUnrelatedMember: number;
}

// Should still fail even though 2-level inheritance
export class Something implements ISomethingElse {
    public something: Subclass = new Subclass();
    public addUnrelatedMember: number = 1;
}
