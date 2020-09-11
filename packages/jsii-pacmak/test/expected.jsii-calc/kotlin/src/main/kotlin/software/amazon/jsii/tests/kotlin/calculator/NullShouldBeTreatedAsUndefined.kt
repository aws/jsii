package software.amazon.jsii.tests.kotlin.calculator

/**
 * jsii#282, aws-cdk#157: null should be treated as "undefined".
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.NullShouldBeTreatedAsUndefined")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class NullShouldBeTreatedAsUndefined : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(_param1: kotlin.String, optional: kotlin.Any?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            _param1,
            optional ?: error("'optional' should be present")
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var changeMeToUndefined: kotlin.String?
        get() {
            return this.jsiiGet("changeMeToUndefined", kotlin.String::class.java)
        }
        set(v) {
            this.jsiiSet("changeMeToUndefined", v)
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun giveMeUndefined(value: kotlin.Any?) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value ?: error("'value' should be present")
        )
        this.jsiiCall("giveMeUndefined", kotlin.Unit::class.java, args) ?: error("Method 'giveMeUndefined()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun giveMeUndefinedInsideAnObject(input: software.amazon.jsii.tests.kotlin.calculator.NullShouldBeTreatedAsUndefinedData) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            input
        )
        this.jsiiCall("giveMeUndefinedInsideAnObject", kotlin.Unit::class.java, args) ?: error("Method 'giveMeUndefinedInsideAnObject()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun verifyPropertyIsUndefined() {
        this.jsiiCall("verifyPropertyIsUndefined", kotlin.Unit::class.java) ?: error("Method 'verifyPropertyIsUndefined()' returned null value")
    }
}
