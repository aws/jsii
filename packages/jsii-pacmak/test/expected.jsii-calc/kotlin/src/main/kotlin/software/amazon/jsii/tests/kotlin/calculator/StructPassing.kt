package software.amazon.jsii.tests.kotlin.calculator

/**
 * Just because we can.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.StructPassing")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.External)
open class StructPassing : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.External)
        fun howManyVarArgsDidIPass(_positional: kotlin.Number, vararg inputs: software.amazon.jsii.tests.kotlin.calculator.TopLevelStruct): kotlin.Number {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                _positional,
                inputs
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.StructPassing::class.java, "howManyVarArgsDidIPass", kotlin.Number::class.java, args) ?: error("Method 'howManyVarArgsDidIPass()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.External)
        fun roundTrip(_positional: kotlin.Number, input: software.amazon.jsii.tests.kotlin.calculator.TopLevelStruct): software.amazon.jsii.tests.kotlin.calculator.TopLevelStruct {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                _positional,
                input
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.StructPassing::class.java, "roundTrip", software.amazon.jsii.tests.kotlin.calculator.TopLevelStruct::class.java, args) ?: error("Method 'roundTrip()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
