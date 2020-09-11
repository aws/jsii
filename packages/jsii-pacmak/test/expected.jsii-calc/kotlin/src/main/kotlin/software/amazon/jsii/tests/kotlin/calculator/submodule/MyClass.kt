package software.amazon.jsii.tests.kotlin.calculator.submodule

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.submodule.MyClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class MyClass : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.submodule.nested_submodule.deeplyNested.INamespaced {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val awesomeness: software.amazon.jsii.tests.kotlin.calculator.submodule.child.Awesomeness
        get() {
            return this.jsiiGet("awesomeness", software.amazon.jsii.tests.kotlin.calculator.submodule.child.Awesomeness::class.java) ?: error("'awesomeness' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val definedAt: kotlin.String
        get() {
            return this.jsiiGet("definedAt", kotlin.String::class.java) ?: error("'definedAt' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val goodness: software.amazon.jsii.tests.kotlin.calculator.submodule.child.Goodness
        get() {
            return this.jsiiGet("goodness", software.amazon.jsii.tests.kotlin.calculator.submodule.child.Goodness::class.java) ?: error("'goodness' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var allTypes: software.amazon.jsii.tests.kotlin.calculator.AllTypes?
        get() {
            return this.jsiiGet("allTypes", software.amazon.jsii.tests.kotlin.calculator.AllTypes::class.java)
        }
        set(v) {
            this.jsiiSet("allTypes", v)
        }

}
