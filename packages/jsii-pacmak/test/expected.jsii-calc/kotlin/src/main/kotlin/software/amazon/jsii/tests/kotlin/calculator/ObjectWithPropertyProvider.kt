package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ObjectWithPropertyProvider")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ObjectWithPropertyProvider : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun provide(): software.amazon.jsii.tests.kotlin.calculator.IObjectWithProperty {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ObjectWithPropertyProvider::class.java, "provide", software.amazon.jsii.tests.kotlin.calculator.IObjectWithProperty::class.java) ?: error("Method 'provide()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)
}
