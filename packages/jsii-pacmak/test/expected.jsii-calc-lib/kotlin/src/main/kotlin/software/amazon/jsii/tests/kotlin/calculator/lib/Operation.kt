package software.amazon.jsii.tests.kotlin.calculator.lib

/**
 * Represents an operation on values.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.lib.`$Module`::class, fqn = "@scope/jsii-calc-lib.Operation")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
abstract class Operation : software.amazon.jsii.tests.kotlin.calculator.lib.Value {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * String representation of the value.
     */
    @Deprecated("Declaration is deprecated.")
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    abstract override fun toString(): kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.lib.Operation {
        /**
         * The value.
         */
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val value: kotlin.Number
            get() {
                return this.jsiiGet("value", kotlin.Number::class.java) ?: error("'value' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        /**
         * @return the name of the class (to verify native type names are created for derived classes).
         */
        @Deprecated("Declaration is deprecated.")
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
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
