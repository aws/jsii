package software.amazon.jsii.tests.kotlin.calculator

/**
 * @see https://github.com/aws/jsii/issues/903
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.OverridableProtectedMember")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class OverridableProtectedMember : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected open val overrideReadOnly: kotlin.String
        get() {
            return this.jsiiGet("overrideReadOnly", kotlin.String::class.java) ?: error("'overrideReadOnly' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected open var overrideReadWrite: kotlin.String
        get() {
            return this.jsiiGet("overrideReadWrite", kotlin.String::class.java) ?: error("'overrideReadWrite' should be present")
        }
        set(v) {
            this.jsiiSet("overrideReadWrite", v)
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected open fun overrideMe(): kotlin.String {
        return this.jsiiCall("overrideMe", kotlin.String::class.java) ?: error("Method 'overrideMe()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun switchModes() {
        this.jsiiCall("switchModes", kotlin.Unit::class.java) ?: error("Method 'switchModes()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun valueFromProtected(): kotlin.String {
        return this.jsiiCall("valueFromProtected", kotlin.String::class.java) ?: error("Method 'valueFromProtected()' returned null value")
    }
}
