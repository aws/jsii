package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DoubleTrouble")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class DoubleTrouble : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IFriendlyRandomGenerator {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * Say hello!
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun hello(): kotlin.String {
        return this.jsiiCall("hello", kotlin.String::class.java) ?: error("Method 'hello()' returned null value")
    }

    /**
     * Returns another random number.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun next(): kotlin.Number {
        return this.jsiiCall("next", kotlin.Number::class.java) ?: error("Method 'next()' returned null value")
    }
}
