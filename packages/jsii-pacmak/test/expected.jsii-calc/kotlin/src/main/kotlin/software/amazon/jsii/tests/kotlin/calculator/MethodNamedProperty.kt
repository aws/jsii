package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.MethodNamedProperty")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class MethodNamedProperty : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val elite: kotlin.Number
        get() {
            return this.jsiiGet("elite", kotlin.Number::class.java) ?: error("'elite' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun doProperty(): kotlin.String {
        return this.jsiiCall("property", kotlin.String::class.java) ?: error("Method 'property()' returned null value")
    }
}
