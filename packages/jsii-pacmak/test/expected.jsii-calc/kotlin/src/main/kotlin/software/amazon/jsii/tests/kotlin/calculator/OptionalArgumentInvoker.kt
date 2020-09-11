package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.OptionalArgumentInvoker")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class OptionalArgumentInvoker : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(delegateValue: software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithOptionalMethodArguments) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            delegateValue
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun invokeWithOptional() {
        this.jsiiCall("invokeWithOptional", kotlin.Unit::class.java) ?: error("Method 'invokeWithOptional()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun invokeWithoutOptional() {
        this.jsiiCall("invokeWithoutOptional", kotlin.Unit::class.java) ?: error("Method 'invokeWithoutOptional()' returned null value")
    }
}
