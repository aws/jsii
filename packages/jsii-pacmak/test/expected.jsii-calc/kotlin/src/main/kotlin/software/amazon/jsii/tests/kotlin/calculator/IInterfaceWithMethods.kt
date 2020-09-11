package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IInterfaceWithMethods : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val value: kotlin.String

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun doThings()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithMethods {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val value: kotlin.String
            get() {
                return this.jsiiGet("value", kotlin.String::class.java) ?: error("'value' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun doThings() {
            this.jsiiCall("doThings", kotlin.Unit::class.java) ?: error("Method 'doThings()' returned null value")
        }
    }
}
