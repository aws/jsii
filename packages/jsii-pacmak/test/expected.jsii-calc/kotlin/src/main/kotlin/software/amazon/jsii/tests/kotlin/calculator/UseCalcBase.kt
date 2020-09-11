package software.amazon.jsii.tests.kotlin.calculator

/**
 * Depend on a type from jsii-calc-base as a test for awslabs/jsii#128.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.UseCalcBase")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class UseCalcBase : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun hello(): software.amazon.jsii.tests.kotlin.calculator.base.Base {
        return this.jsiiCall("hello", software.amazon.jsii.tests.kotlin.calculator.base.Base::class.java) ?: error("Method 'hello()' returned null value")
    }
}
