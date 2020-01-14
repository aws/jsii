package software.amazon.jsii.tests.calculator;

/**
 * The negation operation ("-value").
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Negate")
public class Negate extends software.amazon.jsii.tests.calculator.UnaryOperation implements software.amazon.jsii.tests.calculator.IFriendlier {

    protected Negate(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Negate(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param operand This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Negate(final software.amazon.jsii.tests.calculator.lib.Value operand) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, new Object[] { java.util.Objects.requireNonNull(operand, "operand is required") });
    }

    /**
     * Say farewell.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public java.lang.String farewell() {
        return this.jsiiCall("farewell", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
    }

    /**
     * Say goodbye.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public java.lang.String goodbye() {
        return this.jsiiCall("goodbye", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
    }

    /**
     * Say hello!
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public java.lang.String hello() {
        return this.jsiiCall("hello", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
    }

    /**
     * String representation of the value.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @Override
    public java.lang.String toString() {
        return this.jsiiCall("toString", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
    }

    /**
     * The value.
     * <p>
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number getValue() {
        return this.jsiiGet("value", software.amazon.jsii.NativeType.forClass(java.lang.Number.class));
    }
}
