// tslint:disable:comment-format
// tslint:disable-next-line:max-line-length
///!MATCH_ERROR: jsii.SomethingSpecific#takeSomething changes type of argument _argument when overriding jsii.Something (expected jsii.Superclass, found jsii.Subclass

export class Superclass {}
export class Subclass extends Superclass {}

export class Something {
    public takeSomething(_argument: Superclass): void {
        // Nothing
    }
}

export class SomethingSpecific extends Something {
    public takeSomething(_argument: Subclass): void {
        // Nothing
    }
}
