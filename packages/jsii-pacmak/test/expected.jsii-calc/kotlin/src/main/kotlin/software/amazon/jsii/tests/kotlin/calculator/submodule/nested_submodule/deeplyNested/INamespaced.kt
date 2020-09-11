package software.amazon.jsii.tests.kotlin.calculator.submodule.nested_submodule.deeplyNested

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface INamespaced : software.amazon.jsii.JsiiSerializable {
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val definedAt: kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.submodule.nested_submodule.deeplyNested.INamespaced {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val definedAt: kotlin.String
            get() {
                return this.jsiiGet("definedAt", kotlin.String::class.java) ?: error("'definedAt' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
