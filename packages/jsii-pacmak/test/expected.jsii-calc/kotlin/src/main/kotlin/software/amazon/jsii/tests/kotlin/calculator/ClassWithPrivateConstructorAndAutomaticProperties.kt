package software.amazon.jsii.tests.kotlin.calculator

/**
 * Class that implements interface properties automatically, but using a private constructor.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ClassWithPrivateConstructorAndAutomaticProperties : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.IInterfaceWithProperties {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun create(readOnlyString: kotlin.String, readWriteString: kotlin.String): software.amazon.jsii.tests.kotlin.calculator.ClassWithPrivateConstructorAndAutomaticProperties {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                readOnlyString,
                readWriteString
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ClassWithPrivateConstructorAndAutomaticProperties::class.java, "create", software.amazon.jsii.tests.kotlin.calculator.ClassWithPrivateConstructorAndAutomaticProperties::class.java, args) ?: error("Method 'create()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val readOnlyString: kotlin.String
        get() {
            return this.jsiiGet("readOnlyString", kotlin.String::class.java) ?: error("'readOnlyString' should be present")
        }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override var readWriteString: kotlin.String
        get() {
            return this.jsiiGet("readWriteString", kotlin.String::class.java) ?: error("'readWriteString' should be present")
        }
        set(v) {
            this.jsiiSet("readWriteString", v)
        }

}
