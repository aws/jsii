package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.OptionalConstructorArgument")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class OptionalConstructorArgument : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(arg1: kotlin.Number, arg2: kotlin.String, arg3: java.time.Instant?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            arg1,
            arg2,
            arg3 ?: error("'arg3' should be present")
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val arg1: kotlin.Number
        get() {
            return this.jsiiGet("arg1", kotlin.Number::class.java) ?: error("'arg1' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val arg2: kotlin.String
        get() {
            return this.jsiiGet("arg2", kotlin.String::class.java) ?: error("'arg2' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val arg3: java.time.Instant?
        get() {
            return this.jsiiGet("arg3", java.time.Instant::class.java)
        }

}
