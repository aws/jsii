// tslint:disable:comment-format
// tslint:disable-next-line:max-line-length
///!MATCH_ERROR: jsii.SomethingElse#something changes the type of property when overriding jsii.Something (expected jsii.Superclass, found jsii.Subclass)

export class Superclass {}
export class Subclass extends Superclass {}

export class Something {
    public something: Superclass;
}

export class SomethingElse extends Something {
    public addUnrelatedMember: number;
}

// Should still fail even though 2-level inheritance
export class SomethingDifferent extends SomethingElse {
    public something: Subclass = new Subclass();
    public addUnrelatedMember: number = 1;
}
