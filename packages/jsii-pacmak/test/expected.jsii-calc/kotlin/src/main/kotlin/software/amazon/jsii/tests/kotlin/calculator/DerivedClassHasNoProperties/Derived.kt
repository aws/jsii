package software.amazon.jsii.tests.kotlin.calculator.DerivedClassHasNoProperties

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DerivedClassHasNoProperties.Derived")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Derived : software.amazon.jsii.tests.kotlin.calculator.DerivedClassHasNoProperties.Base {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
