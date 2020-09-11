package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.JSII417Derived")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class JSII417Derived : software.amazon.jsii.tests.kotlin.calculator.JSII417PublicBaseOfBase {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor(propertyValue: kotlin.String) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            propertyValue
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected open val propertyValue: kotlin.String
        get() {
            return this.jsiiGet("property", kotlin.String::class.java) ?: error("'property' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun bar() {
        this.jsiiCall("bar", kotlin.Unit::class.java) ?: error("Method 'bar()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun baz() {
        this.jsiiCall("baz", kotlin.Unit::class.java) ?: error("Method 'baz()' returned null value")
    }
}
