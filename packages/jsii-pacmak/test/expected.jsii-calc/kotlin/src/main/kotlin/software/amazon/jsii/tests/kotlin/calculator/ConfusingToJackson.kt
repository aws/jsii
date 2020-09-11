package software.amazon.jsii.tests.kotlin.calculator

/**
 * This tries to confuse Jackson by having overloaded property setters.
 * 
 * @see https://github.com/aws/aws-cdk/issues/4080
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ConfusingToJackson")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ConfusingToJackson : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun makeInstance(): software.amazon.jsii.tests.kotlin.calculator.ConfusingToJackson {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ConfusingToJackson::class.java, "makeInstance", software.amazon.jsii.tests.kotlin.calculator.ConfusingToJackson::class.java) ?: error("Method 'makeInstance()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun makeStructInstance(): software.amazon.jsii.tests.kotlin.calculator.ConfusingToJacksonStruct {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ConfusingToJackson::class.java, "makeStructInstance", software.amazon.jsii.tests.kotlin.calculator.ConfusingToJacksonStruct::class.java) ?: error("Method 'makeStructInstance()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var unionProperty: kotlin.Any?
        get() {
            return this.jsiiGet("unionProperty", kotlin.Any::class.java)
        }
        set(v) {
            this.jsiiSet("unionProperty", v)
        }

}
