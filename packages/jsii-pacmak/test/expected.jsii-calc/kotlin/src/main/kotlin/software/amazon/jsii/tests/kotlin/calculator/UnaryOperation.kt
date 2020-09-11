package software.amazon.jsii.tests.kotlin.calculator

/**
 * An operation on a single operand.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.UnaryOperation")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class UnaryOperation : software.amazon.jsii.tests.kotlin.calculator.lib.Operation {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(operand: software.amazon.jsii.tests.kotlin.calculator.lib.Value) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            operand
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val operand: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("operand", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'operand' should be present")
        }

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.UnaryOperation {
        /**
         * The value.
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val value: kotlin.Number
            get() {
                return this.jsiiGet("value", kotlin.Number::class.java) ?: error("'value' should be present")
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val operand: software.amazon.jsii.tests.kotlin.calculator.lib.Value
            get() {
                return this.jsiiGet("operand", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'operand' should be present")
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
    }
}
