package software.amazon.jsii.tests.kotlin.calculator

/**
 * This is used to validate the ability to use `this` from within a static context.
 * 
 * https://github.com/awslabs/aws-cdk/issues/2304
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.StaticContext")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class StaticContext : software.amazon.jsii.JsiiObject {
    companion object {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var staticVariable: kotlin.Boolean
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.StaticContext::class.java, "staticVariable", kotlin.Boolean::class.java) ?: error("'staticVariable' should be present")
            }
            set(v) {
                software.amazon.jsii.JsiiObject.jsiiStaticSet(software.amazon.jsii.tests.kotlin.calculator.StaticContext::class.java, "staticVariable", v)
            }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun canAccessStaticContext(): kotlin.Boolean {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.StaticContext::class.java, "canAccessStaticContext", kotlin.Boolean::class.java) ?: error("Method 'canAccessStaticContext()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
