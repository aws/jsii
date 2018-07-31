// tslint:disable-next-line:comment-format
///!MATCH_ERROR: type of property changed

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