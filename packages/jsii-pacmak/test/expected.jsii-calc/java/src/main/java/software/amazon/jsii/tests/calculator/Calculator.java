package software.amazon.jsii.tests.calculator;

/**
 * A calculator which maintains a current value and allows adding operations.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Calculator")
public class Calculator extends software.amazon.jsii.tests.calculator.composition.CompositeOperation {

    protected Calculator(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Calculator(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * Creates a Calculator object.
     * 
     * EXPERIMENTAL
     * 
     * @param props Initialization properties.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Calculator(final software.amazon.jsii.tests.calculator.CalculatorProps props) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { props }));
    }

    /**
     * Creates a Calculator object.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Calculator() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * Adds a number to the current value.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void add(final java.lang.Number value) {
        this.jsiiCall("add", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Multiplies the current value by a number.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void mul(final java.lang.Number value) {
        this.jsiiCall("mul", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Negates the current value.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void neg() {
        this.jsiiCall("neg", Void.class);
    }

    /**
     * Raises the current value by a power.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void pow(final java.lang.Number value) {
        this.jsiiCall("pow", Void.class, new Object[] { java.util.Objects.requireNonNull(value, "value is required") });
    }

    /**
     * Returns teh value of the union property (if defined).
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number readUnionValue() {
        return this.jsiiCall("readUnionValue", java.lang.Number.class);
    }

    /**
     * Returns the expression.
     * 
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.Value getExpression() {
        return this.jsiiGet("expression", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * A log of all operations.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.List<software.amazon.jsii.tests.calculator.lib.Value> getOperationsLog() {
        return this.jsiiGet("operationsLog", java.util.List.class);
    }

    /**
     * A map of per operation name of all operations performed.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.util.Map<java.lang.String, java.util.List<software.amazon.jsii.tests.calculator.lib.Value>> getOperationsMap() {
        return this.jsiiGet("operationsMap", java.util.Map.class);
    }

    /**
     * The current value.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public software.amazon.jsii.tests.calculator.lib.Value getCurr() {
        return this.jsiiGet("curr", software.amazon.jsii.tests.calculator.lib.Value.class);
    }

    /**
     * The current value.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setCurr(final software.amazon.jsii.tests.calculator.lib.Value value) {
        this.jsiiSet("curr", java.util.Objects.requireNonNull(value, "curr is required"));
    }

    /**
     * The maximum value allows in this calculator.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getMaxValue() {
        return this.jsiiGet("maxValue", java.lang.Number.class);
    }

    /**
     * The maximum value allows in this calculator.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setMaxValue(final java.lang.Number value) {
        this.jsiiSet("maxValue", value);
    }

    /**
     * Example of a property that accepts a union of types.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }

    /**
     * Example of a property that accepts a union of types.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final software.amazon.jsii.tests.calculator.Add value) {
        this.jsiiSet("unionProperty", value);
    }

    /**
     * Example of a property that accepts a union of types.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final software.amazon.jsii.tests.calculator.Multiply value) {
        this.jsiiSet("unionProperty", value);
    }

    /**
     * Example of a property that accepts a union of types.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final software.amazon.jsii.tests.calculator.Power value) {
        this.jsiiSet("unionProperty", value);
    }
}
