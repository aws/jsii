package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IExtendsPrivateInterface : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val moreThings: kotlin.collections.List<kotlin.String>

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    var privateValue: kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IExtendsPrivateInterface {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val moreThings: kotlin.collections.List<kotlin.String>
            get() {
                return this.jsiiGet("moreThings", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'moreThings' should be present")
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var privateValue: kotlin.String
            get() {
                return this.jsiiGet("private", kotlin.String::class.java) ?: error("'private' should be present")
            }
            set(v) {
                this.jsiiSet("private", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
