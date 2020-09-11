package software.amazon.jsii.tests.kotlin.calculator

/**
 * Old class.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Old")
@Deprecated("Use the new class")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
open class Old : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * Doo wop that thing.
     */
    @Deprecated("Use the new class")
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    open fun doAThing() {
        this.jsiiCall("doAThing", kotlin.Unit::class.java) ?: error("Method 'doAThing()' returned null value")
    }
}
