package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.JSObjectLiteralToNativeClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class JSObjectLiteralToNativeClass : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var propA: kotlin.String
        get() {
            return this.jsiiGet("propA", kotlin.String::class.java) ?: error("'propA' should be present")
        }
        set(v) {
            this.jsiiSet("propA", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var propB: kotlin.Number
        get() {
            return this.jsiiGet("propB", kotlin.Number::class.java) ?: error("'propB' should be present")
        }
        set(v) {
            this.jsiiSet("propB", v)
        }

}
