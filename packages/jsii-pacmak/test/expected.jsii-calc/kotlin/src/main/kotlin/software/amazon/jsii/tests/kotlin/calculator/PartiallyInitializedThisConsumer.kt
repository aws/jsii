package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.PartiallyInitializedThisConsumer")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class PartiallyInitializedThisConsumer : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    abstract fun consumePartiallyInitializedThis(obj: software.amazon.jsii.tests.kotlin.calculator.ConstructorPassesThisOut, dt: java.time.Instant, ev: software.amazon.jsii.tests.kotlin.calculator.AllTypesEnum): kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.PartiallyInitializedThisConsumer {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun consumePartiallyInitializedThis(obj: software.amazon.jsii.tests.kotlin.calculator.ConstructorPassesThisOut, dt: java.time.Instant, ev: software.amazon.jsii.tests.kotlin.calculator.AllTypesEnum): kotlin.String {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                obj,
                dt,
                ev
            )
            return this.jsiiCall("consumePartiallyInitializedThis", kotlin.String::class.java, args) ?: error("Method 'consumePartiallyInitializedThis()' returned null value")
        }
    }
}
