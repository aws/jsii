// tslint:disable:comment-format
// tslint:disable-next-line:max-line-length
///!MATCH_ERROR: jsii.Something#takeSomething changes type of argument _argument when implementing jsii.ISomething (expected jsii.Superclass, found jsii.Subclass

export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
    takeSomething(argument: Superclass): void;
}

export class Something implements ISomething {
    public takeSomething(_argument: Subclass): void {
        // Nothing
    }
}
