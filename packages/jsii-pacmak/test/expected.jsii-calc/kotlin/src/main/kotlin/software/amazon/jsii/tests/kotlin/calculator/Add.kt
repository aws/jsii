package software.amazon.jsii.tests.kotlin.calculator

/**
 * The "+" binary operation.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Add")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Add : software.amazon.jsii.tests.kotlin.calculator.BinaryOperation {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    /**
     * Creates a BinaryOperation.
     */
    constructor(lhs: software.amazon.jsii.tests.kotlin.calculator.lib.Value, rhs: software.amazon.jsii.tests.kotlin.calculator.lib.Value) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            lhs,
            rhs
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    /**
     * The value.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val value: kotlin.Number
        get() {
            return this.jsiiGet("value", kotlin.Number::class.java) ?: error("'value' should be present")
        }

    /**
     * String representation of the value.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun toString(): kotlin.String {
        return this.jsiiCall("toString", kotlin.String::class.java) ?: error("Method 'toString()' returned null value")
    }
}
