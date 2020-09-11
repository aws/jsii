package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.OverrideReturnsObject")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class OverrideReturnsObject : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun test(obj: software.amazon.jsii.tests.kotlin.calculator.IReturnsNumber): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            obj
        )
        return this.jsiiCall("test", kotlin.Number::class.java, args) ?: error("Method 'test()' returned null value")
    }
}
