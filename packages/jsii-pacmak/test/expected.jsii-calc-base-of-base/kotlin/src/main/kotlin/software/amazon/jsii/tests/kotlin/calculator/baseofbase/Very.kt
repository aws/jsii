package software.amazon.jsii.tests.kotlin.calculator.baseofbase

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.baseofbase.`$Module`::class, fqn = "@scope/jsii-calc-base-of-base.Very")
open class Very : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    open fun hey(): kotlin.Number {
        return this.jsiiCall("hey", kotlin.Number::class.java) ?: error("Method 'hey()' returned null value")
    }
}
