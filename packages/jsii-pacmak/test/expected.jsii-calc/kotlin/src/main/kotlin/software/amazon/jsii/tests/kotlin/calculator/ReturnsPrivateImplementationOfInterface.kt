package software.amazon.jsii.tests.kotlin.calculator

/**
 * Helps ensure the JSII kernel & runtime cooperate correctly when an un-exported instance of a class is returned with a declared type that is an exported interface, and the instance inherits from an exported class.
 * 
 * @return an instance of an un-exported class that extends `ExportedBaseClass`, declared as `IPrivatelyImplemented`.
 * 
 * @see https://github.com/aws/jsii/issues/320
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ReturnsPrivateImplementationOfInterface")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ReturnsPrivateImplementationOfInterface : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val privateImplementation: software.amazon.jsii.tests.kotlin.calculator.IPrivatelyImplemented
        get() {
            return this.jsiiGet("privateImplementation", software.amazon.jsii.tests.kotlin.calculator.IPrivatelyImplemented::class.java) ?: error("'privateImplementation' should be present")
        }

}
