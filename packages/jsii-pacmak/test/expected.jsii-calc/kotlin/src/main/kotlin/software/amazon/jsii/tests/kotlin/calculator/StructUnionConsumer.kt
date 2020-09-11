package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.StructUnionConsumer")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class StructUnionConsumer : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun isStructA(struct: kotlin.Any): kotlin.Boolean {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                struct
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.StructUnionConsumer::class.java, "isStructA", kotlin.Boolean::class.java, args) ?: error("Method 'isStructA()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun isStructB(struct: kotlin.Any): kotlin.Boolean {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                struct
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.StructUnionConsumer::class.java, "isStructB", kotlin.Boolean::class.java, args) ?: error("Method 'isStructB()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
