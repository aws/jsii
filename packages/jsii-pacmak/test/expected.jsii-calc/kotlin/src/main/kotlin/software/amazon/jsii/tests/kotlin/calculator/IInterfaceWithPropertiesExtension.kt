package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IInterfaceWithPropertiesExtension : software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithProperties {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var foo: kotlin.Number

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithPropertiesExtension {
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

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var foo: kotlin.Number
            get() {
                return this.jsiiGet("foo", kotlin.Number::class.java) ?: error("'foo' should be present")
            }
            set(v) {
                this.jsiiSet("foo", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
