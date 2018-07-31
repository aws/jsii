// tslint:disable-next-line:comment-format
///!MATCH_ERROR: return type of method changed

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