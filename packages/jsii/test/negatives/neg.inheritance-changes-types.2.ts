// tslint:disable-next-line:comment-format
///!MATCH_ERROR: method 'returnSomething' inherited from from jsii.ISomething but definition changed

export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
    returnSomething(): Superclass;
}

export interface ISomethingElse extends ISomething {
    returnSomething(): Subclass;
}