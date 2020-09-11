package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IReturnsNumber : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val numberProp: software.amazon.jsii.tests.kotlin.calculator.lib.Number

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun obtainNumber(): software.amazon.jsii.tests.kotlin.calculator.lib.IDoublable

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IReturnsNumber {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val numberProp: software.amazon.jsii.tests.kotlin.calculator.lib.Number
            get() {
                return this.jsiiGet("numberProp", software.amazon.jsii.tests.kotlin.calculator.lib.Number::class.java) ?: error("'numberProp' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun obtainNumber(): software.amazon.jsii.tests.kotlin.calculator.lib.IDoublable {
            return this.jsiiCall("obtainNumber", software.amazon.jsii.tests.kotlin.calculator.lib.IDoublable::class.java) ?: error("Method 'obtainNumber()' returned null value")
        }
    }
}
