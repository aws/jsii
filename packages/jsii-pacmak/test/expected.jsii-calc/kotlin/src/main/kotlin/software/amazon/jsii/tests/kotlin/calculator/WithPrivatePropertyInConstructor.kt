package software.amazon.jsii.tests.kotlin.calculator

/**
 * Verifies that private property declarations in constructor arguments are hidden.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.WithPrivatePropertyInConstructor")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class WithPrivatePropertyInConstructor : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(privateField: kotlin.String?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            privateField ?: error("'privateField' should be present")
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val success: kotlin.Boolean
        get() {
            return this.jsiiGet("success", kotlin.Boolean::class.java) ?: error("'success' should be present")
        }

}
