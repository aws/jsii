package software.amazon.jsii.tests.kotlin.calculator.InterfaceInNamespaceIncludesClasses

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.InterfaceInNamespaceIncludesClasses.Foo")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Foo : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var bar: kotlin.String?
        get() {
            return this.jsiiGet("bar", kotlin.String::class.java)
        }
        set(v) {
            this.jsiiSet("bar", v)
        }

}
