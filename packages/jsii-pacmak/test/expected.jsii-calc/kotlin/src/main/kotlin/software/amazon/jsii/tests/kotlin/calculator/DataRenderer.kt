package software.amazon.jsii.tests.kotlin.calculator

/**
 * Verifies proper type handling through dynamic overrides.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DataRenderer")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class DataRenderer : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun render(dataValue: software.amazon.jsii.tests.kotlin.calculator.lib.MyFirstStruct?): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            dataValue ?: error("'data' should be present")
        )
        return this.jsiiCall("render", kotlin.String::class.java, args) ?: error("Method 'render()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun renderArbitrary(dataValue: kotlin.collections.Map<kotlin.String, kotlin.Any>): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            dataValue
        )
        return this.jsiiCall("renderArbitrary", kotlin.String::class.java, args) ?: error("Method 'renderArbitrary()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun renderMap(map: kotlin.collections.Map<kotlin.String, kotlin.Any>): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            map
        )
        return this.jsiiCall("renderMap", kotlin.String::class.java, args) ?: error("Method 'renderMap()' returned null value")
    }
}
