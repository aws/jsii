package software.amazon.jsii.tests.kotlin.calculator.lib.submodule

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.lib.`$Module`::class, fqn = "@scope/jsii-calc-lib.submodule.Reflector")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
open class Reflector : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @Deprecated("Declaration is deprecated.")
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    open fun asMap(reflectable: software.amazon.jsii.tests.kotlin.calculator.lib.submodule.IReflectable): kotlin.collections.Map<kotlin.String, kotlin.Any> {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            reflectable
        )
        return this.jsiiCall("asMap", kotlin.collections.Map::class.java, args) as? kotlin.collections.Map<kotlin.String, kotlin.Any> ?: error("Method 'asMap()' returned null value")
    }
}
