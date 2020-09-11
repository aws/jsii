package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.JSObjectLiteralToNative")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class JSObjectLiteralToNative : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun returnLiteral(): software.amazon.jsii.tests.kotlin.calculator.JSObjectLiteralToNativeClass {
        return this.jsiiCall("returnLiteral", software.amazon.jsii.tests.kotlin.calculator.JSObjectLiteralToNativeClass::class.java) ?: error("Method 'returnLiteral()' returned null value")
    }
}
