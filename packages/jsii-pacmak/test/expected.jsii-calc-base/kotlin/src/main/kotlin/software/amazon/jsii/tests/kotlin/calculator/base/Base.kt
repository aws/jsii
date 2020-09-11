package software.amazon.jsii.tests.kotlin.calculator.base

/**
 * A base class.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.base.`$Module`::class, fqn = "@scope/jsii-calc-base.Base")
abstract class Base : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * @return the name of the class (to verify native type names are created for derived classes).
     */
    open fun typeName(): kotlin.Any {
        return this.jsiiCall("typeName", kotlin.Any::class.java) ?: error("Method 'typeName()' returned null value")
    }

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.base.Base {
        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        /**
         * @return the name of the class (to verify native type names are created for derived classes).
         */
        override fun typeName(): kotlin.Any {
            return this.jsiiCall("typeName", kotlin.Any::class.java) ?: error("Method 'typeName()' returned null value")
        }
    }
}
