package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.InbetweenClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class InbetweenClass : software.amazon.jsii.tests.kotlin.calculator.PublicClass, software.amazon.jsii.tests.kotlin.calculator.IPublicInterface2 {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun ciao(): kotlin.String {
        return this.jsiiCall("ciao", kotlin.String::class.java) ?: error("Method 'ciao()' returned null value")
    }
}
