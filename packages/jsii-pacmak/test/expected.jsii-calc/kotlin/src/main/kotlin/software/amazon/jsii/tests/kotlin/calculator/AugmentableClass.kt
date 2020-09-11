package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AugmentableClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class AugmentableClass : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun methodOne() {
        this.jsiiCall("methodOne", kotlin.Unit::class.java) ?: error("Method 'methodOne()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun methodTwo() {
        this.jsiiCall("methodTwo", kotlin.Unit::class.java) ?: error("Method 'methodTwo()' returned null value")
    }
}
