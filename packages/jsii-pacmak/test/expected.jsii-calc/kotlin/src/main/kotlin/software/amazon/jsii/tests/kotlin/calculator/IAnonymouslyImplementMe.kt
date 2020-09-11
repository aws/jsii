package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IAnonymouslyImplementMe : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val value: kotlin.Number

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun verb(): kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IAnonymouslyImplementMe {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val value: kotlin.Number
            get() {
                return this.jsiiGet("value", kotlin.Number::class.java) ?: error("'value' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun verb(): kotlin.String {
            return this.jsiiCall("verb", kotlin.String::class.java) ?: error("Method 'verb()' returned null value")
        }
    }
}
