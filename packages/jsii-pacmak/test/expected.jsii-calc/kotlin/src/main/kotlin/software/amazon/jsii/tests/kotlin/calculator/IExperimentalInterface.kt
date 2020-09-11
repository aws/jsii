package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IExperimentalInterface : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var mutableProperty: kotlin.Number?

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun method()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IExperimentalInterface {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var mutableProperty: kotlin.Number?
            get() {
                return this.jsiiGet("mutableProperty", kotlin.Number::class.java)
            }
            set(v) {
                this.jsiiSet("mutableProperty", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun method() {
            this.jsiiCall("method", kotlin.Unit::class.java) ?: error("Method 'method()' returned null value")
        }
    }
}
