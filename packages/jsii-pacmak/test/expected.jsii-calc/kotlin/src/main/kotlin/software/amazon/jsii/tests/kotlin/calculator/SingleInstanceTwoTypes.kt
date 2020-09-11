package software.amazon.jsii.tests.kotlin.calculator

/**
 * Test that a single instance can be returned under two different FQNs.
 * 
 * JSII clients can instantiate 2 different strongly-typed wrappers for the same
 * object. Unfortunately, this will break object equality, but if we didn't do
 * this it would break runtime type checks in the JVM or CLR.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.SingleInstanceTwoTypes")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class SingleInstanceTwoTypes : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun interface1(): software.amazon.jsii.tests.kotlin.calculator.InbetweenClass {
        return this.jsiiCall("interface1", software.amazon.jsii.tests.kotlin.calculator.InbetweenClass::class.java) ?: error("Method 'interface1()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun interface2(): software.amazon.jsii.tests.kotlin.calculator.IPublicInterface {
        return this.jsiiCall("interface2", software.amazon.jsii.tests.kotlin.calculator.IPublicInterface::class.java) ?: error("Method 'interface2()' returned null value")
    }
}
