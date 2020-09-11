package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.SomeTypeJsii976")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class SomeTypeJsii976 : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun returnAnonymous(): kotlin.Any {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.SomeTypeJsii976::class.java, "returnAnonymous", kotlin.Any::class.java) ?: error("Method 'returnAnonymous()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun returnReturn(): software.amazon.jsii.tests.kotlin.calculator.IReturnJsii976 {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.SomeTypeJsii976::class.java, "returnReturn", software.amazon.jsii.tests.kotlin.calculator.IReturnJsii976::class.java) ?: error("Method 'returnReturn()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
