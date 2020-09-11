package software.amazon.jsii.tests.kotlin.calculator

/**
 * jsii#284: do not recognize "any" as an optional argument.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DoNotRecognizeAnyAsOptional")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class DoNotRecognizeAnyAsOptional : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun method(_requiredAny: kotlin.Any, _optionalAny: kotlin.Any?, _optionalString: kotlin.String?) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            _requiredAny,
            _optionalAny ?: error("'_optionalAny' should be present"),
            _optionalString ?: error("'_optionalString' should be present")
        )
        this.jsiiCall("method", kotlin.Unit::class.java, args) ?: error("Method 'method()' returned null value")
    }
}
