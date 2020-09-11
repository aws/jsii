package software.amazon.jsii.tests.kotlin.calculator

/**
 * The "*" binary operation.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Multiply")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Multiply : software.amazon.jsii.tests.kotlin.calculator.BinaryOperation, software.amazon.jsii.tests.kotlin.calculator.IFriendlier, software.amazon.jsii.tests.kotlin.calculator.IRandomNumberGenerator {
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
     * Say farewell.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun farewell(): kotlin.String {
        return this.jsiiCall("farewell", kotlin.String::class.java) ?: error("Method 'farewell()' returned null value")
    }

    /**
     * Say goodbye.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun goodbye(): kotlin.String {
        return this.jsiiCall("goodbye", kotlin.String::class.java) ?: error("Method 'goodbye()' returned null value")
    }

    /**
     * Returns another random number.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun next(): kotlin.Number {
        return this.jsiiCall("next", kotlin.Number::class.java) ?: error("Method 'next()' returned null value")
    }

    /**
     * String representation of the value.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun toString(): kotlin.String {
        return this.jsiiCall("toString", kotlin.String::class.java) ?: error("Method 'toString()' returned null value")
    }
}
