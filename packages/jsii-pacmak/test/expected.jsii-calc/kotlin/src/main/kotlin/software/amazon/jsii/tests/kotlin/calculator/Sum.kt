package software.amazon.jsii.tests.kotlin.calculator

/**
 * An operation that sums multiple values.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.Sum")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
open class Sum : software.amazon.jsii.tests.kotlin.calculator.composition.CompositeOperation {
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
    open override val expression: software.amazon.jsii.tests.kotlin.calculator.lib.Value
        get() {
            return this.jsiiGet("expression", software.amazon.jsii.tests.kotlin.calculator.lib.Value::class.java) ?: error("'expression' should be present")
        }

    /**
     * The parts to sum.
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open var parts: kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.Value>
        get() {
            return this.jsiiGet("parts", kotlin.collections.List::class.java) as? kotlin.collections.List<software.amazon.jsii.tests.kotlin.calculator.lib.Value> ?: error("'parts' should be present")
        }
        set(v) {
            this.jsiiSet("parts", v)
        }

}
