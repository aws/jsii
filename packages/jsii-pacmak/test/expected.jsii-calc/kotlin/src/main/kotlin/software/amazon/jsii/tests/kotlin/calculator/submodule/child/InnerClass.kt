package software.amazon.jsii.tests.kotlin.calculator.submodule.child

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.submodule.child.InnerClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class InnerClass : software.amazon.jsii.JsiiObject {
    companion object {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        val staticProp: software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeStruct
            get() {
                return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.submodule.child.InnerClass::class.java, "staticProp", software.amazon.jsii.tests.kotlin.calculator.submodule.child.SomeStruct::class.java) ?: error("'staticProp' should be present")
            }

    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
