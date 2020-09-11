package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IJSII417PublicBaseOfBase : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val hasRoot: kotlin.Boolean

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun foo()

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IJSII417PublicBaseOfBase {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val hasRoot: kotlin.Boolean
            get() {
                return this.jsiiGet("hasRoot", kotlin.Boolean::class.java) ?: error("'hasRoot' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun foo() {
            this.jsiiCall("foo", kotlin.Unit::class.java) ?: error("Method 'foo()' returned null value")
        }
    }
}
