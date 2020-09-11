package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ConstructorPassesThisOut")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ConstructorPassesThisOut : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(consumer: software.amazon.jsii.tests.kotlin.calculator.PartiallyInitializedThisConsumer) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            consumer
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }
}
