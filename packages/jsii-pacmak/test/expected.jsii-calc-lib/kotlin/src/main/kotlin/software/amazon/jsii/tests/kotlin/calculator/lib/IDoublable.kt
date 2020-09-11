package software.amazon.jsii.tests.kotlin.calculator.lib

/**
 * The general contract for a concrete number.
 */
@javax.annotation.Generated("jsii-pacmak")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface IDoublable : software.amazon.jsii.JsiiSerializable {
    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val doubleValue: kotlin.Number

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.lib.IDoublable {
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val doubleValue: kotlin.Number
            get() {
                return this.jsiiGet("doubleValue", kotlin.Number::class.java) ?: error("'doubleValue' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
