package software.amazon.jsii.tests.kotlin.calculator

/**
 * Make sure that setters are properly called on objects with interfaces.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IObjectWithProperty : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var propertyValue: kotlin.String

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun wasSet(): kotlin.Boolean

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IObjectWithProperty {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var propertyValue: kotlin.String
            get() {
                return this.jsiiGet("property", kotlin.String::class.java) ?: error("'property' should be present")
            }
            set(v) {
                this.jsiiSet("property", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun wasSet(): kotlin.Boolean {
            return this.jsiiCall("wasSet", kotlin.Boolean::class.java) ?: error("Method 'wasSet()' returned null value")
        }
    }
}
