package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Bell")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Bell : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IBell {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var rung: kotlin.Boolean
        get() {
            return this.jsiiGet("rung", kotlin.Boolean::class.java) ?: error("'rung' should be present")
        }
        set(v) {
            this.jsiiSet("rung", v)
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun ring() {
        this.jsiiCall("ring", kotlin.Unit::class.java) ?: error("Method 'ring()' returned null value")
    }
}
