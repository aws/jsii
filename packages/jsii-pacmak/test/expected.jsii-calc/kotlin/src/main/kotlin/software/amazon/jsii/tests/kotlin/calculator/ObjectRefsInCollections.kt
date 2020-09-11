package software.amazon.jsii.tests.kotlin.calculator

/**
 * Verify that object references can be passed inside collections.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ObjectRefsInCollections")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ObjectRefsInCollections : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * Returns the sum of all values.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun sumFromArray(values: kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.Value>): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            values
        )
        return this.jsiiCall("sumFromArray", kotlin.Number::class.java, args) ?: error("Method 'sumFromArray()' returned null value")
    }

    /**
     * Returns the sum of all values in a map.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun sumFromMap(values: kotlin.collections.Map<kotlin.String, software.amazon.jsii.tests.kotlin.calculator.lib.Value>): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            values
        )
        return this.jsiiCall("sumFromMap", kotlin.Number::class.java, args) ?: error("Method 'sumFromMap()' returned null value")
    }
}
