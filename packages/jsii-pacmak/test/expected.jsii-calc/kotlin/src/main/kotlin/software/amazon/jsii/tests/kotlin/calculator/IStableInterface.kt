package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
interface IStableInterface : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    var mutableProperty: kotlin.Number?

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    fun method()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IStableInterface {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        override var mutableProperty: kotlin.Number?
            get() {
                return this.jsiiGet("mutableProperty", kotlin.Number::class.java)
            }
            set(v) {
                this.jsiiSet("mutableProperty", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        override fun method() {
            this.jsiiCall("method", kotlin.Unit::class.java) ?: error("Method 'method()' returned null value")
        }
    }
}
