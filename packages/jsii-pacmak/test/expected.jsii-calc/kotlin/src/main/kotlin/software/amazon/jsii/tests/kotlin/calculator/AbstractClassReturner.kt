package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AbstractClassReturner")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class AbstractClassReturner : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val returnAbstractFromProperty: software.amazon.jsii.tests.kotlin.calculator.AbstractClassBase
        get() {
            return this.jsiiGet("returnAbstractFromProperty", software.amazon.jsii.tests.kotlin.calculator.AbstractClassBase::class.java) ?: error("'returnAbstractFromProperty' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun giveMeAbstract(): software.amazon.jsii.tests.kotlin.calculator.AbstractClass {
        return this.jsiiCall("giveMeAbstract", software.amazon.jsii.tests.kotlin.calculator.AbstractClass::class.java) ?: error("Method 'giveMeAbstract()' returned null value")
    }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun giveMeInterface(): software.amazon.jsii.tests.kotlin.calculator.IInterfaceImplementedByAbstractClass {
        return this.jsiiCall("giveMeInterface", software.amazon.jsii.tests.kotlin.calculator.IInterfaceImplementedByAbstractClass::class.java) ?: error("Method 'giveMeInterface()' returned null value")
    }
}
