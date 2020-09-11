package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AbstractClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class AbstractClass : software.amazon.jsii.tests.kotlin.calculator.AbstractClassBase, software.amazon.jsii.tests.kotlin.calculator.IInterfaceImplementedByAbstractClass {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val propFromInterface: kotlin.String
        get() {
            return this.jsiiGet("propFromInterface", kotlin.String::class.java) ?: error("'propFromInterface' should be present")
        }

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    abstract fun abstractMethod(name: kotlin.String): kotlin.String

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun nonAbstractMethod(): kotlin.Number {
        return this.jsiiCall("nonAbstractMethod", kotlin.Number::class.java) ?: error("Method 'nonAbstractMethod()' returned null value")
    }

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.AbstractClass {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val abstractProperty: kotlin.String
            get() {
                return this.jsiiGet("abstractProperty", kotlin.String::class.java) ?: error("'abstractProperty' should be present")
            }

        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val propFromInterface: kotlin.String
            get() {
                return this.jsiiGet("propFromInterface", kotlin.String::class.java) ?: error("'propFromInterface' should be present")
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun abstractMethod(name: kotlin.String): kotlin.String {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                name
            )
            return this.jsiiCall("abstractMethod", kotlin.String::class.java, args) ?: error("Method 'abstractMethod()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun nonAbstractMethod(): kotlin.Number {
            return this.jsiiCall("nonAbstractMethod", kotlin.Number::class.java) ?: error("Method 'nonAbstractMethod()' returned null value")
        }
    }
}
