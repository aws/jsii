package software.amazon.jsii.tests.calculator;

/**
 * An operation that sums multiple values.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Sum")
public class Sum extends software.amazon.jsii.tests.calculator.composition.CompositeOperation {
    protected Sum(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public Sum() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * The expression that this operation consists of.
     * Must be implemented by derived classes.
     */
    @Override
    public software.amazon.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * The parts to sum.
     */
    public java.util.List<software.amazon.jsii.tests.calculator.lib.Value> getParts() {
        return this.jsiiGet("parts", java.util.List.class);
    }

    /**
     * The parts to sum.
     */
    public void setParts(final java.util.List<software.amazon.jsii.tests.calculator.lib.Value> value) {
        this.jsiiSet("parts", java.util.Objects.requireNonNull(value, "parts is required"));
    }
}
