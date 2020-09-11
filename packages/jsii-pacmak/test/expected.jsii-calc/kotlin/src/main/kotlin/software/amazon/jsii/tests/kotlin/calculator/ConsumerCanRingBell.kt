package software.amazon.jsii.tests.kotlin.calculator

/**
 * Test calling back to consumers that implement interfaces.
 * 
 * Check that if a JSII consumer implements IConsumerWithInterfaceParam, they can call
 * the method on the argument that they're passed...
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.ConsumerCanRingBell")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class ConsumerCanRingBell : software.amazon.jsii.JsiiObject {
    companion object {
        /**
         * ...if the interface is implemented using an object literal.
         * 
         * Returns whether the bell was rung.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun staticImplementedByObjectLiteral(ringer: software.amazon.jsii.tests.kotlin.calculator.IBellRinger): kotlin.Boolean {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                ringer
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ConsumerCanRingBell::class.java, "staticImplementedByObjectLiteral", kotlin.Boolean::class.java, args) ?: error("Method 'staticImplementedByObjectLiteral()' returned null value")
        }

        /**
         * ...if the interface is implemented using a private class.
         * 
         * Return whether the bell was rung.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun staticImplementedByPrivateClass(ringer: software.amazon.jsii.tests.kotlin.calculator.IBellRinger): kotlin.Boolean {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                ringer
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ConsumerCanRingBell::class.java, "staticImplementedByPrivateClass", kotlin.Boolean::class.java, args) ?: error("Method 'staticImplementedByPrivateClass()' returned null value")
        }

        /**
         * ...if the interface is implemented using a public class.
         * 
         * Return whether the bell was rung.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun staticImplementedByPublicClass(ringer: software.amazon.jsii.tests.kotlin.calculator.IBellRinger): kotlin.Boolean {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                ringer
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ConsumerCanRingBell::class.java, "staticImplementedByPublicClass", kotlin.Boolean::class.java, args) ?: error("Method 'staticImplementedByPublicClass()' returned null value")
        }

        /**
         * If the parameter is a concrete class instead of an interface.
         * 
         * Return whether the bell was rung.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        fun staticWhenTypedAsClass(ringer: software.amazon.jsii.tests.kotlin.calculator.IConcreteBellRinger): kotlin.Boolean {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                ringer
            )
            return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.kotlin.calculator.ConsumerCanRingBell::class.java, "staticWhenTypedAsClass", kotlin.Boolean::class.java, args) ?: error("Method 'staticWhenTypedAsClass()' returned null value")
        }
    }
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * ...if the interface is implemented using an object literal.
     * 
     * Returns whether the bell was rung.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun implementedByObjectLiteral(ringer: software.amazon.jsii.tests.kotlin.calculator.IBellRinger): kotlin.Boolean {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            ringer
        )
        return this.jsiiCall("implementedByObjectLiteral", kotlin.Boolean::class.java, args) ?: error("Method 'implementedByObjectLiteral()' returned null value")
    }

    /**
     * ...if the interface is implemented using a private class.
     * 
     * Return whether the bell was rung.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun implementedByPrivateClass(ringer: software.amazon.jsii.tests.kotlin.calculator.IBellRinger): kotlin.Boolean {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            ringer
        )
        return this.jsiiCall("implementedByPrivateClass", kotlin.Boolean::class.java, args) ?: error("Method 'implementedByPrivateClass()' returned null value")
    }

    /**
     * ...if the interface is implemented using a public class.
     * 
     * Return whether the bell was rung.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun implementedByPublicClass(ringer: software.amazon.jsii.tests.kotlin.calculator.IBellRinger): kotlin.Boolean {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            ringer
        )
        return this.jsiiCall("implementedByPublicClass", kotlin.Boolean::class.java, args) ?: error("Method 'implementedByPublicClass()' returned null value")
    }

    /**
     * If the parameter is a concrete class instead of an interface.
     * 
     * Return whether the bell was rung.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun whenTypedAsClass(ringer: software.amazon.jsii.tests.kotlin.calculator.IConcreteBellRinger): kotlin.Boolean {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            ringer
        )
        return this.jsiiCall("whenTypedAsClass", kotlin.Boolean::class.java, args) ?: error("Method 'whenTypedAsClass()' returned null value")
    }
}
