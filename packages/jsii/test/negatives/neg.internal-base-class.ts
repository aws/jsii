///!MATCH_ERROR: Unable to resolve referenced type 'jsii.InternalBaseClass'. Type may be @internal or unexported

/** @internal */
export class InternalBaseClass {

}

export class MyClass extends InternalBaseClass {

}
