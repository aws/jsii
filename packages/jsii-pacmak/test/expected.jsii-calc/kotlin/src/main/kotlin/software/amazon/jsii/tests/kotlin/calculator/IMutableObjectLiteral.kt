package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IMutableObjectLiteral : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var value: kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IMutableObjectLiteral {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var value: kotlin.String
            get() {
                return this.jsiiGet("value", kotlin.String::class.java) ?: error("'value' should be present")
            }
            set(v) {
                this.jsiiSet("value", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
