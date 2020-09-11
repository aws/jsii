package software.amazon.jsii.tests.kotlin.calculator

/**
 * Host runtime version should be set via JSII_AGENT.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.JsiiAgent")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class JsiiAgent : software.amazon.jsii.JsiiObject {
    companion object {
        /**
         * Returns the value of the JSII_AGENT environment variable.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val jsiiAgent: kotlin.String?
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JsiiAgent::class.java, "jsiiAgent", kotlin.String::class.java)
            }

    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
