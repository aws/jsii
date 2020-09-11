package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AmbiguousParameters")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class AmbiguousParameters : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(scope: software.amazon.jsii.tests.kotlin.calculator.Bell, props: software.amazon.jsii.tests.kotlin.calculator.StructParameterType) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            scope,
            props
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val props: software.amazon.jsii.tests.kotlin.calculator.StructParameterType
        get() {
            return this.jsiiGet("props", software.amazon.jsii.tests.kotlin.calculator.StructParameterType::class.java) ?: error("'props' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val scope: software.amazon.jsii.tests.kotlin.calculator.Bell
        get() {
            return this.jsiiGet("scope", software.amazon.jsii.tests.kotlin.calculator.Bell::class.java) ?: error("'scope' should be present")
        }

}
