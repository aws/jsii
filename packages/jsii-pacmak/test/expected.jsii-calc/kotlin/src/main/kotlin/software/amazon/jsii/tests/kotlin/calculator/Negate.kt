package software.amazon.jsii.tests.kotlin.calculator

/**
 * The negation operation ("-value").
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Negate")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Negate : software.amazon.jsii.tests.kotlin.calculator.UnaryOperation, software.amazon.jsii.tests.kotlin.calculator.IFriendlier {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(operand: software.amazon.jsii.tests.kotlin.calculator.lib.Value) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            operand
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
     * Say hello!
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun hello(): kotlin.String {
        return this.jsiiCall("hello", kotlin.String::class.java) ?: error("Method 'hello()' returned null value")
    }

    /**
     * String representation of the value.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun toString(): kotlin.String {
        return this.jsiiCall("toString", kotlin.String::class.java) ?: error("Method 'toString()' returned null value")
    }
}
