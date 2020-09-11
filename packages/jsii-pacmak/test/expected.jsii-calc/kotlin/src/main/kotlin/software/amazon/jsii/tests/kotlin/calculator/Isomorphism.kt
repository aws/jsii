package software.amazon.jsii.tests.kotlin.calculator

/**
 * Checks the "same instance" isomorphism is preserved within the constructor.
 * 
 * Create a subclass of this, and assert that `this.myself()` actually returns
 * `this` from within the constructor.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Isomorphism")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class Isomorphism : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun myself(): software.amazon.jsii.tests.kotlin.calculator.Isomorphism {
        return this.jsiiCall("myself", software.amazon.jsii.tests.kotlin.calculator.Isomorphism::class.java) ?: error("Method 'myself()' returned null value")
    }

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.Isomorphism {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun myself(): software.amazon.jsii.tests.kotlin.calculator.Isomorphism {
            return this.jsiiCall("myself", software.amazon.jsii.tests.kotlin.calculator.Isomorphism::class.java) ?: error("Method 'myself()' returned null value")
        }
    }
}
