package software.amazon.jsii.tests.kotlin.calculator

/**
 * Ensures abstract members implementations correctly register overrides in various languages.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.AbstractSuite")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class AbstractSuite : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract var propertyValue: kotlin.String

    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    protected abstract fun someMethod(str: kotlin.String): kotlin.String

    /**
     * Sets `seed` to `this.property`, then calls `someMethod` with `this.property` and returns the result.
     * 
     * @param seeda `string`.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun workItAll(seed: kotlin.String): kotlin.String {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            seed
        )
        return this.jsiiCall("workItAll", kotlin.String::class.java, args) ?: error("Method 'workItAll()' returned null value")
    }

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.AbstractSuite {
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        protected override var propertyValue: kotlin.String
            get() {
                return this.jsiiGet("property", kotlin.String::class.java) ?: error("'property' should be present")
            }
            set(v) {
                this.jsiiSet("property", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        protected override fun someMethod(str: kotlin.String): kotlin.String {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                str
            )
            return this.jsiiCall("someMethod", kotlin.String::class.java, args) ?: error("Method 'someMethod()' returned null value")
        }

        /**
         * Sets `seed` to `this.property`, then calls `someMethod` with `this.property` and returns the result.
         * 
         * @param seeda `string`.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun workItAll(seed: kotlin.String): kotlin.String {
            val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
                seed
            )
            return this.jsiiCall("workItAll", kotlin.String::class.java, args) ?: error("Method 'workItAll()' returned null value")
        }
    }
}
