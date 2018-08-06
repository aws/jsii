// tslint:disable-next-line:comment-format
///!MATCH_ERROR: method 'takeSomething' inherited from from jsii.ISomething but definition changed

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