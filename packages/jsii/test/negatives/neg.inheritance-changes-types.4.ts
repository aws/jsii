// tslint:disable:comment-format
// tslint:disable-next-line:max-line-length
///!MATCH_ERROR: jsii.SomethingSpecific#something changes the type of property when overriding jsii.Something (expected jsii.Superclass, found jsii.Subclass)

export class Superclass {}
export class Subclass extends Superclass {}

export class Something {
    public something: Superclass;
}

export class SomethingSpecific extends Something {
    public something: Subclass = new Subclass();
}
