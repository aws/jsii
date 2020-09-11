package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DeprecatedClass")
@Deprecated("a pretty boring class")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
open class DeprecatedClass : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(readonlyString: kotlin.String, mutableNumber: kotlin.Number?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            readonlyString,
            mutableNumber ?: error("'mutableNumber' should be present")
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @Deprecated("this is not always \"wazoo\", be ready to be disappointed")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    open val readonlyProperty: kotlin.String
        get() {
            return this.jsiiGet("readonlyProperty", kotlin.String::class.java) ?: error("'readonlyProperty' should be present")
        }

    @Deprecated("shouldn't have been mutable")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    open var mutableProperty: kotlin.Number?
        get() {
            return this.jsiiGet("mutableProperty", kotlin.Number::class.java)
        }
        set(v) {
            this.jsiiSet("mutableProperty", v)
        }

    @Deprecated("it was a bad idea")
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    open fun method() {
        this.jsiiCall("method", kotlin.Unit::class.java) ?: error("Method 'method()' returned null value")
    }
}
