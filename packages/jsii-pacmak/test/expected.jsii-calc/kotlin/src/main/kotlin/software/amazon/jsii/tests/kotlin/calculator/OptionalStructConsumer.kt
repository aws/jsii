package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.OptionalStructConsumer")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class OptionalStructConsumer : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(optionalStruct: software.amazon.jsii.tests.kotlin.calculator.OptionalStruct?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            optionalStruct ?: error("'optionalStruct' should be present")
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val parameterWasUndefined: kotlin.Boolean
        get() {
            return this.jsiiGet("parameterWasUndefined", kotlin.Boolean::class.java) ?: error("'parameterWasUndefined' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val fieldValue: kotlin.String?
        get() {
            return this.jsiiGet("fieldValue", kotlin.String::class.java)
        }

}
