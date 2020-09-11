package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ConsumePureInterface")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ConsumePureInterface : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(delegateValue: software.amazon.jsii.tests.kotlin.calculator.IStructReturningDelegate) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            delegateValue
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun workItBaby(): software.amazon.jsii.tests.kotlin.calculator.StructB {
        return this.jsiiCall("workItBaby", software.amazon.jsii.tests.kotlin.calculator.StructB::class.java) ?: error("Method 'workItBaby()' returned null value")
    }
}
