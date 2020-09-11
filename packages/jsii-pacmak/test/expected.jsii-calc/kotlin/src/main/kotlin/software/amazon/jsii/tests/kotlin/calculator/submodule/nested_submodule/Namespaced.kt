package software.amazon.jsii.tests.kotlin.calculator.submodule.nested_submodule

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.submodule.nested_submodule.Namespaced")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class Namespaced : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.submodule.nested_submodule.deeplyNested.INamespaced {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val definedAt: kotlin.String
        get() {
            return this.jsiiGet("definedAt", kotlin.String::class.java) ?: error("'definedAt' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    abstract val goodness: software.amazon.jsii.tests.kotlin.calculator.submodule.child.Goodness

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.submodule.nested_submodule.Namespaced {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val definedAt: kotlin.String
            get() {
                return this.jsiiGet("definedAt", kotlin.String::class.java) ?: error("'definedAt' should be present")
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val goodness: software.amazon.jsii.tests.kotlin.calculator.submodule.child.Goodness
            get() {
                return this.jsiiGet("goodness", software.amazon.jsii.tests.kotlin.calculator.submodule.child.Goodness::class.java) ?: error("'goodness' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
