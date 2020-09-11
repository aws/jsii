package software.amazon.jsii.tests.kotlin.calculator

/**
 * Represents an operation with two operands.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.BinaryOperation")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class BinaryOperation : software.amazon.jsii.tests.kotlin.calculator.lib.Operation, software.amazon.jsii.tests.kotlin.calculator.lib.IFriendly {
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
     * Left-hand side operand.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val lhs: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("lhs", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'lhs' should be present")
        }

    /**
     * Right-hand side operand.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val rhs: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("rhs", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'rhs' should be present")
        }

    /**
     * Say hello!
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun hello(): kotlin.String {
        return this.jsiiCall("hello", kotlin.String::class.java) ?: error("Method 'hello()' returned null value")
    }

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.BinaryOperation {
        /**
         * The value.
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val value: kotlin.Number
            get() {
                return this.jsiiGet("value", kotlin.Number::class.java) ?: error("'value' should be present")
            }

        /**
         * Left-hand side operand.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val lhs: software.amazon.jsii.tests.kotlin.calculator.lib.Value
            get() {
                return this.jsiiGet("lhs", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'lhs' should be present")
            }

        /**
         * Right-hand side operand.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val rhs: software.amazon.jsii.tests.kotlin.calculator.lib.Value
            get() {
                return this.jsiiGet("rhs", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'rhs' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        /**
         * @return the name of the class (to verify native type names are created for derived classes).
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun typeName(): kotlin.Any {
            return this.jsiiCall("typeName", kotlin.Any::class.java) ?: error("Method 'typeName()' returned null value")
        }

        /**
         * String representation of the value.
         */
        @Deprecated("Declaration is deprecated.")
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override fun toString(): kotlin.String {
            return this.jsiiCall("toString", kotlin.String::class.java) ?: error("Method 'toString()' returned null value")
        }

        /**
         * Say hello!
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun hello(): kotlin.String {
            return this.jsiiCall("hello", kotlin.String::class.java) ?: error("Method 'hello()' returned null value")
        }
    }
}
