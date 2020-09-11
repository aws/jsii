package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DoNotOverridePrivates")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class DoNotOverridePrivates : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun changePrivatePropertyValue(newValue: kotlin.String) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            newValue
        )
        this.jsiiCall("changePrivatePropertyValue", kotlin.Unit::class.java, args) ?: error("Method 'changePrivatePropertyValue()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun privateMethodValue(): kotlin.String {
        return this.jsiiCall("privateMethodValue", kotlin.String::class.java) ?: error("Method 'privateMethodValue()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun privatePropertyValue(): kotlin.String {
        return this.jsiiCall("privatePropertyValue", kotlin.String::class.java) ?: error("Method 'privatePropertyValue()' returned null value")
    }
}
