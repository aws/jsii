// tslint:disable:comment-format
// tslint:disable-next-line:max-line-length
///!MATCH_ERROR: jsii.SomethingSpecific#returnSomething changes the return type when overriding jsii.Something (expected jsii.Superclass, found jsii.Subclass)

export class Superclass {}
export class Subclass extends Superclass {}

export class Something {
    public returnSomething(): Superclass {
        return new Superclass();
    }
}

export class SomethingSpecific extends Something {
    public returnSomething(): Subclass {
        return new Subclass();
    }
}
