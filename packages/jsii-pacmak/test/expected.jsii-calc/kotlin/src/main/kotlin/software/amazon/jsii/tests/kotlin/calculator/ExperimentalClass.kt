package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ExperimentalClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ExperimentalClass : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(readonlyString: kotlin.String, mutableNumber: kotlin.Number?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            readonlyString,
            mutableNumber ?: error("'mutableNumber' should be present")
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val readonlyProperty: kotlin.String
        get() {
            return this.jsiiGet("readonlyProperty", kotlin.String::class.java) ?: error("'readonlyProperty' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var mutableProperty: kotlin.Number?
        get() {
            return this.jsiiGet("mutableProperty", kotlin.Number::class.java)
        }
        set(v) {
            this.jsiiSet("mutableProperty", v)
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun method() {
        this.jsiiCall("method", kotlin.Unit::class.java) ?: error("Method 'method()' returned null value")
    }
}
