// tslint:disable-next-line:comment-format
///!MATCH_ERROR: property 'something' inherited from from jsii.ISomething but definition changed

export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
    something: Superclass;
}

export class Something implements ISomething {
    public something: Subclass = new Subclass();
}