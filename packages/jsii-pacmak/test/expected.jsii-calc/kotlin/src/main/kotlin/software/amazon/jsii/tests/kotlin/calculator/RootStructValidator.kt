package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.RootStructValidator")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class RootStructValidator : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun validate(struct: software.amazon.jsii.tests.kotlin.calculator.RootStruct) {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                struct
            )
            software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.RootStructValidator::class.java, "validate", kotlin.Unit::class.java, args) ?: error("Method 'validate()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
