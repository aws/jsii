// tslint:disable:comment-format
// tslint:disable-next-line:max-line-length
///!MATCH_ERROR: jsii.Something#returnSomething changes the return type when implementing jsii.ISomething (expected jsii.Superclass, found jsii.Subclass)

export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
    returnSomething(): Superclass;
}

export class Something implements ISomething {
    public returnSomething(): Subclass {
        return 5;
    }
}
