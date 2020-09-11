package software.amazon.jsii.tests.kotlin.calculator

/**
 * Checks that optional result from interface method code generates correctly.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface IOptionalMethod : software.amazon.jsii.JsiiSerializable {
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    fun optional(): kotlin.String?

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IOptionalMethod {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun optional(): kotlin.String? {
            return this.jsiiCall("optional", kotlin.String::class.java)
        }
    }
}
