package software.amazon.jsii.tests.kotlin.calculator.lib

/**
 * Represents a concrete number.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.lib.`$Module`::class, fqn = "@scope/jsii-calc-lib.Number")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
open class Number : software.amazon.jsii.tests.kotlin.calculator.lib.Value, software.amazon.jsii.tests.kotlin.calculator.lib.IDoublable {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    /**
     * Creates a Number object.
     */
    constructor(value: kotlin.Number) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    /**
     * The number multiplied by 2.
     */
    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    open override val doubleValue: kotlin.Number
        get() {
            return this.jsiiGet("doubleValue", kotlin.Number::class.java) ?: error("'doubleValue' should be present")
        }

    /**
     * The number.
     */
    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    open override val value: kotlin.Number
        get() {
            return this.jsiiGet("value", kotlin.Number::class.java) ?: error("'value' should be present")
        }

}
