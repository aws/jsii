package org.jsii.tests.calculator;
/**
 * The power operation.
 */
@org.jsii.Jsii(module = org.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Power")
public class Power extends org.jsii.tests.calculator.composition.CompositeOperation {
    protected Power(final org.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * Creates a Power operation.
     * @param base The base of the power
     * @param pow The number of times to multiply
     */
    public Power(final org.jsii.tests.calculator.lib.Value base, final org.jsii.tests.calculator.lib.Value pow) {
        super(org.jsii.JsiiObject.InitializationMode.Jsii);
        org.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(base, "base is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(pow, "pow is required"))).toArray());
    }
    /**
     * The base of the power
     */
    public org.jsii.tests.calculator.lib.Value getBase() {
        return this.jsiiGet("base", org.jsii.tests.calculator.lib.Value.class);
    }
    /**
     * The number of times to multiply
     */
    public org.jsii.tests.calculator.lib.Value getPow() {
        return this.jsiiGet("pow", org.jsii.tests.calculator.lib.Value.class);
    }
    /**
     * The expression that this operation consists of.
     * Must be implemented by derived classes.
     */
    public org.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", org.jsii.tests.calculator.lib.Value.class);
    }
}
