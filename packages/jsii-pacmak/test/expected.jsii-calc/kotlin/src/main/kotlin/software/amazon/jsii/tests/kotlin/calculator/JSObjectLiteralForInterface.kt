package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.JSObjectLiteralForInterface")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class JSObjectLiteralForInterface : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun giveMeFriendly(): software.amazon.jsii.tests.kotlin.calculator.lib.IFriendly {
        return this.jsiiCall("giveMeFriendly", software.amazon.jsii.tests.kotlin.calculator.lib.IFriendly::class.java) ?: error("Method 'giveMeFriendly()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun giveMeFriendlyGenerator(): software.amazon.jsii.tests.kotlin.calculator.IFriendlyRandomGenerator {
        return this.jsiiCall("giveMeFriendlyGenerator", software.amazon.jsii.tests.kotlin.calculator.IFriendlyRandomGenerator::class.java) ?: error("Method 'giveMeFriendlyGenerator()' returned null value")
    }
}
