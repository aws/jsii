package software.amazon.jsii.tests.kotlin.calculator.PythonSelf

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.PythonSelf.ClassWithSelf")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ClassWithSelf : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(self: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            self
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val self: kotlin.String
        get() {
            return this.jsiiGet("self", kotlin.String::class.java) ?: error("'self' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun method(self: kotlin.Number): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            self
        )
        return this.jsiiCall("method", kotlin.String::class.java, args) ?: error("Method 'method()' returned null value")
    }
}
