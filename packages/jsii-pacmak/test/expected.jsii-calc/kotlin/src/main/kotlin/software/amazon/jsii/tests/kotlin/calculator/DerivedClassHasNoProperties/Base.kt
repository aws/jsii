package software.amazon.jsii.tests.kotlin.calculator.DerivedClassHasNoProperties

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DerivedClassHasNoProperties.Base")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Base : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var prop: kotlin.String
        get() {
            return this.jsiiGet("prop", kotlin.String::class.java) ?: error("'prop' should be present")
        }
        set(v) {
            this.jsiiSet("prop", v)
        }

}
