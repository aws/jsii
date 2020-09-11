package software.amazon.jsii.tests.kotlin.calculator.submodule.child

/**
 * Checks that classes can self-reference during initialization.
 * 
 * @see : https://github.com/aws/jsii/pull/1706
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.submodule.child.OuterClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class OuterClass : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val innerClass: software.amazon.jsii.tests.kotlin.calculator.submodule.child.InnerClass
        get() {
            return this.jsiiGet("innerClass", software.amazon.jsii.tests.kotlin.calculator.submodule.child.InnerClass::class.java) ?: error("'innerClass' should be present")
        }

}
