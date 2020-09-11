package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.VariadicInvoker")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class VariadicInvoker : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(method: software.amazon.jsii.tests.kotlin.calculator.VariadicMethod) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            method
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun asArray(vararg values: kotlin.Number): kotlin.collections.List<kotlin.Number> {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            values
        )
        return this.jsiiCall("asArray", kotlin.collections.List::class.java, args) as? kotlin.collections.List<kotlin.Number> ?: error("Method 'asArray()' returned null value")
    }
}
