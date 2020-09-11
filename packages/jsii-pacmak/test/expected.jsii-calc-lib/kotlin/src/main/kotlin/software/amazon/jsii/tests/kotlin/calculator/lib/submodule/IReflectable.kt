package software.amazon.jsii.tests.kotlin.calculator.lib.submodule

@javax.annotation.Generated("jsii-pacmak")
@Deprecated("Declaration is deprecated.")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
interface IReflectable : software.amazon.jsii.JsiiSerializable {
    @Deprecated("Declaration is deprecated.")
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    val entries: kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry>

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.lib.submodule.IReflectable {
        @Deprecated("Declaration is deprecated.")
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        override val entries: kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry>
            get() {
                return this.jsiiGet("entries", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.submodule.ReflectableEntry> ?: error("'entries' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
