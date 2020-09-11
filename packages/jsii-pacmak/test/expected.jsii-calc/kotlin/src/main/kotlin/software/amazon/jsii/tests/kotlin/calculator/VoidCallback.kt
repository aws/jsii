package software.amazon.jsii.tests.kotlin.calculator

/**
 * This test is used to validate the runtimes can return correctly from a void callback.
 * 
 * - Implement `overrideMe` (method does not have to do anything).
 * - Invoke `callMe`
 * - Verify that `methodWasCalled` is `true`.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.VoidCallback")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class VoidCallback : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val methodWasCalled: kotlin.Boolean
        get() {
            return this.jsiiGet("methodWasCalled", kotlin.Boolean::class.java) ?: error("'methodWasCalled' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun callMe() {
        this.jsiiCall("callMe", kotlin.Unit::class.java) ?: error("Method 'callMe()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract fun overrideMe()

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.VoidCallback {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val methodWasCalled: kotlin.Boolean
            get() {
                return this.jsiiGet("methodWasCalled", kotlin.Boolean::class.java) ?: error("'methodWasCalled' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun callMe() {
            this.jsiiCall("callMe", kotlin.Unit::class.java) ?: error("Method 'callMe()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        protected override fun overrideMe() {
            this.jsiiCall("overrideMe", kotlin.Unit::class.java) ?: error("Method 'overrideMe()' returned null value")
        }
    }
}
