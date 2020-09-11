package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Polymorphism")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Polymorphism : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun sayHello(friendly: software.amazon.jsii.tests.kotlin.calculator.lib.IFriendly): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            friendly
        )
        return this.jsiiCall("sayHello", kotlin.String::class.java, args) ?: error("Method 'sayHello()' returned null value")
    }
}
