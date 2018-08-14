// tslint:disable:comment-format
// tslint:disable-next-line:max-line-length
///!MATCH_ERROR: jsii.Something#something changes the type of property when implementing jsii.ISomething (expected jsii.Superclass, found jsii.Subclass)

export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
    something: Superclass;
}

export class Something implements ISomething {
    public something: Subclass = new Subclass();
}
