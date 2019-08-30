package software.amazon.jsii.tests.calculator;

/**
 * An operation that sums multiple values.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Sum")
public class Sum extends software.amazon.jsii.tests.calculator.composition.CompositeOperation {

    protected Sum(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Sum(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Sum() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * The expression that this operation consists of. Must be implemented by derived classes.
     * 
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * The parts to sum.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<software.amazon.jsii.tests.calculator.lib.Value> getParts() {
        return this.jsiiGet("parts", java.util.List.class);
    }

    /**
     * The parts to sum.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setParts(final java.util.List<software.amazon.jsii.tests.calculator.lib.Value> value) {
        this.jsiiSet("parts", java.util.Objects.requireNonNull(value, "parts is required"));
    }
}
