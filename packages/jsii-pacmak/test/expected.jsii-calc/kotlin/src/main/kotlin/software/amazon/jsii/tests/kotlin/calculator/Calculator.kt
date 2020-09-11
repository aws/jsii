package software.amazon.jsii.tests.kotlin.calculator

/**
 * A calculator which maintains a current value and allows adding operations.
 * 
 * Here's how you use it:
 * 
 * ```ts
 * const calculator = new calc.Calculator();
 * calculator.add(5);
 * calculator.mul(3);
 * console.log(calculator.expression.value);
 * ```
 * 
 * I will repeat this example again, but in an @example tag.
 * 
 * Example: 
 * const calculator = new calc.Calculator();
 * calculator.add(5);
 * calculator.mul(3);
 * console.log(calculator.expression.value);
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Calculator")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Calculator : software.amazon.jsii.tests.kotlin.calculator.composition.CompositeOperation {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    /**
     * Creates a Calculator object.
     */
    constructor(props: software.amazon.jsii.tests.kotlin.calculator.CalculatorProps?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            props ?: error("'props' should be present")
        )
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, args)
    }

    /**
     * Returns the expression.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open override val expression: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("expression", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'expression' should be present")
        }

    /**
     * A log of all operations.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val operationsLog: kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.Value>
        get() {
            return this.jsiiGet("operationsLog", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.Value> ?: error("'operationsLog' should be present")
        }

    /**
     * A map of per operation name of all operations performed.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open val operationsMap: kotlin.collections.Map<kotlin.String, kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.Value>>
        get() {
            return this.jsiiGet("operationsMap", kotlin.collections.Map::class.java) as? kotlin.collections.Map<kotlin.String, kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.Value>> ?: error("'operationsMap' should be present")
        }

    /**
     * The current value.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var curr: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("curr", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'curr' should be present")
        }
        set(v) {
            this.jsiiSet("curr", v)
        }

    /**
     * The maximum value allows in this calculator.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var maxValue: kotlin.Number?
        get() {
            return this.jsiiGet("maxValue", kotlin.Number::class.java)
        }
        set(v) {
            this.jsiiSet("maxValue", v)
        }

    /**
     * Example of a property that accepts a union of types.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var unionProperty: kotlin.Any?
        get() {
            return this.jsiiGet("unionProperty", kotlin.Any::class.java)
        }
        set(v) {
            this.jsiiSet("unionProperty", v)
        }

    /**
     * Adds a number to the current value.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun add(value: kotlin.Number) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        this.jsiiCall("add", kotlin.Unit::class.java, args) ?: error("Method 'add()' returned null value")
    }

    /**
     * Multiplies the current value by a number.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun mul(value: kotlin.Number) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        this.jsiiCall("mul", kotlin.Unit::class.java, args) ?: error("Method 'mul()' returned null value")
    }

    /**
     * Negates the current value.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun neg() {
        this.jsiiCall("neg", kotlin.Unit::class.java) ?: error("Method 'neg()' returned null value")
    }

    /**
     * Raises the current value by a power.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun pow(value: kotlin.Number) {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            value
        )
        this.jsiiCall("pow", kotlin.Unit::class.java, args) ?: error("Method 'pow()' returned null value")
    }

    /**
     * Returns teh value of the union property (if defined).
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun readUnionValue(): kotlin.Number {
        return this.jsiiCall("readUnionValue", kotlin.Number::class.java) ?: error("Method 'readUnionValue()' returned null value")
    }
}
