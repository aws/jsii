package software.amazon.jsii.tests.kotlin.calculator

@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Constructors")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Constructors : software.amazon.jsii.JsiiObject {
    companion object {
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun hiddenInterface(): software.amazon.jsii.tests.kotlin.calculator.IPublicInterface {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Constructors::class.java, "hiddenInterface", software.amazon.jsii.tests.kotlin.calculator.IPublicInterface::class.java) ?: error("Method 'hiddenInterface()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun hiddenInterfaces(): kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.IPublicInterface> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Constructors::class.java, "hiddenInterfaces", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.IPublicInterface> ?: error("Method 'hiddenInterfaces()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun hiddenSubInterfaces(): kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.IPublicInterface> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Constructors::class.java, "hiddenSubInterfaces", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.IPublicInterface> ?: error("Method 'hiddenSubInterfaces()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun makeClass(): software.amazon.jsii.tests.kotlin.calculator.PublicClass {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Constructors::class.java, "makeClass", software.amazon.jsii.tests.kotlin.calculator.PublicClass::class.java) ?: error("Method 'makeClass()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun makeInterface(): software.amazon.jsii.tests.kotlin.calculator.IPublicInterface {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Constructors::class.java, "makeInterface", software.amazon.jsii.tests.kotlin.calculator.IPublicInterface::class.java) ?: error("Method 'makeInterface()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun makeInterface2(): software.amazon.jsii.tests.kotlin.calculator.IPublicInterface2 {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Constructors::class.java, "makeInterface2", software.amazon.jsii.tests.kotlin.calculator.IPublicInterface2::class.java) ?: error("Method 'makeInterface2()' returned null value")
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun makeInterfaces(): kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.IPublicInterface> {
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.Constructors::class.java, "makeInterfaces", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.IPublicInterface> ?: error("Method 'makeInterfaces()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }
}
