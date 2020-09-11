package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@Deprecated("useless interface")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface IDeprecatedInterface : software.amazon.jsii.JsiiSerializable {
    @Deprecated("could be better")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    var mutableProperty: kotlin.Number?

    @Deprecated("services no purpose")
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    fun method()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IDeprecatedInterface {
        @Deprecated("could be better")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override var mutableProperty: kotlin.Number?
            get() {
                return this.jsiiGet("mutableProperty", kotlin.Number::class.java)
            }
            set(v) {
                this.jsiiSet("mutableProperty", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @Deprecated("services no purpose")
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override fun method() {
            this.jsiiCall("method", kotlin.Unit::class.java) ?: error("Method 'method()' returned null value")
        }
    }
}
