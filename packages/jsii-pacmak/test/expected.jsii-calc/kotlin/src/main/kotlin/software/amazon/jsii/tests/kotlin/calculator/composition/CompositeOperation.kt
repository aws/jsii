package software.amazon.jsii.tests.kotlin.calculator.composition

/**
 * Abstract operation composed from an expression of other operations.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.composition.CompositeOperation")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
abstract class CompositeOperation : software.amazon.jsii.tests.kotlin.calculator.lib.Operation {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * The expression that this operation consists of.
     * 
     * Must be implemented by derived classes.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    abstract val expression: software.amazon.jsii.tests.kotlin.calculator.lib.Value

    /**
     * The value.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val value: kotlin.Number
        get() {
            return this.jsiiGet("value", kotlin.Number::class.java) ?: error("'value' should be present")
        }

    /**
     * A set of postfixes to include in a decorated .toString().
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var decorationPostfixes: kotlin.collections.List<kotlin.String>
        get() {
            return this.jsiiGet("decorationPostfixes", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'decorationPostfixes' should be present")
        }
        set(v) {
            this.jsiiSet("decorationPostfixes", v)
        }

    /**
     * A set of prefixes to include in a decorated .toString().
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var decorationPrefixes: kotlin.collections.List<kotlin.String>
        get() {
            return this.jsiiGet("decorationPrefixes", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'decorationPrefixes' should be present")
        }
        set(v) {
            this.jsiiSet("decorationPrefixes", v)
        }

    /**
     * The .toString() style.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var stringStyle: software.amazon.jsii.tests.kotlin.calculator.composition.CompositeOperation.CompositionStringStyle
        get() {
            return this.jsiiGet("stringStyle", software.amazon.jsii.tests.kotlin.calculator.composition.CompositeOperation.CompositionStringStyle::class.java) ?: error("'stringStyle' should be present")
        }
        set(v) {
            this.jsiiSet("stringStyle", v)
        }

    /**
     * String representation of the value.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override fun toString(): kotlin.String {
        return this.jsiiCall("toString", kotlin.String::class.java) ?: error("Method 'toString()' returned null value")
    }

    /**
     * Style of .toString() output for CompositeOperation.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    enum class CompositionStringStyle {
        /**
         * Normal string expression.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        NORMAL,

        /**
         * Decorated string expression.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        DECORATED,
    }

    class `Jsii$Proxy` : software.amazon.jsii.tests.kotlin.calculator.composition.CompositeOperation {
        /**
         * The value.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val value: kotlin.Number
            get() {
                return this.jsiiGet("value", kotlin.Number::class.java) ?: error("'value' should be present")
            }

        /**
         * The expression that this operation consists of.
         * 
         * Must be implemented by derived classes.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val expression: software.amazon.jsii.tests.kotlin.calculator.lib.Value
            get() {
                return this.jsiiGet("expression", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'expression' should be present")
            }

        /**
         * A set of postfixes to include in a decorated .toString().
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var decorationPostfixes: kotlin.collections.List<kotlin.String>
            get() {
                return this.jsiiGet("decorationPostfixes", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'decorationPostfixes' should be present")
            }
            set(v) {
                this.jsiiSet("decorationPostfixes", v)
            }

        /**
         * A set of prefixes to include in a decorated .toString().
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var decorationPrefixes: kotlin.collections.List<kotlin.String>
            get() {
                return this.jsiiGet("decorationPrefixes", kotlin.collections.List::class.java) as? kotlin.collections.List<kotlin.String> ?: error("'decorationPrefixes' should be present")
            }
            set(v) {
                this.jsiiSet("decorationPrefixes", v)
            }

        /**
         * The .toString() style.
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override var stringStyle: software.amazon.jsii.tests.kotlin.calculator.composition.CompositeOperation.CompositionStringStyle
            get() {
                return this.jsiiGet("stringStyle", software.amazon.jsii.tests.kotlin.calculator.composition.CompositeOperation.CompositionStringStyle::class.java) ?: error("'stringStyle' should be present")
            }
            set(v) {
                this.jsiiSet("stringStyle", v)
            }

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
        }

        /**
         * @return the name of the class (to verify native type names are created for derived classes).
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun typeName(): kotlin.Any {
            return this.jsiiCall("typeName", kotlin.Any::class.java) ?: error("Method 'typeName()' returned null value")
        }

        /**
         * String representation of the value.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override fun toString(): kotlin.String {
            return this.jsiiCall("toString", kotlin.String::class.java) ?: error("Method 'toString()' returned null value")
        }
    }
}
