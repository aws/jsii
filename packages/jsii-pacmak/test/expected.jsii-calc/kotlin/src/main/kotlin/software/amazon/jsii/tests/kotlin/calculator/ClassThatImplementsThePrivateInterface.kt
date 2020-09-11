package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ClassThatImplementsThePrivateInterface")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ClassThatImplementsThePrivateInterface : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.INonInternalInterface {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override var a: kotlin.String
        get() {
            return this.jsiiGet("a", kotlin.String::class.java) ?: error("'a' should be present")
        }
        set(v) {
            this.jsiiSet("a", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override var b: kotlin.String
        get() {
            return this.jsiiGet("b", kotlin.String::class.java) ?: error("'b' should be present")
        }
        set(v) {
            this.jsiiSet("b", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override var c: kotlin.String
        get() {
            return this.jsiiGet("c", kotlin.String::class.java) ?: error("'c' should be present")
        }
        set(v) {
            this.jsiiSet("c", v)
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var e: kotlin.String
        get() {
            return this.jsiiGet("e", kotlin.String::class.java) ?: error("'e' should be present")
        }
        set(v) {
            this.jsiiSet("e", v)
        }

}
