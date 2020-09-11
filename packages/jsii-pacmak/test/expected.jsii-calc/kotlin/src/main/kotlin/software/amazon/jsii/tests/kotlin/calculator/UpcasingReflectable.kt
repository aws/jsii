package software.amazon.jsii.tests.kotlin.calculator

/**
 * Ensures submodule-imported types from dependencies can be used correctly.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.UpcasingReflectable")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class UpcasingReflectable : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.lib.submodule.IReflectable {
    companion object {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val reflector: software.amazon.jsii.tests.kotlin.calculator.lib.submodule.Reflector
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.UpcasingReflectable::class.java, "reflector", software.amazon.jsii.tests.kotlin.calculator.lib.submodule.Reflector::class.java) ?: error("'reflector' should be present")
            }

    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(delegateValue: kotlin.collections.Map<kotlin.String, kotlin.Any>) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            delegateValue
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val entries: kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry>
        get() {
            return this.jsiiGet("entries", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry> ?: error("'entries' should be present")
        }

}
