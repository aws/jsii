package software.amazon.jsii.tests.kotlin.calculator

/**
 * This allows us to test that a reference can be stored for objects that implement interfaces.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.NumberGenerator")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class NumberGenerator : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(generator: software.amazon.jsii.tests.kotlin.calculator.IRandomNumberGenerator) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            generator
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var generator: software.amazon.jsii.tests.kotlin.calculator.IRandomNumberGenerator
        get() {
            return this.jsiiGet("generator", software.amazon.jsii.tests.kotlin.calculator.IRandomNumberGenerator::class.java) ?: error("'generator' should be present")
        }
        set(v) {
            this.jsiiSet("generator", v)
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun isSameGenerator(gen: software.amazon.jsii.tests.kotlin.calculator.IRandomNumberGenerator): kotlin.Boolean {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            gen
        )
        return this.jsiiCall("isSameGenerator", kotlin.Boolean::class.java, args) ?: error("Method 'isSameGenerator()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun nextTimes100(): kotlin.Number {
        return this.jsiiCall("nextTimes100", kotlin.Number::class.java) ?: error("Method 'nextTimes100()' returned null value")
    }
}
