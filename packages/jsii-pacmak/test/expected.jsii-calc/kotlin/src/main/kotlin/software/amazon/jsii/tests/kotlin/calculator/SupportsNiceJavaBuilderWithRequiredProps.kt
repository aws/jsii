package software.amazon.jsii.tests.kotlin.calculator

/**
 * We can generate fancy builders in Java for classes which take a mix of positional & struct parameters.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.SupportsNiceJavaBuilderWithRequiredProps")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class SupportsNiceJavaBuilderWithRequiredProps : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(id: kotlin.Number, props: software.amazon.jsii.tests.kotlin.calculator.SupportsNiceJavaBuilderProps) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            id,
            props
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val bar: kotlin.Number
        get() {
            return this.jsiiGet("bar", kotlin.Number::class.java) ?: error("'bar' should be present")
        }

    /**
     * some identifier of your choice.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val id: kotlin.Number
        get() {
            return this.jsiiGet("id", kotlin.Number::class.java) ?: error("'id' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val propId: kotlin.String?
        get() {
            return this.jsiiGet("propId", kotlin.String::class.java)
        }

}
