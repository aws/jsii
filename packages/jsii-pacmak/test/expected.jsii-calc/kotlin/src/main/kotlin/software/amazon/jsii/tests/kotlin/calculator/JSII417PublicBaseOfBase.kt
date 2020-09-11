package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.JSII417PublicBaseOfBase")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class JSII417PublicBaseOfBase : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun makeInstance(): software.amazon.jsii.tests.kotlin.calculator.JSII417PublicBaseOfBase {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.JSII417PublicBaseOfBase::class.java, "makeInstance", software.amazon.jsii.tests.kotlin.calculator.JSII417PublicBaseOfBase::class.java) ?: error("Method 'makeInstance()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val hasRoot: kotlin.Boolean
        get() {
            return this.jsiiGet("hasRoot", kotlin.Boolean::class.java) ?: error("'hasRoot' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun foo() {
        this.jsiiCall("foo", kotlin.Unit::class.java) ?: error("Method 'foo()' returned null value")
    }
}
