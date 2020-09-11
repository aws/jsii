package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AbstractClassBase")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class AbstractClassBase : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    abstract val abstractProperty: kotlin.String

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.AbstractClassBase {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val abstractProperty: kotlin.String
            get() {
                return this.jsiiGet("abstractProperty", kotlin.String::class.java) ?: error("'abstractProperty' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }
    }
}
