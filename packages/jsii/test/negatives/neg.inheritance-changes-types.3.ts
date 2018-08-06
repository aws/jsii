// tslint:disable-next-line:comment-format
///!MATCH_ERROR: parameter 1 type changed

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