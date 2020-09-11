package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ConsumersOfThisCrazyTypeSystem")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ConsumersOfThisCrazyTypeSystem : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun consumeAnotherPublicInterface(obj: software.amazon.jsii.tests.kotlin.calculator.IAnotherPublicInterface): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            obj
        )
        return this.jsiiCall("consumeAnotherPublicInterface", kotlin.String::class.java, args) ?: error("Method 'consumeAnotherPublicInterface()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun consumeNonInternalInterface(obj: software.amazon.jsii.tests.kotlin.calculator.INonInternalInterface): kotlin.Any {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            obj
        )
        return this.jsiiCall("consumeNonInternalInterface", kotlin.Any::class.java, args) ?: error("Method 'consumeNonInternalInterface()' returned null value")
    }
}
