package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.SupportsNiceJavaBuilder")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class SupportsNiceJavaBuilder : software.amazon.jsii.tests.kotlin.calculator.SupportsNiceJavaBuilderWithRequiredProps {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(id: kotlin.Number, defaultBar: kotlin.Number?, props: software.amazon.jsii.tests.kotlin.calculator.SupportsNiceJavaBuilderProps?, vararg rest: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            id,
            defaultBar ?: error("'defaultBar' should be present"),
            props ?: error("'props' should be present"),
            rest
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    /**
     * some identifier.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val id: kotlin.Number
        get() {
            return this.jsiiGet("id", kotlin.Number::class.java) ?: error("'id' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val rest: kotlin.collections.List<kotlin.String>
        get() {
            return this.jsiiGet("rest", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'rest' should be present")
        }

}
