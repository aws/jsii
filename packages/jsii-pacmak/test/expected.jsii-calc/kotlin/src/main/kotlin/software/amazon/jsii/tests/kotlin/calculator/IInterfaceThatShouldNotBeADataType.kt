package software.amazon.jsii.tests.kotlin.calculator

/**
 * Even though this interface has only properties, it is disqualified from being a datatype because it inherits from an interface that is not a datatype.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IInterfaceThatShouldNotBeADataType : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithMethods {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val otherValue: kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IInterfaceThatShouldNotBeADataType {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val value: kotlin.String
            get() {
                return this.jsiiGet("value", kotlin.String::class.java) ?: error("'value' should be present")
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val otherValue: kotlin.String
            get() {
                return this.jsiiGet("otherValue", kotlin.String::class.java) ?: error("'otherValue' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun doThings() {
            this.jsiiCall("doThings", kotlin.Unit::class.java) ?: error("Method 'doThings()' returned null value")
        }
    }
}
