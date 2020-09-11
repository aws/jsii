package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface INonInternalInterface : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.IAnotherPublicInterface {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var b: kotlin.String

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var c: kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.INonInternalInterface {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var a: kotlin.String
            get() {
                return this.jsiiGet("a", kotlin.String::class.java) ?: error("'a' should be present")
            }
            set(v) {
                this.jsiiSet("a", v)
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var b: kotlin.String
            get() {
                return this.jsiiGet("b", kotlin.String::class.java) ?: error("'b' should be present")
            }
            set(v) {
                this.jsiiSet("b", v)
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var c: kotlin.String
            get() {
                return this.jsiiGet("c", kotlin.String::class.java) ?: error("'c' should be present")
            }
            set(v) {
                this.jsiiSet("c", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
