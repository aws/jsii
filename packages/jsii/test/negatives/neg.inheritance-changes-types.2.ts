// tslint:disable-next-line:comment-format
///!MATCH_ERROR: return type changed

export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
    returnSomething(): Superclass;
}

export interface ISomethingElse extends ISomething {
    returnSomething(): Subclass;
}