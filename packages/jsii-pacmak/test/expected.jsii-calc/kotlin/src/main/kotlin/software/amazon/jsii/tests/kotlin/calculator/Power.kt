package software.amazon.jsii.tests.kotlin.calculator

/**
 * The power operation.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Power")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Power : software.amazon.jsii.tests.kotlin.calculator.composition.CompositeOperation {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    /**
     * Creates a Power operation.
     */
    constructor(base: software.amazon.jsii.tests.kotlin.calculator.lib.Value, pow: software.amazon.jsii.tests.kotlin.calculator.lib.Value) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            base,
            pow
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    /**
     * The base of the power.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val base: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("base", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'base' should be present")
        }

    /**
     * The expression that this operation consists of.
     * 
     * Must be implemented by derived classes.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val expression: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("expression", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'expression' should be present")
        }

    /**
     * The number of times to multiply.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val pow: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("pow", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'pow' should be present")
        }

}
