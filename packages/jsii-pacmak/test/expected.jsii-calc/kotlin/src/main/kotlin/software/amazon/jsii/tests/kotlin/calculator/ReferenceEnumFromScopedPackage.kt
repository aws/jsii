package software.amazon.jsii.tests.kotlin.calculator

/**
 * See awslabs/jsii#138.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ReferenceEnumFromScopedPackage")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ReferenceEnumFromScopedPackage : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var foo: software.amazon.jsii.tests.kotlin.calculator.lib.EnumFromScopedModule?
        get() {
            return this.jsiiGet("foo", software.amazon.jsii.tests.kotlin.calculator.lib.EnumFromScopedModule::class.java)
        }
        set(v) {
            this.jsiiSet("foo", v)
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun loadFoo(): software.amazon.jsii.tests.kotlin.calculator.lib.EnumFromScopedModule? {
        return this.jsiiCall("loadFoo", software.amazon.jsii.tests.kotlin.calculator.lib.EnumFromScopedModule::class.java)
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun saveFoo(value: software.amazon.jsii.tests.kotlin.calculator.lib.EnumFromScopedModule) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        this.jsiiCall("saveFoo", kotlin.Unit::class.java, args) ?: error("Method 'saveFoo()' returned null value")
    }
}
