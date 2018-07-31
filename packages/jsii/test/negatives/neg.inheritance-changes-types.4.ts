// tslint:disable-next-line:comment-format
///!MATCH_ERROR: type of property changed

export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
    something: Superclass;
}

export class Something implements ISomething {
    public something: Subclass = new Subclass();
}