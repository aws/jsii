package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.VariadicMethod")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class VariadicMethod : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(vararg prefix: kotlin.Number) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            prefix
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    /**
     * @param firstthe first element of the array to be returned (after the `prefix` provided at construction time).
     * 
     * @param othersother elements to be included in the array.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun asArray(first: kotlin.Number, vararg others: kotlin.Number): kotlin.collections.List<kotlin.Number> {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            first,
            others
        )
        return this.jsiiCall("asArray", kotlin.collections.List::class.java, args) as? kotlin.collections.List<kotlin.Number> ?: error("Method 'asArray()' returned null value")
    }
}
