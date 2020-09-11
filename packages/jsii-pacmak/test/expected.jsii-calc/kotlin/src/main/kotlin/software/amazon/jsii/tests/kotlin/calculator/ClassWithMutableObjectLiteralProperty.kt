package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ClassWithMutableObjectLiteralProperty")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ClassWithMutableObjectLiteralProperty : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var mutableObject: software.amazon.jsii.tests.kotlin.calculator.IMutableObjectLiteral
        get() {
            return this.jsiiGet("mutableObject", software.amazon.jsii.tests.kotlin.calculator.IMutableObjectLiteral::class.java) ?: error("'mutableObject' should be present")
        }
        set(v) {
            this.jsiiSet("mutableObject", v)
        }

}
