package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.RuntimeTypeChecking")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class RuntimeTypeChecking : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun methodWithDefaultedArguments(arg1: kotlin.Number?, arg2: kotlin.String?, arg3: java.time.Instant?) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            arg1 ?: error("'arg1' should be present"),
            arg2 ?: error("'arg2' should be present"),
            arg3 ?: error("'arg3' should be present")
        )
        this.jsiiCall("methodWithDefaultedArguments", kotlin.Unit::class.java, args) ?: error("Method 'methodWithDefaultedArguments()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun methodWithOptionalAnyArgument(arg: kotlin.Any?) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            arg ?: error("'arg' should be present")
        )
        this.jsiiCall("methodWithOptionalAnyArgument", kotlin.Unit::class.java, args) ?: error("Method 'methodWithOptionalAnyArgument()' returned null value")
    }

    /**
     * Used to verify verification of number of method arguments.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun methodWithOptionalArguments(arg1: kotlin.Number, arg2: kotlin.String, arg3: java.time.Instant?) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            arg1,
            arg2,
            arg3 ?: error("'arg3' should be present")
        )
        this.jsiiCall("methodWithOptionalArguments", kotlin.Unit::class.java, args) ?: error("Method 'methodWithOptionalArguments()' returned null value")
    }
}
