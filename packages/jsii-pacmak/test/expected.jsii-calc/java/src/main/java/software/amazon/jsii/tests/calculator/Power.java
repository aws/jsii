package software.amazon.jsii.tests.calculator;

/**
 * The power operation.
 * 
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Power")
public class Power extends software.amazon.jsii.tests.calculator.composition.CompositeOperation {
    protected Power(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    /**
     * Creates a Power operation.
     * 
     * @param base The base of the power.
     * @param pow The number of times to multiply.
     */
    public Power(final software.amazon.jsii.tests.calculator.lib.Value base, final software.amazon.jsii.tests.calculator.lib.Value pow) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(base, "base is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(pow, "pow is required"))).toArray());
    }

    /**
     * The base of the power.
     * 
     */
    public software.amazon.jsii.tests.calculator.lib.Value getBase() {
        return this.jsiiGet("base", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * The expression that this operation consists of. Must be implemented by derived classes.
     * 
     */
    @Override
    public software.amazon.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * The number of times to multiply.
     * 
     */
    public software.amazon.jsii.tests.calculator.lib.Value getPow() {
        return this.jsiiGet("pow", software.amazon.jsii.tests.calculator.lib.Value.class);
    }
}
