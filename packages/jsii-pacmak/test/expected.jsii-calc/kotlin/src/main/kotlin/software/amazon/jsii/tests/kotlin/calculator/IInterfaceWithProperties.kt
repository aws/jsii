package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IInterfaceWithProperties : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val readOnlyString: kotlin.String

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var readWriteString: kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithProperties {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val readOnlyString: kotlin.String
            get() {
                return this.jsiiGet("readOnlyString", kotlin.String::class.java) ?: error("'readOnlyString' should be present")
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var readWriteString: kotlin.String
            get() {
                return this.jsiiGet("readWriteString", kotlin.String::class.java) ?: error("'readWriteString' should be present")
            }
            set(v) {
                this.jsiiSet("readWriteString", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
